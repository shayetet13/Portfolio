import { motion } from "framer-motion";
import { useEffect } from "react";
import {
  Github,
  Mail,
  MapPin,
  Calendar,
  Code2,
  Database,
  Server,
  Globe,
  Award,
  BookOpen,
  Coffee,
  Heart,
  Star,
  Zap,
} from "lucide-react";

const AboutMe = () => {
  // SEO Meta Tags Setup
  useEffect(() => {
    // Update document title
    document.title =
      "เกี่ยวกับ Kao - Software Developer และ Technical Writer | devnid.xyz";

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "ประสบการณ์และความเชี่ยวชาญของ Kao ในด้าน Software Development, System Design, Docker, Next.js และเทคโนโลยีสมัยใหม่อื่นๆ พร้อมแชร์ความรู้ผ่านบทความภาษาไทย"
      );
    }

    // Update Open Graph tags
    const updateMetaTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("property", property);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    const updateNameMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    // Open Graph tags
    updateMetaTag(
      "og:title",
      "เกี่ยวกับ Kao - Software Developer และ Technical Writer | devnid.xyz"
    );
    updateMetaTag(
      "og:description",
      "ประสบการณ์และความเชี่ยวชาญของ Kao ในด้าน Software Development, System Design, Docker, React, Next.js และเทคโนโลยีสมัยใหม่อื่นๆ"
    );
    updateMetaTag("og:url", "https://devnid.xyz/about-me");
    updateMetaTag("og:type", "profile");
    updateMetaTag("og:image", "https://devnid.xyz/about-me-og.jpg");

    // Twitter tags
    updateNameMetaTag(
      "twitter:title",
      "เกี่ยวกับ Kao - Software Developer และ Technical Writer"
    );
    updateNameMetaTag(
      "twitter:description",
      "ประสบการณ์และความเชี่ยวชาญของ Kao ในด้าน Software Development, System Design และเทคโนโลยีสมัยใหม่"
    );
    updateNameMetaTag(
      "twitter:image",
      "https://devnid.xyz/about-me-twitter.jpg"
    );

    // Keywords specific to about page
    updateNameMetaTag(
      "keywords",
      "Kao, software developer thailand, เกี่ยวกับผู้เขียน, โปรแกรมเมอร์ไทย, นักพัฒนาซอฟต์แวร์, ประสบการณ์ทำงาน, ความเชี่ยวชาญ, portfolio developer, bangkok developer, full stack developer thailand, Thai programmer, นักเขียนโปรแกรม, React developer thailand, Vue developer, Frontend developer thailand, Backend developer thailand, Web developer Bangkok, นักพัฒนาเว็บ, ระบบเว็บไซต์, งานพัฒนาเว็บไซต์, ประสบการณ์ทำงานโปรแกรมเมอร์, Resume โปรแกรมเมอร์, ประวัติการทำงานนักพัฒนา, Dev in Thailand, โปรแกรมเมอร์ในกรุงเทพ, Freelance developer thailand, AI developer thailand, Artificial Intelligence, นักพัฒนา AI, ปัญญาประดิษฐ์, AI software engineer, machine learning developer, นักพัฒนา Machine Learning, data science thailand, AI ไทย, โครงการ AI, Deep Learning engineer, Computer Vision developer, นักพัฒนา Computer Vision, ระบบรู้จำภาพ, facial recognition, image classification, object detection, NLP developer, Natural Language Processing, นักพัฒนา NLP, วิเคราะห์ข้อความ, แชทบอท, chatbot developer, Thai chatbot, AI chatbot, generative AI developer, text-to-image, text generation, generative model, diffusion model, LLM developer, AI content generation, โมเดลสร้างภาพ, โมเดลภาษา"
    );

    // Add structured data for Person
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Kao",
      jobTitle: "Software Developer & Technical Writer",
      description:
        "นักพัฒนาซอฟต์แวร์ไทย เชี่ยวชาญด้าน System Design, UX/UI, React, Docker, Next.js และเทคโนโลยีสมัยใหม่",
      url: "https://devnid.xyz/about-me",
      image: "https://devnid.xyz/profile-image.jpg",
      email: "contact@devnid.xyz",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bangkok",
        addressCountry: "Thailand",
      },
      worksFor: {
        "@type": "Organization",
        name: "Software Developer",
      },
      knowsAbout: [
        "Software Development",
        "System Design",
        "Docker",
        "Next.js",
        "Microservices",
        "Cloud Computing",
        "React",
        "TypeScript",
        "Node.js",
        "การเขียนโปรแกรม",
        "การพัฒนาเว็บ",
        "ระบบคลาวด์",
      ],
      sameAs: ["https://github.com/shayetet13/Portfolio"],
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Computer Science",
      },
      hasOccupation: {
        "@type": "Occupation",
        name: "Software Developer",
        occupationLocation: {
          "@type": "Country",
          name: "Thailand",
        },
      },
    };

    // Add or update structured data script
    let script = document.querySelector(
      'script[type="application/ld+json"][data-about]'
    ) as HTMLScriptElement;
    if (!script) {
      script = document.createElement("script") as HTMLScriptElement;
      script.type = "application/ld+json";
      script.setAttribute("data-about", "true");
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);

    return () => {
      // Cleanup when component unmounts
      const script = document.querySelector(
        'script[type="application/ld+json"][data-about]'
      );
      if (script) {
        script.remove();
      }
    };
  }, []);

  const skills = [
    {
      category: "Frontend Development",
      icon: Globe,
      technologies: [
        "React",
        "TypeScript",
        "Next.js",
        "Vue.js",
        "Tailwind CSS",
        "Framer Motion",
      ],
    },
    {
      category: "Backend Development",
      icon: Server,
      technologies: [
        "Node.js",
        "Express",
        "Python",
        "PHP",
        "REST APIs",
        "GraphQL",
      ],
    },
    {
      category: "Database & DevOps",
      icon: Database,
      technologies: ["MongoDB", "PostgreSQL", "MySQL", "Docker", "AWS", "Git"],
    },
    {
      category: "Other Technologies",
      icon: Code2,
      technologies: [
        "System Design",
        "Microservices",
        "CI/CD",
        "Linux",
        "Nginx",
        "Redis",
      ],
    },
  ];

  const experiences = [
    {
      period: "2025 - ปัจจุบัน",
      role: "Senior Full Stack Developer",
      company: "Tech Startup",
      description:
        "สร้างและพัฒนาระบบ E-commerce พร้อมออกแบบโครงสร้างระบบที่มั่นคงและยืดหยุ่น",
    },
    {
      period: "2020 - 2022",
      role: "Full Stack Developer",
      company: "Software House",
      description:
        "พัฒนาเว็บและแอปสำหรับธุรกิจขนาดเล็กถึงกลาง ด้วยโซลูชันที่ตรงจุดและใช้งานได้จริง",
    },
    {
      period: "2017 - 2020",
      role: "Frontend Developer",
      company: "Digital Agency",
      description:
        "พัฒนาหน้าเว็บและติดตามเทคโนโลยีใหม่ ๆ เพื่อสร้างประสบการณ์ผู้ใช้ที่ดีขึ้น",
    },
  ];

  const achievements = [
    "พัฒนาระบบที่รองรับผู้ใช้งานหลักหมื่นด้วยตัวเอง",
    "ส่งมอบโปรเจกต์คุณภาพกว่า 1000 งาน แบบมือโปร",
    "แบ่งปันความรู้ผ่านบทความและเวิร์กชอปอย่างต่อเนื่อง",
    "เปิดใจเรียนรู้และเติบโตในโลกเทคโนโลยีใหม่ๆ ทุกวัน",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5"></div>

      {/* Animated Particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            animate={{
              x: [0, Math.random() * 200 - 100, 0],
              y: [0, Math.random() * 200 - 100, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 8 + Math.random() * 8,
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

      <div className="relative z-10">
        {/* Hero Section - Compact */}
        <section className="pt-24 pb-12">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
              {/* Profile Image - Smaller */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="flex justify-center lg:justify-start"
              >
                <div className="relative">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-600/30 rounded-full blur-2xl"></div>

                  <div className="relative w-48 h-48 lg:w-56 lg:h-56 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 p-1">
                    <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                      <Code2 size={60} className="text-blue-400" />
                    </div>
                  </div>

                  {/* Floating Status */}
                  <motion.div
                    className="absolute -top-4 -right-4 bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl px-4 py-2"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <div className="flex items-center gap-2">
                      <motion.div
                        className="w-3 h-3 bg-green-500 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="text-sm text-slate-300 font-medium">
                        Available
                      </span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Profile Info - Compact */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center lg:text-left"
              >
                <motion.div
                  className="inline-flex items-center gap-2 bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-full px-4 py-2 mb-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Star size={16} className="text-yellow-400" />
                  <span className="text-sm text-slate-300">
                    Full Stack Developer
                  </span>
                </motion.div>

                <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4">
                  สวัสดีครับ ผม
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                    {" "}
                    Kao
                  </span>
                </h1>

                <h2 className="text-lg lg:text-xl text-slate-300 mb-4">
                  Software Engineer & Technical Writer
                </h2>

                <p className="text-slate-400 mb-6 leading-relaxed max-w-xl">
                  เขียนโค้ดจนลืมวันหยุด แก้บั๊กจนเหมือนคุยกับจักรวาล
                  มีประสบการณ์ 7+ ปีในสาย Dev ทั้ง Front, Back, และ DevOps
                  เชี่ยวชาญ Web App, System Design, Cloud Infrastructure
                </p>

                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                  <motion.a
                    href="https://github.com/shayetet13/Portfolio"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 text-white rounded-xl hover:bg-slate-700/80 transition-all"
                  >
                    <Github size={18} />
                    <span className="text-sm">GitHub</span>
                  </motion.a>

                  <motion.a
                    href="mailto:contact@shayetet14@protonmail.com"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
                  >
                    <Mail size={18} />
                    <span className="text-sm">ติดต่อ</span>
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills Section - Compact Grid */}
        <section className="py-12 bg-slate-900/30 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                ความเชี่ยวชาญ
              </h2>
              <p className="text-slate-400">
                เทคโนโลยีและเครื่องมือที่ใช้ในการพัฒนา
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-5 hover:bg-slate-800/90 hover:border-slate-600/70 transition-all duration-300"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <skill.icon size={20} className="text-white" />
                    </div>
                    <h3 className="text-sm font-semibold text-white">
                      {skill.category}
                    </h3>
                  </div>

                  <div className="space-y-1">
                    {skill.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-block bg-slate-700/50 text-slate-300 px-2 py-1 rounded-lg text-xs mr-1 mb-1"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience & Achievements - Side by Side */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
              {/* Experience */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Calendar size={24} className="text-blue-400" />
                  ประสบการณ์การทำงาน
                </h2>

                <div className="space-y-4">
                  {experiences.map((exp, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-5 hover:bg-slate-800/90 transition-all"
                    >
                      <div className="flex flex-col gap-2 mb-3">
                        <div className="flex items-center gap-2 text-blue-400 text-sm">
                          <Zap size={14} />
                          {exp.period}
                        </div>
                        <h3 className="text-lg font-bold text-white">
                          {exp.role}
                        </h3>
                        <span className="text-slate-400 text-sm">
                          {exp.company}
                        </span>
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {exp.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Achievements */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Award size={24} className="text-green-400" />
                  ความสำเร็จ
                </h2>

                <div className="space-y-4 mb-8">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex items-start gap-3 bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-5 hover:bg-slate-800/90 transition-all"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Award size={16} className="text-white" />
                      </div>
                      <span className="text-slate-300 text-sm leading-relaxed">
                        {achievement}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Personal Touch - Compact */}
                <div className="grid grid-cols-1 gap-4">
                  {[
                    {
                      icon: BookOpen,
                      title: "การเรียนรู้",
                      desc: "ติดตามเทคโนโลยีใหม่ๆ",
                      color: "from-orange-500 to-red-600",
                    },
                    {
                      icon: Coffee,
                      title: "Coffee & Code",
                      desc: "กาแฟคือเชื้อเพลิงของโค้ด",
                      color: "from-green-500 to-blue-600",
                    },
                    {
                      icon: Heart,
                      title: "แชร์ความรู้",
                      desc: "ช่วยเหลือนักพัฒนารุ่นใหม่",
                      color: "from-purple-500 to-pink-600",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex items-center gap-3 bg-slate-900/50 rounded-xl p-4 border border-slate-700/30"
                    >
                      <div
                        className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center`}
                      >
                        <item.icon size={18} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-white">
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-400">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Quote Section - Compact */}
        <section className="py-12 bg-slate-900/30 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8">
                <blockquote className="text-lg text-slate-300 leading-relaxed mb-6 italic">
                  "นักพัฒนาไม่ใช่แค่คนเขียนโค้ดให้มันรันได้
                  แต่คือคนที่แก้ปัญหา... แล้วก็สร้างอะไรดี ๆ ที่คนใช้จริง
                  ฉันเชื่อว่าเทคโนโลยีเปลี่ยนโลกได้
                  ส่วนถ้าวันไหนโค้ดรันผ่านตั้งแต่บรรทัดแรก —
                  ฉันจะถือว่าวันนั้นคือวันโชคดีสุด ๆ"
                </blockquote>
                <div className="flex items-center justify-center gap-2 text-blue-400">
                  <MapPin size={16} />
                  <span className="text-sm">Bangkok, Thailand</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section - Compact */}
        <section className="py-12 bg-gradient-to-r from-blue-600/90 to-purple-600/90 backdrop-blur-sm">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                จ้างฉันทำโปรเจกต์ของคุณ
              </h2>
              <p className="text-blue-100 mb-6">
                หากคุณมีโปรเจกต์ที่น่าสนใจ หรือต้องการคำปรึกษาเรื่องเทคโนโลยี
                ยินดีรับฟังและช่วยเหลือค่ะ
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <motion.a
                  href="mailto:contact@shayetet14@protonmail.com"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-xl"
                >
                  <Mail size={20} />
                  ส่งอีเมล
                </motion.a>

                <motion.a
                  href="https://github.com/shayetet13/Portfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 bg-slate-800/80 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-slate-700/80 transition-colors border border-slate-600/50"
                >
                  <Github size={20} />
                  ดูผลงาน
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutMe;
