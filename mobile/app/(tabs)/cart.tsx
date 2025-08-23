import React from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    SafeAreaView,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types';

const Cart = () => {
    const { state, dispatch } = useCart();

    const updateQuantity = (productId: string, newQuantity: number) => {
        dispatch({ type: 'UPDATE_QUANTITY', productId, quantity: newQuantity });
    };

    const removeItem = (productId: string) => {
        Alert.alert(
            'Remove Item',
            'Are you sure you want to remove this item from your cart?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Remove',
                    style: 'destructive',
                    onPress: () => dispatch({ type: 'REMOVE_ITEM', productId }),
                },
            ]
        );
    };

    const handleCheckout = () => {
        if (state.items.length === 0) {
            Alert.alert('Empty Cart', 'Your cart is empty. Add some items first!');
            return;
        }

        Alert.alert(
            'Checkout',
            `Total: $${state.total.toFixed(2)}\n\nProceed to payment?`,
            [
                { text: 'Continue Shopping', style: 'cancel' },
                {
                    text: 'Proceed',
                    onPress: () => {
                        // Here you would navigate to payment screen
                        Alert.alert('Success', 'Order placed successfully!');
                        dispatch({ type: 'CLEAR_CART' });
                    },
                },
            ]
        );
    };

    const renderCartItem = ({ item }: { item: CartItem }) => (
        <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
            <View className="flex-row items-center">
                <Image
                    source={item.product.image}
                    className="w-16 h-16 rounded-lg mr-4"
                    resizeMode="cover"
                />
                <View className="flex-1">
                    <Text className="text-lg font-semibold">{item.product.name}</Text>
                    <Text className="text-gray-600 text-sm">{item.product.farmerName}</Text>
                    <Text className="text-green-600 font-semibold">
                        ${item.product.price.toFixed(2)} / {item.product.unit}
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => removeItem(item.product.id)}
                    className="p-2"
                >
                    <Ionicons name="trash-outline" size={20} color="#ef4444" />
                </TouchableOpacity>
            </View>

            <View className="flex-row items-center justify-between mt-3">
                <View className="flex-row items-center">
                    <TouchableOpacity
                        onPress={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="bg-gray-200 w-8 h-8 rounded-full items-center justify-center"
                    >
                        <Ionicons name="remove" size={16} color="#374151" />
                    </TouchableOpacity>

                    <Text className="mx-4 text-lg font-semibold">{item.quantity}</Text>

                    <TouchableOpacity
                        onPress={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="bg-green-500 w-8 h-8 rounded-full items-center justify-center"
                    >
                        <Ionicons name="add" size={16} color="white" />
                    </TouchableOpacity>
                </View>

                <Text className="text-lg font-bold">
                    ${(item.product.price * item.quantity).toFixed(2)}
                </Text>
            </View>
        </View>
    );

    if (state.items.length === 0) {
        return (
            <SafeAreaView className="flex-1 bg-gray-50">
                <View className="flex-1 justify-center items-center px-6">
                    <Ionicons name="cart-outline" size={64} color="#9ca3af" />
                    <Text className="text-xl font-semibold text-gray-600 mt-4">
                        Your cart is empty
                    </Text>
                    <Text className="text-gray-500 text-center mt-2">
                        Add some fresh products from our marketplace
                    </Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <View className="flex-1">
                <View className="px-4 py-3 bg-white border-b border-gray-200">
                    <Text className="text-2xl font-bold">Shopping Cart</Text>
                    <Text className="text-gray-600">{state.itemCount} items</Text>
                </View>

                <FlatList
                    data={state.items}
                    keyExtractor={(item) => item.product.id}
                    renderItem={renderCartItem}
                    contentContainerStyle={{ padding: 16 }}
                    showsVerticalScrollIndicator={false}
                />

                <View className="bg-white border-t border-gray-200 p-4">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-lg font-semibold">Total:</Text>
                        <Text className="text-2xl font-bold text-green-600">
                            ${state.total.toFixed(2)}
                        </Text>
                    </View>

                    <TouchableOpacity
                        onPress={handleCheckout}
                        className="bg-green-500 py-4 rounded-lg items-center"
                    >
                        <Text className="text-white text-lg font-semibold">
                            Proceed to Checkout
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Cart;
