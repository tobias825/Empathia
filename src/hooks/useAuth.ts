"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const AUTH_KEY = 'sereno_ai_auth_token';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (redirectTo?: string) => void;
  logout: () => void;
  register: (redirectTo?: string) => void;
}

export function useAuth(): AuthState {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem(AUTH_KEY);
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, []);

  const login = useCallback((redirectTo: string = '/app/chat') => {
    localStorage.setItem(AUTH_KEY, 'mock_token');
    setIsAuthenticated(true);
    router.push(redirectTo);
  }, [router]);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
    router.push('/login');
  }, [router]);

  const register = useCallback((redirectTo: string = '/app/chat') => {
    // In a real app, this would involve an API call
    localStorage.setItem(AUTH_KEY, 'mock_token_registered');
    setIsAuthenticated(true);
    router.push(redirectTo);
  }, [router]);

  return { isAuthenticated, isLoading, login, logout, register };
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
        <p>Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
}
