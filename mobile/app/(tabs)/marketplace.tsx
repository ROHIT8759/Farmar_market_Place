import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, FlatList, Image, TouchableOpacity, StatusBar } from "react-native";
import { products, Product } from "../data/products";

const Marketplace = () => {
  const renderItem = ({ item }: { item: Product }) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 10,
        marginBottom: 16,
        padding: 12,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
      }}
    >
      <Image
        source={item.image}
        style={{ width: 64, height: 64, borderRadius: 8, marginRight: 16 }}
        resizeMode="cover"
      />
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.name}</Text>
        <Text style={{ fontSize: 14, color: "#666", marginVertical: 2 }}>
          {item.description}
        </Text>
        <Text style={{ fontSize: 16, color: "#4CAF50", marginVertical: 4 }}>
          ${item.price.toFixed(2)}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#4CAF50",
            paddingVertical: 6,
            paddingHorizontal: 16,
            borderRadius: 6,
            alignSelf: "flex-start",
          }}
          onPress={() => { }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Buy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f6f6f6" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#f6f6f6" />
      <View style={{ flex: 1, padding: 16 }}>
        <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 20 }}>
          Farming Marketplace
        </Text>
        <FlatList
          data={products}
          keyExtractor={(item: Product) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default Marketplace;