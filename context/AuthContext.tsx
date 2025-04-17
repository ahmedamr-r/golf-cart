import AsyncStorage from '@react-native-async-storage/async-storage';
import { Session } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useState } from 'react';

import supabaseClient from '../lib/supabase';

// Define User type
type User = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
};

// Define the Auth Context type
type AuthContextType = {
  user: User | null;
  session: Session | null;
  initialized: boolean;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  signup: (email: string, password: string, firstName: string, lastName: string) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<{ error: string | null }>;
};

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  initialized: false,
  login: async () => ({ error: null }),
  signup: async () => ({ error: null }),
  logout: async () => {},
  forgotPassword: async () => ({ error: null }),
});

// Custom hook for using the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Auth provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [initialized, setInitialized] = useState(false);

  // Check for auth session on mount and listen for state changes
  useEffect(() => {
    const { data: { subscription } } = supabaseClient.auth.onAuthStateChange(async (event, currentSession) => {
      setSession(currentSession);
      
      if (currentSession?.user) {
        // Fetch user profile from the database
        const { data, error } = await supabaseClient
          .from('users')
          .select('id, email, first_name, last_name')
          .eq('id', currentSession.user.id)
          .single();
        
        if (data && !error) {
          setUser({
            id: data.id,
            email: data.email,
            firstName: data.first_name,
            lastName: data.last_name,
          });
        } else {
          // If there's no profile yet but the user is authenticated,
          // just use the auth data
          setUser({
            id: currentSession.user.id,
            email: currentSession.user.email || '',
          });
        }
      } else {
        setUser(null);
      }
      
      setInitialized(true);
    });

    // Initial session check
    const loadSession = async () => {
      const { data: { session: initialSession } } = await supabaseClient.auth.getSession();
      setSession(initialSession);
      
      if (initialSession?.user) {
        // Fetch user profile from the database
        const { data, error } = await supabaseClient
          .from('users')
          .select('id, email, first_name, last_name')
          .eq('id', initialSession.user.id)
          .single();
        
        if (data && !error) {
          setUser({
            id: data.id,
            email: data.email,
            firstName: data.first_name,
            lastName: data.last_name,
          });
        } else {
          // If there's no profile yet but the user is authenticated,
          // just use the auth data
          setUser({
            id: initialSession.user.id,
            email: initialSession.user.email || '',
          });
        }
      }
      
      setInitialized(true);
    };

    loadSession();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Auth functions
  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { error: error.message };
      }

      return { error: null };
    } catch (err) {
      return { error: 'Failed to login. Please try again.' };
    }
  };

  const signup = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      // 1. Create auth user
      const { data: authData, error: authError } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      });

      if (authError) {
        return { error: authError.message };
      }

      if (authData.user) {
        // 2. Create user profile in the users table
        const { error: profileError } = await supabaseClient
          .from('users')
          .insert({
            id: authData.user.id,
            email,
            first_name: firstName,
            last_name: lastName,
          });

        if (profileError) {
          // If profile creation fails, we should ideally clean up the auth user
          // but that's complex. For now, just return the error.
          return { error: 'Failed to create user profile.' };
        }
      }

      return { error: null };
    } catch (err) {
      return { error: 'Failed to create account. Please try again.' };
    }
  };

  const logout = async () => {
    await supabaseClient.auth.signOut();
  };

  const forgotPassword = async (email: string) => {
    try {
      const { error } = await supabaseClient.auth.resetPasswordForEmail(email);
      if (error) {
        return { error: error.message };
      }
      return { error: null };
    } catch (err) {
      return { error: 'Failed to send password reset email.' };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        initialized,
        login,
        signup,
        logout,
        forgotPassword,
      }}>
      {children}
    </AuthContext.Provider>
  );
} 