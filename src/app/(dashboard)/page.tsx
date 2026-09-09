"use client";

import {
  ProjectOutlined,
  FolderOutlined,
  PictureOutlined,
  TeamOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";

const stats = [
  {
    label: "Tổng dự án",
    value: "48",
    trend: "+12%",
    trendUp: true,
    icon: <ProjectOutlined />,
    color: "#3b82f6",
    bg: "#eff6ff",
  },
  {
    label: "Thư mục",
    value: "134",
    trend: "+8%",
    trendUp: true,
    icon: <FolderOutlined />,
    color: "#8b5cf6",
    bg: "#f5f3ff",
  },
  {
    label: "Media files",
    value: "2,847",
    trend: "+23%",
    trendUp: true,
    icon: <PictureOutlined />,
    color: "#10b981",
    bg: "#ecfdf5",
  },
  {
    label: "Thành viên",
    value: "12",
    trend: "-2%",
    trendUp: false,
    icon: <TeamOutlined />,
    color: "#f59e0b",
    bg: "#fffbeb",
  },
];

const activities = [
  { color: "#3b82f6", initials: "TN", name: "Trần Ngọc", action: "đã tạo dự án", target: "Website Redesign", time: "2 phút trước" },
  { color: "#10b981", initials: "LM", name: "Lê Minh", action: "đã upload", target: "32 ảnh sản phẩm", time: "15 phút trước" },
  { color: "#8b5cf6", initials: "PH", name: "Phạm Hương", action: "đã chỉnh sửa", target: "Thư mục Q3-2026", time: "1 giờ trước" },
  { color: "#f59e0b", initials: "VT", name: "Vũ Thành", action: "đã mời", target: "3 thành viên mới", time: "3 giờ trước" },
  { color: "#ef4444", initials: "NA", name: "Nguyễn An", action: "đã xoá", target: "Draft Campaign v1", time: "5 giờ trước" },
];

const recentProjects = [
  { name: "Website Redesign", status: "active", progress: 72, members: 4 },
  { name: "Mobile App v2", status: "review", progress: 90, members: 6 },
  { name: "Brand Identity", status: "active", progress: 45, members: 3 },
  { name: "Marketing Q4", status: "pending", progress: 10, members: 2 },
];

const statusColor: Record<string, { bg: string; text: string; label: string }> = {
  active: { bg: "#dcfce7", text: "#16a34a", label: "Đang chạy" },
  review: { bg: "#dbeafe", text: "#1d4ed8", label: "Review" },
  pending: { bg: "#fef9c3", text: "#a16207", label: "Chờ xử lý" },
};

export default function DashboardPage() {
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      {/* Page header */}
      <div className="page-header">
        <h1 className="page-title">Xin chào, Admin 👋</h1>
        <p className="page-subtitle">
          Đây là tổng quan hoạt động của bạn hôm nay.
        </p>
      </div>

      {/* Stats grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
          marginBottom: 24,
        }}
      >
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card">
            <div
              className="stat-card-icon"
              style={{ background: stat.bg, color: stat.color }}
            >
              {stat.icon}
            </div>
            <div className="stat-card-value">{stat.value}</div>
            <div className="stat-card-label">{stat.label}</div>
            <div className={`stat-card-trend ${stat.trendUp ? "up" : "down"}`}>
              {stat.trendUp ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              {stat.trend} so với tháng trước
            </div>
          </div>
        ))}
      </div>

      {/* Two-column section */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 360px",
          gap: 16,
          alignItems: "start",
        }}
      >
        {/* Recent projects */}
        <div className="stat-card" style={{ padding: 0, overflow: "hidden" }}>
          <div
            style={{
              padding: "20px 24px",
              borderBottom: "1px solid #f1f5f9",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: 16,
                fontWeight: 600,
                color: "#0f172a",
              }}
            >
              Dự án gần đây
            </h2>
            <a
              href="/projects"
              style={{ fontSize: 13, color: "#3b82f6", textDecoration: "none" }}
            >
              Xem tất cả →
            </a>
          </div>
          <div>
            {recentProjects.map((project, i) => {
              const s = statusColor[project.status];
              return (
                <div
                  key={project.name}
                  style={{
                    padding: "16px 24px",
                    borderBottom:
                      i < recentProjects.length - 1
                        ? "1px solid #f1f5f9"
                        : "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                  }}
                >
                  {/* Project icon */}
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: "#eff6ff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                      color: "#3b82f6",
                      flexShrink: 0,
                    }}
                  >
                    <ProjectOutlined />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 6,
                      }}
                    >
                      <span
                        style={{
                          fontWeight: 500,
                          fontSize: 14,
                          color: "#0f172a",
                        }}
                      >
                        {project.name}
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          background: s.bg,
                          color: s.text,
                          padding: "2px 8px",
                          borderRadius: 999,
                        }}
                      >
                        {s.label}
                      </span>
                    </div>
                    {/* Progress bar */}
                    <div
                      style={{
                        height: 4,
                        borderRadius: 9999,
                        background: "#f1f5f9",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${project.progress}%`,
                          background:
                            "linear-gradient(90deg, #3b82f6, #8b5cf6)",
                          borderRadius: 9999,
                        }}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: 4,
                        fontSize: 12,
                        color: "#94a3b8",
                      }}
                    >
                      <span>{project.progress}% hoàn thành</span>
                      <span>{project.members} thành viên</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Activity feed */}
        <div className="stat-card" style={{ padding: 0, overflow: "hidden" }}>
          <div
            style={{
              padding: "20px 24px",
              borderBottom: "1px solid #f1f5f9",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: 16,
                fontWeight: 600,
                color: "#0f172a",
              }}
            >
              Hoạt động gần đây
            </h2>
          </div>
          <div style={{ padding: "8px 24px 16px" }}>
            {activities.map((a) => (
              <div key={a.name + a.time} className="activity-item">
                <div
                  className="activity-avatar"
                  style={{ background: a.color }}
                >
                  {a.initials}
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: 14, color: "#0f172a" }}>
                    <strong>{a.name}</strong> {a.action}{" "}
                    <span style={{ color: "#3b82f6" }}>{a.target}</span>
                  </p>
                  <p style={{ margin: 0, fontSize: 12, color: "#94a3b8", marginTop: 2 }}>
                    {a.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
