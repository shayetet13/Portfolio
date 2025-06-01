import { motion } from "framer-motion";
import { useState } from "react";
import {
  Star,
  Code2,
  Smartphone,
  Globe,
  Wrench,
  ArrowRight,
  Zap,
} from "lucide-react";
import ProjectModal from "../ProjectModal";

const MobileProjects = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<{
    title: string;
    icon: any;
  } | null>(null);

  const services = [
    {
      id: 1,
      title: "Web Dev",
      subtitle: "เว็บไซต์ & แอป",
      description: "พัฒนาเว็บไซต์และแอปพลิเคชัน",
      services: ["Website", "Web App", "E-commerce", "Dashboard"],
      tech: ["React", "Node.js", "MongoDB"],
      gradient: "from-blue-600 to-cyan-500",
      icon: Globe,
      price: "3K",
      featured: true,
    },
    {
      id: 2,
      title: "Mobile App",
      subtitle: "แอปมือถือ",
      description: "พัฒนาแอปมือถือ iOS และ Android",
      services: ["iOS App", "Android", "PWA", "Hybrid"],
      tech: ["React Native", "Flutter"],
      gradient: "from-purple-600 to-pink-500",
      icon: Smartphone,
      price: "15K",
      featured: false,
    },
    {
      id: 3,
      title: "Software",
      subtitle: "โปรแกรมตามสั่ง",
      description: "พัฒนาซอฟต์แวร์เฉพาะทาง",
      services: ["POS", "CRM", "ERP", "Custom"],
      tech: ["Python", "Laravel"],
      gradient: "from-green-600 to-emerald-500",
      icon: Code2,
      price: "20K",
      featured: false,
    },
    {
      id: 4,
      title: "IT Support",
      subtitle: "ซ่อม & ติดตั้ง",
      description: "บริการซ่อมและติดตั้งระบบ",
      services: ["Repair", "Setup", "Recovery", "Support"],
      tech: ["Windows", "Network"],
      gradient: "from-orange-600 to-red-500",
      icon: Wrench,
      price: "500",
      featured: false,
    },
  ];

  const handleGetStarted = (service: (typeof services)[0]) => {
    setSelectedService({
      title: service.title,
      icon: service.icon,
    });
    setModalOpen(true);
  };

  return (
    <section
      id="featured-projects"
      className="py-12 border-t border-slate-800 relative overflow-hidden pb-20"
    >
      {/* Mobile Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:16px_16px]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/3 via-purple-500/3 to-cyan-500/3"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Mobile Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-900/70 border border-slate-700/50 backdrop-blur-sm rounded-full text-xs text-slate-300 mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Zap size={12} className="text-blue-400" />
            Services
          </motion.div>

          <h2 className="text-2xl font-bold mb-4">
            <span className="text-white">บริการ</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
              ของเรา
            </span>
          </h2>

          <p className="text-slate-400 text-sm leading-relaxed max-w-sm mx-auto break-words">
            ครบครันทุกบริการด้านเทคโนโลยี
          </p>
        </motion.div>

        {/* Mobile Services Grid */}
        <div className="space-y-4 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="relative bg-slate-950/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4 transition-all duration-300 group-hover:border-slate-600/70">
                {service.featured && (
                  <div className="absolute -top-2 -right-2">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <Star size={10} className="fill-current" />
                      HOT
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3 mb-3">
                  <div
                    className={`w-10 h-10 bg-gradient-to-r ${service.gradient} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0`}
                  >
                    <service.icon size={20} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-white truncate">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-400 truncate">
                      {service.subtitle}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div
                      className={`text-lg font-bold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent whitespace-nowrap`}
                    >
                      ฿{service.price}
                    </div>
                    <div className="text-xs text-slate-500">เริ่มต้น</div>
                  </div>
                </div>

                <p className="text-slate-300 text-xs leading-relaxed mb-3 break-words">
                  {service.description}
                </p>

                <div className="grid grid-cols-2 gap-1 mb-3">
                  {service.services.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1.5 text-xs text-slate-300 min-w-0"
                    >
                      <div
                        className={`w-1 h-1 bg-gradient-to-r ${service.gradient} rounded-full flex-shrink-0`}
                      ></div>
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {service.tech.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 bg-slate-700/50 border border-slate-600/30 rounded text-xs text-slate-300 truncate"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <motion.button
                  onClick={() => handleGetStarted(service)}
                  className={`w-full bg-gradient-to-r ${service.gradient} text-white py-2.5 px-4 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>เริ่มต้น</span>
                  <ArrowRight size={14} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Bottom CTA */}
        <motion.div
          className="text-center mt-8 mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.button
            onClick={() => {
              document.getElementById("contact")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
            className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white py-3 px-6 rounded-xl font-semibold transition-all shadow-lg text-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            ติดต่อเราเลย
          </motion.button>
        </motion.div>
      </div>

      <ProjectModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        serviceTitle={selectedService?.title || ""}
        serviceIcon={selectedService?.icon}
      />
    </section>
  );
};

export default MobileProjects;
