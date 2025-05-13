import { createContext, ReactNode, useContext, useEffect } from "react";
import { useLocation } from "wouter";
import {
  useQuery,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import { insertUserSchema, User as SelectUser, InsertUser } from "@shared/schema";
import { getQueryFn, apiRequest, queryClient } from "../lib/queryClient";
import { useToast } from "@/hooks/use-toast";

type AuthContextType = {
  user: SelectUser | null;
  isLoading: boolean;
  error: Error | null;
  loginMutation: UseMutationResult<SelectUser, Error, LoginData>;
  logoutMutation: UseMutationResult<void, Error, void>;
  registerMutation: UseMutationResult<SelectUser, Error, InsertUser>;
};

type LoginData = Pick<InsertUser, "username" | "password">;

export const AuthContext = createContext<AuthContextType | null>(null);
export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [location, navigate] = useLocation();
  const {
    data: user,
    error,
    isLoading,
    refetch,
  } = useQuery<SelectUser | null, Error>({
    queryKey: ["/api/user"],
    queryFn: async () => {
      try {
        const res = await fetch('/api/user', {
          credentials: 'include'
        });
        
        if (res.status === 401) {
          return null;
        }
        
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || res.statusText);
        }
        
        return await res.json();
      } catch (error) {
        console.error('User fetch error:', error);
        return null;
      }
    },
  });

  // Redirect if on protected page but not logged in
  useEffect(() => {
    if (!isLoading && !user && location === "/profile") {
      navigate("/auth");
    }
  }, [user, isLoading, location, navigate]);

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginData) => {
      try {
        // Create FormData to match OAuth2 password flow
        const formData = new FormData();
        formData.append('username', credentials.username);
        formData.append('password', credentials.password);
        
        const res = await fetch('/api/login', {
          method: 'POST',
          body: formData,
          credentials: 'include'
        });
        
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || res.statusText);
        }
        
        const tokenData = await res.json();
        return tokenData;
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    },
    onSuccess: async () => {
      // Refetch user data directly
      await refetch();
      
      toast({
        title: "Login successful",
        description: "You have been logged in successfully.",
      });
      
      // Navigate to profile page
      navigate("/profile");
    },
    onError: (error: Error) => {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (credentials: InsertUser) => {
      try {
        // For registration, convert to email format
        const payload = {
          email: credentials.username, // Use username as email
          name: credentials.name,
          lastname: credentials.lastname,
          password: credentials.password
        };
        
        const res = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload),
          credentials: 'include'
        });
        
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || res.statusText);
        }
        
        return await res.json();
      } catch (error) {
        console.error('Registration error:', error);
        throw error;
      }
    },
    onSuccess: async (userData) => {
      // Refetch user data directly after registration
      await refetch();
      
      toast({
        title: "Registration successful",
        description: "Your account has been created successfully.",
      });
      
      // Navigate to profile page
      navigate("/profile");
    },
    onError: (error: Error) => {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include'
      });
      
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || res.statusText);
      }
    },
    onSuccess: () => {
      // Explicitly set user to null for immediate UI update
      queryClient.setQueryData(["/api/user"], null);
      
      toast({
        title: "Logout successful",
        description: "You have been logged out successfully.",
      });
      
      // Navigate to auth page
      navigate("/auth");
    },
    onError: (error: Error) => {
      toast({
        title: "Logout failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        isLoading,
        error,
        loginMutation,
        logoutMutation,
        registerMutation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
