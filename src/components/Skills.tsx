import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Globe,
  Smartphone,
  Server,
  Cpu,
  LifeBuoy,
  Headphones,
} from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend",
      icon: Globe,
      color: "from-blue-500 to-cyan-500",
      skills: [
        "React",
        "TypeScript",
        "Next.js",
        "Tailwind CSS",
        "Framer Motion",
      ],
    },
    {
      title: "Backend",
      icon: Server,
      color: "from-green-500 to-emerald-500",
      skills: ["Node.js", "Express", "Python", "Laravel", "API Development"],
    },
    {
      title: "Database",
      icon: Database,
      color: "from-purple-500 to-pink-500",
      skills: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase"],
    },
    {
      title: "Mobile",
      icon: Smartphone,
      color: "from-orange-500 to-red-500",
      skills: ["React Native", "Flutter", "Custom ROM", "Android Development"],
    },
    {
      title: "DevOps",
      icon: Cpu,
      color: "from-indigo-500 to-purple-500",
      skills: ["Docker", "AWS", "Netlify", "CI/CD", "Linux Server"],
    },
    {
      title: "Tools",
      icon: Code2,
      color: "from-teal-500 to-blue-500",
      skills: ["Git", "VS Code", "Figma", "Postman", "Chrome DevTools"],
    },
  ];

  // Technology orbit skills data - เพิ่มสีสันให้สวยงาม
  const orbitSkills = [
    {
      name: "MongoDB",
      color: "text-green-300",
      border: "border-green-400/50",
      bgGradient: "from-green-500/20 to-emerald-500/20",
      angle: 0,
    },
    {
      name: "PostgreSQL",
      color: "text-blue-300",
      border: "border-blue-400/50",
      bgGradient: "from-blue-500/20 to-cyan-500/20",
      angle: 30,
    },
    {
      name: "Python",
      color: "text-yellow-300",
      border: "border-yellow-400/50",
      bgGradient: "from-yellow-500/20 to-amber-500/20",
      angle: 60,
    },
    {
      name: "Node.js",
      color: "text-green-300",
      border: "border-green-400/50",
      bgGradient: "from-green-500/20 to-lime-500/20",
      angle: 90,
    },
    {
      name: "Docker",
      color: "text-sky-300",
      border: "border-sky-400/50",
      bgGradient: "from-sky-500/20 to-blue-500/20",
      angle: 120,
    },
    {
      name: "AWS",
      color: "text-orange-300",
      border: "border-orange-400/50",
      bgGradient: "from-orange-500/20 to-red-500/20",
      angle: 150,
    },
    {
      name: "IT Support",
      color: "text-purple-300",
      border: "border-purple-400/50",
      bgGradient: "from-purple-500/20 to-pink-500/20",
      angle: 180,
      icon: <LifeBuoy size={14} className="mr-1 text-purple-300" />,
    },
    {
      name: "Kubernetes",
      color: "text-indigo-300",
      border: "border-indigo-400/50",
      bgGradient: "from-indigo-500/20 to-purple-500/20",
      angle: 210,
    },
    {
      name: "React",
      color: "text-cyan-300",
      border: "border-cyan-400/50",
      bgGradient: "from-cyan-500/20 to-blue-500/20",
      angle: 240,
    },
    {
      name: "Next.js",
      color: "text-slate-300",
      border: "border-slate-400/50",
      bgGradient: "from-slate-500/20 to-gray-500/20",
      angle: 270,
    },
    {
      name: "Tech Support",
      color: "text-emerald-300",
      border: "border-emerald-400/50",
      bgGradient: "from-emerald-500/20 to-teal-500/20",
      angle: 300,
      icon: <Headphones size={14} className="mr-1 text-emerald-300" />,
    },
    {
      name: "Tailwind CSS",
      color: "text-teal-300",
      border: "border-teal-400/50",
      bgGradient: "from-teal-500/20 to-cyan-500/20",
      angle: 330,
    },
  ];

  return (
    <section
      id="expertise"
      className="py-20 relative border-t border-slate-800"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
              Technical
            </span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-violet-400 to-indigo-400">
              Expertise
            </span>
          </h2>
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-slate-400 text-lg max-w-2xl mx-auto">
            เทคโนโลยีและเครื่องมือที่ผมใช้ในการพัฒนาโปรเจคต่างๆ
          </p>
        </motion.div>

        {/* Technology Orbit Diagram */}
        <motion.div
          className="mb-20 relative"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto mt-16">
            <div className="relative w-full h-[520px] flex items-center justify-center">
              {/* Central node */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 w-36 h-36">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-2 border-transparent bg-clip-padding backdrop-blur-sm flex items-center justify-center relative">
                  {/* Gradient Border */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-70 blur-sm"></div>
                  <div className="absolute inset-0.5 rounded-full bg-gradient-to-br from-slate-900 to-slate-800"></div>

                  <div className="text-center relative z-10">
                    <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                      7+
                    </div>
                    <div className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-slate-400">
                      ปีประสบการณ์
                    </div>
                  </div>
                </div>
              </div>

              {/* Orbit circles */}
              <div className="absolute inset-0 w-full h-full">
                <div className="absolute inset-0 rounded-full border border-slate-700/30"></div>
                <div className="absolute inset-[60px] rounded-full border border-slate-600/25"></div>
                <div className="absolute inset-[120px] rounded-full border border-slate-500/20"></div>

                {/* Rotating orbital container */}
                <div className="absolute inset-0 w-full h-full animate-orbit">
                  {orbitSkills.map((skill, index) => (
                    <div
                      key={skill.name}
                      className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
                      style={{
                        transform: `translate(-50%, -50%) rotate(${skill.angle}deg) translateX(170px)`,
                      }}
                    >
                      <div
                        className={`px-3 py-1.5 bg-gradient-to-r ${skill.bgGradient} backdrop-blur-sm border-2 ${skill.border} rounded-lg hover:bg-gradient-to-r hover:from-black/95 hover:to-slate-900/95 transition-all duration-300 shadow-lg animate-counter-orbit relative group`}
                      >
                        {/* Glow Effect */}
                        <div
                          className={`absolute inset-0 rounded-lg bg-gradient-to-r ${skill.bgGradient} opacity-0 group-hover:opacity-30 blur-sm transition-all duration-300`}
                        ></div>

                        <div
                          className={`text-xs font-bold ${skill.color} flex items-center whitespace-nowrap relative z-10`}
                        >
                          {skill.icon && skill.icon}
                          {skill.name}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              className="bg-gradient-to-br from-black/95 to-slate-900/95 backdrop-blur-sm border-2 border-transparent bg-clip-padding rounded-2xl p-6 hover:border-slate-600/50 transition-all duration-300 relative group overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              {/* Animated Border */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-60 blur-sm transition-all duration-300`}
              ></div>

              {/* Border Gradient */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${category.color} opacity-20`}
              ></div>
              <div className="absolute inset-0.5 rounded-2xl bg-gradient-to-br from-black to-slate-900"></div>

              <div className="relative z-10">
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center shadow-lg`}
                  >
                    <category.icon size={24} className="text-white" />
                  </div>
                  <h3
                    className={`text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${category.color}`}
                  >
                    {category.title}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.1 + skillIndex * 0.05,
                      }}
                      viewport={{ once: true }}
                    >
                      <div
                        className={`w-2 h-2 bg-gradient-to-r ${category.color} rounded-full shadow-sm`}
                      ></div>
                      <span className="text-slate-200 font-medium">
                        {skill}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-2 border-transparent bg-clip-padding rounded-2xl p-8 max-w-2xl mx-auto relative overflow-hidden group">
            {/* Animated Border */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-50 blur-sm group-hover:opacity-70 transition-all duration-300"></div>
            <div className="absolute inset-0.5 rounded-2xl bg-gradient-to-br from-slate-900 to-black"></div>

            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-4">
                พร้อมสร้างสิ่งใหม่ๆ ร่วมกัน?
              </h3>
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-slate-400 mb-6">
                มาคุยกันเรื่องโปรเจคที่คุณอยากทำ เราจะช่วยทำให้มันเป็นจริง
              </p>
              <button
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-8 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-500 hover:via-purple-500 hover:to-cyan-500 text-white font-bold rounded-xl transition-all shadow-xl hover:shadow-2xl hover:scale-105 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">เริ่มโปรเจคใหม่</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
