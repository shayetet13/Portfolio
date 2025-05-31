import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  Check,
  AlertTriangle,
  Loader,
  type LucideIcon,
} from "lucide-react";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceTitle: string;
  serviceIcon?: LucideIcon;
}

const TELEGRAM_BOT_TOKEN = "7499202173:AAH0u99APw0cqEswfLNfuRu447w-QDpLj9c";
const TELEGRAM_CHAT_ID = "471795698";

const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  serviceTitle,
  serviceIcon: Icon,
}) => {
  const [formData, setFormData] = useState({
    service: serviceTitle,
    name: "",
    contact: "",
    description: "",
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
🚀 ติดต่องานใหม่!

👤 ชื่อ: ${formData.name}
📋 บริการที่สนใจ: ${formData.service}
📞 ติดต่อกลับ: ${formData.contact}
📝 รายละเอียดงาน: ${formData.description}

⏰ เวลาที่ติดต่อ: ${new Date().toLocaleString("th-TH")}
      `;

      const response = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: "HTML",
          }),
        }
      );

      const data = await response.json();

      if (data.ok) {
        setSubmitStatus({
          type: "success",
          message: "ส่งข้อความสำเร็จ! เราจะติดต่อกลับโดยเร็วที่สุด 🎉",
        });
        // รีเซ็ตฟอร์มหลังจาก 2 วินาที
        setTimeout(() => {
          setFormData({
            service: serviceTitle,
            name: "",
            contact: "",
            description: "",
          });
          setSubmitStatus({ type: null, message: "" });
          onClose();
        }, 2000);
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setSubmitStatus({
        type: "error",
        message: "เกิดข้อผิดพลาด กรุณาลองอีกครั้งหรือติดต่อผ่านช่องทางอื่น",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-md bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="relative p-6 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 border-b border-slate-700/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {Icon && (
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <Icon size={20} className="text-white" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      ติดต่อขอคำปรึกษา
                    </h3>
                    <p className="text-sm text-slate-300">{serviceTitle}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Service Type */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  บริการที่สนใจ
                </label>
                <div className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200">
                  {serviceTitle}
                </div>
              </div>

              {/* Name Field */}
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
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Contact Info */}
              <div>
                <label
                  htmlFor="contact"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Line ID / Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  required
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="กรุณากรอก Line ID หรือ Email"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  อธิบายงานที่ต้องการ <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  required
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="กรุณาอธิบายรายละเอียดงานที่ต้องการ เช่น ฟีเจอร์ที่ต้องการ งบประมาณ ระยะเวลา..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                />
              </div>

              {/* Status Message */}
              {submitStatus.type && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg border ${
                    submitStatus.type === "success"
                      ? "bg-green-500/10 text-green-400 border-green-500/30"
                      : "bg-red-500/10 text-red-400 border-red-500/30"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {submitStatus.type === "success" ? (
                      <Check className="h-5 w-5 flex-shrink-0" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                    )}
                    <p className="text-sm">{submitStatus.message}</p>
                  </div>
                </motion.div>
              )}

              {/* Submit Button */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-all"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || submitStatus.type === "success"}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-500 hover:via-purple-500 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="h-4 w-4 animate-spin" />
                      กำลังส่ง...
                    </>
                  ) : submitStatus.type === "success" ? (
                    <>
                      <Check className="h-4 w-4" />
                      ส่งแล้ว
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      ส่งข้อความ
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
