import { Heart, Zap, Users, Globe, Code } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const stats = [
    {
      icon: <Users size={16} className="text-blue-400" />,
      label: "ลูกค้า",
      value: "500+",
      color: "text-blue-400",
    },
    {
      icon: <Code size={16} className="text-green-400" />,
      label: "โปรเจค",
      value: "1000+",
      color: "text-green-400",
    },
    {
      icon: <Globe size={16} className="text-purple-400" />,
      label: "ประเทศ",
      value: "2+",
      color: "text-purple-400",
    },
    {
      icon: <Zap size={16} className="text-yellow-400" />,
      label: "ปี",
      value: "7+",
      color: "text-yellow-400",
    },
  ];

  return (
    <>
      <footer className="border-t border-slate-800 bg-slate-900/50 backdrop-blur-sm relative">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <div className="flex justify-center items-center gap-4 mb-6 flex-wrap">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700/50 hover:border-slate-600/50 transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  {stat.icon}
                  <span className="text-sm text-slate-400">{stat.label}</span>
                  <span className={`font-bold ${stat.color}`}>
                    {stat.value}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-2 text-green-400 text-sm">
              <span>Power By</span>
              <Heart size={16} className="text-red-500 animate-pulse" />
              <span>Dev เก๊า</span>
              <span className="text-green-600">•</span>
              <span>{new Date().getFullYear()}</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
