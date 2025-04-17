import { Image, StyleSheet, Platform, TouchableOpacity, View, ScrollView, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/context/AuthContext';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { GolfCartList } from '@/components/GolfCart/GolfCartList';
import { getGolfCarts } from '@/services/supabase';
import { GolfCart } from '@/types/golfCart';
import { ProductCard } from '@/components/ProductCard';

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const colorScheme = useColorScheme();
  const [golfCarts, setGolfCarts] = useState<GolfCart[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Format name for display - use first name if available, otherwise email
  const displayName = user?.firstName || user?.email?.split('@')[0] || 'Guest';
  
  const handleLogout = async () => {
    await logout();
  };

  useEffect(() => {
    loadGolfCarts();
  }, []);

  const loadGolfCarts = async () => {
    try {
      console.log('Loading golf carts...');
      const carts = await getGolfCarts();
      console.log('Golf carts loaded:', carts.length);
      setGolfCarts(carts);
    } catch (error) {
      console.error('Error loading golf carts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Hello, {displayName}!</ThemedText>
        <HelloWave />
      </ThemedView>
      
      <ThemedView style={styles.accountContainer}>
        <ThemedText type="subtitle">Your Account</ThemedText>
        <ThemedText>
          You are logged in as <ThemedText type="defaultSemiBold">{user?.email}</ThemedText>
        </ThemedText>
        <TouchableOpacity 
          onPress={handleLogout} 
          style={[
            styles.logoutButton, 
            { backgroundColor: Colors[colorScheme ?? 'light'].tint }
          ]}
        >
          <ThemedText style={styles.logoutButtonText}>Logout</ThemedText>
        </TouchableOpacity>
      </ThemedView>
      
      <ThemedView style={styles.catalogContainer}>
        <ThemedText type="title">Premium Golf Carts</ThemedText>
        <ThemedText style={styles.subtitle}>Browse our exclusive collection</ThemedText>
        
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {golfCarts.map((cart) => (
            <ProductCard key={cart.id} cart={cart} />
          ))}
        </ScrollView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  accountContainer: {
    gap: 8,
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  catalogContainer: {
    marginTop: 16,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  scrollContent: {
    paddingVertical: 16,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  logoutButton: {
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
