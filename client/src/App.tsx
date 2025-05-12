import { Switch, Route } from "wouter";
import { Toaster } from "./components/ui/toaster";
import NotFound from "./pages/not-found";
import HomePage from "./pages/home-page";
import AuthPage from "./pages/auth-page";
import CalculatorPage from "./pages/calculator-page";
import ResultsPage from "./pages/results-page";
import ProfilePage from "./pages/profile-page";
import { ProtectedRoute } from "./lib/protected-route";
import MainLayout from "./layout/main-layout";
import { AuthProvider } from "./hooks/use-auth";
import { useLocale } from "./lib/stores/useLocale";

function Router() {
  return (
    <Switch>
      <Route path="/">
        <MainLayout>
          <HomePage />
        </MainLayout>
      </Route>
      <Route path="/calculator/:type">
        <MainLayout>
          <CalculatorPage />
        </MainLayout>
      </Route>
      <Route path="/results">
        <MainLayout>
          <ResultsPage />
        </MainLayout>
      </Route>
      <Route path="/auth">
        <AuthPage />
      </Route>
      <ProtectedRoute path="/profile" component={() => (
        <MainLayout>
          <ProfilePage />
        </MainLayout>
      )} />
      <Route>
        <MainLayout>
          <NotFound />
        </MainLayout>
      </Route>
    </Switch>
  );
}

function App() {
  // useLocale уже инициализировано через zustand, не требует обертки
  return (
    <AuthProvider>
      <Router />
      <Toaster />
    </AuthProvider>
  );
}

export default App;
