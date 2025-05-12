import { ReactNode } from "react";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
