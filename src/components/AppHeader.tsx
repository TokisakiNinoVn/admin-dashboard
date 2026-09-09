"use client";

import { BellOutlined, SearchOutlined } from "@ant-design/icons";
import UserMenu from "./UserMenu";

interface AppHeaderProps {
  user: {
    name?: string | null;
    email?: string | null;
    picture?: string | null;
  };
  breadcrumb?: { label: string; href?: string }[];
}

export default function AppHeader({ user, breadcrumb }: AppHeaderProps) {
  return (
    <header className="app-header">
      {/* Breadcrumb */}
      <div className="breadcrumb" style={{ flex: 1 }}>
        <span style={{ color: "#94a3b8", fontSize: 14 }}>ANT Admin</span>
        {breadcrumb?.map((crumb, i) => (
          <span key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span className="breadcrumb-sep">/</span>
            {crumb.href ? (
              <a
                href={crumb.href}
                style={{
                  color: i === (breadcrumb.length - 1) ? "#ffffffff" : "#64748b",
                  fontWeight: i === (breadcrumb.length - 1) ? 500 : 400,
                  textDecoration: "none",
                }}
              >
                {crumb.label}
              </a>
            ) : (
              <span className="breadcrumb-current">{crumb.label}</span>
            )}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {/* Search */}
        <button
          id="header-search-btn"
          aria-label="Tìm kiếm"
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            border: "1px solid #e2e8f0",
            background: "transparent",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#64748b",
            fontSize: 16,
            transition: "background 150ms",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <SearchOutlined />
        </button>

        {/* Notifications */}
        <button
          id="header-notifications-btn"
          aria-label="Thông báo"
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            border: "1px solid #e2e8f0",
            background: "transparent",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#64748b",
            fontSize: 16,
            transition: "background 150ms",
            position: "relative",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <BellOutlined />
          {/* Badge */}
          <span
            style={{
              position: "absolute",
              top: 7,
              right: 7,
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#ef4444",
              border: "2px solid white",
            }}
          />
        </button>

        {/* Divider */}
        <div style={{ width: 1, height: 24, background: "#e2e8f0", margin: "0 4px" }} />

        {/* User menu */}
        <UserMenu user={user} />
      </div>
    </header>
  );
}
