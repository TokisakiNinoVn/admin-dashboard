"use client";

import { useMemo, useState } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Space,
  Typography,
  Popconfirm,
  Empty,
  Avatar,
  Segmented,
  Tooltip,
} from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  EnvironmentOutlined,
  PictureOutlined,
  VideoCameraOutlined,
  ClockCircleOutlined,
  FolderOpenOutlined,
} from "@ant-design/icons";

import projectsData from "@/data-sheet/project-reviews.json";
import { ProjectReview } from "@/models/ProjectReview";
import { formatDate } from "@/helpers/format.helper";
import { statusTag } from "@/components/Tag";

const { Title, Text, Paragraph } = Typography;

export default function Review() {
  const [projects, setProjects] = useState<ProjectReview[]>(projectsData);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const statuses = useMemo(
    () => Array.from(new Set(projects.map((p) => p.status))),
    [projects]
  );

  const filteredProjects = useMemo(
    () =>
      statusFilter === "all"
        ? projects
        : projects.filter((p) => p.status === statusFilter),
    [projects, statusFilter]
  );

  const handleView = (project: ProjectReview) => {
    console.info(`Xem dự án: ${project.name} (ID: ${project.id})`);
  };

  const handleUpdate = (project: ProjectReview) => {
    console.info(`Cập nhật dự án: ${project.name} (ID: ${project.id})`);
  };

  const handleDelete = (id: number) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    console.info("Đã xóa dự án");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Title level={3} style={{ marginBottom: 2, letterSpacing: -0.3 }}>
              Dự án cần đánh giá
            </Title>
            <Text>
              {filteredProjects.length}
              {statusFilter === "all" ? "" : ""} / {projects.length} dự án
              {statusFilter === "all" ? " đang chờ review" : " phù hợp bộ lọc"}
            </Text>
          </div>

          {statuses.length > 1 && (
            <Segmented
              value={statusFilter}
              onChange={(v) => setStatusFilter(v as string)}
              options={[
                { label: "Tất cả", value: "all" },
                ...statuses.map((s) => ({ label: String(s), value: s })),
              ]}
            />
          )}
        </div>

        {/* Grid */}
        {filteredProjects.length === 0 ? (
          <Empty
            image={
              <FolderOpenOutlined
                style={{ fontSize: 48, color: "#c1c5cd" }}
              />
            }
            description={
              <span className="text-zinc-500">
                {projects.length === 0
                  ? "Chưa có dự án nào cần đánh giá. Dự án mới sẽ hiện ở đây."
                  : "Không có dự án nào khớp với bộ lọc hiện tại."}
              </span>
            }
            style={{
              marginTop: 60,
              padding: "48px 0",
              background: "#fff",
              borderRadius: 16,
              border: "1px dashed #e4e7ec",
            }}
          />
        ) : (
          <Row gutter={[20, 20]}>
            {filteredProjects.map((project) => (
              <Col key={project.id} xs={24} sm={12} lg={8} xl={6}>
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
                      {/* Location nổi bật, đặt sát mép dưới ảnh */}
                      <div className="absolute bottom-2.5 left-3 z-10 flex max-w-[calc(100%-24px)] items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-medium text-zinc-800 shadow-[0_2px_6px_rgba(16,24,40,0.18)] backdrop-blur-sm">
                        <EnvironmentOutlined className="text-indigo-600" />
                        <span className="truncate">{project.location}</span>
                      </div>
                    </div>
                  }
                >
                  {/* Lớp phủ blur + action buttons, chỉ hiện khi hover vào card */}
                  <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 rounded-2xl bg-white/70 opacity-0 backdrop-blur-[4px] transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
                    {/* Info */}
                    <div className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 shadow-sm">
                      <ClockCircleOutlined className="text-slate-500" />

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

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Tooltip title="Xem chi tiết">
                        <Button
                          type="default"
                          shape="circle"
                          size="large"
                          icon={<EyeOutlined />}
                          onClick={() => handleView(project)}
                          className="shadow-md transition-transform hover:scale-105"
                        />
                      </Tooltip>

                      <Tooltip title="Chỉnh sửa">
                        <Button
                          type="default"
                          shape="circle"
                          size="large"
                          icon={<EditOutlined />}
                          onClick={() => handleUpdate(project)}
                          className="shadow-md transition-transform hover:scale-105"
                        />
                      </Tooltip>

                      <Popconfirm
                        title="Xóa dự án"
                        description="Bạn có chắc muốn xóa dự án này?"
                        onConfirm={() => handleDelete(project.id)}
                        okText="Xóa"
                        cancelText="Hủy"
                        okButtonProps={{ danger: true }}
                      >
                        <Tooltip title="Xóa">
                          <Button
                            danger
                            shape="circle"
                            size="large"
                            icon={<DeleteOutlined />}
                            className="shadow-md transition-transform hover:scale-105"
                          />
                        </Tooltip>
                      </Popconfirm>
                    </div>
                  </div>

                  <Paragraph
                    ellipsis={{ rows: 2 }}
                    style={{
                      marginBottom: 10,
                      fontWeight: 600,
                      fontSize: 15,
                      lineHeight: '22px',
                      minHeight: '44px',
                    }}
                  >
                    {project.name}
                  </Paragraph>

                  {/* <Space size="middle">
                    <Text className="text-sm">
                      <PictureOutlined className="mr-1 text-black" />
                      {project.media.images}
                    </Text>
                    <Text className="text-sm">
                      <VideoCameraOutlined className="mr-1 text-black" />
                      {project.media.videos}
                    </Text>
                  </Space> */}

                  <div className="mt-2.5 flex items-center justify-between border-t border-zinc-100 pt-2">
                    <Space size={8}>
                      <Avatar size={22} className="bg-indigo-500 text-[11px]">
                        {project.owner.name?.charAt(0)?.toUpperCase()}
                      </Avatar>
                      <Text type="secondary" style={{ fontSize: 12.5 }}>
                        {project.owner.name}
                      </Text>
                    </Space>

                    <Space size="middle">
                      <Text className="text-sm">
                        <PictureOutlined className="mr-1 text-black" />
                        {project.media.images}
                      </Text>
                      <Text className="text-sm">
                        <VideoCameraOutlined className="mr-1 text-black" />
                        {project.media.videos}
                      </Text>
                    </Space>
                    {/* <Text type="secondary" style={{ fontSize: 12 }}>
                      <ClockCircleOutlined className="mr-1" />
                      {formatDate(project.updated_at)}
                    </Text> */}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </main>
    </div>
  );
}