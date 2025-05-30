
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const AUTH_KEY = 'empathia_auth_token';
const USER_DETAILS_KEY = `${AUTH_KEY}_user`;
// const PENDING_PASSWORD_KEY = `${AUTH_KEY}_pending_password`; // No longer needed

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

  const saveUser = useCallback((currentUser: User) => {
    localStorage.setItem(USER_DETAILS_KEY, JSON.stringify(currentUser));
    setUser(currentUser);
  }, [setUser]); // setUser from useState is stable

  const login = useCallback((email?: string, password?: string, redirectTo: string = '/app/chat') => {
    const loginEmail = email || 'usuario@empathia.app';
    let userToSave: User;

    const storedUserJSON = localStorage.getItem(USER_DETAILS_KEY);
    if (storedUserJSON) {
      try {
        const storedUserObject: User = JSON.parse(storedUserJSON);
        // Case-insensitive email comparison
        if (storedUserObject.email && loginEmail.toLowerCase() === storedUserObject.email.toLowerCase()) {
          userToSave = {
            ...storedUserObject,
            password: password || storedUserObject.password || 'mockPassword123',
          };
        } else {
          userToSave = {
            name: loginEmail.split('@')[0] || 'Usuario Empathia',
            email: loginEmail, // Store the loginEmail as is (preserving original case for display if needed elsewhere)
            password: password || 'mockPassword123',
          };
        }
      } catch (e) {
        console.error("Error parsing stored user during login:", e);
        userToSave = {
          name: loginEmail.split('@')[0] || 'Usuario Empathia',
          email: loginEmail,
          password: password || 'mockPassword123',
        };
      }
    } else {
      userToSave = {
        name: loginEmail.split('@')[0] || 'Usuario Empathia',
        email: loginEmail,
        password: password || 'mockPassword123',
      };
    }

    localStorage.setItem(AUTH_KEY, 'mock_token');
    saveUser(userToSave);
    setIsAuthenticated(true);
    router.push(redirectTo);
  }, [router, saveUser, setIsAuthenticated]);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    // User details (USER_DETAILS_KEY) are intentionally not cleared to persist name
    setIsAuthenticated(false);
    setUser(null);
    router.push('/login');
  }, [router, setIsAuthenticated, setUser]); // Added setIsAuthenticated and setUser for completeness

  const register = useCallback((name?: string, email?: string, password?: string, redirectTo: string = '/app/chat') => {
    const userToRegister: User = {
      name: name || (email ? email.split('@')[0] : 'Nuevo Usuario') || 'Nuevo Usuario',
      email: email || 'nuevo@empathia.app',
      password: password || 'mockPassword123',
    };
    // If there are existing user details, this new registration will overwrite them.
    // This is acceptable for a mock system. In a real system, emails would be unique.
    localStorage.setItem(AUTH_KEY, 'mock_token_registered');
    saveUser(userToRegister);
    setIsAuthenticated(true);
    router.push(redirectTo);
  }, [router, saveUser, setIsAuthenticated]);

  const updateName = useCallback((newName: string) => {
    if (user) {
      const updatedUser = { ...user, name: newName };
      saveUser(updatedUser);
    }
  }, [user, saveUser]);

  return { isAuthenticated, isLoading, user, login, logout, register, updateName };
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
