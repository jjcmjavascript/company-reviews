import type { ThemeConfig } from 'antd';

export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: '#1890ff',
    colorPrimaryHover: '#40a9ff',
    colorPrimaryActive: '#096dd9',
    colorBgBase: '#f5f5f5',
  },
  components: {
    Layout: {
      headerBg: '#1890ff',
      headerColor: '#ffffff',
    },
    Button: {
      borderRadius: 6,
      colorPrimary: '#1890ff',
      colorPrimaryHover: '#40a9ff',
      colorPrimaryActive: '#096dd9',
      colorPrimaryBorder: '#1890ff',
      defaultBg: '#52c41a',
      defaultHoverBg: '#73d13d',
      defaultActiveBg: '#389e0d',
      defaultBorderColor: '#52c41a',
      defaultColor: '#ffffff',
    },
  },
};
  