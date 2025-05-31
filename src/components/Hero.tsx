import { Terminal, Code, Cpu } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Hero = () => {
  const [currentCode, setCurrentCode] = useState(0);
  const [displayText, setDisplayText] = useState("");

  const codeSnippets = [
    "const developer = new FullStackDev()",
    "developer.code('React', 'TypeScript')",
    "developer.build('Amazing Projects')",
    "developer.deploy('Production Ready')",
  ];

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentSnippet = codeSnippets[currentCode];
    let index = 0;

    const typeText = () => {
      if (index < currentSnippet.length) {
        setDisplayText(currentSnippet.slice(0, index + 1));
        index++;
        timeout = setTimeout(typeText, 100);
      } else {
        timeout = setTimeout(() => {
          setCurrentCode((prev) => (prev + 1) % codeSnippets.length);
          setDisplayText("");
        }, 2000);
      }
    };

    typeText();
    return () => clearTimeout(timeout);
  }, [currentCode]);

  return (
    <section
      className="min-h-screen flex items-center justify-center relative pt-20 bg-black"
      id="home"
    >
      {/* พื้นหลังตาราง - ปรับสีเส้นและพื้นหลังให้เป็นสีดำ */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-500/30 rounded-full"
            animate={{
              x: [0, Math.random() * 100, 0],
              y: [0, Math.random() * 100, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-300">
                Available for new projects
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400">
                FULL STACK
              </span>
              <br />
              <span className="text-slate-100">DEVELOPER</span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              ไม่ต้องเสียงดัง…
              <br />
              ให้ระบบมันพูดแทน ผมคือ DEV ที่เลือกคุณภาพมากกว่าความวุ่นวาย
              <br />
              โค้ดทุกบรรทัดไม่ได้แค่ทำงาน แต่มัน "เข้าใจระบบ เข้าใจผู้ใช้"
              <br />
              เว็บหรือแอปที่พัฒนา ต้องลื่นไหล เสถียร และ พร้อมโตไปกับคุณ
              <br />
              ไม่พูดเยอะ เจ็บคอ
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <motion.button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const projectsSection =
                    document.getElementById("featured-projects");
                  if (projectsSection) {
                    projectsSection.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }}
              >
                <Code size={20} />
                View My Work
                <motion.div
                  className="group-hover:translate-x-1 transition-transform"
                  initial={{ x: 0 }}
                >
                  &rarr;
                </motion.div>
              </motion.button>
            </div>
          </motion.div>

          {/* Right Column - Terminal */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-slate-900/90 border border-slate-700 rounded-xl overflow-hidden backdrop-blur-sm">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 p-4 border-b border-slate-700 bg-slate-800/50">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <Terminal size={16} />
                  <span>developer@portfolio:~$</span>
                </div>
              </div>

              {/* Terminal Content */}
              <div className="p-6 font-mono text-sm">
                <div className="space-y-3">
                  <div className="text-slate-400">
                    <span className="text-green-400">➜</span> portfolio
                    git:(main)
                  </div>
                  <div className="text-blue-400">$ npm run showcase-skills</div>
                  <div className="text-slate-300">
                    <span className="text-green-400">✓</span> Loading developer
                    profile...
                  </div>
                  <div className="text-yellow-400 min-h-[24px]">
                    <span className="text-purple-400">→</span> {displayText}
                    <span className="animate-pulse">|</span>
                  </div>
                  <div className="text-slate-400">
                    <span className="text-cyan-400">📊</span> Performance: 99.9%
                    uptime
                  </div>
                  <div className="text-slate-400">
                    <span className="text-green-400">🚀</span> Status: Ready to
                    deploy
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Stats */}
            <motion.div
              className="absolute -top-6 -right-6 bg-slate-800/90 border border-slate-700 rounded-lg p-4 backdrop-blur-sm"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="flex items-center gap-2 text-green-400">
                <Cpu size={16} />
                <span className="font-mono text-sm">CPU: 100%</span>
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-6 -left-6 bg-slate-800/90 border border-slate-700 rounded-lg p-4 backdrop-blur-sm"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            >
              <div className="flex items-center gap-2 text-blue-400">
                <Code size={16} />
                <span className="font-mono text-sm">Lines: 50K+</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
