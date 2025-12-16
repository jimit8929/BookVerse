import React from "react";
import { Link } from "react-router-dom";
import { FEATURES } from "../../utils/data.js";

const Features = () => {
  return (
    <div
      id="features"
      className="relative py-16 sm:py-24 lg:py-32 bg-white overflow-hidden"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-linear-to-b from-violet-50/50 via-transparent to-purple-50/50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Heading */}
        <div className="text-center mb-14 sm:mb-20 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-violet-100 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
            <span className="w-2 h-2 bg-violet-600 rounded-full animate-pulse"></span>
            <span className="text-base sm:text-lg font-semibold text-violet-900">
              Our Features
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 tracking-tight">
            Everything You Need to
            <span className="block mt-2 bg-linear-to-r from-violet-600 via-purple-600 to-violet-600 bg-clip-text text-transparent">
              Create Your Ebook
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Our Platform is packed with powerful features to help you write,
            design, and publish your ebook with ease.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 hover:border-violet-500 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-linear-to-br from-violet-50/0 to-purple-50/0 group-hover:from-violet-50/50 group-hover:to-purple-50/30 rounded-2xl transition-all duration-300"></div>

                <div className="relative space-y-4">
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 bg-linear-to-br ${feature.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-all duration-300`}
                  >
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-violet-900 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                      {feature.description}
                    </p>
                  </div>

                  <div className="pt-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-violet-600 text-base sm:text-lg font-medium inline-flex items-center">
                      Learn More
                      <svg
                        className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-14 sm:mt-16">
          <p className="text-gray-600 mb-5 sm:mb-6">Ready to get Started?</p>
          <Link
            to="/signup"
            className="inline-flex items-center space-x-2 bg-linear-to-r from-violet-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-105 transition-all duration-300"
          >
            <span>Start Creating Today</span>
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 7l5 5m0 0l-5 5m5-5H9"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Features;
