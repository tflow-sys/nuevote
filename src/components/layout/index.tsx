import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}