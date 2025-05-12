import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  
  if (!user) {
    return null;
  }
  
  const goToHome = () => {
    navigate("/");
  };
  
  // Get user's initials for avatar fallback
  const getInitials = () => {
    if (!user) return '';
    return `${user.name?.charAt(0) || ''}${user.lastname?.charAt(0) || ''}`.toUpperCase();
  };

  return (
    <div className="py-10 px-4">
      <div className="container mx-auto max-w-md">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center mb-6">
              <Avatar className="w-32 h-32 mx-auto mb-4">
                <AvatarFallback className="text-4xl">{getInitials()}</AvatarFallback>
              </Avatar>
              
              <h1 className="text-2xl font-bold">
                {user.name} {user.lastname}
              </h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Имя:</span>
                <span className="font-medium">{user.name}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Фамилия:</span>
                <span className="font-medium">{user.lastname}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Почта:</span>
                <span className="font-medium">{user.email}</span>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Button onClick={goToHome}>
                На Главную
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
