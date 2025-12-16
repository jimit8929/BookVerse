import React from "react";
import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "../../utils/data.js";

const Testimonials = () => {
  return (
    <div
      id="testimonials"
      className="relative py-16 sm:py-24 lg:py-32 bg-linear-to-br from-violet-50 via-purple-50 to-white overflow-hidden"
    >
      {/* background blobs */}
      <div className="absolute top-16 right-6 sm:right-10 w-44 sm:w-64 h-44 sm:h-64 bg-violet-300/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-16 left-6 sm:left-10 w-72 sm:w-96 h-72 sm:h-96 bg-purple-300/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* heading */}
        <div className="text-center mb-14 sm:mb-20 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-violet-100 shadow-sm">
            <Star className="w-4 h-4 text-violet-600 fill-violet-600" />
            <span className="text-base sm:text-lg font-semibold text-violet-900">
              Testimonials
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 tracking-tight">
            Loved by Creators
            <span className="block mt-2 p-1 sm:p-3 bg-linear-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              Everywhere
            </span>
          </h2>

          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our users have to say
            about their experience.
          </p>
        </div>

        {/* testimonials grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, index) => (
            <div
              key={index}
              className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-gray-100 hover:border-violet-500 hover:shadow-2xl hover:shadow-violet-500/30 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-10 sm:w-12 h-10 sm:h-12 bg-linear-to-br from-violet-500 to-purple-600 rounded-2xl flex items-end justify-center shadow-lg shadow-violet-500/30 rotate-6 group-hover:rotate-12 transition-transform duration-300">
                <Quote className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
              </div>

              <div className="flex items-center space-x-1 mb-4 sm:mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 sm:w-5 h-4 sm:h-5 text-violet-500 fill-violet-500"
                  />
                ))}
              </div>

              <p className="text-gray-700 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-linear-to-br from-violet-500 to-purple-600 rounded-full blur opacity-30"></div>
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="relative w-12 sm:w-14 h-12 sm:h-14 rounded-full object-cover ring-2 ring-white shadow-lg"
                  />
                </div>

                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm sm:text-base">
                    {testimonial.author}
                  </p>
                  <p className="text-gray-500 text-sm sm:text-lg">
                    {testimonial.title}
                  </p>
                </div>
              </div>

              <div className="absolute inset-0 bg-linear-to-br from-violet-50/0 to-purple-50/0 group-hover:from-violet-50/50 group-hover:to-purple-50/30 rounded-3xl transition-all duration-300 -z-10"></div>
            </div>
          ))}
        </div>

        {/* stats */}
        <div className="mt-14 sm:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">
              50K+
            </div>
            <div className="text-gray-600">Happy Creators</div>
          </div>

          <div className="text-center">
            <div className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">
              4.9/5
            </div>
            <div className="text-gray-600">Average Rating</div>
          </div>

          <div className="text-center">
            <div className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">
              100K+
            </div>
            <div className="text-gray-600">Ebooks Created</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
