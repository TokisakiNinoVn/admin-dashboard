"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Typography,
  Empty,
  Segmented,
  InputNumber,
  Pagination,
  Divider,
  message,
} from "antd";

import { FolderOpen, List as ListIcon } from "lucide-react";

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

const { Title, Text } = Typography;

const GRID_GAP = 20; // px, khoảng cách giữa các card
const MIN_CARD_WIDTH = 250; // px, bề rộng đẹp nhất / nhỏ nhất cho 1 card
const DEFAULT_COLUMNS = 4;
const MIN_COLUMNS = 1;
const MAX_COLUMNS = 6; // trần cứng, không phụ thuộc bề rộng màn hình

const DEFAULT_PAGE_SIZE = 10;
const PAGE_SIZE_OPTIONS = ["10", "20", "50", "100"];

// Khoảng cách để phần đầu section không bị dính sát mép trên khi scroll tới (nếu sau này có sticky header)
const SCROLL_OFFSET = 24;

// Thêm mẫu mới ở đây khi tạo thêm SampleCardX
const SAMPLE_TYPES = [
  { key: "mau-1", label: "Mẫu 1", Card: SampleCard1 },
  { key: "mau-2", label: "Mẫu 2", Card: SampleCard2 },
  { key: "mau-3", label: "Mẫu 3", Card: SampleCard3 },
  { key: "mau-4", label: "Mẫu 4", Card: SampleCard4 },
  { key: "mau-5", label: "Mẫu 5", Card: SampleCard5 },
  { key: "mau-6", label: "Mẫu 6", Card: SampleCard6 },
] as const;

export default function Review() {
  const [projects, setProjects] = useState<ProjectReview[]>(projectsData);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [activeSection, setActiveSection] = useState<string>(SAMPLE_TYPES[0].key);

  // Lưu ref DOM của từng section theo key để mục lục có thể scroll tới
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

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

  const scrollToSection = (key: string) => {
    const el = sectionRefs.current[key];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Theo dõi section nào đang hiển thị trong viewport để highlight mục lục tương ứng
  useEffect(() => {
    if (filteredProjects.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]?.target) {
          const key = (visible[0].target as HTMLElement).dataset.sectionKey;
          if (key) setActiveSection(key);
        }
      },
      {
        root: null,
        rootMargin: "-15% 0px -70% 0px",
        threshold: 0,
      }
    );

    SAMPLE_TYPES.forEach((sample) => {
      const el = sectionRefs.current[sample.key];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [filteredProjects.length]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:pr-44">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Title level={3} style={{ marginBottom: 2, letterSpacing: -0.3 }}>
              Dự án cần đánh giá
            </Title>
            <Text>
              {filteredProjects.length} / {projects.length} dự án
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
          <div className="flex flex-col gap-10">
            {SAMPLE_TYPES.map((sample, idx) => (
              <div
                key={sample.key}
                data-section-key={sample.key}
                ref={(el) => {
                  sectionRefs.current[sample.key] = el;
                }}
                style={{ scrollMarginTop: SCROLL_OFFSET }}
              >
                {idx > 0 && <Divider style={{ margin: "8px 0 32px" }} />}
                <SampleSection
                  title={sample.label}
                  projects={filteredProjects}
                  CardComponent={sample.Card}
                  onView={handleView}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                />
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Mục lục các mẫu - cố định bên phải màn hình, chỉ hiện ở màn hình lớn */}
      {filteredProjects.length > 0 && (
        <TableOfContents
          items={SAMPLE_TYPES}
          activeKey={activeSection}
          onSelect={scrollToSection}
        />
      )}
    </div>
  );
}

interface TocItem {
  key: string;
  label: string;
}

interface TableOfContentsProps {
  items: readonly TocItem[];
  activeKey: string;
  onSelect: (key: string) => void;
}

function TableOfContents({ items, activeKey, onSelect }: TableOfContentsProps) {
  return (
    <nav
      className="hidden lg:flex"
      style={{
        position: "fixed",
        top: "50%",
        right: 24,
        transform: "translateY(-50%)",
        zIndex: 40,
        flexDirection: "column",
        gap: 4,
        background: "#fff",
        border: "1px solid #e4e7ec",
        borderRadius: 12,
        padding: "12px 8px",
        boxShadow: "0 6px 20px rgba(16, 24, 40, 0.08)",
        minWidth: 132,
      }}
      aria-label="Mục lục các mẫu"
    >
      {items.map((item) => {
        const isActive = item.key === activeKey;
        return (
          <button
            key={item.key}
            type="button"
            onClick={() => onSelect(item.key)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              border: "none",
              background: isActive ? "#eef2ff" : "transparent",
              color: isActive ? "#4338ca" : "#475467",
              fontWeight: isActive ? 600 : 400,
              fontSize: 13,
              textAlign: "left",
              padding: "6px 8px",
              borderRadius: 8,
              cursor: "pointer",
              transition: "background 0.15s ease, color 0.15s ease",
            }}
            onMouseEnter={(e) => {
              if (!isActive) e.currentTarget.style.background = "#f5f6f8";
            }}
            onMouseLeave={(e) => {
              if (!isActive) e.currentTarget.style.background = "transparent";
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                flexShrink: 0,
                background: isActive ? "#4338ca" : "#d0d5dd",
              }}
            />
            {item.label}
          </button>
        );
      })}
    </nav>
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
  const isClamped = columnsInput > maxColumnsByWidth;

  const handleColumnsChange = (value: number | null) => {
    const next = value ?? DEFAULT_COLUMNS;
    setColumnsInput(next);
    if (next > maxColumnsByWidth) {
      messageApi.warning(
        `Với bề rộng màn hình hiện tại, tối đa chỉ hiển thị đẹp được ${maxColumnsByWidth} cột (mỗi card tối thiểu ${MIN_CARD_WIDTH}px). Đã tự động điều chỉnh.`
      );
    }
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

      {/* <div className="mb-4">
        <Text type="secondary" style={{ fontSize: 12 }}>
          Tối đa {maxColumnsByWidth} cột với bề rộng hiện tại (min {MIN_CARD_WIDTH}px/card).
        </Text>
        {isClamped && (
          <Text type="warning" style={{ fontSize: 12, marginLeft: 8 }}>
            Đang hiển thị {effectiveColumns} cột thay vì {columnsInput} để tránh vỡ layout.
          </Text>
        )}
      </div> */}

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
            formatDate={formatDate}
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