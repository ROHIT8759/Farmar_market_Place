import React from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

const Wishlist = () => {
    const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();
    const { dispatch: cartDispatch } = useCart();

    const addToCart = (product: Product) => {
        cartDispatch({ type: 'ADD_ITEM', product, quantity: 1 });
    };

    const removeFromWishlist = (productId: string) => {
        wishlistDispatch({ type: 'REMOVE_ITEM', productId });
    };

    const renderStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        for (let i = 0; i < fullStars; i++) {
            stars.push(<Ionicons key={i} name="star" size={12} color="#fbbf24" />);
        }
        return <View className="flex-row">{stars}</View>;
    };

    const renderWishlistItem = ({ item }: { item: Product }) => (
        <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
            <View className="flex-row items-center">
                <TouchableOpacity
                    onPress={() => router.push(`/(tabs)/product-details?id=${item.id}`)}
                >
                    <Image
                        source={item.image}
                        className="w-20 h-20 rounded-lg mr-4"
                        resizeMode="cover"
                    />
                </TouchableOpacity>

                <View className="flex-1">
                    <View className="flex-row justify-between items-start mb-2">
                        <Text className="text-lg font-semibold flex-1 mr-2">{item.name}</Text>
                        <TouchableOpacity
                            onPress={() => removeFromWishlist(item.id)}
                            className="p-1"
                        >
                            <Ionicons name="heart" size={24} color="#ef4444" />
                        </TouchableOpacity>
                    </View>

                    <Text className="text-gray-600 text-sm mb-2" numberOfLines={2}>
                        {item.description}
                    </Text>

                    <View className="flex-row items-center mb-2">
                        {renderStars(item.rating)}
                        <Text className="text-gray-500 text-xs ml-2">
                            {item.rating} ({item.reviewCount})
                        </Text>
                    </View>

                    <Text className="text-gray-600 text-sm mb-3">
                        by {item.farmerName}
                    </Text>

                    <View className="flex-row items-center justify-between">
                        <Text className="text-xl font-bold text-green-600">
                            ${item.price.toFixed(2)} / {item.unit}
                        </Text>
                        <TouchableOpacity
                            onPress={() => addToCart(item)}
                            className="bg-green-500 px-4 py-2 rounded-lg flex-row items-center"
                        >
                            <Ionicons name="cart" size={16} color="white" />
                            <Text className="text-white font-semibold ml-1">Add to Cart</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );

    if (wishlistState.items.length === 0) {
        return (
            <SafeAreaView className="flex-1 bg-gray-50">
                <View className="px-4 py-3 bg-white border-b border-gray-200">
                    <Text className="text-2xl font-bold">Wishlist</Text>
                </View>

                <View className="flex-1 justify-center items-center px-6">
                    <Ionicons name="heart-outline" size={64} color="#9ca3af" />
                    <Text className="text-xl font-semibold text-gray-600 mt-4">
                        Your wishlist is empty
                    </Text>
                    <Text className="text-gray-500 text-center mt-2">
                        Save products you love to view them later
                    </Text>
                    <TouchableOpacity
                        onPress={() => router.push('/(tabs)/marketplace')}
                        className="bg-green-500 px-6 py-3 rounded-lg mt-6"
                    >
                        <Text className="text-white font-semibold">Browse Products</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <View className="px-4 py-3 bg-white border-b border-gray-200">
                <Text className="text-2xl font-bold">Wishlist</Text>
                <Text className="text-gray-600">{wishlistState.items.length} items</Text>
            </View>

            <FlatList
                data={wishlistState.items}
                keyExtractor={(item) => item.id}
                renderItem={renderWishlistItem}
                contentContainerStyle={{ padding: 16 }}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

export default Wishlist;
