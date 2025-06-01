import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const About = () => {
  const [currentCommand, setCurrentCommand] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const terminalCommands = ["who am i"];

  const terminalOutputs = [
    {
      command: "whoami",
      output: [
        `ผมไม่ใช่ Dev ที่รู้ทุกอย่าง แต่ผมคือ Dev ที่ ลุยได้ทุกอย่าง เริ่มต้นจากความชอบ ลากไปจนกลายเป็นอาชีพ และตอนนี้กลายเป็นชีวิตไปแล้ว ผมรักการเขียนโปรแกรมพอ ๆ กับการดื่มกาแฟตอนตีสองเพื่อไล่บั๊กตัวสุดท้ายให้พ้นทาง

        มีประสบการณ์ทั้งฝั่ง Frontend และ Backend ใช้ React,Next.js ทำเว็บหน้าตาดี ใช้ Node.js,Express API แบบเรียบง่ายแต่แข็งแรง เก็บข้อมูลด้วย MongoDB หรือบางทีแค่ JSON ธรรมดา ถ้าระบบมันไม่ซับซ้อน เขียน Python ไว้ช่วยชีวิตเวลาเรื่องมันวุ่นเกินควบคุม
        
        ลุยงานสาย IT Support แบบไม่มีพัก ปัญหาเล็กก็ซัด ปัญหาใหญ่ก็สวน เจอมาหมดตั้งแต่ “WiFi งอแงเพราะหมาเดินชนเร้าเตอร์” ยัน “คอมเปิดไม่ติดเพราะยูสเซอร์ลืมเสียบปลั๊ก” แก้ได้หมด ไม่มีบ่น ไม่มีโวย โหมดทำงานคือนิ่ง รวดเร็ว แม่นยำ เสียบปุ๊บเจอปัญหา แก้ปั๊บไม่ทิ้งร่องรอย จบงานแบบมือโปร ลูกค้าขำตอนเล่า แต่อุ่นใจตอนใช้ เพราะรู้ว่าไม่ว่าจะพังแค่ไหน ผมก็ซ่อมให้กลับมาวิ่งได้เหมือนไม่เคยล่ม

        สกิลหลัก ของผมไม่ใช่แค่ “เขียนโค้ดได้” แต่คือ “เข้าใจปัญหา” และ “แก้ให้จบ”
        ไม่ว่าจะโปรเจกต์เล็ก โปรเจกต์ใหญ่ งานด่วน งานเดือด — ผมพร้อมเข้าไปจัดการให้มันเวิร์ก

        เพราะสุดท้ายแล้ว โค้ดที่ดีไม่ใช่แค่โค้ดที่รันได้
        แต่คือโค้ดที่เข้าใจง่าย ดูแลง่าย และทำให้ชีวิตคนอื่นง่ายขึ้น`,
      ],
    },
  ];

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentOutput = terminalOutputs[currentCommand];

    // Reset และเริ่มใหม่
    setTypedText("");
    setIsTyping(true);

    // รวมข้อความทั้งหมดเป็น string เดียว
    const fullText = currentOutput.output.join("\n");
    let charIndex = 0;

    const typeText = () => {
      if (charIndex < fullText.length) {
        setTypedText(fullText.slice(0, charIndex + 1));
        charIndex++;
        timeout = setTimeout(typeText, 80); // <-- ความเร็วการพิมพ์ 80ms
      } else {
        setIsTyping(false);
        timeout = setTimeout(() => {
          setCurrentCommand((prev) => (prev + 1) % terminalCommands.length);
        }, 3000); // <-- หน่วงเวลาก่อนเปลี่ยนข้อความ 3 วินาที
      }
    };

    // รอสักครู่ก่อนเริ่มพิมพ์
    timeout = setTimeout(typeText, 500);

    return () => clearTimeout(timeout);
  }, [currentCommand]);

  return (
    <section
      id="about"
      className="py-16 md:py-20 relative overflow-hidden border-t border-slate-800"
      style={{ background: "#090c1c" }}
    >
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-2">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-500">
              Me
            </span>
          </h2>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Terminal Section */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-slate-900 border-2 border-slate-700/50 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(76,29,149,0.15)]">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 p-3 bg-[#0c1223] border-b border-slate-700">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-sm font-mono">
                  <span className="ml-1">about-me.sh</span>
                </div>
              </div>

              {/* Terminal Content */}
              <div className="p-6 font-mono text-base min-h-[300px] bg-[#0f172a]">
                <div className="space-y-2">
                  <div className="text-green-400">
                    <span className="text-blue-400">developer@portfolio</span>
                    <span className="text-slate-400">:</span>
                    <span className="text-purple-400">~</span>
                    <span className="text-slate-400">$</span>
                  </div>

                  <div className="text-cyan-400 font-bold">
                    {terminalCommands[currentCommand]}
                  </div>

                  <div
                    className={`whitespace-pre-line min-h-[200px] font-mono text-base leading-relaxed ${
                      currentCommand === 0
                        ? "text-green-400"
                        : currentCommand === 1
                        ? "text-yellow-300"
                        : currentCommand === 2
                        ? "text-blue-300"
                        : "text-pink-300"
                    }`}
                  >
                    {typedText}
                    {isTyping && (
                      <span className="animate-pulse text-green-400">|</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid - Similar to the image */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {[
              {
                label: "Projects",
                value: "1000+",
                icon: "🚀",
                color: "from-rose-400 to-red-500",
              },
              {
                label: "Experience",
                value: "7Y+",
                icon: "⚡",
                color: "from-amber-400 to-orange-500",
              },
              {
                label: "Coffee",
                value: "∞",
                icon: "☕",
                color: "from-indigo-400 to-purple-500",
              },
              {
                label: "Code",
                value: "100K+",
                icon: "💻",
                color: "from-cyan-400 to-blue-500",
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center p-4 bg-[#0f172a] border border-slate-800 rounded-xl hover:border-slate-600/50 transition-colors"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-2xl md:text-3xl mb-2">{stat.icon}</div>
                <div
                  className={`text-2xl md:text-4xl font-bold mb-1 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                >
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-slate-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
