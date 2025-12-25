import { motion } from "framer-motion";
import { Home, Search, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="fixed inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5"></div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="text-9xl lg:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 leading-none">
              404
            </h1>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              ไม่พบหน้าที่คุณต้องการ
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              ขอโทษครับ หน้าที่คุณกำลังมองหาอาจถูกย้าย ลบ หรือไม่เคยมีอยู่จริง
            </p>
          </div>

          {/* Illustration */}
          <motion.div
            className="mb-8"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full flex items-center justify-center border border-blue-500/30">
              <Search size={48} className="text-blue-400" />
            </div>
          </motion.div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Home size={20} />
              กลับหน้าหลัก
            </motion.button>

            <motion.button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-semibold transition-all border border-slate-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={20} />
              กลับหน้าก่อนหน้า
            </motion.button>
          </div>

          {/* Helpful Links */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-slate-400 mb-4">หรือลองดูหน้าเหล่านี้:</p>
            <div className="flex flex-wrap gap-4 justify-center">
              {(
                [
                  { label: "หน้าหลัก", path: "/" },
                  { label: "ความเชี่ยวชาญ", path: "/#expertise" },
                  { label: "ผลงาน", path: "/#featured-projects" },
                  { label: "เกี่ยวกับเรา", path: "/#about" },
                  { label: "ติดต่อ", path: "/#contact" },
                  { label: "เกี่ยวกับผู้เขียน", path: "/about-me" },
                ] as const
              ).map((link) => (
                <button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  className="text-blue-400 hover:text-blue-300 underline underline-offset-4 transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
