import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Monitor,
  Zap,
  Layout,
  User,
  MessageSquare,
  Mail,
  Menu,
  X,
  Code,
} from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "หน้าหลัก", href: "#home", icon: Monitor },
    { name: "ความเชี่ยวชาญ", href: "#expertise", icon: Zap },
    { name: "ผลงาน", href: "#featured-projects", icon: Layout },
    { name: "เกี่ยวกับเรา", href: "#about", icon: User },
    { name: "เกี่ยวกับผู้เขียน", href: "/about-me", icon: User },
    { name: "เสียงจากลูกค้า", href: "#testimonials", icon: MessageSquare },
    { name: "ติดต่อเรา", href: "#contact", icon: Mail },
  ];

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);

    if (href.startsWith("#")) {
      // ถ้าอยู่ในหน้า about-me ให้ redirect กลับหน้าหลักก่อน
      if (location.pathname === "/about-me") {
        navigate("/");
        // รอให้หน้าโหลดเสร็จแล้วค่อย scroll
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        // ถ้าอยู่ในหน้าหลักอยู่แล้ว scroll ปกติ
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      // สำหรับลิงก์ที่ไม่ใช่ anchor
      navigate(href);
    }
  };

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/")}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Code size={20} className="text-white" />
            </div>
            <div className="font-bold text-xl text-white">
              Dev
              <span className="text-blue-400">Portfolio</span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon size={16} />
                <span className="text-sm font-medium">{item.name}</span>
              </motion.button>
            ))}
          </div>

          {/* Mobile menu button */}
          <motion.button
            className="md:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          className={`md:hidden mt-4 ${isMenuOpen ? "block" : "hidden"}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isMenuOpen ? 1 : 0,
            height: isMenuOpen ? "auto" : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-slate-800/50 rounded-lg p-4 backdrop-blur-sm border border-slate-700">
            {navigation.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white rounded-lg hover:bg-slate-700/50 transition-colors w-full text-left"
                whileHover={{ x: 5 }}
              >
                <item.icon size={16} />
                <span>{item.name}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </nav>
    </motion.header>
  );
};

export default Header;
