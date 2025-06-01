import { motion, AnimatePresence } from "framer-motion";
import { X, Send, type LucideIcon } from "lucide-react";
import { useState } from "react";
import {
  config,
  getTelegramBotUrl,
  getTelegramConfig,
} from "../config/environment";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceTitle: string;
  serviceIcon?: LucideIcon;
}

const ProjectModal = ({
  isOpen,
  onClose,
  serviceTitle,
  serviceIcon: ServiceIcon,
}: ProjectModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    lineId: "",
    details: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const message = `
🚀 ต้องการใช้บริการ: ${serviceTitle}
👤 ชื่อ: ${formData.name}
📱 Line ID: ${formData.lineId}
📝 รายละเอียด: ${formData.details}
🌐 มาจากเว็บไซต์: ${config.siteUrl}
⏰ เวลา: ${new Date().toLocaleString("th-TH")}
      `;

      const contactBotConfig = getTelegramConfig("contact");

      const response = await fetch(
        `${getTelegramBotUrl("contact")}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: contactBotConfig.chatId,
            text: message,
            parse_mode: "HTML",
            disable_web_page_preview: true,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.ok) {
        setSubmitStatus({
          type: "success",
          message: "ส่งข้อความสำเร็จแล้ว! เราจะติดต่อกลับโดยเร็วที่สุด 🚀",
        });
        setFormData({ name: "", lineId: "", details: "" });
        setTimeout(() => {
          onClose();
          setSubmitStatus({ type: null, message: "" });
        }, 3000);
      } else {
        throw new Error(data.description || "Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setSubmitStatus({
        type: "error",
        message: "เกิดข้อผิดพลาด โปรดลองอีกครั้ง 📞",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-slate-900 border border-slate-700/50 rounded-2xl p-6 w-full max-w-md"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                {ServiceIcon && (
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <ServiceIcon size={20} className="text-white" />
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-bold text-white">
                    ต้องการใช้บริการ
                  </h3>
                  <p className="text-sm text-slate-400">{serviceTitle}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  ชื่อของคุณ <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="กรุณากรอกชื่อของคุณ"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Line ID <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="lineId"
                  required
                  value={formData.lineId}
                  onChange={handleChange}
                  placeholder="กรุณากรอก Line ID ของคุณ"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  รายละเอียดเพิ่มเติม
                </label>
                <textarea
                  name="details"
                  rows={3}
                  value={formData.details}
                  onChange={handleChange}
                  placeholder="กรุณาระบุรายละเอียดเพิ่มเติมเกี่ยวกับงานที่ต้องการ"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Status Message */}
              {submitStatus.type && (
                <div
                  className={`p-3 rounded-lg ${
                    submitStatus.type === "success"
                      ? "bg-green-500/10 text-green-400 border border-green-500/30"
                      : "bg-red-500/10 text-red-400 border border-red-500/30"
                  }`}
                >
                  <p className="text-sm">{submitStatus.message}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg px-4 py-3 flex items-center justify-center gap-2 transition-all ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>กำลังส่ง...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>ส่งข้อความ</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
