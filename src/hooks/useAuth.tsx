
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
  // Removed password reset flow methods
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
    const loginEmail = email || 'usuario@empathia.app';
    let userToSave: User;

    const storedUserJSON = localStorage.getItem(USER_DETAILS_KEY);
    if (storedUserJSON) {
      try {
        const storedUser: User = JSON.parse(storedUserJSON);
        if (storedUser.email === loginEmail) {
          // User with this email was previously logged in and had details saved.
          // Preserve their name and other details.
          userToSave = {
            ...storedUser, // This includes their custom name
            password: password || storedUser.password || 'mockPassword123', // Update pw if provided, else keep old or default
          };
        } else {
          // Stored user is for a different email, so create new for this loginEmail
          userToSave = {
            name: loginEmail.split('@')[0] || 'Usuario Empathia',
            email: loginEmail,
            password: password || 'mockPassword123',
          };
        }
      } catch (e) {
        // Error parsing, fallback to creating a new user
        console.error("Error parsing stored user during login:", e);
        userToSave = {
          name: loginEmail.split('@')[0] || 'Usuario Empathia',
          email: loginEmail,
          password: password || 'mockPassword123',
        };
      }
    } else {
      // No user details stored at all, create new
      userToSave = {
        name: loginEmail.split('@')[0] || 'Usuario Empathia',
        email: loginEmail,
        password: password || 'mockPassword123',
      };
    }

    localStorage.setItem(AUTH_KEY, 'mock_token'); // Set the session token
    saveUser(userToSave); // saveUser updates localStorage USER_DETAILS_KEY and user state
    setIsAuthenticated(true);
    router.push(redirectTo);
  }, [router]);


  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY); // Clear session token
    // DO NOT clear USER_DETAILS_KEY, so user's name and other details persist
    setIsAuthenticated(false);
    setUser(null); // Clear user from state
    router.push('/login');
  }, [router]);

  const register = useCallback((name?: string, email?: string, password?: string, redirectTo: string = '/app/chat') => {
    const userToRegister: User = {
      name: name || 'Nuevo Usuario',
      email: email || 'nuevo@empathia.app',
      password: password || 'mockPassword123',
    };
    localStorage.setItem(AUTH_KEY, 'mock_token_registered'); 
    saveUser(userToRegister);
    setIsAuthenticated(true); 
    router.push(redirectTo);
  }, [router]);

  const updateName = useCallback((newName: string) => {
    if (user) {
      const updatedUser = { ...user, name: newName };
      saveUser(updatedUser);
    }
  }, [user]);


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
