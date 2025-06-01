import { useState, useEffect } from "react";

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenWidth: number;
  screenHeight: number;
  orientation: "portrait" | "landscape";
  touchEnabled: boolean;
  userAgent: string;
  deviceType: "mobile" | "tablet" | "desktop";
}

export const useDeviceDetection = (): DeviceInfo => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    screenWidth: 0,
    screenHeight: 0,
    orientation: "landscape",
    touchEnabled: false,
    userAgent: "",
    deviceType: "desktop",
  });

  useEffect(() => {
    const updateDeviceInfo = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const userAgent = navigator.userAgent;

      // ตรวจสอบ touch capability
      const touchEnabled =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;

      // ตรวจสอบประเภทอุปกรณ์จาก User Agent
      const mobileRegex =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      const tabletRegex = /iPad|Android.*Tablet|Tablet/i;

      // ตรวจสอบขนาดหน้าจอ - Mobile first approach
      const isMobile = width <= 768;
      const isTablet = width > 768 && width <= 1024;
      const isDesktop = width > 1024;

      // รวมการตรวจสอบจาก User Agent
      const isMobileByUA =
        mobileRegex.test(userAgent) && !tabletRegex.test(userAgent);
      const isTabletByUA = tabletRegex.test(userAgent);

      // กำหนดประเภทอุปกรณ์สุดท้าย
      let finalDeviceType: "mobile" | "tablet" | "desktop" = "desktop";
      let finalIsMobile = isMobile;
      let finalIsTablet = isTablet;
      let finalIsDesktop = isDesktop;

      // หากตรวจสอบจาก UA ได้ให้ใช้ค่านั้น
      if (isMobileByUA) {
        finalDeviceType = "mobile";
        finalIsMobile = true;
        finalIsTablet = false;
        finalIsDesktop = false;
      } else if (isTabletByUA) {
        finalDeviceType = "tablet";
        finalIsMobile = false;
        finalIsTablet = true;
        finalIsDesktop = false;
      } else if (isDesktop) {
        finalDeviceType = "desktop";
        finalIsMobile = false;
        finalIsTablet = false;
        finalIsDesktop = true;
      } else if (isTablet) {
        finalDeviceType = "tablet";
        finalIsMobile = false;
        finalIsTablet = true;
        finalIsDesktop = false;
      } else {
        finalDeviceType = "mobile";
        finalIsMobile = true;
        finalIsTablet = false;
        finalIsDesktop = false;
      }

      const orientation = width > height ? "landscape" : "portrait";

      setDeviceInfo({
        isMobile: finalIsMobile,
        isTablet: finalIsTablet,
        isDesktop: finalIsDesktop,
        screenWidth: width,
        screenHeight: height,
        orientation,
        touchEnabled,
        userAgent,
        deviceType: finalDeviceType,
      });
    };

    updateDeviceInfo();
    window.addEventListener("resize", updateDeviceInfo);
    window.addEventListener("orientationchange", updateDeviceInfo);

    return () => {
      window.removeEventListener("resize", updateDeviceInfo);
      window.removeEventListener("orientationchange", updateDeviceInfo);
    };
  }, []);

  return deviceInfo;
};
