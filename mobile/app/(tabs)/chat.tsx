import React, { useState, useCallback, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";

// Types
interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isLoading?: boolean;
}

// Connect to Flask-SocketIO server
const socket = io("http://localhost:5000/chat/", {
  transports: ["websocket", "polling"], // fallback support
});

socket.on("connect", () => {
  console.log("✅ Connected to Flask-SocketIO");
});

socket.on("disconnect", () => {
  console.log("❌ Disconnected from Flask-SocketIO");
});

socket.on("connect_error", (err: any) => {
  console.error("⚠️ Socket.IO connection error:", err);
});

// Store a pending resolver for the current request
let pendingResolver: ((value: any) => void) | null = null;
let pendingRejecter: ((reason?: any) => void) | null = null;

// Listen for generic 'message' events from server
socket.on("message", (data: string) => {
  if (pendingResolver) {
    try {
      pendingResolver(typeof data === "string" ? JSON.parse(data) : data);
    } catch (err) {
      pendingRejecter?.(err);
    } finally {
      pendingResolver = null;
      pendingRejecter = null;
    }
  }
});

// API Service
const sendMessageToFlask = async (message: string, sessionId?: string) => {
  return new Promise((resolve, reject) => {
    if (!socket.connected) {
      reject(new Error("Socket.IO not connected"));
      return;
    }

    // Save resolvers for the next incoming message
    pendingResolver = resolve;
    pendingRejecter = reject;

    // Send data to backend
    socket.send({
      message,
      context: {
        userId: "user123", // Replace with actual user ID
        // sessionId: sessionId || "new_session",
      },
    });
  });
};

// Message Component
const MessageBubble = ({ message }: { message: Message }) => {
  return (
    <View className={`mb-4 ${message.isUser ? "items-end" : "items-start"}`}>
      <View
        className={`max-w-[80%] px-4 py-3 rounded-2xl ${
          message.isUser
            ? "bg-green-500 rounded-br-md"
            : "bg-gray-100 rounded-bl-md"
        }`}
      >
        {message.isLoading ? (
          <View className="flex-row items-center">
            <ActivityIndicator size="small" color="#666" />
            <Text className="text-gray-600 ml-2">Thinking...</Text>
          </View>
        ) : (
          <Text
            className={`text-base leading-6 ${
              message.isUser ? "text-white" : "text-gray-800"
            }`}
          >
            {message.text}
          </Text>
        )}
      </View>
      <Text className="text-xs text-gray-400 mt-1 px-2">
        {message.timestamp.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Text>
    </View>
  );
};

// Main Chat Component
export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  // const [sessionId, setSessionId] = useState<string>("");
  const scrollViewRef = useRef<ScrollView>(null);

  // Initialize chat with welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: "welcome",
      text: "Hello! I'm your AI Farming Assistant 🌾\n\nI can help you with:\n• Crop care and cultivation\n• Pest and disease control\n• Soil management and testing\n• Fertilizers and nutrients\n• Weather and irrigation guidance\n• Market insights and pricing\n\nWhat farming question can I help you with today?",
      isUser: false,
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
    // setSessionId(`session_${Date.now()}`);
  }, []);

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: ({
      message,
    }: // sessionId,
    {
      message: string;
      // sessionId: string;
    }) => sendMessageToFlask(message /*,sessionId*/),
    onSuccess: (response, { message: userMessage }) => {
      // Remove loading message and add actual response
      setMessages((prev) => {
        const withoutLoading = prev.filter((msg) => !msg.isLoading);
        return [
          ...withoutLoading,
          {
            id: `bot_${Date.now()}`,
            text:
              response.answer ||
              response.response ||
              "I apologize, but I had trouble understanding that. Could you please rephrase your question?",
            isUser: false,
            timestamp: new Date(),
          },
        ];
      });
    },
    onError: (error) => {
      console.error("Error sending message:", error);
      // Remove loading message and add error message
      setMessages((prev) => {
        const withoutLoading = prev.filter((msg) => !msg.isLoading);
        return [
          ...withoutLoading,
          {
            id: `error_${Date.now()}`,
            text: "Sorry, I'm experiencing some technical difficulties. Please try again in a moment.",
            isUser: false,
            timestamp: new Date(),
          },
        ];
      });
    },
  });

  // Handle send message
  const handleSendMessage = useCallback(() => {
    if (inputText.trim().length === 0) return;

    const userMessage: Message = {
      id: `user_${Date.now()}`,
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    const loadingMessage: Message = {
      id: `loading_${Date.now()}`,
      text: "",
      isUser: false,
      timestamp: new Date(),
      isLoading: true,
    };

    // Add user message and loading message
    setMessages((prev) => [...prev, userMessage, loadingMessage]);

    // Send to Flask API
    sendMessageMutation.mutate({
      message: inputText.trim(),
      // sessionId,
    });

    // Clear input
    setInputText("");

    // Scroll to bottom
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [inputText, /*sessionId,*/ sendMessageMutation]);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Header */}
        <View className="bg-green-500 px-4 py-4 border-b border-green-600">
          <View className="flex-row items-center justify-center">
            <View className="w-3 h-3 bg-green-300 rounded-full mr-2" />
            <Text className="text-white text-lg font-bold">
              🤖 AI Farming Assistant
            </Text>
          </View>
          <Text className="text-green-100 text-center text-sm mt-1">
            Your personal agricultural advisor
          </Text>
        </View>

        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          className="flex-1 px-4 py-4"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </ScrollView>

        {/* Input Area */}
        <View className="border-t border-gray-200 bg-white px-4 py-3">
          <View className="flex-row items-center gap-2 space-x-3">
            <View className="flex-1 bg-gray-100 rounded-2xl px-4 py-3">
              <TextInput
                value={inputText}
                onChangeText={setInputText}
                placeholder="Ask me anything about farming..."
                placeholderTextColor="#9CA3AF"
                multiline
                maxLength={500}
                className="text-gray-800 text-base max-h-24"
                onSubmitEditing={handleSendMessage}
                submitBehavior="blurAndSubmit"
              />
            </View>

            <View>
              <TouchableOpacity
                onPress={handleSendMessage}
                disabled={
                  inputText.trim().length === 0 || sendMessageMutation.isPending
                }
                className={`w-12 h-12 rounded-full items-center justify-center ${
                  inputText.trim().length > 0 && !sendMessageMutation.isPending
                    ? "bg-green-500"
                    : "bg-gray-300"
                }`}
              >
                {sendMessageMutation.isPending ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Ionicons name="send" size={20} color="white" />
                )}
              </TouchableOpacity>
              {/* Character count */}
              <Text className="text-xs text-gray-400 text-center">
                {inputText.length}/500
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
