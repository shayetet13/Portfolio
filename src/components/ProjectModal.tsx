import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  CheckCircle,
  AlertTriangle,
  type LucideIcon,
} from "lucide-react";

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
    budget: "",
    timeline: "",
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
    // สร้างข้อมูลฟอร์ม (ไม่ต้องสร้างข้อความเอง — Worker สร้างให้)
    const formDataToSend = {
      name: formData.name,
      lineId: formData.lineId,
      projectType: serviceTitle, // ใช้ชื่อบริการเป็นประเภทงาน
      details: `${formData.details}\n\n💰 งบประมาณ: ${formData.budget}\n⏰ ระยะเวลา: ${formData.timeline}`,
    };

    const response = await fetch(
      "https://telegram-proxy.ipbpower.workers.dev/contact", // ← ใช้ URL จริงของคุณ
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData: formDataToSend,
        }),
      }
    );

    const data = await response.json();

    if (data.ok) {
      setSubmitStatus({
        type: "success",
        message: "ส่งข้อความสำเร็จ! เราจะติดต่อกลับภายใน 24 ชั่วโมง",
      });

      setFormData({ name: "", lineId: "", details: "", budget: "", timeline: "" });

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
      message: "เกิดข้อผิดพลาดในการส่งข้อความ กรุณาลองอีกครั้ง",
    });
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  {ServiceIcon && (
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                      <ServiceIcon size={20} className="text-white" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      ติดต่อสำหรับ
                    </h3>
                    <p className="text-blue-400 font-medium">{serviceTitle}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-800"
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
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Line ID หรือ Email<span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="lineId"
                    required
                    value={formData.lineId}
                    onChange={handleChange}
                    placeholder="Line ID หรือ E-mail"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    รายละเอียดโครงการ <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="details"
                    required
                    rows={4}
                    value={formData.details}
                    onChange={handleChange}
                    placeholder="กรุณาอธิบายรายละเอียดโครงการที่ต้องการ..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* Status Message */}
                {submitStatus.type && (
                  <motion.div
                    className={`p-4 rounded-lg ${
                      submitStatus.type === "success"
                        ? "bg-green-500/10 text-green-400 border border-green-500/30"
                        : "bg-red-500/10 text-red-400 border border-red-500/30"
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-center gap-3">
                      {submitStatus.type === "success" ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <AlertTriangle className="h-5 w-5" />
                      )}
                      <p>{submitStatus.message}</p>
                    </div>
                  </motion.div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg px-5 py-3 flex items-center justify-center gap-2 transition-all ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                      <span>กำลังส่ง...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>ส่งข้อความ</span>
                    </>
                  )}
                </button>

                <p className="text-xs text-slate-400 text-center">
                  เราจะติดต่อกลับภายใน 24 ชั่วโมง ผ่าน Line ID หรือ Email ที่คุณให้ไว้
                </p>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
