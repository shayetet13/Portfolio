import { ReactNode } from "react";
import { useDeviceDetection } from "../hooks/useDeviceDetection";

interface ResponsiveWrapperProps {
  children?: ReactNode;
  mobileComponent?: ReactNode;
  tabletComponent?: ReactNode;
  desktopComponent?: ReactNode;
}

const ResponsiveWrapper = ({
  children,
  mobileComponent,
  tabletComponent,
  desktopComponent,
}: ResponsiveWrapperProps) => {
  const device = useDeviceDetection();

  // แสดง component เฉพาะสำหรับแต่ละอุปกรณ์
  if (device.isMobile && mobileComponent) {
    return <>{mobileComponent}</>;
  }

  if (device.isTablet && tabletComponent) {
    return <>{tabletComponent}</>;
  }

  if (device.isDesktop && desktopComponent) {
    return <>{desktopComponent}</>;
  }

  // แสดง children เป็น default
  return <>{children}</>;
};

export default ResponsiveWrapper;
