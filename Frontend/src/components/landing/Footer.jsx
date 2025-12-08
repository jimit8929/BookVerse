import { BookOpen, Twitter, Linkedin, Github } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative bg-linear-to-br from-gray-950 via-gray-950 to-violet-950 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-[1660px] mx-auto px-6 lg:px-8">
        <div className="py-16 grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5 space-y-6">
            <Link to="/" className="flex items-center space-x-2.5 group">
              <div className="w-10 h-10 bg-linear-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/50 transition-all duration-300 group-hover:scale-105">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-semibold tracking-tight">eBook Creator</span>
            </Link>

            <p className="text-gray-400 leading-relaxed max-w-sm">
              Create, Design, and Publish stunning ebooks with the Power of AI.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <Link to="https://twitter.com" className="w-10 h-10 bg-white/5 hover:bg-violet-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </Link>

              <Link
                to="https://www.linkedin.com/in/jimit-mehta-890745303/"
                className="w-10 h-10 bg-white/5 hover:bg-violet-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </Link>

              <Link
                to="https://github.com/jimit8929"
                className="w-10 h-10 bg-white/5 hover:bg-violet-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Github"
              >
                <Github className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="#features" className="text-gray-400 hover:text-violet-400 transition-colors duration-300 text-lg">
                    Features
                  </Link>
                </li>

                <li>
                  <Link to="#pricing" className="text-gray-400 hover:text-violet-400 transition-colors duration-300 text-lg">
                    Pricing
                  </Link>
                </li>

                <li>
                  <Link to="#templates" className="text-gray-400 hover:text-violet-400 transition-colors duration-300 text-lg">Templates</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="#about" className="text-gray-400 hover:text-violet-400 transition-colors duration-300 text-lg">
                    About
                  </Link>
                </li>

                <li>
                  <Link to="#contact" className="text-gray-400 hover:text-violet-400 transition-colors duration-300 text-lg">
                    Contact
                  </Link>
                </li>

                <li>
                  <Link to="#blog" className="text-gray-400 hover:text-violet-400 transition-colors duration-300 text-lg">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="#privacy" className="text-gray-400 hover:text-violet-400 transition-colors duration-300 text-lg">
                    Privacy
                  </Link>
                </li>

                <li>
                  <Link to="#terms" className="text-gray-400 hover:text-violet-400 transition-colors duration-300 text-lg">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-lg">
              © {new Date().getFullYear()} eBook Creator. All rights reserved.
            </p>

            <p className="text-gray-500 text-lg">
              Made with <span className="text-violet-400">❤️</span> for creators
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
