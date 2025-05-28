
"use client";

import React from 'react';
import { useState, useEffect, useCallback }
from 'react';
import { useRouter } from 'next/navigation';

const AUTH_KEY = 'empathia_auth_token';

interface User {
  name: string;
  email: string;
  password?: string; // Added mock password field
}

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (email?: string, password?: string, redirectTo?: string) => void;
  logout: () => void;
  register: (name?: string, email?: string, password?: string, redirectTo?: string) => void;
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
        setUser({ name: 'Empathia User', email: 'user@empathia.app', password: 'mockPassword123' });
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback((email?: string, password?: string, redirectTo: string = '/app/chat') => {
    const mockUser: User = {
      name: 'Usuario Empathia', // This could be fetched or set based on actual logic
      email: email || 'usuario@empathia.app',
      password: password || 'mockPassword123', // Simulate password
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

  const register = useCallback((name?: string, email?: string, password?: string, redirectTo: string = '/app/chat') => {
    const mockUser: User = {
      name: name || 'Nuevo Usuario',
      email: email || 'nuevo@empathia.app',
      password: password || 'mockPassword123', // Simulate password
    };
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
