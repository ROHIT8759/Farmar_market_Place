import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const marketplace = () => {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 px-4 pt-4">
        <Text>Marketplace index</Text>
      </View>
    </SafeAreaView>
  );
};

export default marketplace;
