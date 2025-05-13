import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/hooks/use-auth";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  lastname: z.string().min(1, "Last name is required"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginValues = z.infer<typeof loginSchema>;
type RegisterValues = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const { t } = useTranslation();
  const [location] = useLocation();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { user, loginMutation, registerMutation } = useAuth();

  // Установка активной вкладки на основе URL-параметра
  useEffect(() => {
    const url = new URL(window.location.href);
    const tabParam = url.searchParams.get("tab");
    if (tabParam === "login" || tabParam === "register") {
      setActiveTab(tabParam);
    }
  }, [location]);

  const loginForm = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  const registerForm = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", lastname: "", username: "", password: "" },
  });

  const onLoginSubmit = (values: LoginValues) => {
    loginMutation.mutate(values);
  };

  const onRegisterSubmit = (values: RegisterValues) => {
    registerMutation.mutate({
      username: values.username,
      password: values.password,
      name: values.name,
      lastname: values.lastname
    });
  };

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate("/profile", { replace: true });
    }
  }, [user, navigate]);

  if (user) {
    return null;
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto items-stretch">
      <div className="w-full md:w-1/2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>{t("auth.title")}</CardTitle>
            <CardDescription>{t("auth.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "register")}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">{t("auth.login.title")}</TabsTrigger>
                <TabsTrigger value="register">{t("auth.register.title")}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                {loginMutation.error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertDescription>
                      {t("auth.login.error")}
                    </AlertDescription>
                  </Alert>
                )}
                
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("auth.fields.username")}</FormLabel>
                          <FormControl>
                            <Input {...field} />
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
                          <FormLabel>{t("auth.fields.password")}</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
                      {loginMutation.isPending ? t("auth.login.processing") : t("auth.login.submit")}
                    </Button>
                    
                    <Button 
                      type="button" 
                      variant="link"
                      className="w-full mt-2 text-center text-sm" 
                      onClick={() => setShowForgotPassword(!showForgotPassword)}
                    >
                      {t("auth.login.forgotPassword")}
                    </Button>
                    
                    {showForgotPassword && (
                      <div className="mt-4 p-4 border-t border-gray-200">
                        <h3 className="text-lg font-medium mb-3">{t("auth.forgotPassword.title")}</h3>
                        <div className="space-y-4">
                          <FormItem>
                            <FormLabel>{t("auth.fields.username")}</FormLabel>
                            <Input type="email" />
                          </FormItem>
                          <Button className="w-full bg-gray-800 hover:bg-gray-900">
                            {t("auth.forgotPassword.submit")}
                          </Button>
                        </div>
                      </div>
                    )}
                  </form>
                </Form>
              </TabsContent>
              
              <TabsContent value="register">
                {registerMutation.error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertDescription>
                      {t("auth.register.error")}
                    </AlertDescription>
                  </Alert>
                )}
                
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                    <FormField
                      control={registerForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("auth.fields.name")}</FormLabel>
                          <FormControl>
                            <Input {...field} />
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
                          <FormLabel>{t("auth.fields.lastname")}</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("auth.fields.username")}</FormLabel>
                          <FormControl>
                            <Input {...field} />
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
                          <FormLabel>{t("auth.fields.password")}</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full" disabled={registerMutation.isPending}>
                      {registerMutation.isPending ? t("auth.register.processing") : t("auth.register.submit")}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      <div className="w-full md:w-1/2 bg-gradient-to-br from-primary/90 to-primary/60 text-white rounded-lg p-8 flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-6">{t("auth.hero.title")}</h2>
        <p className="text-lg mb-8">{t("auth.hero.description")}</p>
        <div className="space-y-4">
          <div className="flex items-start">
            <svg className="w-6 h-6 mr-3 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>{t("auth.hero.benefit1")}</span>
          </div>
          <div className="flex items-start">
            <svg className="w-6 h-6 mr-3 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>{t("auth.hero.benefit2")}</span>
          </div>
          <div className="flex items-start">
            <svg className="w-6 h-6 mr-3 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>{t("auth.hero.benefit3")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
