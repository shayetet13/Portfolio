import { motion } from "framer-motion";
import { ArrowRight, Download, MessageCircle } from "lucide-react";

const MobileHero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>

      <motion.div
        className="text-center max-w-md mx-auto relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Profile Image */}
        <motion.div
          className="w-32 h-32 mx-auto mb-8 relative"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-4xl font-bold text-white">
            D
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-slate-950"></div>
        </motion.div>

        {/* Text Content */}
        <motion.h1
          className="text-3xl font-bold mb-4 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Dev เก๊า
        </motion.h1>

        <motion.p
          className="text-lg text-slate-300 mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Full Stack Developer
        </motion.p>

        <motion.p
          className="text-sm text-slate-400 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          พัฒนาเว็บไซต์ แอป โปรแกรม ระดับมืออาชีพ
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <button
            onClick={() =>
              document.getElementById("featured-projects")?.scrollIntoView({
                behavior: "smooth",
              })
            }
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:from-blue-700 hover:to-purple-700 transition-all"
          >
            ดูผลงาน
            <ArrowRight size={16} />
          </button>

          <button
            onClick={() =>
              document.getElementById("contact")?.scrollIntoView({
                behavior: "smooth",
              })
            }
            className="w-full border border-slate-600 text-slate-300 px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-slate-800 transition-all"
          >
            ติดต่อเรา
            <MessageCircle size={16} />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default MobileHero;
