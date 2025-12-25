import { motion } from "framer-motion";
import { useState, useMemo, useCallback, useEffect } from "react";
import {
  Star,
  Code2,
  Smartphone,
  Globe,
  Wrench,
  Users,
  ArrowRight,
  Zap,
  type LucideIcon,
} from "lucide-react";

// Memoize static data to prevent recalculation
const servicesData = [
  {
    id: 1,
    title: "Web Development",
    subtitle: "เว็บไซต์ & ระบบจัดการ",
    description: "พัฒนา Web Site Web App ระดับมืออาชีพ ร้านค้าออนไลน์ ครบวงจร",
    services: [
      "Corporate Website",
      "E-commerce",
      "Website/Web App",
      "Admin Dashboard",
    ],
    tech: [
      "React",
      "Node.js",
      "MongoDB",
      "Html5",
      "typescript",
      "Tailwind CSS",
    ],
    gradient: "from-blue-600 to-cyan-500",
    bgGradient: "from-blue-500/10 to-cyan-500/10",
    icon: Globe,
    price: "เริ่มต้น 3,000",
    featured: true,
  },
  {
    id: 2,
    title: "Custom Software",
    subtitle: "โปรแกรมตามสั่ง",
    description:
      "พัฒนาซอฟต์แวร์เฉพาะทาง ระบบจัดการองค์กร ตอบโจทย์ทุกความต้องการ",
    services: ["Booking System", "POS System", "HR Management", "Custom Apps"],
    tech: ["Python", "Laravel", "Vue.js"],
    gradient: "from-purple-600 to-pink-500",
    bgGradient: "from-purple-500/10 to-pink-500/10",
    icon: Code2,
    price: "เริ่มต้น 15,000",
    featured: false,
  },
  {
    id: 3,
    title: "Mobile Service",
    subtitle: "ROM & Root Service",
    description:
      "ลง Custom ROM, Root Android, Unlock Bootloader, แก้ปัญหาเครื่อง Brick",
    services: ["Custom ROM", "Root Device", "Unlock Bootloader", "Fix Brick"],
    tech: ["Fastboot", "ADB", "Odin", "TWRP", "Magisk", "SP Flash Tool"],
    gradient: "from-green-600 to-emerald-500",
    bgGradient: "from-green-500/10 to-emerald-500/10",
    icon: Smartphone,
    price: "1,000",
    featured: false,
  },
  {
    id: 4,
    title: "IT Support",
    subtitle: "ซ่อม & ติดตั้ง",
    description: "ซ่อมคอม ติดตั้งระบบ แก้ไขปัญหา IT Support ครบวงจร",
    services: [
      "Computer Repair",
      "Software Install",
      "Network Setup",
      "กู้ข้อมูล",
    ],
    tech: ["Windows", "Network"],
    gradient: "from-orange-600 to-red-500",
    bgGradient: "from-orange-500/10 to-red-500/10",
    icon: Wrench,
    price: "500",
    featured: false,
  },
] as const;

// Optimize animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Fix the type definition for handleGetStarted
type ServiceType = (typeof servicesData)[number];

const Projects = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<{
    title: string;
    icon: LucideIcon;
  } | null>(null);

  // Dynamic stats state
  const [dynamicStats, setDynamicStats] = useState([
    { label: "ผู้เข้าชมทั้งหมด", value: "20,485", icon: Users },
    { label: "กำลังออนไลน์", value: "67", icon: Zap },
    { label: "วันนี้", value: "387", icon: Code2 },
    { label: "Success", value: "99%", icon: Star },
  ]);

  // Dynamic counter based on online users
  useEffect(() => {
    let totalVisitors = 20485;
    let todayVisitors = 387;
    let onlineUsers = 67;

    const updateStats = () => {
      // เพิ่มผู้ใช้ออนไลน์ขึ้นลงเล็กน้อย (แต่ไม่ต่ำกว่า 20)
      const onlineChange = Math.floor(Math.random() * 7) - 3; // -3 to +3
      onlineUsers = Math.max(20, Math.min(150, onlineUsers + onlineChange));

      // เพิ่มผู้เข้าชมวันนี้ตามจำนวนคนออนไลน์
      const todayIncrease =
        Math.floor(onlineUsers / 10) + Math.floor(Math.random() * 3); // ยิ่งคนออนไลน์เยอะ ยิ่งเพิ่มเยอะ
      todayVisitors += todayIncrease;

      // เพิ่มผู้เข้าชมทั้งหมด (ไม่ลดลงเด็ดขาด)
      const totalIncrease =
        Math.floor(todayIncrease * 0.8) + Math.floor(Math.random() * 5) + 1; // อย่างน้อย +1
      totalVisitors += totalIncrease;

      setDynamicStats([
        {
          label: "ผู้เข้าชมทั้งหมด",
          value: totalVisitors.toLocaleString(),
          icon: Users,
        },
        { label: "กำลังออนไลน์", value: onlineUsers.toString(), icon: Zap },
        { label: "วันนี้", value: todayVisitors.toString(), icon: Code2 },
        { label: "Success", value: "99%", icon: Star },
      ]);
    };

    // อัพเดททุก 8 วินาที
    const interval = setInterval(updateStats, 8000);

    return () => clearInterval(interval);
  }, []);

  // Memoize services and use dynamic stats
  const services = useMemo(() => servicesData, []);
  const stats = useMemo(() => dynamicStats, [dynamicStats]);

  const handleGetStarted = useCallback((service: ServiceType) => {
    setSelectedService({
      title: service.title,
      icon: service.icon,
    });
    setModalOpen(true);
  }, []);

  const scrollToContact = useCallback(() => {
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
    });
  }, []);

  return (
    <section
      id="featured-projects"
      className="py-16 md:py-20 border-t border-slate-800 relative overflow-hidden"
    >
      {/* Background Pattern - Optimized with will-change */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
        style={{ willChange: "transform" }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5"
        style={{ willChange: "transform" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/70 border border-slate-700/50 backdrop-blur-sm rounded-full text-sm text-slate-300 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Zap size={16} className="text-blue-400" />
            Professional Services
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Services </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
              Portfolio
            </span>
          </h1>

          <p className="text-lg max-w-2xl mx-auto mb-12 bg-gradient-to-br from-yellow-300 via-lime-400 to-green-400 bg-clip-text text-transparent font-bold leading-relaxed animate-gradient bg-300%">
            "ถ้าคุณกำลังหา Dev ที่ไม่ทิ้งงาน ไม่หนีหาย
            และยังทำให้เว็บหรือแอปคุณดูโคตรเท่ คุณมาถูกที่แล้ว! เราร้บพัฒนา Web
            App, Website, iOS, Android ด้วยเทคโนโลยีทันสมัย โค้ดสะอาด วิ่งลื่น
            พร้อมดูแลตั้งแต่วันแรกยันวัน Deploy บอกเลย...เราไม่เท!"
          </p>

          {/* Stats - Optimized with reduced motion */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                className="group"
                variants={fadeInUp}
                transition={{ duration: 0.4 }}
              >
                <div className="bg-slate-900/80 border border-slate-700/50 rounded-2xl p-4 hover:bg-slate-800/90 transition-colors duration-200 hover:border-slate-600/50 backdrop-blur-sm">
                  <div className="flex items-center justify-center mb-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <stat.icon size={16} className="text-white" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-400">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Services Grid - Optimized with reduced animations */}
        <motion.div
          className="grid gap-6 md:grid-cols-2 max-w-6xl mx-auto"
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              className="group relative"
              variants={fadeInUp}
              transition={{ duration: 0.4 }}
              whileHover={{ y: -4 }}
            >
              {/* Glow Effect - Simplified */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${service.bgGradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                style={{ willChange: "opacity" }}
              />

              {/* Card */}
              <div className="relative bg-slate-950/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 transition-all duration-300 group-hover:border-slate-600/70 group-hover:bg-slate-900/90">
                {/* Featured Badge */}
                {service.featured && (
                  <div className="absolute -top-3 -right-3">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg">
                      <Star size={12} className="fill-current" />
                      HOT
                    </div>
                  </div>
                )}

                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-14 h-14 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200`}
                    >
                      <service.icon size={28} className="text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                        {service.title}
                      </h2>
                      <p className="text-sm text-slate-400">
                        {service.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div
                      className={`text-2xl font-bold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}
                    >
                      ฿{service.price}
                    </div>
                    <div className="text-xs text-slate-500">Starting at</div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Services Grid */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {service.services.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-sm text-slate-300"
                    >
                      <div
                        className={`w-1.5 h-1.5 bg-gradient-to-r ${service.gradient} rounded-full`}
                      />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-slate-700/50 border border-slate-600/30 rounded-lg text-xs text-slate-300 font-medium hover:bg-slate-700/70 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.button
                  onClick={() => handleGetStarted(service)}
                  className={`w-full bg-gradient-to-r ${service.gradient} hover:shadow-lg hover:shadow-blue-500/25 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 group/btn`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <span>Get Started</span>
                  <ArrowRight
                    size={16}
                    className="group-hover/btn:translate-x-1 transition-transform duration-200"
                  />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA - Simplified animation */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.button
            onClick={scrollToContact}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-500 hover:via-purple-500 hover:to-cyan-500 text-white rounded-2xl font-semibold transition-all duration-200 shadow-xl hover:shadow-2xl hover:shadow-blue-500/25 relative overflow-hidden group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Users size={20} />
              ติดต่อเราเลย
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </span>
          </motion.button>
        </motion.div>
      </div>

      {/* Project Modal - Simple conditional render */}
      {modalOpen && selectedService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-4">
              {selectedService.title}
            </h3>
            <p className="text-slate-300 mb-6">
              สนใจบริการนี้? ติดต่อเราผ่านช่องทางด้านล่างเลย
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  document.getElementById("contact")?.scrollIntoView({
                    behavior: "smooth",
                  });
                  setModalOpen(false);
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                ติดต่อเรา
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded-lg transition-colors"
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
