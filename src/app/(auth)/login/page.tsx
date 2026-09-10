export default function LoginPage() {
  return (
    <div className="landing-bg">
      <div className="landing-card animate-fadeInUp">
        {/* Logo */}
        <div className="landing-logo">A</div>

        {/* Title */}
        <h1 className="landing-title">ANT Admin</h1>
        <p className="landing-subtitle">
          Đăng nhập để truy cập vào hệ thống quản lý
        </p>

        {/* Auth0 login */}
        <a href="/auth/login" className="btn-primary">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
            <polyline points="10 17 15 12 10 7" />
            <line x1="15" y1="12" x2="3" y2="12" />
          </svg>
          Đăng nhập với Auth0
        </a>

        <p
          style={{
            marginTop: 24,
            fontSize: 12,
            color: "#ffffff",
            lineHeight: 1.5,
          }}
        >
          Bằng cách đăng nhập, bạn đồng ý với{" "}
          <span style={{ color: "#60a5fa" }}>Điều khoản dịch vụ</span> của
          chúng tôi.
        </p>
      </div>
    </div>
  );
}
