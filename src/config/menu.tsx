import {
  FolderOutlined,
  FileSearchOutlined,
  FileOutlined,
  PictureOutlined,
  GlobalOutlined,
  EnvironmentOutlined,
  DesktopOutlined,
  ClockCircleOutlined,
  TagsOutlined,
  UserOutlined,
  SafetyOutlined,
  SettingOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';

export const menuItems = [
  {
    type: 'group',
    label: 'Nội dung',
    children: [
      {
        key: '/projects',
        icon: <FolderOutlined />,
        label: 'Quản lý dự án',
      },

      {
        key: '/project-review',
        icon: <FileSearchOutlined />,
        label: 'Dự án cần đánh giá',
      },

      {
        key: '/projects/mine',
        icon: <FileOutlined />,
        label: 'Dự án của tôi',
      },

      {
        key: '/media',
        icon: <PictureOutlined />,
        label: 'Quản lý Media',
      },
    ],
  },
  {
    type: 'group',
    label: 'Danh mục',
    children: [
      {
        key: '/folders',
        icon: <FolderOutlined />,
        label: 'Thư mục',
      },
      {
        key: '/countries',
        icon: <GlobalOutlined />,
        label: 'Quốc gia',
      },
      {
        key: '/provinces',
        icon: <EnvironmentOutlined />,
        label: 'Tỉnh/Thành phố',
      },
      {
        key: '/resolutions',
        icon: <DesktopOutlined />,
        label: 'Độ phân giải',
      },
      {
        key: '/durations',
        icon: <ClockCircleOutlined />,
        label: 'Thời lượng',
      },
      {
        key: '/tags',
        icon: <TagsOutlined />,
        label: 'Thẻ',
      },
    ],
  },

  {
    type: 'group',
    label: 'Hệ thống',
    children: [
      {
        key: '/accounts',
        icon: <UserOutlined />,
        label: 'Quản lý tài khoản',
      },
      {
        key: '/permissions',
        icon: <SafetyOutlined />,
        label: 'Phân quyền',
      },
      {
        key: '/settings',
        icon: <SettingOutlined />,
        label: 'Cấu hình',
      },
      {
        key: '/logs',
        icon: <UnorderedListOutlined />,
        label: 'Log xử lý',
      },
    ],
  },
];