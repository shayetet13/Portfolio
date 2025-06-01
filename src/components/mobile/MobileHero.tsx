import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Code, Smartphone, Zap } from "lucide-react";

const MobileHero = () => {
  const [currentCode, setCurrentCode] = useState(0);
  const [displayText, setDisplayText] = useState("");

  const codeSnippets = [
    "const dev = new Developer()",
    "dev.code('Mobile First')",
    "dev.build('Fast Apps')",
    "dev.deploy('Production')",
  ];

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentSnippet = codeSnippets[currentCode];
    let index = 0;

    const typeText = () => {
      if (index < currentSnippet.length) {
        setDisplayText(currentSnippet.slice(0, index + 1));
        index++;
        timeout = setTimeout(typeText, 60);
      } else {
        timeout = setTimeout(() => {
          setCurrentCode((prev) => (prev + 1) % codeSnippets.length);
        }, 2000);
      }
    };

    typeText();
    return () => clearTimeout(timeout);
  }, [currentCode]);

  return (
    <section className="min-h-screen flex flex-col justify-center relative pt-16 px-4 bg-black overflow-hidden pb-20">
      {/* Mobile Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:16px_16px]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/8 via-purple-500/8 to-cyan-500/8"></div>

      <div className="container mx-auto relative z-10 text-center max-w-sm">
        {/* Mobile Header */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-900/70 border border-slate-700/50 backdrop-blur-sm rounded-full text-xs text-slate-300 mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Smartphone size={12} className="text-blue-400" />
            Mobile Dev
          </motion.div>

          <h1 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight">
            <span className="text-white">Full Stack</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
              Developer
            </span>
          </h1>

          <p className="text-slate-400 text-sm leading-relaxed break-words">
            พัฒนาเว็บและแอปมืออาชีพ
            <br />
            <span className="text-blue-400 font-medium text-xs block mt-1">
              React • Node.js • TypeScript
            </span>
          </p>
        </motion.div>

        {/* Mobile Code Terminal */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="bg-slate-900/90 border border-slate-700/50 rounded-xl overflow-hidden backdrop-blur-sm">
            <div className="flex items-center gap-2 p-3 bg-slate-800/50 border-b border-slate-700">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-xs text-slate-400 font-mono truncate">
                terminal
              </span>
            </div>
            <div className="p-3">
              <div className="font-mono text-xs">
                <div className="text-green-400 mb-1 text-xs">
                  $ dev@mobile:~
                </div>
                <div className="text-cyan-400 min-h-[1rem] break-all text-xs">
                  {displayText}
                  <span className="animate-pulse text-green-400">|</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mobile Stats */}
        <motion.div
          className="grid grid-cols-3 gap-2 mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {[
            { label: "Projects", value: "100+", icon: Code },
            { label: "Years", value: "7+", icon: Zap },
            { label: "Clients", value: "50+", icon: Smartphone },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-slate-900/80 border border-slate-700/50 rounded-lg p-2 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
            >
              <div className="flex items-center justify-center mb-1">
                <stat.icon size={14} className="text-blue-400" />
              </div>
              <div className="text-sm font-bold text-white truncate">
                {stat.value}
              </div>
              <div className="text-xs text-slate-400 truncate">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile CTA Buttons */}
        <motion.div
          className="space-y-3 mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <motion.button
            onClick={() => {
              document.getElementById("featured-projects")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-all shadow-lg text-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            ดูผลงาน
          </motion.button>

          <motion.button
            onClick={() => {
              document.getElementById("contact")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
            className="w-full border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white py-3 px-6 rounded-lg font-semibold transition-all backdrop-blur-sm text-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            ติดต่อเรา
          </motion.button>
        </motion.div>

        {/* Mobile Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <motion.div
            className="flex flex-col items-center text-slate-400"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-xs mb-1">Scroll</span>
            <ChevronDown size={16} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MobileHero;
