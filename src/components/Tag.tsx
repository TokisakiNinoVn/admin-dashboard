import { Tag } from "antd";

export function statusTag(status: string) {
    switch (status) {
        case "pending_review":
            return <Tag color="warning" style={{ fontWeight: "bold" }}>Chờ đánh giá</Tag>;
        case "approved":
            return <Tag color="success" style={{ fontWeight: "bold" }}>Đã duyệt</Tag>;
        case "rejected":
            return <Tag color="error" style={{ fontWeight: "bold" }}>Từ chối</Tag>;
        default:
            return <Tag>{status}</Tag>;
    }
}
