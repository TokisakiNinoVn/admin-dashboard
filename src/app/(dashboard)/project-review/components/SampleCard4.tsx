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
            className="group relative aspect-[1/1.2] overflow-hidden !rounded-2xl border border-zinc-100 shadow-[0_1px_2px_rgba(16,24,40,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_-8px_rgba(16,24,40,0.16)]"
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

            <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-2 p-3">
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
            <div className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center gap-4 rounded-2xl bg-white/70 px-4 backdrop-blur-[4px] opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
                {/* Project Info */}
                <div className="w-full max-w-[260px] rounded-xl border border-zinc-200/80 bg-white/95 p-3 shadow-[0_4px_16px_rgba(16,24,40,0.12)]">
                    {/* Location */}
                    <div className="flex items-center gap-2 border-b border-zinc-100 pb-2.5">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-zinc-100">
                            <MapPin size={16} className="text-zinc-600" />
                        </div>

                        <div className="min-w-0">
                            <div className="text-[11px] font-medium text-zinc-400">
                                Địa điểm
                            </div>
                            <div className="truncate text-xs font-semibold text-zinc-800">
                                {project.location}
                            </div>
                        </div>
                    </div>

                    {/* Owner */}
                    <div className="flex items-center gap-2 border-b border-zinc-100 py-2.5">
                        <Avatar size={32} className="shrink-0 bg-indigo-500 text-[11px]">
                            {project.owner.name?.charAt(0)?.toUpperCase()}
                        </Avatar>

                        <div className="min-w-0">
                            <div className="text-[11px] font-medium text-zinc-400">
                                Người phụ trách
                            </div>
                            <div className="truncate text-xs font-semibold text-zinc-800">
                                {project.owner.name}
                            </div>
                        </div>
                    </div>

                    {/* Updated */}
                    <div className="flex items-center gap-2 pt-2.5">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-zinc-100">
                            <Clock size={16} className="text-zinc-500" />
                        </div>

                        <div className="min-w-0">
                            <div className="text-[11px] font-medium text-zinc-400">
                                Cập nhật lần cuối
                            </div>
                            <div className="truncate text-xs font-semibold text-zinc-700">
                                {formatDate(project.updated_at)}
                            </div>
                        </div>
                    </div>
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