import { ReactElement } from "react";
import { useDeviceDetection } from "../hooks/useDeviceDetection";

interface ResponsiveWrapperProps {
  desktopComponent: ReactElement;
  mobileComponent: ReactElement;
  tabletComponent?: ReactElement;
}

const ResponsiveWrapper = ({
  desktopComponent,
  mobileComponent,
  tabletComponent,
}: ResponsiveWrapperProps) => {
  const device = useDeviceDetection();

  if (device.isMobile) {
    return mobileComponent;
  }

  if (device.isTablet && tabletComponent) {
    return tabletComponent;
  }

  return desktopComponent;
};

export default ResponsiveWrapper;
