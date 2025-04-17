import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

import '../global.css';
import { ThemeProvider } from '../components/ThemeProvider';
import { AuthProvider, useAuth } from '../context/AuthContext';

// This function checks if the user is authenticated
function RootLayoutNav() {
  const { user, initialized } = useAuth();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {!user ? (
        // Auth screens
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      ) : (
        // App screens
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      )}
      <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider>
      <AuthProvider>
        <RootLayoutNav />
      </AuthProvider>
    </ThemeProvider>
  );
}
