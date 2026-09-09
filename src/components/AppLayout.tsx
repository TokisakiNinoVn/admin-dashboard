"use client";

import { useState } from "react";
import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";

interface AppLayoutProps {
  children: React.ReactNode;
  user: {
    name?: string | null;
    email?: string | null;
    picture?: string | null;
  };
  breadcrumb?: { label: string; href?: string }[];
}

export default function AppLayout({ children, user, breadcrumb }: AppLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="app-layout">
      <AppSidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
      <div className="app-main">
        <AppHeader user={user} breadcrumb={breadcrumb} />
        <main className="app-content">{children}</main>
      </div>
    </div>
  );
}
