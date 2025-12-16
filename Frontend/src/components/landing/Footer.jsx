import { BookOpen, Twitter, Linkedin, Github } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative bg-linear-to-br from-gray-950 via-gray-950 to-violet-950 text-white overflow-hidden">
      {/* subtle glow */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-violet-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* top section */}
        <div className="py-14 sm:py-16 grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* brand */}
          <div className="md:col-span-5 space-y-5 sm:space-y-6">
            <Link to="/" className="flex items-center space-x-2.5 group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-linear-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/50 transition-all duration-300 group-hover:scale-105">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl sm:text-2xl font-semibold tracking-tight">eBook Creator</span>
            </Link>

            <p className="text-gray-400 leading-relaxed max-w-sm text-base sm:text-lg">
              Create, Design, and Publish stunning ebooks with the Power of AI.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <Link
                to="https://twitter.com"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-white/5 hover:bg-violet-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </Link>

              <Link
                to="https://www.linkedin.com/in/jimit-mehta-890745303/"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-white/5 hover:bg-violet-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </Link>

              <Link
                to="https://github.com/jimit8929"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-white/5 hover:bg-violet-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Github"
              >
                <Github className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* links */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Product</h3>
              <ul className="space-y-2.5 sm:space-y-3">
                <li>
                  <Link to="#features" className="text-gray-400 hover:text-violet-400 transition-colors duration-300 text-base sm:text-lg">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="#pricing" className="text-gray-400 hover:text-violet-400 transition-colors duration-300 text-base sm:text-lg">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="#templates" className="text-gray-400 hover:text-violet-400 transition-colors duration-300 text-base sm:text-lg">
                    Templates
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Company</h3>
              <ul className="space-y-2.5 sm:space-y-3">
                <li>
                  <Link to="#about" className="text-gray-400 hover:text-violet-400 transition-colors duration-300 text-base sm:text-lg">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="#contact" className="text-gray-400 hover:text-violet-400 transition-colors duration-300 text-base sm:text-lg">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="#blog" className="text-gray-400 hover:text-violet-400 transition-colors duration-300 text-base sm:text-lg">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Legal</h3>
              <ul className="space-y-2.5 sm:space-y-3">
                <li>
                  <Link to="#privacy" className="text-gray-400 hover:text-violet-400 transition-colors duration-300 text-base sm:text-lg">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link to="#terms" className="text-gray-400 hover:text-violet-400 transition-colors duration-300 text-base sm:text-lg">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* bottom bar */}
        <div className="border-t border-white/10 py-6 sm:py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0 text-center md:text-left">
            <p className="text-gray-400 text-sm sm:text-lg">
              © {new Date().getFullYear()} eBook Creator. All rights reserved.
            </p>

            <p className="text-gray-500 text-sm sm:text-lg">
              Made with <span className="text-violet-400">❤️</span> for creators
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
