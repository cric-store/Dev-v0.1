import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription?.unsubscribe();
  }, []);

  const signUp = async (email, password, fullName) => {
    try {
      // Use backend API to create user with auto-confirmed email
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${backendUrl}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, full_name: fullName })
      });
      
      const data = await response.json();
      
      if (data.success) {
        return { data: data.user, error: null };
      } else {
        return { data: null, error: { message: data.message } };
      }
    } catch (err) {
      console.error('SignUp catch error:', err);
      return { data: null, error: { message: 'Connection error. Please try again.' } };
    }
  };

  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        // Handle specific Supabase error codes
        let message = error.message;
        if (error.message?.includes('Invalid login credentials')) {
          message = 'Invalid email or password. Please try again.';
        } else if (error.message?.includes('Email not confirmed')) {
          message = 'Please verify your email before signing in. Check your inbox.';
        }
        return { data: null, error: { message } };
      }
      
      return { data, error: null };
    } catch (err) {
      console.error('SignIn catch error:', err);
      // Handle the "body stream already read" error
      if (err.message?.includes('body stream') || err.message?.includes('Body')) {
        return { data: null, error: { message: 'Invalid email or password. Please try again.' } };
      }
      return { data: null, error: { message: 'Connection error. Please try again.' } };
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
      setSession(null);
    }
    return { error };
  };

  const resetPassword = async (email) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    return { data, error };
  };

  const updatePassword = async (newPassword) => {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword
    });
    return { data, error };
  };

  const updateProfile = async (updates) => {
    const { data, error } = await supabase.auth.updateUser({
      data: updates
    });
    if (!error && data.user) {
      setUser(data.user);
    }
    return { data, error };
  };

  const deleteAccount = async () => {
    // Note: This requires a backend endpoint to fully delete the user
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updatePassword,
    updateProfile,
    deleteAccount,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
