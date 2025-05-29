
"use client";

import React from 'react';
import { useState, useEffect, useCallback }
from 'react';
import { useRouter } from 'next/navigation';

const AUTH_KEY = 'empathia_auth_token';
const USER_DETAILS_KEY = `${AUTH_KEY}_user`;
const PENDING_PASSWORD_KEY = `${AUTH_KEY}_pending_password`; // Key for storing pending password

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
  setPendingPassword: (newPassword: string) => void;
  confirmPasswordUpdate: (verificationCode: string) => boolean;
}

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
      name: email?.split('@')[0] || 'Usuario Empathia', // Use part of email for name
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
    localStorage.removeItem(PENDING_PASSWORD_KEY); // Clear pending password on logout
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
    localStorage.setItem(AUTH_KEY, 'mock_token_registered'); // Simulate a token
    saveUser(mockUser);
    setIsAuthenticated(true); // Assume registration also logs the user in for this mock
    router.push(redirectTo);
  }, [router]);

  const updateName = useCallback((newName: string) => {
    if (user) {
      const updatedUser = { ...user, name: newName };
      saveUser(updatedUser);
    }
  }, [user]);

  const setPendingPassword = useCallback((newPassword: string) => {
    localStorage.setItem(PENDING_PASSWORD_KEY, newPassword);
    console.log("Pending password set in localStorage (mock):", newPassword);
  }, []);

  const confirmPasswordUpdate = useCallback((verificationCode: string): boolean => {
    const storedPendingPassword = localStorage.getItem(PENDING_PASSWORD_KEY);
    
    // Mock verification: any 6-digit code is fine for now,
    // as long as a pending password was set and user exists.
    if (verificationCode && verificationCode.length === 6 && storedPendingPassword && user) {
      const updatedUser = { ...user, password: storedPendingPassword };
      saveUser(updatedUser);
      localStorage.removeItem(PENDING_PASSWORD_KEY); // Clear pending password from localStorage
      console.log("Password updated (mock). Verification code:", verificationCode);
      return true;
    }
    
    let debugMessage = "Password update failed (mock).";
    if (!storedPendingPassword) debugMessage += " No pending password found in storage.";
    if (!user) debugMessage += " No user session.";
    if (!(verificationCode && verificationCode.length === 6)) debugMessage += " Verification code must be 6 digits.";
    console.log(debugMessage);
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
        <p>Cargando...</p> {/* This text can be translated if needed */}
      </div>
    );
  }

  return <>{children}</>;
}
