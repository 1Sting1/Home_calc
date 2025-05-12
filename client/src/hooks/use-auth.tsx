import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import {
  useQuery,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import { User, insertUserSchema } from "@shared/schema";
import { getQueryFn, apiRequest, queryClient } from "../lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  loginMutation: UseMutationResult<User, Error, LoginData>;
  logoutMutation: UseMutationResult<void, Error, void>;
  registerMutation: UseMutationResult<User, Error, RegisterData>;
};

type LoginData = {
  email: string;
  password: string;
};

type RegisterData = {
  name: string;
  lastname: string;
  email: string;
  password: string;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [, navigate] = useLocation();
  
  // Создаем локальное состояние для пользователя для более быстрой реакции UI
  const [localUser, setLocalUser] = useState<User | null>(null);
  
  const {
    data: user,
    error,
    isLoading,
    refetch,
  } = useQuery<User | undefined, Error>({
    queryKey: ["/api/user"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });
  
  // Синхронизируем локальное состояние с данными из запроса
  useEffect(() => {
    setLocalUser(user ?? null);
  }, [user]);

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginData) => {
      const res = await apiRequest("POST", "/api/login", credentials);
      return await res.json();
    },
    onSuccess: (user: User) => {
      // Немедленно обновляем локальное состояние для быстрой реакции UI
      setLocalUser(user);
      
      // Затем обновляем кэш и запрашиваем свежие данные
      queryClient.setQueryData(["/api/user"], user);
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      
      // Сообщаем об успешном входе
      toast({
        title: "Вход выполнен",
        description: "Вы успешно вошли в аккаунт.",
      });
      
      // Перенаправляем на главную
      navigate("/");
    },
    onError: (error: Error) => {
      toast({
        title: "Ошибка входа",
        description: error.message || "Пароль или Логин не верен",
        variant: "destructive",
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (credentials: RegisterData) => {
      const res = await apiRequest("POST", "/api/register", credentials);
      return await res.json();
    },
    onSuccess: (user: User) => {
      // Немедленно обновляем локальное состояние для быстрой реакции UI
      setLocalUser(user);
      
      // Затем обновляем кэш и запрашиваем свежие данные
      queryClient.setQueryData(["/api/user"], user);
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      
      // Сообщаем об успешной регистрации
      toast({
        title: "Регистрация успешна",
        description: "Ваш аккаунт успешно создан.",
      });
      
      // Перенаправляем на главную
      navigate("/");
    },
    onError: (error: Error) => {
      toast({
        title: "Ошибка регистрации",
        description: error.message || "Не удалось зарегистрироваться",
        variant: "destructive",
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/logout");
    },
    onSuccess: () => {
      // Немедленно обновляем локальное состояние для быстрой реакции UI
      setLocalUser(null);
      
      // Сбрасываем пользователя и все связанные данные
      queryClient.setQueryData(["/api/user"], null);
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      
      // Дополнительно очищаем кэш расчетов
      queryClient.removeQueries({ queryKey: ["/api/calculations"] });
      queryClient.removeQueries({ queryKey: ["/api/calculations/latest"] });
      
      // Сообщаем об успешном выходе
      toast({
        title: "Выход из системы",
        description: "Вы успешно вышли из аккаунта.",
      });
      
      // Перенаправляем на главную
      navigate("/");
    },
    onError: (error: Error) => {
      toast({
        title: "Ошибка выхода",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <AuthContext.Provider
      value={{
        // Используем локальное состояние для более быстрой реакции UI
        user: localUser,
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
