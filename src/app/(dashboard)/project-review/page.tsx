"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Typography,
  Empty,
  Segmented,
  InputNumber,
  Pagination,
  message,
  Input,
  Button,
  Popover,
  Badge,
} from "antd";

import {
  FolderOpen,
  Search as SearchIcon,
  Filter as FilterIcon,
  RotateCw as ReloadIcon,
  Smartphone,
  Tablet,
  Monitor,
} from "lucide-react";

import projectsData from "@/data-sheet/project-reviews.json";
import { ProjectReview } from "@/models/ProjectReview.model";
import { formatDate } from "@/helpers/format.helper";
import { statusTag } from "@/components/Tag";
import SampleCard1 from "./components/SampleCard1";
import SampleCard2 from "./components/SampleCard2";
import SampleCard3 from "./components/SampleCard3";
import SampleCard4 from "./components/SampleCard4";
import SampleCard5 from "./components/SampleCard5";
import SampleCard6 from "./components/SampleCard6";
import SampleCard7 from "./components/SampleCard7";
import SampleCard8 from "./components/SampleCard8";

const { Title, Text } = Typography;

const formatProjectDate = (date: string | Date) =>
  formatDate(date instanceof Date ? date.toISOString() : date);

const GRID_GAP = 20; // px, khoảng cách giữa các card
const MIN_CARD_WIDTH = 200; // px, bề rộng đẹp nhất / nhỏ nhất cho 1 card
const DEFAULT_COLUMNS = 4;
const MIN_COLUMNS = 1;
const MAX_COLUMNS = 6; // trần cứng, không phụ thuộc bề rộng màn hình

const DEFAULT_PAGE_SIZE = 10;
const PAGE_SIZE_OPTIONS = ["10", "20", "50", "100"];

const SAMPLE_TYPES = [
  { key: "mau-1", label: "Mẫu 1", Card: SampleCard1 },
  { key: "mau-2", label: "Mẫu 2", Card: SampleCard2 },
  { key: "mau-3", label: "Mẫu 3", Card: SampleCard3 },
  { key: "mau-4", label: "Mẫu 4", Card: SampleCard4 },
  { key: "mau-5", label: "Mẫu 5", Card: SampleCard5 },
  { key: "mau-6", label: "Mẫu 6", Card: SampleCard6 },
  // { key: "mau-7", label: "Mẫu 7", Card: SampleCard7 },
  { key: "mau-8", label: "Mẫu 8", Card: SampleCard8 },
] as const;

type DeviceKey = "mobile" | "tablet" | "pc";

const DEVICE_OPTIONS: { label: React.ReactNode; value: DeviceKey }[] = [
  {
    value: "mobile",
    label: (
      <span className="flex items-center gap-1.5 px-1">
        <Smartphone size={14} />
        Mobile
      </span>
    ),
  },
  {
    value: "tablet",
    label: (
      <span className="flex items-center gap-1.5 px-1">
        <Tablet size={14} />
        Tablet
      </span>
    ),
  },
  {
    value: "pc",
    label: (
      <span className="flex items-center gap-1.5 px-1">
        <Monitor size={14} />
        PC
      </span>
    ),
  },
];

// Bề rộng mô phỏng cho từng thiết bị khi xem trước responsive
const DEVICE_MAX_WIDTH: Record<DeviceKey, number | string> = {
  mobile: 390,
  tablet: 834,
  pc: "100%",
};

export default function Review() {
  const [projects, setProjects] = useState<ProjectReview[]>(projectsData);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeSample, setActiveSample] = useState<string>(SAMPLE_TYPES[0].key);
  const [device, setDevice] = useState<DeviceKey>("pc");

  const statuses = useMemo(
    () => Array.from(new Set(projects.map((p) => p.status))),
    [projects]
  );

  const filteredProjects = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    return projects.filter((p) => {
      const matchStatus = statusFilter === "all" || p.status === statusFilter;
      const matchKeyword = !keyword || p.name?.toLowerCase().includes(keyword);
      return matchStatus && matchKeyword;
    });
  }, [projects, statusFilter, searchTerm]);

  const currentSample =
    SAMPLE_TYPES.find((s) => s.key === activeSample) ?? SAMPLE_TYPES[0];

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

  const handleReload = () => {
    setProjects(projectsData);
    setStatusFilter("all");
    setSearchTerm("");
    message.success("Đã tải lại danh sách dự án");
  };

  const isPreviewingDevice = device !== "pc";

  return (
    <div className="w-full bg-white">
      <main className="mx-auto w-full px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Input
            allowClear
            placeholder="Tìm kiếm dự án theo tên..."
            prefix={<SearchIcon size={16} color="#8a94a6" />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ maxWidth: 360 }}
          />

          <div className="flex items-center gap-2">
            {statuses.length > 1 && (
              <Popover
                trigger="click"
                placement="bottomRight"
                content={
                  <Segmented
                    value={statusFilter}
                    onChange={(v) => setStatusFilter(v as string)}
                    options={[
                      { label: "Tất cả", value: "all" },
                      ...statuses.map((s) => ({ label: String(s), value: s })),
                    ]}
                  />
                }
              >
                <Badge dot={statusFilter !== "all"} offset={[-4, 4]}>
                  <Button icon={<FilterIcon size={15} />}>Bộ lọc</Button>
                </Badge>
              </Popover>
            )}

            <Button icon={<ReloadIcon size={15} />} onClick={handleReload}>
              Tải lại
            </Button>
          </div>
        </div>

        {/* Thanh chuyển đổi mẫu + xem trước responsive */}
        <div className="mb-8 flex flex-col gap-3 rounded-2xl border border-[#e4e7ec] bg-[#fafbfc] p-3 sm:flex-row sm:items-center sm:justify-between">
          <Segmented
            value={activeSample}
            onChange={(v) => setActiveSample(v as string)}
            options={SAMPLE_TYPES.map((s) => ({ label: s.label, value: s.key }))}
          />

          <Segmented
            value={device}
            onChange={(v) => setDevice(v as DeviceKey)}
            options={DEVICE_OPTIONS}
          />
        </div>

        {filteredProjects.length === 0 ? (
          <Empty
            image={<FolderOpen style={{ fontSize: 48, color: "#c1c5cd" }} />}
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
          <div
            className="mx-auto w-full transition-[max-width] duration-300 ease-in-out"
            style={{
              maxWidth: DEVICE_MAX_WIDTH[device],
              ...(isPreviewingDevice && {
                border: "1px solid #e4e7ec",
                borderRadius: 20,
                padding: "20px 16px",
                boxShadow: "0 8px 24px rgba(16, 24, 40, 0.06)",
                background: "#fff",
              }),
            }}
          >
            <SampleSection
              key={currentSample.key}
              title={currentSample.label}
              projects={filteredProjects}
              CardComponent={currentSample.Card}
              onView={handleView}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          </div>
        )}
      </main>
    </div>
  );
}

interface SampleSectionProps {
  title: string;
  projects: ProjectReview[];
  CardComponent: React.ComponentType<{
    project: ProjectReview;
    statusTag: (status: string) => React.ReactNode;
    formatDate: (date: string | Date) => string;
    onView: (project: ProjectReview) => void;
    onUpdate: (project: ProjectReview) => void;
    onDelete: (id: number) => void;
  }>;
  onView: (project: ProjectReview) => void;
  onUpdate: (project: ProjectReview) => void;
  onDelete: (id: number) => void;
}

function SampleSection({
  title,
  projects,
  CardComponent,
  onView,
  onUpdate,
  onDelete,
}: SampleSectionProps) {
  const [messageApi, contextHolder] = message.useMessage();

  const [columnsInput, setColumnsInput] = useState<number>(DEFAULT_COLUMNS);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);

  const gridRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  // Theo dõi bề rộng thực tế của khu vực hiển thị grid để tính số cột tối đa
  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect?.width;
      if (width) setContainerWidth(width);
    });

    observer.observe(el);
    setContainerWidth(el.clientWidth);

    return () => observer.disconnect();
  }, []);

  // Số cột tối đa mà bề rộng hiện tại có thể chứa mà vẫn giữ mỗi card >= MIN_CARD_WIDTH
  const maxColumnsByWidth = useMemo(() => {
    if (!containerWidth) return MAX_COLUMNS;
    const columnsFit = Math.floor(
      (containerWidth + GRID_GAP) / (MIN_CARD_WIDTH + GRID_GAP)
    );
    return Math.max(MIN_COLUMNS, Math.min(MAX_COLUMNS, columnsFit));
  }, [containerWidth]);

  // Số cột thực sự dùng để render = nhỏ hơn giữa số người dùng nhập và số tối đa theo bề rộng
  const effectiveColumns = Math.min(columnsInput, maxColumnsByWidth);

  const handleColumnsChange = (value: number | null) => {
    const next = value ?? DEFAULT_COLUMNS;
    setColumnsInput(next);
  };

  // Reset về trang 1 nếu danh sách/pageSize thay đổi khiến trang hiện tại không còn hợp lệ
  const totalPages = Math.max(1, Math.ceil(projects.length / pageSize));
  const safePage = Math.min(page, totalPages);

  const pagedProjects = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return projects.slice(start, start + pageSize);
  }, [projects, safePage, pageSize]);

  const handlePaginationChange = (nextPage: number, nextPageSize: number) => {
    if (nextPageSize !== pageSize) {
      setPageSize(nextPageSize);
      setPage(1);
    } else {
      setPage(nextPage);
    }
  };

  return (
    <section>
      {contextHolder}

      <div className="mb-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Title level={4} style={{ marginBottom: 0 }}>
          {title}
        </Title>

        <div className="flex items-center gap-2">
          <Text type="secondary">Số cột:</Text>
          <InputNumber
            min={MIN_COLUMNS}
            max={MAX_COLUMNS}
            value={columnsInput}
            onChange={handleColumnsChange}
            style={{ width: 90 }}
          />
        </div>
      </div>

      {/* key thay đổi theo số cột/trang/kích thước trang -> ép render lại toàn bộ grid, tránh layout bị lỗi khi thay đổi */}
      <div
        key={`${effectiveColumns}-${safePage}-${pageSize}`}
        ref={gridRef}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${effectiveColumns}, minmax(0, 1fr))`,
          gap: GRID_GAP,
        }}
      >
        {pagedProjects.map((project) => (
          <CardComponent
            key={project.id}
            project={project}
            statusTag={statusTag}
            formatDate={formatProjectDate}
            onView={onView}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </div>

      {projects.length > 0 && (
        <div className="mt-6 flex justify-end">
          <Pagination
            current={safePage}
            total={projects.length}
            pageSize={pageSize}
            onChange={handlePaginationChange}
            showSizeChanger
            pageSizeOptions={PAGE_SIZE_OPTIONS}
          />
        </div>
      )}
    </section>
  );
}