'use client';
import { ConfigProvider } from "antd";
import { LayoutWrapperProps } from "./types/props/LayoutWrapperProps";
import { Navigation } from "components/navigation/Navigation";
import { antdTheme } from "constants/antdTheme";

export const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
  return (
    <ConfigProvider theme={antdTheme}>
      <Navigation>
        {children}
      </Navigation>
    </ConfigProvider>
  );
};
