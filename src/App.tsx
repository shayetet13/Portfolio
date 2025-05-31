import { useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Testimonials from "./components/Testimonials";
import SEOHead from "./components/SEOHead";
import { useSEO } from "./hooks/useSEO";
import { trackEvent } from "./utils/analytics";
import "./index.css";
import ChatButton from "./components/ChatButton";

function App() {
  // SEO Configuration
  const seoConfig = {
    title:
      "Dev - Full Stack Developer | พัฒนาเว็บไซต์ โปรแกรม Web App ระดับมืออาชีพ",
    description:
      "Dev Full Stack Developer มืออาชีพ รับพัฒนาเว็บไซต์ โปรแกรม Web Application E-commerce ระบบจัดการ CRM ERP สร้างโปรแกรมตามความต้องการ React TypeScript Node.js MongoDB PostgreSQL",
    keywords:
      "Dev เก๊า, พัฒนาเว็บไซต์, โปรแกรมเมอร์, web developer, full stack developer, react developer, nodejs developer, typescript, mongodb, postgresql, เว็บแอป, web application, e-commerce, ระบบจัดการ, โปรแกรม, software development, website design, เว็บดีไซน์, ระบบสมาชิก, ระบบตะกร้าสินค้า, api development, database design, ui ux design, responsive design, mobile app, progressive web app, seo optimization, digital transformation, automation, crm system, erp system, inventory management, point of sale, pos system, online store, marketplace, booking system, cms, content management, blog system, news website, portfolio website, business website, startup development, mvp development, prototype, agile development, scrum, devops, cloud deployment, aws, google cloud, digital ocean, hosting, domain, ssl certificate, security, performance optimization, speed optimization, google analytics, facebook pixel, social media integration, payment gateway, line pay, promptpay, credit card payment, thai developer, bangkok developer, freelance developer, remote developer, outsourcing, software house, tech startup, fintech, edtech, healthtech, proptech, agritech, foodtech, react developer thailand, nodejs developer thailand, mongodb developer, postgresql developer, typescript developer, full stack developer thailand, web developer thailand, software engineer thailand, programming services thailand, ระบบบัญชี, ระบบขาย, ระบบคลังสินค้า, ระบบ hrm, ระบบเงินเดือน, ระบบจัดการโครงการ, ระบบสั่งซื้อออนไลน์, marketplace development, multi vendor, b2b platform, b2c platform, saas development, cloud application, microservices, serverless, jamstack, headless cms, progressive web app, single page application, mobile responsive, cross platform, ios app development, android app development, hybrid app, flutter development, react native, api integration, third party integration, payment integration, shipping integration, social login, oauth, jwt authentication, security implementation, ssl certificate, data encryption, gdpr compliance, accessibility, wcag compliance, seo friendly, google ranking, search engine optimization, digital marketing integration, google ads integration, facebook ads integration, email marketing, newsletter integration, crm integration, erp integration, accounting system integration, inventory management system, supply chain management, logistics system, delivery tracking, real time notification, push notification, sms integration, line notification, websocket, real time chat, video conferencing, screen sharing, file upload, image processing, pdf generation, report generation, data visualization, dashboard development, admin panel, user management, role based access, permission system, audit trail, backup system, monitoring system, performance monitoring, error tracking, log management, deployment automation, ci cd pipeline, docker containerization, kubernetes orchestration, load balancing, auto scaling, database optimization, query optimization, caching strategy, cdn implementation, performance tuning, speed optimization, core web vitals, lighthouse optimization, conversion rate optimization, a b testing, user experience optimization, user interface design, user journey mapping, wireframing, prototyping, design system, component library, style guide, brand identity, logo design, graphic design, print design, packaging design, marketing materials, business card design, brochure design, banner design, poster design, infographic design, presentation design, video editing, motion graphics, animation, 3d modeling, ar vr development, machine learning integration, ai chatbot, natural language processing, computer vision, data science, big data analytics, blockchain development, smart contract, cryptocurrency, nft marketplace, defi application, web3 development, metaverse development",
  };

  // Use SEO hook
  useSEO(seoConfig);

  // Track app initialization
  useEffect(() => {
    trackEvent("app_initialized", "engagement");

    // Track performance metrics
    if ("performance" in window) {
      window.addEventListener("load", () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType(
            "navigation"
          )[0] as PerformanceNavigationTiming;
          const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
          trackEvent(
            "performance",
            "timing",
            "page_load_time",
            Math.round(loadTime)
          );
        }, 0);
      });
    }
  }, []);

  return (
    <div className="dark min-h-screen bg-slate-950 text-slate-100 relative overflow-x-hidden">
      <SEOHead {...seoConfig} />

      {/* Background Pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="fixed inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5"></div>

      <div className="relative z-10">
        <Header />
        <main>
          <section id="home">
            <Hero />
          </section>
          <section id="expertise">
            <Skills />
          </section>
          <section id="featured-projects">
            <Projects />
          </section>
          <section id="about">
            <About />
          </section>
          <section id="testimonials">
            <Testimonials />
          </section>
          <section id="contact">
            <Contact />
          </section>
        </main>
        <Footer />
        <ChatButton />{" "}
        {/* เพิ่ม ChatButton component ที่นี่ - จะอยู่ด้านนอกโครงสร้าง DOM ปกติ */}
      </div>
    </div>
  );
}

export default App;
