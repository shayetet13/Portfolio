import { motion } from "framer-motion";
import { HeadphonesIcon, LifeBuoy } from "lucide-react";

const Skills = () => {
  return (
    <section
      id="expertise"
      className="py-20 relative border-t border-slate-800"
    >
      {/* พื้นหลังลูกเล่น */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-600/10 to-cyan-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* ลายเส้นตาราง */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        {/* หัวข้อ */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-6">
            ความ
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              เชี่ยวชาญ
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            มากกว่า 5
            ปีของประสบการณ์ในการพัฒนาซอฟต์แวร์ที่มีคุณภาพและประสิทธิภาพสูง
          </p>
        </motion.div>

        {/* Technology diagram with rotating skills around the central node */}
        <motion.div
          className="mb-20 relative"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto mt-16">
            {/* Container for the rotating skills with central node */}
            <div className="relative w-full h-[520px] flex items-center justify-center">
              {/* Central node - fixed in place */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 w-36 h-36">
                <div className="w-full h-full rounded-full bg-slate-900/80 border border-slate-700/50 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                      7+
                    </div>
                    <div className="text-sm text-slate-400">ปีประสบการณ์</div>
                  </div>
                </div>
              </div>

              {/* Technology tags in circular arrangement */}
              <div className="absolute inset-0 w-full h-full">
                {/* Circle 1 - Inner circle */}
                <div className="absolute inset-0 rounded-full border border-slate-700/20"></div>

                {/* Circle 2 - Middle circle */}
                <div className="absolute inset-[60px] rounded-full border border-slate-700/15"></div>

                {/* Circle 3 - Outer circle */}
                <div className="absolute inset-[120px] rounded-full border border-slate-700/10"></div>

                {/* Rotating orbital container - with improved floating effect */}
                <div className="absolute inset-0 w-full h-full animate-orbit">
                  {/* Skills positioned around the orbit - 12 skills */}
                  {[
                    {
                      name: "MongoDB",
                      color: "text-green-400",
                      border: "border-green-500/30",
                      angle: 0,
                    },
                    {
                      name: "PostgreSQL",
                      color: "text-blue-400",
                      border: "border-blue-500/30",
                      angle: 30,
                    },
                    {
                      name: "Python",
                      color: "text-yellow-400",
                      border: "border-yellow-500/30",
                      angle: 60,
                    },
                    {
                      name: "Node.js",
                      color: "text-green-400",
                      border: "border-green-500/30",
                      angle: 90,
                    },
                    {
                      name: "Docker",
                      color: "text-blue-400",
                      border: "border-blue-500/30",
                      angle: 120,
                    },
                    {
                      name: "AWS",
                      color: "text-orange-400",
                      border: "border-orange-500/30",
                      angle: 150,
                    },
                    {
                      name: "IT Support",
                      color: "text-purple-400",
                      border: "border-purple-500/30",
                      angle: 180,
                      icon: (
                        <LifeBuoy size={14} className="mr-1 text-purple-400" />
                      ),
                    },
                    {
                      name: "Kubernetes",
                      color: "text-blue-400",
                      border: "border-blue-500/30",
                      angle: 210,
                    },
                    {
                      name: "React",
                      color: "text-cyan-400",
                      border: "border-cyan-500/30",
                      angle: 240,
                    },
                    {
                      name: "Next.js",
                      color: "text-slate-400",
                      border: "border-slate-500/30",
                      angle: 270,
                    },
                    {
                      name: "Tech Support",
                      color: "text-blue-400",
                      border: "border-blue-500/30",
                      angle: 300,
                      icon: (
                        <HeadphonesIcon
                          size={14}
                          className="mr-1 text-blue-400"
                        />
                      ),
                    },
                    {
                      name: "Tailwind CSS",
                      color: "text-cyan-400",
                      border: "border-cyan-500/30",
                      angle: 330,
                    },
                  ].map((skill, index) => (
                    <div
                      key={skill.name}
                      className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
                      style={{
                        transform: `translate(-50%, -50%) rotate(${skill.angle}deg) translateX(170px) rotate(-${skill.angle}deg)`,
                      }}
                    >
                      <motion.div
                        className={`bg-slate-900/80 border ${skill.border} px-3 py-1.5 rounded-lg shadow-lg inline-block whitespace-nowrap animate-counter-orbit hover:shadow-xl transition-all`}
                        whileHover={{
                          y: -5,
                          scale: 1.05,
                          boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.3)",
                          transition: { duration: 0.2 },
                        }}
                        animate={{
                          y: [0, -4, 0],
                          transition: {
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse",
                            delay: index * 0.1,
                          },
                        }}
                      >
                        <span
                          className={`text-sm font-medium ${skill.color} flex items-center`}
                        >
                          {skill.icon}
                          {skill.name}
                        </span>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
