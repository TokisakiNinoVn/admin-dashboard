"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { menuItems } from "@/config/menu";

interface AppSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function AppSidebar({ collapsed, onToggle }: AppSidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <aside className={`app-sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">A</div>
        <span className="sidebar-logo-text">ANT Admin</span>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          // if ("children" in item) {
            return (
              <div key={item.label} className="sidebar-nav-section">
                <div className="sidebar-nav-label">{item.label}</div>
                {item.children?.map((child) => (
                  <Link
                    key={child.key}
                    href={child.key}
                    className={`sidebar-nav-item ${isActive(child.key) ? "active" : ""}`}
                    title={collapsed ? child.label : undefined}
                  >
                    <span className="sidebar-nav-icon">{child.icon}</span>
                    <span className="sidebar-nav-text">{child.label}</span>
                  </Link>
                ))}
              </div>
            );
          // }

          // return (
          //   <div key={item.key} className="sidebar-nav-section">
          //     <Link
          //       key={item.key}
          //       href={item.key}
          //       className={`sidebar-nav-item ${isActive(item.key) ? "active" : ""}`}
          //       title={collapsed ? item.label : undefined}
          //     >
          //       <span className="sidebar-nav-icon">{item.icon}</span>
          //       <span className="sidebar-nav-text">{item.label}</span>
          //     </Link>
          //   </div>
          // );
        })}
      </nav>

      {/* Footer – collapse toggle */}
      <div className="sidebar-footer">
        <button
          className="sidebar-toggle sidebar-nav-item"
          onClick={onToggle}
          title={collapsed ? "Mở rộng menu" : "Thu gọn menu"}
          style={{ width: "100%" }}
        >
          <span className="sidebar-nav-icon">
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </span>
          <span className="sidebar-nav-text">Thu gọn</span>
        </button>
      </div>
    </aside>
  );
}
