
"use client";

import React from 'react';
import { useState, useEffect, useCallback }
from 'react';
import { useRouter } from 'next/navigation';

const AUTH_KEY = 'empathia_auth_token';
const USER_DETAILS_KEY = `${AUTH_KEY}_user`;

interface User {
  name: string;
  email: string;
  password?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (email?: string, password?: string, redirectTo?: string) => void;
  logout: () => void;
  register: (name?: string, email?: string, password?: string, redirectTo?: string) => void;
  updateName: (newName: string) => void;
  setPendingPassword: (newPassword: string) => void; // Stores new password temporarily
  confirmPasswordUpdate: (verificationCode: string) => boolean; // Confirms with code, updates to pending
}

// Store pending password outside React state to persist across navigation if needed for this mock
let pendingPasswordStore: string | null = null;

export function useAuth(): AuthState {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem(AUTH_KEY);
    const storedUser = localStorage.getItem(USER_DETAILS_KEY);
    if (token && storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (e) {
        console.error("Error parsing stored user:", e);
        localStorage.removeItem(USER_DETAILS_KEY);
        localStorage.removeItem(AUTH_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const saveUser = (currentUser: User) => {
    localStorage.setItem(USER_DETAILS_KEY, JSON.stringify(currentUser));
    setUser(currentUser);
  };

  const login = useCallback((email?: string, password?: string, redirectTo: string = '/app/chat') => {
    const mockUser: User = {
      name: 'Usuario Empathia',
      email: email || 'usuario@empathia.app',
      password: password || 'mockPassword123',
    };
    localStorage.setItem(AUTH_KEY, 'mock_token');
    saveUser(mockUser);
    setIsAuthenticated(true);
    router.push(redirectTo);
  }, [router]);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(USER_DETAILS_KEY);
    pendingPasswordStore = null;
    setIsAuthenticated(false);
    setUser(null);
    router.push('/login');
  }, [router]);

  const register = useCallback((name?: string, email?: string, password?: string, redirectTo: string = '/app/chat') => {
    const mockUser: User = {
      name: name || 'Nuevo Usuario',
      email: email || 'nuevo@empathia.app',
      password: password || 'mockPassword123',
    };
    localStorage.setItem(AUTH_KEY, 'mock_token_registered');
    saveUser(mockUser);
    setIsAuthenticated(true);
    router.push(redirectTo);
  }, [router]);

  const updateName = useCallback((newName: string) => {
    if (user) {
      const updatedUser = { ...user, name: newName };
      saveUser(updatedUser);
      // Optionally, re-fetch or re-validate user data from a backend here
    }
  }, [user]);

  const setPendingPassword = useCallback((newPassword: string) => {
    // In a real app, this might initiate a server-side flow and store a token
    pendingPasswordStore = newPassword;
    console.log("Pending password set (mock):", newPassword);
  }, []);

  const confirmPasswordUpdate = useCallback((verificationCode: string): boolean => {
    // Mock verification: any 6-digit code is fine for now
    if (verificationCode && verificationCode.length === 6 && pendingPasswordStore && user) {
      const updatedUser = { ...user, password: pendingPasswordStore };
      saveUser(updatedUser);
      pendingPasswordStore = null; // Clear pending password
      console.log("Password updated (mock). Verification code:", verificationCode);
      return true;
    }
    console.log("Password update failed (mock). Code or pending password issue.");
    return false;
  }, [user]);


  return { isAuthenticated, isLoading, user, login, logout, register, updateName, setPendingPassword, confirmPasswordUpdate };
}

export function ProtectRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Cargando...</p>
      </div>
    );
  }

  return <>{children}</>;
}
