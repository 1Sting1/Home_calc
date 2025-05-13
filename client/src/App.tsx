import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/language-context";
import { CalculationProvider } from "@/contexts/calculation-context";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import CalculationPage from "@/pages/calculation-page";
import ResultPage from "@/pages/result-page";
import ProfilePage from "@/pages/profile-page";
import DocsPage from "@/pages/docs-page";
import ContactsPage from "@/pages/contacts-page";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/auth" component={AuthPage} />
          <Route path="/calculation" component={CalculationPage} />
          <Route path="/result" component={ResultPage} />
          <ProtectedRoute path="/profile" component={ProfilePage} />
          <Route path="/docs" component={DocsPage} />
          <Route path="/contacts" component={ContactsPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <AuthProvider>
            <CalculationProvider>
              <Toaster />
              <Router />
            </CalculationProvider>
          </AuthProvider>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
