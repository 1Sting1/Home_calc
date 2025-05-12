import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

// Schemas for form validation
const loginSchema = z.object({
  email: z.string().email("Введите корректный email адрес"),
  password: z.string().min(6, "Пароль должен быть не менее 6 символов"),
});

const registerSchema = z.object({
  name: z.string().min(2, "Имя должно быть не менее 2 символов"),
  lastname: z.string().min(2, "Фамилия должна быть не менее 2 символов"),
  email: z.string().email("Введите корректный email адрес"),
  password: z.string().min(6, "Пароль должен быть не менее 6 символов"),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const [location, navigate] = useLocation();
  const { user, loginMutation, registerMutation } = useAuth();
  const searchParams = new URLSearchParams(location.split("?")[1]);
  const defaultTab = searchParams.get("tab") === "register" ? "register" : "login";
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  // Redirect to home if already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  
  // Login form setup
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  // Register form setup
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      password: "",
    },
  });
  
  // Handle login form submission
  const onLoginSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data);
  };
  
  // Handle register form submission
  const onRegisterSubmit = (data: RegisterFormValues) => {
    registerMutation.mutate(data);
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-gray-50">
      {/* Left panel - Forms */}
      <div className="flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="mb-6">
              <Link href="/" className="text-primary font-bold text-2xl block text-center mb-4">
                <span className="text-primary">Дом</span>
                <span className="text-secondary">Расчет</span>
              </Link>
              <h1 className="text-2xl font-bold text-center">
                {activeTab === "login" ? "Вход в аккаунт" : "Регистрация"}
              </h1>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Войти</TabsTrigger>
                <TabsTrigger value="register">Регистрация</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Почта</FormLabel>
                          <FormControl>
                            <Input placeholder="mail@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Пароль</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="******" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {loginMutation.isError && (
                      <Alert variant="destructive">
                        <AlertDescription>
                          Пароль или Логин не верен
                        </AlertDescription>
                      </Alert>
                    )}
                    
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={loginMutation.isPending}
                    >
                      {loginMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Входим...
                        </>
                      ) : (
                        "Войти"
                      )}
                    </Button>
                    
                    <div className="text-center mt-4">
                      <Link href="#forgot-password" className="text-primary text-sm hover:underline">
                        Забыли пароль?
                      </Link>
                    </div>
                  </form>
                </Form>
              </TabsContent>
              
              <TabsContent value="register">
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                    <FormField
                      control={registerForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Имя</FormLabel>
                          <FormControl>
                            <Input placeholder="Иван" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
                      name="lastname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Фамилия</FormLabel>
                          <FormControl>
                            <Input placeholder="Иванов" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Почта</FormLabel>
                          <FormControl>
                            <Input placeholder="mail@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Пароль</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="******" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {registerMutation.isError && (
                      <Alert variant="destructive">
                        <AlertDescription>
                          Не удалось зарегистрироваться. Возможно, такой пользователь уже существует.
                        </AlertDescription>
                      </Alert>
                    )}
                    
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={registerMutation.isPending}
                    >
                      {registerMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Регистрация...
                        </>
                      ) : (
                        "Зарегистрироваться"
                      )}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      {/* Right panel - Hero section */}
      <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-primary to-secondary text-white p-8">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Рассчитайте стоимость вашего дома</h2>
          <p className="text-lg mb-8">
            Простой и удобный сервис для расчёта строительных материалов и стоимости дома.
            Регистрация позволит вам сохранять результаты расчетов и отслеживать изменения.
          </p>
          <div className="flex justify-center gap-4">
            <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-sm">Видов материалов</div>
            </div>
            <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
              <div className="text-4xl font-bold mb-2">5000+</div>
              <div className="text-sm">Довольных клиентов</div>
            </div>
            <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
              <div className="text-4xl font-bold mb-2">99%</div>
              <div className="text-sm">Точность расчетов</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
