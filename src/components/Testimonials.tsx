import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const [randomTestimonials, setRandomTestimonials] = useState<Array<any>>([]);
  const [refreshKey, setRefreshKey] = useState(0); // สร้าง state ใหม่เพื่อควบคุมการรีเฟรช

  // สร้างฟังก์ชันสุ่มข้อความจากรายการและตั้งเวลาสุ่มใหม่ทุก 5 วินาที
  useEffect(() => {
    // สุ่มเลือกข้อความจาก allTestimonials
    const getRandomTestimonials = () => {
      const shuffled = [...allTestimonials].sort(() => 0.5 - Math.random());

      // กำหนดให้เลือกแค่ 10 ข้อความ (2 แถว, แถวละ 5)
      return shuffled.slice(0, 10).map((testimonial) => ({
        ...testimonial,
        // สุ่มให้มีดาวแค่ 3-5 ดาว
        rating: Math.floor(Math.random() * 3) + 3, // สุ่มจาก 3-5
      }));
    };

    setRandomTestimonials(getRandomTestimonials());

    // ตั้งเวลาให้สุ่มใหม่ทุก 5 วินาที (5000 มิลลิวินาที)
    const intervalId = setInterval(() => {
      setRandomTestimonials(getRandomTestimonials());
      setRefreshKey((prev) => prev + 1); // เพิ่มค่า refreshKey เพื่อ trigger animation ใหม่
    }, 5000); // แก้ไขจาก 3500 เป็น 5000

    // Cleanup function
    return () => clearInterval(intervalId);
  }, []); // ทำครั้งเดียวตอน component mount

  return (
    <section
      id="testimonials"
      className="py-20 relative overflow-hidden border-t border-slate-800"
    >
      {/* พื้นหลังลูกเล่น */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.06),transparent_50%)] blur-sm"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.06),transparent_50%)] blur-sm"></div>
      <div className="absolute right-0 bottom-0 w-72 h-72 bg-gradient-to-br from-blue-600/10 to-violet-600/10 rounded-full blur-3xl -z-0"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-6">
            เสียงจาก
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-500">
              ลูกค้า
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            ความคิดเห็นจากผู้ที่เคยร่วมงานและใช้บริการ
          </p>
        </motion.div>

        {/* แสดงความคิดเห็นเป็น 2 แถว แถวละ 5 ข้อความ */}
        <div className="space-y-16">
          {[0, 1].map((rowIndex) => (
            <motion.div
              key={`row-${rowIndex}-${refreshKey}`} // เพิ่ม refreshKey เพื่อให้ trigger animation ใหม่ทุกครั้ง
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {randomTestimonials
                .slice(rowIndex * 5, rowIndex * 5 + 5)
                .map((testimonial, index) => (
                  <motion.div
                    key={`${rowIndex}-${index}-${refreshKey}`} // เพิ่ม refreshKey เพื่อให้ trigger animation ใหม่ทุกครั้ง
                    className={`bg-gradient-to-b from-slate-800/90 to-slate-900/90 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden h-full flex flex-col hover:border-${
                      rowIndex % 2 === 0 ? "blue" : "purple"
                    }-500/40 transition-all duration-300 shadow-lg hover:shadow-${
                      rowIndex % 2 === 0 ? "blue" : "purple"
                    }-900/10`}
                    initial={{
                      opacity: 0,
                      x: rowIndex % 2 === 0 ? -60 : 60,
                      y: 0,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.08, // ลดเวลา delay ลงเล็กน้อยเพื่อให้เร็วขึ้น
                      ease: "easeOut",
                    }}
                    whileHover={{
                      scale: 1.03,
                      y: -5,
                      boxShadow:
                        rowIndex % 2 === 0
                          ? "0 10px 30px -10px rgba(59, 130, 246, 0.2)"
                          : "0 10px 30px -10px rgba(139, 92, 246, 0.2)",
                    }}
                  >
                    {/* Header with rating */}
                    <div className="p-4 border-b border-slate-700/30 bg-gradient-to-r from-slate-800/90 to-slate-900/80">
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={
                                i < testimonial.rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-slate-700"
                              }
                            />
                          ))}
                        </div>
                        <div
                          className={`w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br ${
                            rowIndex % 2 === 0
                              ? "from-blue-500/20 to-cyan-500/20"
                              : "from-purple-500/20 to-pink-500/20"
                          }`}
                        >
                          <Quote
                            size={14}
                            className={
                              rowIndex % 2 === 0
                                ? "text-blue-400"
                                : "text-purple-400"
                            }
                          />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-grow flex flex-col justify-between">
                      <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-4">
                        "{testimonial.text}"
                      </p>
                      <div className="mt-auto pt-3 border-t border-slate-800/30">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold bg-gradient-to-br ${
                              rowIndex % 2 === 0
                                ? "from-blue-500 to-cyan-600"
                                : "from-purple-500 to-pink-600"
                            }`}
                          >
                            {testimonial.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-white text-sm">
                              {testimonial.name}
                            </div>
                            <div className="text-xs text-slate-400">
                              {testimonial.role}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          ))}
        </div>

        {/* ตัวบอกเวลา/สถานะการสุ่ม */}
        <div className="flex justify-center mt-8">
          <div className="h-1 w-32 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-violet-500"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: 5, // แก้ไขให้ตรงกับเวลาการรีเฟรช (5 วินาที)
                ease: "linear",
                repeat: Infinity,
              }}
              key={refreshKey} // เพิ่ม key เพื่อให้ animation รีเซ็ตเมื่อมีการรีเฟรช
            />
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white rounded-xl font-medium transition-all shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 hover:scale-105 hover:-translate-y-1"
          >
            ติดต่องานกับเรา
            <span className="ml-1">&rarr;</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

// ข้อมูล 100 ความคิดเห็นจำลอง
const allTestimonials = [
  {
    name: "ปลื้ม",
    role: "CEO, TechHub Thailand",
    rating: 5,
    text: "ทำงานรวดเร็ว ตรงเวลา และโค้ดมีคุณภาพสูง ช่วยแก้ปัญหาที่เราเจอมานานได้อย่างมีประสิทธิภาพ",
  },
  {
    name: "ฟ้า",
    role: "Product Manager",
    rating: 5,
    text: "เป็นนักพัฒนาที่เข้าใจความต้องการทางธุรกิจได้อย่างรวดเร็ว ทำงานร่วมกับทีมได้ดีมาก",
  },
  {
    name: "แบงค์",
    role: "Startup Founder",
    rating: 5,
    text: "ประทับใจมาก ช่วยพัฒนาแอพในเวลาที่จำกัดได้อย่างมีคุณภาพ ตอบสนองต่อการแก้ไขได้รวดเร็ว",
  },
  {
    name: "พลอย",
    role: "Marketing Director",
    rating: 4,
    text: "ทำงานละเอียด ใส่ใจในทุกรายละเอียด UI ที่ได้ถูกใจลูกค้ามาก ประทับใจในการสื่อสารที่ชัดเจน",
  },
  {
    name: "บอส",
    role: "CTO, FinTech",
    rating: 5,
    text: "เทคนิคการเขียนโค้ดสะอาด อ่านง่าย และมีประสิทธิภาพสูง ทำงานร่วมกับทีมเราได้อย่างราบรื่น",
  },
  {
    name: "มิ้นท์",
    role: "UX Designer",
    rating: 5,
    text: "เข้าใจหลักการออกแบบ UX/UI และสามารถพัฒนาได้ตรงตามดีไซน์ทุกรายละเอียด ทำงานร่วมกันสนุกมาก",
  },
  {
    name: "ต้น",
    role: "Project Manager",
    rating: 4,
    text: "มืออาชีพมาก ส่งงานตรงเวลา และสามารถปรับเปลี่ยนได้ตามความต้องการที่เปลี่ยนไป",
  },
  {
    name: "ปอนด์",
    role: "E-commerce Owner",
    rating: 5,
    text: "ช่วยปรับปรุงเว็บไซต์ให้โหลดเร็วขึ้น และเพิ่มอัตราการซื้อสินค้าได้อย่างน่าทึ่ง ขอบคุณมาก",
  },
  {
    name: "กิ๊ฟ",
    role: "Startup Co-founder",
    rating: 5,
    text: "เป็นทั้งนักพัฒนาและที่ปรึกษาที่ดีมาก ให้คำแนะนำที่เป็นประโยชน์กับธุรกิจของเรา",
  },
  {
    name: "เบิร์ด",
    role: "IT Manager",
    rating: 4,
    text: "โค้ดมีมาตรฐานสูง ทำให้ทีมเราดูแลต่อได้ง่าย ประทับใจในการจัดการโปรเจคที่เป็นระบบ",
  },
  {
    name: "นัท",
    role: "Software Engineer",
    rating: 5,
    text: "ได้เรียนรู้เทคนิคใหม่ๆ จากการทำงานร่วมกันมากมาย มีความเชี่ยวชาญด้านเทคนิคที่น่าประทับใจ",
  },
  {
    name: "เจ",
    role: "Digital Agency CEO",
    rating: 5,
    text: "เป็นพาร์ทเนอร์ที่ดีในการพัฒนาโปรเจคใหญ่ สามารถจัดการปัญหาที่ซับซ้อนได้อย่างมีประสิทธิภาพ",
  },
  {
    name: "เก่ง",
    role: "Entrepreneur",
    rating: 4,
    text: "ช่วยให้ธุรกิจของผมเติบโตผ่านระบบออนไลน์ได้อย่างก้าวกระโดด เป็นการลงทุนที่คุ้มค่ามาก",
  },
  {
    name: "แพท",
    role: "Content Creator",
    rating: 5,
    text: "ออกแบบและพัฒนาเว็บไซต์ได้สวยงาม ตอบโจทย์การใช้งาน และทำให้คอนเทนต์ของเราโดดเด่น",
  },
  {
    name: "วิน",
    role: "Healthcare Startup",
    rating: 5,
    text: "พัฒนาแอพพลิเคชันทางการแพทย์ได้ตรงตามมาตรฐานและความต้องการทางการแพทย์ได้ดีเยี่ยม",
  },
  {
    name: "จูน",
    role: "Graphic Designer",
    rating: 5,
    text: "เข้าใจงานดีไซน์และสามารถนำไปพัฒนาได้อย่างสวยงามตรงตามที่ต้องการทุกประการ",
  },
  {
    name: "เติ้ล",
    role: "Engineering Director",
    rating: 4,
    text: "ทำงานได้รวดเร็วและมีคุณภาพ แก้ไขปัญหาทางเทคนิคที่ซับซ้อนได้ดีมาก",
  },
  {
    name: "เฟิร์น",
    role: "Online Store Owner",
    rating: 5,
    text: "ช่วยปรับปรุงระบบร้านค้าออนไลน์ให้ทำงานได้อย่างมีประสิทธิภาพ ทำให้ยอดขายเพิ่มขึ้นอย่างต่อเนื่อง",
  },
  {
    name: "ไอซ์",
    role: "Blockchain Developer",
    rating: 5,
    text: "มีความรู้ด้าน Web3 และสามารถพัฒนาโปรเจคที่ซับซ้อนได้อย่างมีประสิทธิภาพ เป็นผู้ร่วมงานที่ยอดเยี่ยม",
  },
  {
    name: "เบลล์",
    role: "Social Media Manager",
    rating: 4,
    text: "พัฒนาเครื่องมือที่ช่วยให้การจัดการโซเชียลมีเดียของเราง่ายขึ้นมาก ประหยัดเวลาได้มหาศาล",
  },
  {
    name: "ปอ",
    role: "HR Manager",
    rating: 5,
    text: "พัฒนาระบบ HR ที่ช่วยให้การทำงานของฝ่ายบุคคลมีประสิทธิภาพมากขึ้น พนักงานทุกคนชื่นชอบ",
  },
  {
    name: "ฟลุ๊ค",
    role: "Innovation Lead",
    rating: 5,
    text: "สามารถนำเทคโนโลยีใหม่ๆ มาประยุกต์ใช้กับธุรกิจได้อย่างเหมาะสม สร้างความได้เปรียบในการแข่งขัน",
  },
  {
    name: "แพร",
    role: "Art Director",
    rating: 4,
    text: "เข้าใจงานศิลป์และสามารถนำไปพัฒนาเป็นเว็บไซต์ได้อย่างสวยงาม ตรงตามวิสัยทัศน์",
  },
  {
    name: "เอิร์ธ",
    role: "Tech Lead",
    rating: 5,
    text: "โค้ดสะอาด มีโครงสร้างที่ดี ทำให้ทีมสามารถพัฒนาต่อยอดได้ง่าย ทำงานร่วมกันได้อย่างราบรื่น",
  },
  {
    name: "กาย",
    role: "Business Owner",
    rating: 5,
    text: "เข้าใจความต้องการทางธุรกิจได้อย่างรวดเร็ว และแปลงเป็นโซลูชันที่ใช้งานได้จริง คุ้มค่ากับการลงทุน",
  },
  {
    name: "บูม",
    role: "EdTech CEO",
    rating: 5,
    text: "พัฒนาแพลตฟอร์มการเรียนรู้ที่ใช้งานง่ายทั้งสำหรับผู้สอนและผู้เรียน ช่วยยกระดับการศึกษาได้จริง",
  },
  {
    name: "พิม",
    role: "Beauty Brand Owner",
    rating: 4,
    text: "ออกแบบและพัฒนาเว็บไซต์ที่สวยงาม สะท้อนแบรนด์ของเราได้อย่างลงตัว ลูกค้าประทับใจมาก",
  },
  {
    name: "อาร์ต",
    role: "Angel Investor",
    rating: 5,
    text: "เป็นผู้พัฒนาที่ทำงานได้ตามความคาดหวังและเกินความคาดหวัง สร้างความมั่นใจให้กับนักลงทุนอย่างผม",
  },
  {
    name: "เจี๊ยบ",
    role: "Retail Manager",
    rating: 4,
    text: "พัฒนาระบบจัดการร้านค้าที่ใช้งานง่าย ช่วยให้การบริหารสต็อกและการขายมีประสิทธิภาพมากขึ้น",
  },
  {
    name: "โอ๊ต",
    role: "Software Development Manager",
    rating: 5,
    text: "มีความเชี่ยวชาญสูง เรียนรู้เทคโนโลยีใหม่ได้เร็ว และสามารถถ่ายทอดความรู้ให้กับทีมได้เป็นอย่างดี",
  },
  {
    name: "มิว",
    role: "Wellness App Founder",
    rating: 5,
    text: "พัฒนาแอพสุขภาพที่ใช้งานง่ายและมีประโยชน์ ผู้ใช้งานให้ฟีดแบ็คดีมาก ทำให้แอพเราเติบโตอย่างรวดเร็ว",
  },
  {
    name: "โฟกัส",
    role: "FinTech Specialist",
    rating: 4,
    text: "พัฒนาระบบการเงินที่ปลอดภัยและเชื่อถือได้ ทำงานได้อย่างแม่นยำ ไม่มีข้อผิดพลาด",
  },
  {
    name: "แอม",
    role: "E-commerce Director",
    rating: 5,
    text: "ช่วยปรับปรุงประสบการณ์ผู้ใช้งานบนเว็บไซต์ของเรา ทำให้อัตราการเปลี่ยนผู้เยี่ยมชมเป็นลูกค้าเพิ่มขึ้นอย่างมาก",
  },
  {
    name: "เจมส์",
    role: "Real Estate Developer",
    rating: 5,
    text: "พัฒนาแพลตฟอร์มที่ช่วยให้การซื้อขายอสังหาริมทรัพย์ง่ายขึ้น มีคุณสมบัติที่ตอบโจทย์ทั้งผู้ซื้อและผู้ขาย",
  },
  {
    name: "บีม",
    role: "Fashion Designer",
    rating: 4,
    text: "ออกแบบเว็บไซต์ที่สวยงามและเน้นการนำเสนอผลงานได้อย่างโดดเด่น ช่วยส่งเสริมแบรนด์ของเราได้เป็นอย่างดี",
  },
  {
    name: "มาร์ค",
    role: "Digital Marketing Consultant",
    rating: 5,
    text: "พัฒนาเครื่องมือที่ช่วยวิเคราะห์และปรับปรุงแคมเปญการตลาดได้อย่างมีประสิทธิภาพ ทำให้ ROI ดีขึ้นมาก",
  },
  {
    name: "เนย",
    role: "Research Coordinator",
    rating: 5,
    text: "พัฒนาระบบจัดการข้อมูลงานวิจัยที่ใช้งานง่ายและมีประสิทธิภาพ ช่วยให้นักวิจัยทำงานได้สะดวกมากขึ้น",
  },
  {
    name: "ไบร์ท",
    role: "Logistics Manager",
    rating: 4,
    text: "พัฒนาระบบติดตามการขนส่งที่แม่นยำและใช้งานง่าย ช่วยลดต้นทุนและเพิ่มประสิทธิภาพในการทำงาน",
  },
  {
    name: "อิง",
    role: "Customer Service Manager",
    rating: 5,
    text: "พัฒนาระบบ CRM ที่ใช้งานง่ายและมีประสิทธิภาพ ช่วยให้ทีมบริการลูกค้าทำงานได้ดีขึ้นมาก",
  },
  {
    name: "ก้อง",
    role: "Technical Director",
    rating: 5,
    text: "มีความเชี่ยวชาญทางเทคนิคสูงมาก สามารถแก้ไขปัญหาที่ซับซ้อนได้อย่างมีประสิทธิภาพ",
  },
  {
    name: "เอ็ม",
    role: "Food Delivery App Owner",
    rating: 4,
    text: "พัฒนาแอพส่งอาหารที่ใช้งานง่ายทั้งสำหรับร้านค้าและลูกค้า ช่วยให้ธุรกิจของเราเติบโตอย่างรวดเร็ว",
  },
  {
    name: "ภูมิ",
    role: "Energy Sector CTO",
    rating: 5,
    text: "พัฒนาระบบติดตามการใช้พลังงานที่แม่นยำและมีประสิทธิภาพ ช่วยให้เราประหยัดต้นทุนได้มาก",
  },
  {
    name: "นุ่น",
    role: "Beauty Salon Owner",
    rating: 5,
    text: "พัฒนาระบบจองคิวออนไลน์ที่ใช้งานง่ายและสวยงาม ลูกค้าชื่นชอบและใช้งานเป็นประจำ",
  },
  {
    name: "โดม",
    role: "Hotel Manager",
    rating: 4,
    text: "พัฒนาระบบจองห้องพักที่มีประสิทธิภาพและใช้งานง่าย ช่วยเพิ่มอัตราการจองโดยตรงผ่านเว็บไซต์ของเรา",
  },
  {
    name: "มายด์",
    role: "Language School Director",
    rating: 5,
    text: "พัฒนาแพลตฟอร์มเรียนภาษาออนไลน์ที่มีคุณภาพสูง ช่วยให้นักเรียนเรียนรู้ได้อย่างมีประสิทธิภาพ",
  },
  {
    name: "เต้",
    role: "Sports Club Owner",
    rating: 5,
    text: "พัฒนาระบบจัดการสมาชิกและตารางกิจกรรมที่ใช้งานง่าย ช่วยให้การบริหารจัดการคลับง่ายขึ้นมาก",
  },
  {
    name: "กระแต",
    role: "Event Organizer",
    rating: 4,
    text: "พัฒนาระบบจองบัตรและจัดการอีเวนต์ที่มีประสิทธิภาพสูง รองรับผู้ใช้งานจำนวนมากได้อย่างราบรื่น",
  },
  {
    name: "เต๋า",
    role: "Transport Company Owner",
    rating: 5,
    text: "พัฒนาระบบติดตามรถและจัดการเส้นทางที่มีประสิทธิภาพ ช่วยลดต้นทุนและเพิ่มความพึงพอใจของลูกค้า",
  },
  {
    name: "โมจิ",
    role: "Healthcare Administrator",
    rating: 5,
    text: "พัฒนาระบบจัดการคลินิกที่ใช้งานง่ายและปลอดภัย ช่วยให้การให้บริการผู้ป่วยมีประสิทธิภาพมากขึ้น",
  },
  {
    name: "ป๊อป",
    role: "AgriTech Startup Founder",
    rating: 4,
    text: "พัฒนาแอพที่ช่วยเกษตรกรติดตามและจัดการฟาร์ม ช่วยเพิ่มผลผลิตและลดต้นทุนได้อย่างเป็นรูปธรรม",
  },
  {
    name: "เพียว",
    role: "Fashion Brand CEO",
    rating: 5,
    text: "พัฒนาเว็บไซต์อีคอมเมิร์ซที่สวยงามและใช้งานง่าย สะท้อนอัตลักษณ์ของแบรนด์ได้อย่างสมบูรณ์",
  },
  {
    name: "เดียร์",
    role: "Construction Company Owner",
    rating: 5,
    text: "พัฒนาระบบจัดการโครงการก่อสร้างที่มีประสิทธิภาพ ช่วยให้การติดตามงานและการสื่อสารกับลูกค้าง่ายขึ้น",
  },
  {
    name: "ลูกหว้า",
    role: "Cosmetics Brand Manager",
    rating: 4,
    text: "พัฒนาเว็บไซต์ที่นำเสนอผลิตภัณฑ์ได้อย่างน่าสนใจ ยอดขายออนไลน์เพิ่มขึ้นอย่างต่อเนื่อง",
  },
  {
    name: "กัน",
    role: "IT Service Manager",
    rating: 5,
    text: "ให้คำปรึกษาและพัฒนาระบบไอทีที่ตอบโจทย์ความต้องการขององค์กร ทำงานได้อย่างมืออาชีพ",
  },
  {
    name: "โบว์",
    role: "Design Studio Owner",
    rating: 5,
    text: "พัฒนาเว็บไซต์ที่สวยงามและสะท้อนความเป็นมืออาชีพของสตูดิโอเรา ลูกค้าให้ความเชื่อมั่นมากขึ้น",
  },
  {
    name: "วิว",
    role: "Financial Consultant",
    rating: 5,
    text: "พัฒนาระบบวิเคราะห์การเงินที่แม่นยำและใช้งานง่าย ช่วยให้ลูกค้าของเราวางแผนการเงินได้ดีขึ้น",
  },
  {
    name: "โทนี่",
    role: "Game Studio Founder",
    rating: 5,
    text: "พัฒนาเว็บไซต์และระบบหลังบ้านที่รองรับการเติบโตของสตูดิโอเกมส์เราได้เป็นอย่างดี",
  },
  {
    name: "แทน",
    role: "Travel Agency Owner",
    rating: 4,
    text: "พัฒนาเว็บไซต์ท่องเที่ยวที่ใช้งานง่ายและน่าสนใจ ทำให้ลูกค้าตัดสินใจจองทริปกับเราง่ายขึ้น",
  },
  {
    name: "เบสท์",
    role: "Renewable Energy Consultant",
    rating: 5,
    text: "พัฒนาระบบติดตามและวิเคราะห์การใช้พลังงานทดแทนที่แม่นยำ ช่วยให้ลูกค้าของเราได้ประโยชน์สูงสุด",
  },
  {
    name: "ไอซ์",
    role: "Printing Service Owner",
    rating: 4,
    text: "พัฒนาระบบสั่งพิมพ์ออนไลน์ที่ใช้งานง่าย ช่วยให้ลูกค้าสั่งงานพิมพ์ได้สะดวกและรวดเร็ว",
  },
  {
    name: "ปุ้ม",
    role: "Research Lab Manager",
    rating: 5,
    text: "พัฒนาระบบจัดการข้อมูลการทดลองที่แม่นยำและปลอดภัย ช่วยให้ทีมวิจัยทำงานได้มีประสิทธิภาพมากขึ้น",
  },
  {
    name: "เฟิร์ส",
    role: "Law Firm Partner",
    rating: 5,
    text: "พัฒนาระบบจัดการคดีและเอกสารที่ปลอดภัยและใช้งานง่าย ช่วยให้ทนายความทำงานได้สะดวกมากขึ้น",
  },
  {
    name: "เมย์",
    role: "Resort Owner",
    rating: 4,
    text: "พัฒนาเว็บไซต์จองห้องพักที่สวยงามและใช้งานง่าย ช่วยเพิ่มอัตราการจองโดยตรงได้มากขึ้น",
  },
  {
    name: "แชมป์",
    role: "Software House CEO",
    rating: 5,
    text: "ทำงานร่วมกันได้อย่างราบรื่น ทักษะทางเทคนิคสูงมาก ช่วยให้เราส่งมอบงานให้ลูกค้าได้ตรงเวลา",
  },
];

export default Testimonials;
