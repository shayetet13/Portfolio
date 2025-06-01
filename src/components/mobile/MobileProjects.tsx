import { motion } from "framer-motion";
import { useState } from "react";
import { Code2, Smartphone, Globe, Wrench, ArrowRight } from "lucide-react";
import ProjectModal from "../ProjectModal";

const MobileProjects = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<{
    title: string;
    icon: typeof Code2;
  } | null>(null);

  const services = [
    {
      id: 1,
      title: "Web Development",
      subtitle: "เว็บไซต์ & ระบบจัดการ",
      description: "พัฒนา Web Site Web App ระดับมืออาชีพ",
      price: "3,000",
      gradient: "from-blue-600 to-cyan-500",
      icon: Globe,
    },
    {
      id: 2,
      title: "Custom Software",
      subtitle: "โปรแกรมตามสั่ง",
      description: "พัฒนาซอฟต์แวร์เฉพาะทาง ระบบจัดการองค์กร",
      price: "15,000",
      gradient: "from-purple-600 to-pink-500",
      icon: Code2,
    },
    {
      id: 3,
      title: "Mobile Service",
      subtitle: "ROM & Root Service",
      description: "ลง Custom ROM, Root Android, Unlock Bootloader",
      price: "1,000",
      gradient: "from-green-600 to-emerald-500",
      icon: Smartphone,
    },
    {
      id: 4,
      title: "IT Support",
      subtitle: "ซ่อม & ติดตั้ง",
      description: "ซ่อมคอม ติดตั้งระบบ แก้ไขปัญหา IT Support",
      price: "500",
      gradient: "from-orange-600 to-red-500",
      icon: Wrench,
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
    <section className="py-16 px-4 border-t border-slate-800 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>

      <div className="max-w-md mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">
            <span className="text-white">Services </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Portfolio
            </span>
          </h2>
          <p className="text-slate-400">ครบครันทุกบริการ IT & Development</p>
        </motion.div>

        {/* Services Grid */}
        <div className="space-y-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="bg-slate-900/90 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${service.gradient} rounded-xl flex items-center justify-center`}
                  >
                    <service.icon size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {service.title}
                    </h3>
                    <p className="text-sm text-slate-400">{service.subtitle}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`text-xl font-bold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}
                  >
                    ฿{service.price}
                  </div>
                  <div className="text-xs text-slate-500">เริ่มต้น</div>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-300 text-sm mb-6">
                {service.description}
              </p>

              {/* CTA Button */}
              <button
                onClick={() => handleGetStarted(service)}
                className={`w-full bg-gradient-to-r ${service.gradient} text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2`}
              >
                เริ่มต้นเลย
                <ArrowRight size={16} />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <button
            onClick={() =>
              document.getElementById("contact")?.scrollIntoView({
                behavior: "smooth",
              })
            }
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium"
          >
            ติดต่อเราเลย
          </button>
        </motion.div>
      </div>

      {/* Project Modal */}
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
