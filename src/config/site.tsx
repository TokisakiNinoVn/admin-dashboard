import {
  FolderOutlined,
  ContainerOutlined,
  ProfileOutlined,
  GlobalOutlined,
  EnvironmentOutlined,
  DesktopOutlined,
  ClockCircleOutlined,
  TagOutlined,
  UserOutlined,
  SafetyOutlined,
  SettingOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";

export type MenuItem = Required<MenuProps>["items"][number];

export const menuItems: MenuItem[] = [
  {
    key: "projects",
    label: "Quản lý dự án",
    icon: <FolderOutlined />,
  },
  {
    key: "projects/review",
    label: "Dự án cần đánh giá",
    icon: <ContainerOutlined />,
    // badge không có sẵn trong MenuItem của AntD,
    // nếu cần badge thì dùng label custom hoặc extra render
  },
  {
    key: "projects/mine",
    label: "Dự án của tôi",
    icon: <ProfileOutlined />,
  },

  {
    type: "divider",
  },

  {
    type: "group",
    label: "Danh mục",
    children: [
      {
        key: "folders",
        label: "Thư mục",
        icon: <FolderOutlined />,
      },
      {
        key: "countries",
        label: "Quốc gia",
        icon: <GlobalOutlined />,
      },
      {
        key: "provinces",
        label: "Tỉnh/Thành phố",
        icon: <EnvironmentOutlined />,
      },
      {
        key: "resolutions",
        label: "Độ phân giải",
        icon: <DesktopOutlined />,
      },
      {
        key: "durations",
        label: "Thời lượng",
        icon: <ClockCircleOutlined />,
      },
      {
        key: "tags",
        label: "Thẻ",
        icon: <TagOutlined />,
      },
    ],
  },

  {
    type: "group",
    label: "Hệ thống",
    children: [
      {
        key: "accounts",
        label: "Quản lý tài khoản",
        icon: <UserOutlined />,
      },
      {
        key: "permissions",
        label: "Phân quyền",
        icon: <SafetyOutlined />,
      },
      {
        key: "settings",
        label: "Cấu hình",
        icon: <SettingOutlined />,
      },
      {
        key: "logs",
        label: "Log xử lý",
        icon: <UnorderedListOutlined />,
      },
    ],
  },
];