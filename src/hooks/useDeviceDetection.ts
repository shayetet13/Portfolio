import { useState, useEffect } from "react";

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  deviceType: "mobile" | "tablet" | "desktop";
  screenWidth: number;
  screenHeight: number;
  userAgent: string;
}

export const useDeviceDetection = (): DeviceInfo => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    deviceType: "desktop",
    screenWidth: 1920,
    screenHeight: 1080,
    userAgent: "",
  });

  useEffect(() => {
    const updateDeviceInfo = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const userAgent = navigator.userAgent;

      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const isDesktop = width >= 1024;

      let deviceType: "mobile" | "tablet" | "desktop" = "desktop";
      if (isMobile) deviceType = "mobile";
      else if (isTablet) deviceType = "tablet";

      setDeviceInfo({
        isMobile,
        isTablet,
        isDesktop,
        deviceType,
        screenWidth: width,
        screenHeight: height,
        userAgent,
      });
    };

    updateDeviceInfo();
    window.addEventListener("resize", updateDeviceInfo);

    return () => {
      window.removeEventListener("resize", updateDeviceInfo);
    };
  }, []);

  return deviceInfo;
};
