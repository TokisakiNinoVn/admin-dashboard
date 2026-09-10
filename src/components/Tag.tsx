import { Tag } from "antd";

export function statusTag(status: string) {
    switch (status) {
        case "pending_review":
            return <Tag color="warning">Chờ đánh giá</Tag>;
        case "approved":
            return <Tag color="success">Đã duyệt</Tag>;
        case "rejected":
            return <Tag color="error">Từ chối</Tag>;
        default:
            return <Tag>{status}</Tag>;
    }
}
