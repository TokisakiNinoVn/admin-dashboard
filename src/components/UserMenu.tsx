"use client";

import { useState, useRef, useEffect } from "react";
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  ProfileOutlined,
} from "@ant-design/icons";

interface UserMenuProps {
  user: {
    name?: string | null;
    email?: string | null;
    picture?: string | null;
  };
}

export default function UserMenu({ user }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        id="user-menu-btn"
        className="user-menu-btn"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        {/* Avatar */}
        {user.picture ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.picture}
            alt={user.name ?? "User"}
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        ) : (
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            {initials}
          </div>
        )}
        <span style={{ maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {user.name ?? user.email ?? "User"}
        </span>
        {/* Caret */}
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{ transition: "transform 150ms", transform: open ? "rotate(180deg)" : "none", flexShrink: 0 }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "calc(100% + 8px)",
            width: 220,
            background: "white",
            border: "1px solid #e2e8f0",
            borderRadius: 12,
            boxShadow: "0 10px 40px rgba(0,0,0,0.12)",
            zIndex: 200,
            overflow: "hidden",
            animation: "fadeInUp 0.15s ease both",
          }}
        >
          {/* User info */}
          <div
            style={{
              padding: "14px 16px",
              borderBottom: "1px solid #f1f5f9",
              background: "#f8fafc",
            }}
          >
            <div style={{ fontWeight: 600, fontSize: 14, color: "#0f172a", marginBottom: 2 }}>
              {user.name}
            </div>
            <div style={{ fontSize: 12, color: "#64748b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {user.email}
            </div>
          </div>

          {/* Menu items */}
          <div style={{ padding: "8px 0" }}>
            {[
              { icon: <ProfileOutlined />, label: "Hồ sơ cá nhân", href: "/profile" },
              { icon: <SettingOutlined />, label: "Cài đặt", href: "/settings" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 16px",
                  color: "#374151",
                  fontSize: 14,
                  textDecoration: "none",
                  transition: "background 150ms",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <span style={{ fontSize: 16, color: "#6b7280" }}>{item.icon}</span>
                {item.label}
              </a>
            ))}
          </div>

          <div style={{ borderTop: "1px solid #f1f5f9", padding: "8px 0" }}>
            <a
              href="/auth/logout"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 16px",
                color: "#ef4444",
                fontSize: 14,
                textDecoration: "none",
                transition: "background 150ms",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#fef2f2")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <LogoutOutlined style={{ fontSize: 16 }} />
              Đăng xuất
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
