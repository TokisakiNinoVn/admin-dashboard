import {
    Avatar,
    Button,
    Card,
    Popconfirm,
    Space,
    Tooltip,
    Typography,
} from "antd";
import {
    Clapperboard,
    Clock,
    Eye,
    Image,
    MapPin,
    SquarePen,
    Trash,
} from "lucide-react";

const { Paragraph, Text } = Typography;
import type ProjectReview from "@/models/ProjectReview.model";

interface ProjectCardProps {
    project: ProjectReview;
    statusTag: (status: string) => React.ReactNode;
    formatDate: (date: string) => string;
    onView: (project: ProjectReview) => void;
    onUpdate: (project: ProjectReview) => void;
    onDelete: (id: number) => void;
}

export default function SampleCard3({
    project,
    statusTag,
    formatDate,
    onView,
    onUpdate,
    onDelete,
}: ProjectCardProps) {
    return (
        <Card
            hoverable={false}
            className="group relative overflow-hidden !rounded-2xl border border-zinc-100 shadow-[0_1px_2px_rgba(16,24,40,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_-8px_rgba(16,24,40,0.16)]"
            styles={{ body: { padding: 16 } }}
            cover={
                <div className="relative aspect-video overflow-hidden bg-zinc-100">
                    <img
                        alt={project.name}
                        src={project.thumbnail_url}
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                    />

                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/35 to-transparent" />

                    <div className="absolute left-3 top-3">
                        {statusTag(project.status)}
                    </div>

                    <div className="absolute bottom-2.5 left-3 z-10 flex max-w-[calc(100%-24px)] items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-medium text-zinc-800 shadow-[0_2px_6px_rgba(16,24,40,0.18)] backdrop-blur-sm">
                        <MapPin size={16} className="text-black" />
                        <span className="truncate">{project.location}</span>
                    </div>

                    {/* Media counts - góc phải trên */}
                    <div className="absolute right-3 top-3 z-10 flex items-center gap-2">
                        <div className="flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-medium text-zinc-800 shadow-[0_2px_6px_rgba(16,24,40,0.18)] backdrop-blur-sm">
                            <Image size={14} />
                            <span>{project.media.images}</span>
                        </div>
                        <div className="flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-medium text-zinc-800 shadow-[0_2px_6px_rgba(16,24,40,0.18)] backdrop-blur-sm">
                            <Clapperboard size={14} />
                            <span>{project.media.videos}</span>
                        </div>
                    </div>
                </div>
            }
        >
            {/* Project name */}
            <Paragraph
                ellipsis={{ rows: 1 }}
                style={{
                    marginBottom: 8,
                    fontWeight: 600,
                    fontSize: 15,
                    lineHeight: "22px",
                    minHeight: "22px",
                }}
            >
                {project.name}
            </Paragraph>

            {/* Updated info */}
            {/* <div className="mb-3 flex items-center gap-1.5">
                <Clock size={16} className="text-slate-400" />
                <Text type="secondary" style={{ fontSize: 12, fontWeight: 500 }}>
                    Cập nhật {formatDate(project.updated_at)}
                </Text>
            </div> */}

            {/* Owner + media stats */}
            {/* <div className="flex items-center justify-between border-t border-zinc-100 pt-3">
                <Space size={8}>
                    <Avatar size={22} className="bg-indigo-500 text-[11px]">
                        {project.owner.name?.charAt(0)?.toUpperCase()}
                    </Avatar>

                    <Text type="secondary" style={{ fontSize: 12.5 }}>
                        {project.owner.name}
                    </Text>
                </Space>

                <Space size="middle">
                    <Text className="text-md flex items-center gap-1">
                        <Image size={16} />
                        {project.media.images}
                    </Text>

                    <Text className="text-md flex items-center gap-1">
                        <Clapperboard size={16} />
                        {project.media.videos}
                    </Text>
                </Space>
            </div> */}

            {/* Actions */}
            <div className="mt-3 flex items-center justify-center pt-3">
                <Tooltip title="Xem chi tiết">
                    <Button
                        type="default"
                        shape="circle"
                        icon={<Eye size={18} />}
                        onClick={() => onView(project)}
                        className="mr-5"
                    />
                </Tooltip>

                <Tooltip title="Chỉnh sửa">
                    <Button
                        type="default"
                        shape="circle"
                        icon={<SquarePen size={16} />}
                        onClick={() => onUpdate(project)}
                        className="mr-5"
                    />
                </Tooltip>

                <Popconfirm
                    title="Xóa dự án"
                    description="Bạn có chắc muốn xóa dự án này?"
                    onConfirm={() => onDelete(project.id)}
                    okText="Xóa"
                    cancelText="Hủy"
                    okButtonProps={{ danger: true }}
                >
                    <Tooltip title="Xóa">
                        <Button
                            danger
                            shape="circle"
                            icon={<Trash size={16} />}
                        />
                    </Tooltip>
                </Popconfirm>
            </div>
        </Card>
    );
}