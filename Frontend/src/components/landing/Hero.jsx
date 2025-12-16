import React from "react";
import { ArrowRight, Sparkles, BookOpen, Zap } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import HERO_IMG from "../../assets/HERO_IMG.jpg";
import HERO_IMG_2 from "../../assets/HERO_IMG_2.jpg";

const Hero = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="relative bg-linear-to-br from-violet-50 via-white to-purple-50 overflow-hidden">
      {/* decorative blobs */}
      <div className="absolute top-20 left-6 sm:left-10 w-44 sm:w-64 h-44 sm:h-64 bg-violet-200/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-6 sm:right-10 w-72 sm:w-96 h-72 sm:h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-700"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="max-w-3xl space-y-6 sm:space-y-8">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-violet-100 shadow-sm">
              <Sparkles className="w-4 h-4 text-violet-600" />
              <span className="text-base sm:text-lg font-medium text-violet-900">
                AI-Powered Publishing
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight tracking-tight">
              Create Stunning
              <span className="block mt-2 bg-linear-to-r from-violet-600 via-purple-600 to-violet-600 bg-clip-text text-transparent">
                Ebooks in Minutes
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl">
              From idea to published ebook, our AI-powered platform helps you
              write, design, and export professional-quality books effortlessly.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <Link
                to={isAuthenticated ? "/dashboard" : "/login"}
                className="group inline-flex items-center justify-center w-full sm:w-auto space-x-2 bg-linear-to-r from-violet-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-105 transition-all duration-300"
              >
                <span>Start Creating for Free</span>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="#demo"
                className="inline-flex items-center space-x-2 text-gray-700 font-medium hover:text-violet-600 transition-colors duration-300"
              >
                <span>Watch Demo</span>
                <span className="text-violet-600">→</span>
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4">
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-gray-900">
                  50K+
                </div>
                <div className="text-sm sm:text-lg text-gray-600">
                  Books Created
                </div>
              </div>

              <div className="hidden sm:block w-px h-12 bg-gray-200"></div>

              <div>
                <div className="text-3xl sm:text-4xl font-bold text-gray-900">
                  4.9/5
                </div>
                <div className="text-sm sm:text-lg text-gray-600">
                  User Rating
                </div>
              </div>

              <div className="hidden sm:block w-px h-12 bg-gray-200"></div>

              <div>
                <div className="text-3xl sm:text-4xl font-bold text-gray-900">
                  10min
                </div>
                <div className="text-sm sm:text-lg text-gray-600">
                  Avg. Creation
                </div>
              </div>
            </div>
          </div>

          {/* Right visual */}
          <div className="relative lg:pl-8 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl">
              <div className="absolute inset-0 transform scale-95 lg:scale-100 rounded-3xl bg-linear-to-r from-violet-600 to-purple-600 opacity-20 blur-2xl"></div>

              <div className="relative bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
                {/* Desktop image */}
                <img
                  src={HERO_IMG}
                  alt="AI Ebook Creator Dashboard"
                  loading="eager"
                  className="w-full object-cover hidden lg:block h-[520px] lg:h-[600px]"
                />

                {/* Mobile / tablet image */}
                <img
                  src={HERO_IMG_2}
                  alt="AI Ebook Creator Dashboard Compact"
                  loading="lazy"
                  className="w-full object-cover block lg:hidden h-80 sm:h-[420px]"
                />

                <div className="absolute top-4 right-4 bg-white rounded-2xl shadow-xl p-3 sm:p-4 backdrop-blur-sm border border-gray-100 animate-in fade-in slide-in-from-right duration-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-linear-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-white" />
                    </div>

                    <div>
                      <div className="text-sm sm:text-lg text-gray-500">
                        Processing
                      </div>
                      <div className="text-sm sm:text-lg font-semibold text-gray-900">
                        AI Generation
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 bg-white rounded-2xl shadow-xl p-3 sm:p-4 backdrop-blur-sm border border-gray-100 animate-in fade-in slide-in-from-left duration-700 delay-300">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-linear-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>

                    <div>
                      <div className="text-sm sm:text-lg text-gray-500">
                        Completed
                      </div>
                      <div className="text-sm sm:text-lg font-semibold text-gray-900">
                        247 Pages
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Top-left decorative block */}
            <div className="pointer-events-none absolute -top-4 -left-1 w-10 h-10 bg-violet-400/30 rounded-2xl rotate-12 sm:-top-6 sm:-left-2 sm:w-14 sm:h-14 md:-top-6 md:-left-3 md:w-16 md:h-16 lg:-top-8 lg:-left-2 lg:w-20 lg:h-20"></div>

            {/* Bottom-right decorative circle */}
            <div className="pointer-events-none absolute -bottom-8 -right-6 w-20 h-20 bg-purple-400/30 rounded-full sm:-bottom-10 sm:-right-10 sm:w-24 sm:h-24 md:-bottom-12 md:-right-12 md:w-28 md:h-28 lg:-bottom-14 lg:-right-14 lg:w-32 lg:h-32"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
