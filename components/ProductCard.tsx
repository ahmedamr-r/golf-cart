import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from './ThemedText';
import { GolfCart } from '@/types/golfCart';

interface ProductCardProps {
  cart: GolfCart;
}

export function ProductCard({ cart }: ProductCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/cart/${cart.id}`);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image
        source={{ uri: cart.image_url || 'https://placehold.co/300x200' }}
        style={styles.image}
      />
      <View style={styles.content}>
        <ThemedText style={styles.modelName}>{cart.model_name}</ThemedText>
        <ThemedText style={styles.price}>
          ${Number(cart.price).toLocaleString()}
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
    alignItems: 'center',
  },
  modelName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
  },
}); 