import { useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useEffect } from 'react';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function CartIndexScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  // Redirect back to home
  useEffect(() => {
    // A small delay to prevent immediate navigation
    const timer = setTimeout(() => {
      router.replace('/(tabs)');
    }, 100);
    
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <ThemedView style={styles.container}>
      <ThemedText>Redirecting to home page...</ThemedText>
      <TouchableOpacity 
        style={[styles.button, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]} 
        onPress={() => router.replace('/(tabs)')}
      >
        <ThemedText style={styles.buttonText}>Go Home</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    minWidth: 120,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 