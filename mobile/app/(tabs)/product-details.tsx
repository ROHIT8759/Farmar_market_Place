import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { products } from '../data/products';

const ProductDetails = () => {
    const { id } = useLocalSearchParams();
    const { dispatch } = useCart();
    const { dispatch: wishlistDispatch, isInWishlist } = useWishlist();
    const [quantity, setQuantity] = useState(1);

    const product = products.find(p => p.id === id);
    const isWishlisted = product ? isInWishlist(product.id) : false;

    if (!product) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center">
                <Text>Product not found</Text>
            </SafeAreaView>
        );
    }

    const addToCart = () => {
        dispatch({ type: 'ADD_ITEM', product, quantity });
        Alert.alert(
            'Added to Cart',
            `${quantity} ${product.unit}${quantity > 1 ? 's' : ''} of ${product.name} added to cart`,
            [
                { text: 'Continue Shopping', onPress: () => router.back() },
                { text: 'View Cart', onPress: () => router.push('/(tabs)/cart') },
            ]
        );
    };

    const toggleWishlist = () => {
        if (product) {
            wishlistDispatch({ type: 'TOGGLE_ITEM', product });
        }
    };

    const renderStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <Ionicons key={i} name="star" size={16} color="#fbbf24" />
            );
        }

        if (hasHalfStar) {
            stars.push(
                <Ionicons key="half" name="star-half" size={16} color="#fbbf24" />
            );
        }

        const remainingStars = 5 - Math.ceil(rating);
        for (let i = 0; i < remainingStars; i++) {
            stars.push(
                <Ionicons key={`empty-${i}`} name="star-outline" size={16} color="#d1d5db" />
            );
        }

        return stars;
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200">
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#374151" />
                </TouchableOpacity>
                <Text className="text-lg font-semibold">Product Details</Text>
                <TouchableOpacity onPress={toggleWishlist}>
                    <Ionicons
                        name={isWishlisted ? "heart" : "heart-outline"}
                        size={24}
                        color={isWishlisted ? "#ef4444" : "#374151"}
                    />
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1">
                <Image
                    source={product.image}
                    className="w-full aspect-square"
                    resizeMode="cover"
                />

                <View className="p-4">
                    <View className="flex-row justify-between items-start mb-2">
                        <Text className="text-2xl font-bold flex-1 mr-2">{product.name}</Text>
                        {product.isOrganic && (
                            <View className="bg-green-100 px-2 py-1 rounded-full">
                                <Text className="text-green-800 text-xs font-semibold">Organic</Text>
                            </View>
                        )}
                    </View>

                    <Text className="text-3xl font-bold text-green-600 mb-4">
                        ${product.price.toFixed(2)} / {product.unit}
                    </Text>

                    <View className="flex-row items-center mb-4">
                        <View className="flex-row items-center mr-4">
                            {renderStars(product.rating)}
                            <Text className="ml-2 text-gray-600">
                                {product.rating} ({product.reviewCount} reviews)
                            </Text>
                        </View>
                    </View>

                    <View className="border-t border-gray-200 pt-4 mb-4">
                        <Text className="text-lg font-semibold mb-2">Description</Text>
                        <Text className="text-gray-700 leading-6">{product.description}</Text>
                    </View>

                    <View className="border-t border-gray-200 pt-4 mb-4">
                        <Text className="text-lg font-semibold mb-2">Seller Information</Text>
                        <View className="flex-row items-center">
                            <Ionicons name="storefront-outline" size={20} color="#6b7280" />
                            <View className="ml-3">
                                <Text className="font-semibold">{product.farmerName}</Text>
                                <Text className="text-gray-600 text-sm">{product.farmerLocation}</Text>
                            </View>
                        </View>
                    </View>

                    <View className="border-t border-gray-200 pt-4">
                        <Text className="text-lg font-semibold mb-3">Quantity</Text>
                        <View className="flex-row items-center mb-6">
                            <TouchableOpacity
                                onPress={() => setQuantity(Math.max(1, quantity - 1))}
                                className="bg-gray-200 w-10 h-10 rounded-lg items-center justify-center"
                            >
                                <Ionicons name="remove" size={20} color="#374151" />
                            </TouchableOpacity>

                            <Text className="mx-6 text-xl font-semibold">{quantity}</Text>

                            <TouchableOpacity
                                onPress={() => setQuantity(quantity + 1)}
                                className="bg-green-500 w-10 h-10 rounded-lg items-center justify-center"
                            >
                                <Ionicons name="add" size={20} color="white" />
                            </TouchableOpacity>

                            <Text className="ml-4 text-gray-600">
                                {product.unit}{quantity > 1 ? 's' : ''}
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View className="bg-white border-t border-gray-200 p-4">
                <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-lg">Total:</Text>
                    <Text className="text-2xl font-bold text-green-600">
                        ${(product.price * quantity).toFixed(2)}
                    </Text>
                </View>

                <TouchableOpacity
                    onPress={addToCart}
                    className="bg-green-500 py-4 rounded-lg items-center flex-row justify-center"
                >
                    <Ionicons name="cart" size={20} color="white" />
                    <Text className="text-white text-lg font-semibold ml-2">
                        Add to Cart
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default ProductDetails;
