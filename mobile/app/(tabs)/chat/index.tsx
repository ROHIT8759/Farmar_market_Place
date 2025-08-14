import { Image } from "expo-image";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-5xl text-dark-200 font-bold">Welcome!</Text>

      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1754993577931-f752477094b1?q=80&w=689&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        }}
        style={{ width: 100, height: 100 }}
      />
    </View>
  );
}
