import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useState, useEffect } from 'react';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { getGolfCartById } from '@/services/supabase';
import { GolfCart } from '@/types/golfCart';

export default function CartDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [cart, setCart] = useState<GolfCart | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const colorScheme = useColorScheme();

  useEffect(() => {
    async function loadCart() {
      if (id) {
        try {
          const cartData = await getGolfCartById(id);
          setCart(cartData);
        } catch (error) {
          console.error('Error loading cart:', error);
        } finally {
          setLoading(false);
        }
      }
    }
    
    loadCart();
  }, [id]);

  if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ThemedText>Loading...</ThemedText>
      </ThemedView>
    );
  }

  if (!cart) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ThemedText>Golf cart not found</ThemedText>
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]} 
          onPress={() => router.back()}
        >
          <ThemedText style={styles.buttonText}>Go Back</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  // Extract features from the features object
  const featuresList = Object.entries(cart.features)
    .filter(([_, enabled]) => enabled)
    .map(([feature]) => feature.replace(/_/g, ' '));

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <ThemedText style={styles.backButtonText}>← Back</ThemedText>
      </TouchableOpacity>
      
      <Image source={{ uri: 'https://placehold.co/600x400' }} style={styles.image} resizeMode="cover" />
      
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <ThemedText type="title" style={styles.name}>{cart.model_name}</ThemedText>
          <ThemedText style={styles.manufacturer}>{cart.manufacturer} ({cart.year})</ThemedText>
          <ThemedText style={styles.price}>${Number(cart.price).toLocaleString()}</ThemedText>
        </View>
        
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Description</ThemedText>
          <ThemedText style={styles.description}>{cart.description}</ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Specifications</ThemedText>
          <View style={styles.specificationsGrid}>
            <View style={styles.specItem}>
              <ThemedText style={styles.specLabel}>Color</ThemedText>
              <ThemedText style={styles.specValue}>{cart.color}</ThemedText>
            </View>
            <View style={styles.specItem}>
              <ThemedText style={styles.specLabel}>Seats</ThemedText>
              <ThemedText style={styles.specValue}>{cart.seats}</ThemedText>
            </View>
            <View style={styles.specItem}>
              <ThemedText style={styles.specLabel}>Battery</ThemedText>
              <ThemedText style={styles.specValue}>{cart.battery_capacity}</ThemedText>
            </View>
            <View style={styles.specItem}>
              <ThemedText style={styles.specLabel}>Max Speed</ThemedText>
              <ThemedText style={styles.specValue}>{cart.max_speed} mph</ThemedText>
            </View>
            <View style={styles.specItem}>
              <ThemedText style={styles.specLabel}>Range</ThemedText>
              <ThemedText style={styles.specValue}>{cart.range_per_charge} mi</ThemedText>
            </View>
          </View>
        </ThemedView>
        
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Features</ThemedText>
          {featuresList.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <ThemedText style={styles.bulletPoint}>•</ThemedText>
              <ThemedText style={styles.feature}>{feature}</ThemedText>
            </View>
          ))}
        </ThemedView>
        
        <ThemedView style={styles.availabilitySection}>
          <ThemedText type="subtitle">Availability</ThemedText>
          <ThemedText style={cart.stock_quantity > 0 ? styles.inStock : styles.outOfStock}>
            {cart.stock_quantity > 0 ? `In Stock (${cart.stock_quantity} available)` : 'Out of Stock'}
          </ThemedText>
        </ThemedView>
        
        <TouchableOpacity 
          style={[
            styles.button, 
            { backgroundColor: Colors[colorScheme ?? 'light'].tint },
            cart.stock_quantity === 0 && styles.disabledButton
          ]} 
          disabled={cart.stock_quantity === 0}
        >
          <ThemedText style={styles.buttonText}>
            {cart.stock_quantity > 0 ? 'Reserve Now' : 'Notify When Available'}
          </ThemedText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    padding: 16,
    position: 'absolute',
    zIndex: 10,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 300,
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    marginBottom: 8,
  },
  manufacturer: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  section: {
    marginBottom: 20,
  },
  description: {
    lineHeight: 22,
    marginTop: 8,
  },
  specificationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  specItem: {
    width: '50%',
    marginBottom: 12,
  },
  specLabel: {
    fontSize: 14,
    color: '#666',
  },
  specValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  featureItem: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'flex-start',
  },
  bulletPoint: {
    marginRight: 8,
    fontSize: 16,
  },
  feature: {
    flex: 1,
    textTransform: 'capitalize',
  },
  availabilitySection: {
    marginBottom: 20,
  },
  inStock: {
    color: 'green',
    marginTop: 8,
  },
  outOfStock: {
    color: 'red',
    marginTop: 8,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    opacity: 0.7,
  },
}); 