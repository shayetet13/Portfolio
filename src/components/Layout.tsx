import { ReactNode } from "react";
import SEOHead from "./SEOHead";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
}

const Layout = ({ children, title, description, keywords }: LayoutProps) => {
  return (
    <>
      <SEOHead title={title} description={description} keywords={keywords} />

      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <nav className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <a href="/" className="text-xl font-bold text-gray-900">
                  devnid.xyz
                </a>
              </div>
              <div className="flex items-center space-x-6">
                <a href="/" className="text-gray-600 hover:text-gray-900">
                  หน้าแรก
                </a>
                <a href="/about" className="text-gray-600 hover:text-gray-900">
                  เกี่ยวกับ
                </a>
                <a href="/posts" className="text-gray-600 hover:text-gray-900">
                  บทความ
                </a>
              </div>
            </nav>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8">{children}</main>

        <footer className="bg-gray-800 text-white mt-16">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">devnid.xyz</h3>
                <p className="text-gray-300">
                  บล็อกสำหรับนักพัฒนาเกี่ยวกับ Software Development และเทคโนโลยี
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">หมวดหมู่</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>
                    <a href="/posts/system-design" className="hover:text-white">
                      System Design
                    </a>
                  </li>
                  <li>
                    <a href="/posts/docker" className="hover:text-white">
                      Docker
                    </a>
                  </li>
                  <li>
                    <a href="/posts/nextjs" className="hover:text-white">
                      Next.js
                    </a>
                  </li>
                  <li>
                    <a href="/posts/programming" className="hover:text-white">
                      การเขียนโปรแกรม
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">ติดต่อ</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>
                    <a
                      href="https://github.com/shayetet13/Portfolio"
                      className="hover:text-white"
                    >
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://linkedin.com/in/your-linkedin"
                      className="hover:text-white"
                    >
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:contact@devnid.xyz"
                      className="hover:text-white"
                    >
                      Email
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
              <p>&copy; 2025 devnid.xyz - All rights reserved</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout;
