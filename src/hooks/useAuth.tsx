
"use client";

import React from 'react';
import { useState, useEffect, useCallback }
from 'react';
import { useRouter } from 'next/navigation';

const AUTH_KEY = 'empathia_auth_token'; // Updated key name for clarity

interface User {
  name: string;
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (email?: string, redirectTo?: string) => void;
  logout: () => void;
  register: (name?: string, email?: string, redirectTo?: string) => void;
}

export function useAuth(): AuthState {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem(AUTH_KEY);
    const storedUser = localStorage.getItem(`${AUTH_KEY}_user`);
    if (token) {
      setIsAuthenticated(true);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        // Fallback if user data isn't in local storage but token exists
        setUser({ name: 'Empathia User', email: 'user@empathia.app' });
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback((email?: string, redirectTo: string = '/app/chat') => {
    const mockUser: User = {
      name: 'Usuario Empathia',
      email: email || 'usuario@empathia.app', // Use provided email or a default
    };
    localStorage.setItem(AUTH_KEY, 'mock_token');
    localStorage.setItem(`${AUTH_KEY}_user`, JSON.stringify(mockUser));
    setIsAuthenticated(true);
    setUser(mockUser);
    router.push(redirectTo);
  }, [router]);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(`${AUTH_KEY}_user`);
    setIsAuthenticated(false);
    setUser(null);
    router.push('/login');
  }, [router]);

  const register = useCallback((name?: string, email?: string, redirectTo: string = '/app/chat') => {
    const mockUser: User = {
      name: name || 'Nuevo Usuario',
      email: email || 'nuevo@empathia.app',
    };
    // In a real app, this would involve an API call
    localStorage.setItem(AUTH_KEY, 'mock_token_registered');
    localStorage.setItem(`${AUTH_KEY}_user`, JSON.stringify(mockUser));
    setIsAuthenticated(true);
    setUser(mockUser);
    router.push(redirectTo);
  }, [router]);

  return { isAuthenticated, isLoading, user, login, logout, register };
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
