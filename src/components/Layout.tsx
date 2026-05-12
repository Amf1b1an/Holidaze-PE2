import { type ReactNode } from "react";
import Header from "./Header";
import SideNav from "./SideNav";

interface LayoutProps {
  children: ReactNode;
  subtitle?: string;
}

export default function Layout({ children, subtitle }: LayoutProps) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center">
      <div className="max-w-7xl w-full px-6 md:px-12 py-8 flex flex-col">
        <SideNav />
        <Header subtitle={subtitle} />
        <main className="w-full mt-10 animate-fadeIn">{children}</main>
      </div>
    </div>
  );
}
