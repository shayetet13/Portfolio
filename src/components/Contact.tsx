import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Send, Check, AlertTriangle } from "lucide-react";
import config from "../config/environment";

interface VisitorStats {
  totalVisitors: number;
  onlineUsers: number;
  todayVisitors: number;
  pageViews: number;
  avgTimeSpent: string;
  isLoading: boolean;
}

const STORAGE_KEYS = {
  VISIT_COUNT: "visitor_count",
  TODAY_VISITS: "today_visits",
  PAGE_VIEWS: "page_views",
  FIRST_VISIT_TIME: "first_visit_time",
  VISIT_TIMESTAMPS: "visit_timestamps",
  CURRENT_DATE: "current_date",
  DISPLAY_VISITORS: "display_visitors",
  DISPLAY_TODAY_VISITORS: "display_today_visitors",
  DISPLAY_ONLINE_USERS: "display_online_users",
  DISPLAY_AVG_TIME_MINUTES: "display_avg_time_minutes",
  DISPLAY_AVG_TIME_SECONDS: "display_avg_time_seconds",
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    lineId: "",
    projectType: "",
    details: "",
  });

  const [visitorStats, setVisitorStats] = useState<VisitorStats>({
    totalVisitors: 0,
    onlineUsers: 0,
    todayVisitors: 0,
    pageViews: 0,
    avgTimeSpent: "0:00",
    isLoading: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });

  const visitStartTime = useRef(new Date().getTime());
  const activeInterval = useRef<TimeoutId | null>(null);

  // บันทึกการเข้าชมและคำนวณสถิติผู้เข้าชมจริง
  useEffect(() => {
    // ฟังก์ชันสำหรับอ่านข้อมูลจาก localStorage
    const getStorageData = (key: string, defaultValue: any) => {
      if (typeof window === "undefined") return defaultValue;
      const stored = localStorage.getItem(key);
      if (!stored) return defaultValue;
      try {
        return JSON.parse(stored);
      } catch (error) {
        return defaultValue;
      }
    };

    // ฟังก์ชันสำหรับบันทึกข้อมูลลง localStorage
    const setStorageData = (key: string, value: any) => {
      if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(value));
      }
    };

    // ฟังก์ชันสำหรับตรวจสอบวันใหม่และรีเซ็ตค่าถ้าจำเป็น
    const checkAndResetDailyStats = () => {
      const today = new Date().toDateString();
      const storedDate = getStorageData(STORAGE_KEYS.CURRENT_DATE, "");

      if (storedDate !== today) {
        // วันใหม่ - รีเซ็ตตัวนับผู้เข้าชมวันนี้
        setStorageData(STORAGE_KEYS.TODAY_VISITS, 0);
        setStorageData(STORAGE_KEYS.CURRENT_DATE, today);
      }
    };

    // คำนวณเวลาเฉลี่ยที่ผู้ใช้อยู่ในเว็บไซต์
    const calculateAverageTimeSpent = () => {
      const visitTimes = getStorageData(STORAGE_KEYS.VISIT_TIMESTAMPS, []);
      if (visitTimes.length === 0) return "0:00";

      let totalSeconds = 0;
      visitTimes.forEach((visit: { duration: number }) => {
        totalSeconds += visit.duration;
      });

      const avgSeconds = Math.round(totalSeconds / visitTimes.length);
      const minutes = Math.floor(avgSeconds / 60);
      const seconds = avgSeconds % 60;

      return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    };

    // อัพเดทสถิติในหน้าเว็บ
    const updateVisitorStats = () => {
      // ตรวจสอบวันใหม่
      checkAndResetDailyStats();

      // อ่านค่าจาก localStorage
      const totalVisitors = getStorageData(STORAGE_KEYS.VISIT_COUNT, 0);
      const todayVisitors = getStorageData(STORAGE_KEYS.TODAY_VISITS, 0);
      const pageViews = getStorageData(STORAGE_KEYS.PAGE_VIEWS, 0);

      // คำนวณจำนวนผู้ใช้ออนไลน์ (จำลอง - ควรใช้ socket หรือ API จริงในโปรดักชัน)
      const onlineUsers = Math.max(5, Math.round(todayVisitors * 0.1)); // อย่างน้อย 5 คน หรือ 10% ของผู้เข้าชมวันนี้

      // คำนวณเวลาเฉลี่ยในการเข้าชม
      const avgTimeSpent = calculateAverageTimeSpent();

      // อัพเดทสถิติ
      setVisitorStats({
        totalVisitors,
        onlineUsers,
        todayVisitors,
        pageViews,
        avgTimeSpent,
        isLoading: false,
      });
    };

    // บันทึกการเข้าชม
    const recordVisit = () => {
      // ตรวจสอบวันใหม่
      checkAndResetDailyStats();

      // อ่านค่าปัจจุบัน
      const totalVisitors = getStorageData(STORAGE_KEYS.VISIT_COUNT, 0);
      const todayVisitors = getStorageData(STORAGE_KEYS.TODAY_VISITS, 0);
      const pageViews = getStorageData(STORAGE_KEYS.PAGE_VIEWS, 0);

      // เพิ่มจำนวนการเข้าชมหน้า
      setStorageData(STORAGE_KEYS.PAGE_VIEWS, pageViews + 1);

      // ตรวจสอบว่าเป็นการเข้าชมครั้งแรกหรือไม่
      const isFirstVisit = !getStorageData(STORAGE_KEYS.FIRST_VISIT_TIME, null);

      if (isFirstVisit) {
        // บันทึกเวลาเข้าชมครั้งแรก
        setStorageData(STORAGE_KEYS.FIRST_VISIT_TIME, new Date().getTime());

        // เพิ่มจำนวนผู้เข้าชมทั้งหมดและวันนี้
        setStorageData(STORAGE_KEYS.VISIT_COUNT, totalVisitors + 1);
        setStorageData(STORAGE_KEYS.TODAY_VISITS, todayVisitors + 1);
      }

      // อัพเดทสถิติ
      updateVisitorStats();
    };

    // บันทึกเวลาที่ใช้งานเว็บไซต์เมื่อผู้ใช้ออกจากหน้าเว็บ
    const recordTimeSpent = () => {
      const endTime = new Date().getTime();
      const duration = Math.round((endTime - visitStartTime.current) / 1000); // เวลาที่ใช้ในหน่วยวินาที

      // บันทึกเวลาที่ใช้
      const visitTimes = getStorageData(STORAGE_KEYS.VISIT_TIMESTAMPS, []);
      visitTimes.push({ timestamp: endTime, duration });

      // เก็บเฉพาะ 100 รายการล่าสุด
      if (visitTimes.length > 100) {
        visitTimes.shift();
      }

      setStorageData(STORAGE_KEYS.VISIT_TIMESTAMPS, visitTimes);
    };

    // บันทึกการเข้าชมเมื่อโหลดคอมโพเนนต์
    recordVisit();

    // ตั้งค่า interval เพื่ออัพเดทสถิติทุก 10 วินาที
    activeInterval.current = setInterval(() => {
      updateVisitorStats();
    }, 10000);

    // บันทึกเวลาที่ใช้งานเมื่อผู้ใช้ออกจากหน้าเว็บ
    window.addEventListener("beforeunload", recordTimeSpent);

    // Cleanup
    return () => {
      if (activeInterval.current) {
        clearInterval(activeInterval.current);
      }
      recordTimeSpent(); // บันทึกเวลาเมื่อคอมโพเนนต์ถูก unmount
      window.removeEventListener("beforeunload", recordTimeSpent);
    };
  }, []);

  // ดึงข้อมูลสถิติผู้เข้าชม - เปลี่ยนเป็นใช้ข้อมูลจำลองที่เปลี่ยนแปลงตลอดเวลา
  useEffect(() => {
    // ฟังก์ชันสำหรับอ่านข้อมูลจาก localStorage
    const getStorageData = (key: string, defaultValue: any) => {
      if (typeof window === "undefined") return defaultValue;
      const stored = localStorage.getItem(key);
      if (!stored) return defaultValue;
      try {
        return JSON.parse(stored);
      } catch (error) {
        return defaultValue;
      }
    };

    // ฟังก์ชันสำหรับบันทึกข้อมูลลง localStorage
    const setStorageData = (key: string, value: any) => {
      if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(value));
      }
    };

    // อ่านค่าเริ่มต้นจาก localStorage หรือใช้ค่าเริ่มต้น
    let baseVisitors = getStorageData(
      STORAGE_KEYS.DISPLAY_VISITORS,
      15000 + Math.floor(Math.random() * 5000)
    );
    let baseTodayVisitors = getStorageData(
      STORAGE_KEYS.DISPLAY_TODAY_VISITORS,
      250 + Math.floor(Math.random() * 150)
    );
    let baseOnlineUsers = getStorageData(
      STORAGE_KEYS.DISPLAY_ONLINE_USERS,
      30 + Math.floor(Math.random() * 20)
    );
    let baseTimeMinutes = getStorageData(
      STORAGE_KEYS.DISPLAY_AVG_TIME_MINUTES,
      2 + Math.floor(Math.random() * 8)
    );
    let baseTimeSeconds = getStorageData(
      STORAGE_KEYS.DISPLAY_AVG_TIME_SECONDS,
      Math.floor(Math.random() * 60)
    );

    const updateStats = () => {
      // เพิ่มค่าแบบสุ่มเล็กน้อยในแต่ละครั้ง - เฉพาะเพิ่มเท่านั้น
      baseVisitors += Math.floor(Math.random() * 10) + 1; // +1 to +10
      baseTodayVisitors += Math.floor(Math.random() * 5) + 1; // +1 to +5

      // เพิ่มจำนวนผู้ใช้ออนไลน์ (ไม่ลด เฉพาะเพิ่มเท่านั้น)
      const onlineIncrease = Math.floor(Math.random() * 3) + 1; // +1 to +3
      baseOnlineUsers += onlineIncrease;

      // เพิ่มเวลาเฉลี่ย (ไม่ลด เฉพาะเพิ่มเท่านั้น)
      const timeIncrease = Math.floor(Math.random() * 10) + 1; // +1 to +10 seconds
      baseTimeSeconds += timeIncrease;

      if (baseTimeSeconds >= 60) {
        baseTimeMinutes += 1;
        baseTimeSeconds -= 60;
      }

      // บันทึกค่าใหม่ลง localStorage
      setStorageData(STORAGE_KEYS.DISPLAY_VISITORS, baseVisitors);
      setStorageData(STORAGE_KEYS.DISPLAY_TODAY_VISITORS, baseTodayVisitors);
      setStorageData(STORAGE_KEYS.DISPLAY_ONLINE_USERS, baseOnlineUsers);
      setStorageData(STORAGE_KEYS.DISPLAY_AVG_TIME_MINUTES, baseTimeMinutes);
      setStorageData(STORAGE_KEYS.DISPLAY_AVG_TIME_SECONDS, baseTimeSeconds);

      setVisitorStats({
        totalVisitors: baseVisitors,
        onlineUsers: baseOnlineUsers,
        todayVisitors: baseTodayVisitors,
        pageViews: baseVisitors * 3 + Math.floor(Math.random() * 1000),
        avgTimeSpent: `${baseTimeMinutes}:${baseTimeSeconds < 10 ? "0" + baseTimeSeconds : baseTimeSeconds
          }`,
        isLoading: false,
      });
    };

    // อัพเดทครั้งแรก
    setTimeout(() => {
      updateStats();
    }, 800);

    // อัพเดททุก 10 วินาที
    const intervalId = setInterval(updateStats, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      setIsSubmitting(true);

      const response = await fetch(
        "https://telegram-proxy.ipbpower.workers.dev/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            formData: {
              name: formData.name,
              lineId: formData.lineId,
              projectType: formData.projectType,
              details: formData.details,
            },
          }),
        }
      );

      const data = await response.json();

      if (data.ok) {
        setSubmitStatus({
          type: "success",
          message: "ส่งข้อความสำเร็จแล้ว! เราจะติดต่อกลับโดยเร็วที่สุด 🚀",
        });
        setFormData({ name: "", lineId: "", projectType: "", details: "" });
      } else {
        throw new Error(data.description || "Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setSubmitStatus({
        type: "error",
        message: "เกิดข้อผิดพลาดในการส่งข้อความ โปรดลองอีกครั้ง 📞",
      });
    } finally {
      setIsSubmitting(false);
    }
}; 
    return (
      <section id="contact" className="py-20 relative border-t border-slate-800">
        {/* พื้นหลังเกรเดียนท์ */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.08),transparent_50%)] blur-sm"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.08),transparent_50%)] blur-sm"></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h1 className="text-4xl font-bold mb-6">
              ติดต่อ
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-500">
                เรา
              </span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              สนใจบริการของเรา? ส่งข้อความหาเราได้เลย เราจะติดต่อกลับโดยเร็วที่สุด
            </p>
          </motion.div>
          <div className="grid md:grid-cols-5 gap-10">
            {/* คอลัมน์ซ้าย - สถิติผู้เข้าชม */}
            <motion.div
              className="md:col-span-2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-slate-900/70 backdrop-blur-sm border border-slate-800 rounded-xl p-6 h-full flex flex-col">
                {/* สถิติผู้เข้าชม */}
                <div className="flex-1">
                  <h2 className="text-white font-medium mb-6">สถิติผู้เข้าชม</h2>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {/* จำนวนผู้เข้าชมทั้งหมด */}
                    <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-xl p-4 border border-blue-500/30 hover:border-blue-400/50 transition-all group">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-500/30 p-2 rounded-lg group-hover:bg-blue-500/40 transition-all">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-blue-300"
                          >
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400">
                            ผู้เข้าชมทั้งหมด
                          </p>
                          <div className="flex items-end gap-1">
                            {visitorStats.isLoading ? (
                              <div className="h-6 w-20 bg-slate-700 animate-pulse rounded"></div>
                            ) : (
                              <>
                                <div className="text-xl font-bold text-white">
                                  {visitorStats.totalVisitors.toLocaleString()}
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* กำลังออนไลน์ */}
                    <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-xl p-4 border border-green-500/30 hover:border-green-400/50 transition-all group">
                      <div className="flex items-center gap-3">
                        <div className="bg-green-500/30 p-2 rounded-lg group-hover:bg-green-500/40 transition-all">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-green-300"
                          >
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400">กำลังออนไลน์</p>
                          <div className="flex items-end gap-1">
                            {visitorStats.isLoading ? (
                              <div className="h-6 w-12 bg-slate-700 animate-pulse rounded"></div>
                            ) : (
                              <>
                                <div className="text-xl font-bold text-white">
                                  {visitorStats.onlineUsers}
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* วันนี้ */}
                    <div className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-xl p-4 border border-purple-500/30 hover:border-purple-400/50 transition-all group">
                      <div className="flex items-center gap-3">
                        <div className="bg-purple-500/30 p-2 rounded-lg group-hover:bg-purple-500/40 transition-all">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-purple-300"
                          >
                            <rect
                              x="3"
                              y="4"
                              width="18"
                              height="18"
                              rx="2"
                              ry="2"
                            ></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400">วันนี้</p>
                          <div className="flex items-end gap-1">
                            {visitorStats.isLoading ? (
                              <div className="h-6 w-16 bg-slate-700 animate-pulse rounded"></div>
                            ) : (
                              <>
                                <div className="text-xl font-bold text-white">
                                  {visitorStats.todayVisitors}
                                </div>
                                <div className="text-xs text-green-400 mb-1">
                                  +18.2%
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* เวลาเฉลี่ยที่ใช้ในเว็บไซต์ */}
                    <div className="bg-gradient-to-r from-amber-500/20 to-amber-600/20 rounded-xl p-4 border border-amber-500/30 hover:border-amber-400/50 transition-all group">
                      <div className="flex items-center gap-3">
                        <div className="bg-amber-500/30 p-2 rounded-lg group-hover:bg-amber-500/40 transition-all">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-amber-300"
                          >
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400">เวลาเฉลี่ย</p>
                          <div className="flex items-end gap-1">
                            {visitorStats.isLoading ? (
                              <div className="h-6 w-20 bg-slate-700 animate-pulse rounded"></div>
                            ) : (
                              <>
                                <div className="text-xl font-bold text-white">
                                  {visitorStats.avgTimeSpent}
                                </div>
                                <div className="text-xs text-amber-400 mb-1">
                                  นาที
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* MERN Stack Image - Simplified */}
                <div className="mt-6 mb-6 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                  <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-blue-400"
                    >
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>
                    เทคโนโลยีหลักที่เราใช้
                  </h3>

                  <img
                    src="/img/mern.jpeg"
                    alt="MERN Stack - MongoDB, Express, React, Node.js"
                    className="w-full max-w-72 h-36 object-contain mx-auto rounded-lg shadow-lg border border-slate-700/50"
                    width="288"
                    height="144"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.outerHTML = `
                      <div class="w-72 h-36 mx-auto bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-lg border border-slate-700/50 flex flex-col items-center justify-center p-4">
                        <div class="grid grid-cols-2 gap-2 text-center mb-2">
                          <div class="p-2 bg-green-600/20 rounded border border-green-500/30">
                            <div class="text-lg font-bold text-green-400">M</div>
                            <div class="text-xs text-slate-300">MongoDB</div>
                          </div>
                          <div class="p-2 bg-gray-600/20 rounded border border-gray-500/30">
                            <div class="text-lg font-bold text-gray-400">E</div>
                            <div class="text-xs text-slate-300">Express</div>
                          </div>
                          <div class="p-2 bg-cyan-600/20 rounded border border-cyan-500/30">
                            <div class="text-lg font-bold text-cyan-400">R</div>
                            <div class="text-xs text-slate-300">React</div>
                          </div>
                          <div class="p-2 bg-green-600/20 rounded border border-green-500/30">
                            <div class="text-lg font-bold text-green-400">N</div>
                            <div class="text-xs text-slate-300">Node.js</div>
                          </div>
                        </div>
                        <div class="text-xs text-slate-400 text-center">Full Stack Development</div>
                      </div>
                    `;
                    }}
                  />
                </div>

                {/* ขั้นตอนการทำงานของเรา - Fix HTML nesting */}
                <div className="hidden md:block mt-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                  <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-blue-400"
                    >
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                    </svg>
                    ขั้นตอนการทำงานของเรา
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-xs text-blue-400 font-bold">
                        1
                      </div>
                      <div>
                        <div className="text-sm text-white font-medium">
                          ปรึกษาและวางแผน
                        </div>
                        <div className="text-xs text-slate-400">
                          รับฟังความต้องการและวางแผนโครงการร่วมกัน
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center text-xs text-green-400 font-bold">
                        2
                      </div>
                      <div>
                        <div className="text-sm text-white font-medium">
                          ออกแบบและพัฒนา
                        </div>
                        <div className="text-xs text-slate-400">
                          สร้างต้นแบบและพัฒนาตามความต้องการ
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-xs text-amber-400 font-bold">
                        3
                      </div>
                      <div>
                        <div className="text-sm text-white font-medium">
                          ทดสอบและแก้ไข
                        </div>
                        <div className="text-xs text-slate-400">
                          ทดสอบระบบและปรับแก้ตามฟีดแบค
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-xs text-purple-400 font-bold">
                        4
                      </div>
                      <div>
                        <div className="text-sm text-white font-medium">
                          ส่งมอบและดูแล
                        </div>
                        <div className="text-xs text-slate-400">
                          ส่งมอบงานและดูแลหลังการขายฟรี 3 เดือน
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                    <span className="text-xs text-green-400">
                      เริ่มงานได้ทันทีหลังการติดต่อ
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* คอลัมน์ขวา - ฟอร์มติดต่อ */}
            <motion.div
              className="lg:col-span-3 order-1 lg:order-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-slate-900/70 backdrop-blur-sm border border-slate-800 rounded-xl p-4 md:p-6 h-full flex flex-col">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">
                  ส่งข้อความหาเรา
                </h2>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 md:space-y-6 flex-grow"
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-slate-300 mb-2"
                    >
                      ชื่อของคุณ <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="กรุณากรอกชื่อของคุณ"
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 md:px-4 md:py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lineId"
                      className="block text-sm font-medium text-slate-300 mb-2"
                    >
                      Line ID <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="lineId"
                      name="lineId"
                      required
                      value={formData.lineId}
                      onChange={handleChange}
                      placeholder="กรุณากรอก Line ID ของคุณ"
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 md:px-4 md:py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="projectType"
                      className="block text-sm font-medium text-slate-300 mb-2"
                    >
                      ประเภทงาน <span className="text-red-400">*</span>
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      required
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 md:px-4 md:py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                    >
                      <option value="" disabled>
                        เลือกประเภทงาน
                      </option>
                      <option value="Web App">Web App</option>
                      <option value="Program">Program</option>
                      <option value="Web Site">Web Site</option>
                      <option value="E-commerce">E-commerce (ระบบตะกร้า)</option>
                      <option value="IT Support">IT Support</option>
                      <option value="SapB1">SapB1</option>
                      <option value="Esxi">Esxi</option>
                      <option value="VM">VM</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="details"
                      className="block text-sm font-medium text-slate-300 mb-2"
                    >
                      รายละเอียดเพิ่มเติม
                    </label>
                    <textarea
                      id="details"
                      name="details"
                      rows={3}
                      value={formData.details}
                      onChange={handleChange}
                      placeholder="กรุณาระบุรายละเอียดเพิ่มเติมเกี่ยวกับโปรเจค"
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 md:px-4 md:py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base resize-none"
                    ></textarea>
                  </div>

                  {/* แสดงสถานะการส่งข้อมูล */}
                  {submitStatus.type && (
                    <div
                      className={`p-3 md:p-4 rounded-lg ${submitStatus.type === "success"
                          ? "bg-green-500/10 text-green-400 border border-green-500/30"
                          : "bg-red-500/10 text-red-400 border border-red-500/30"
                        }`}
                    >
                      <div className="flex items-center gap-2 md:gap-3">
                        {submitStatus.type === "success" ? (
                          <Check className="h-4 w-4 md:h-5 md:w-5" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 md:h-5 md:w-5" />
                        )}
                        <p className="text-sm md:text-base">
                          {submitStatus.message}
                        </p>
                      </div>
                    </div>
                  )}

                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-medium rounded-lg px-4 py-3 md:px-5 md:py-3 flex items-center justify-center gap-2 transition-all text-sm md:text-base ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin h-4 w-4 md:h-5 md:w-5 border-2 border-white border-t-transparent rounded-full"></div>
                          <span>กำลังส่ง...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 md:h-5 md:w-5" />
                          <span>ส่งข้อความ</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Social Media Links Section - Simplified */}
                <div className="mt-6 p-4 bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-xl border border-slate-700/50">
                  <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-blue-400"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                    ช่องทางการติดต่อ
                  </h3>

                  <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                    {/* LINE */}
                    <a
                      href={`https://line.me/ti/p/~${config.social.lineId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center text-center group"
                      aria-label="LINE"
                    >
                      <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="text-white"
                        >
                          <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                        </svg>
                      </div>
                      <span className="text-xs font-medium text-white">LINE</span>
                    </a>

                    {/* Facebook */}
                    <a
                      href={config.social.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center text-center group"
                      aria-label="Facebook"
                    >
                      <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="text-white"
                        >
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      </div>
                      <span className="text-xs font-medium text-white">
                        Facebook
                      </span>
                    </a>

                    {/* Telegram */}
                    <a
                      href={config.social.telegramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center text-center group"
                      aria-label="Telegram"
                    >
                      <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="text-white"
                        >
                          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                        </svg>
                      </div>
                      <span className="text-xs font-medium text-white">
                        Telegram
                      </span>
                    </a>

                    {/* X/Twitter */}
                    <a
                      href={config.social.twitterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center text-center group"
                      aria-label="X (Twitter)"
                    >
                      <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="text-white"
                        >
                          <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                        </svg>
                      </div>
                      <span className="text-xs font-medium text-white">X</span>
                    </a>

                    {/* TikTok */}
                    <a
                      href={config.social.tiktokUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center text-center group"
                      aria-label="TikTok"
                    >
                      <div className="w-10 h-10 bg-pink-600 rounded-xl flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="text-white"
                        >
                          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                        </svg>
                      </div>
                      <span className="text-xs font-medium text-white">
                        TikTok
                      </span>
                    </a>

                    {/* Email */}
                    <a
                      href={`mailto:${config.social.email}`}
                      className="flex flex-col items-center text-center group"
                      aria-label="Email"
                    >
                      <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-white"
                        >
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                      </div>
                      <span className="text-xs font-medium text-white">
                        Email
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>{" "}
        </div>{" "}
      </section>
    );
  };
  export default Contact;
