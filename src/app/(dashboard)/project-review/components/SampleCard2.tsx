import {
    Avatar,
    Button,
    Card,
    Popconfirm,
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

export default function SampleCard2({
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
            className="group relative aspect-[1.5/1] overflow-hidden !rounded-2xl border border-zinc-100 shadow-[0_1px_2px_rgba(16,24,40,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_-8px_rgba(16,24,40,0.16)]"
            styles={{ body: { padding: 0, height: "100%" } }}
        >
            {/* Ảnh full card */}
            <img
                alt={project.name}
                src={project.thumbnail_url}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
            />

            {/* Gradient mờ từ dưới lên cho nội dung */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            {/* Status tag - góc trái trên */}
            <div className="absolute left-3 top-3 z-10">
                {statusTag(project.status)}
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

            {/* Nội dung dưới cùng: location rồi đến project.name */}
            <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-2 p-3">
                {/* Location */}
                <div className="flex w-fit max-w-full items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-medium text-zinc-800 shadow-[0_2px_6px_rgba(16,24,40,0.18)] backdrop-blur-sm">
                    <MapPin size={16} className="shrink-0 text-black" />
                    <span className="truncate">{project.location}</span>
                </div>

                {/* Project name */}
                <Paragraph
                    ellipsis={{ rows: 1 }}
                    style={{
                        marginBottom: 0,
                        fontWeight: 600,
                        fontSize: 15,
                        lineHeight: "22px",
                        color: "#fff",
                        textShadow: "0 1px 2px rgba(0,0,0,0.4)",
                    }}
                >
                    {project.name}
                </Paragraph>
            </div>

            {/* Hover overlay */}
            <div className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center gap-3 rounded-2xl bg-white/70 opacity-0 backdrop-blur-[4px] transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
                {/* Updated info */}
                <div className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 shadow-sm">
                    <Clock size={18} className="text-slate-500" />
                    <Text
                        type="secondary"
                        style={{
                            fontSize: 12,
                            fontWeight: 500,
                            color: "#475569",
                        }}
                    >
                        Cập nhật {formatDate(project.updated_at)}
                    </Text>
                </div>

                {/* Owner info */}
                <div className="flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 shadow-sm">
                    <Avatar size={22} className="bg-indigo-500 text-[11px]">
                        {project.owner.name?.charAt(0)?.toUpperCase()}
                    </Avatar>
                    <Text
                        type="secondary"
                        style={{
                            fontSize: 12.5,
                            fontWeight: 500,
                            color: "#475569",
                        }}
                    >
                        {project.owner.name}
                    </Text>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <Tooltip title="Xem chi tiết">
                        <Button
                            type="default"
                            shape="circle"
                            size="large"
                            icon={<Eye size={20} />}
                            onClick={() => onView(project)}
                            className="shadow-md transition-transform hover:scale-105"
                        />
                    </Tooltip>

                    <Tooltip title="Chỉnh sửa">
                        <Button
                            type="default"
                            shape="circle"
                            size="large"
                            icon={<SquarePen size={18} />}
                            onClick={() => onUpdate(project)}
                            className="shadow-md transition-transform hover:scale-105"
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
                                size="large"
                                icon={<Trash size={18} />}
                                className="shadow-md transition-transform hover:scale-105"
                            />
                        </Tooltip>
                    </Popconfirm>
                </div>
            </div>
        </Card>
    );
}