import React from "react";
import { BookOpen, ChevronLeft } from "lucide-react";

const ViewChapterSidebar = ({
  book,
  selectedChapterIndex,
  onSelectChapter,
  isOpen,
  onClose,
}) => {
  if (!book || !Array.isArray(book.chapters)) {
    return null;
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed lg:relative left-0 top-0 h-full w-80 bg-white border-r border-gray-100 transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } `}
      >
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-violet-600" />
              <span className="font-medium text-gray-900 text-xl">Chapters</span>
            </div>

            <button
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={onClose}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto h-full pb-20">
          {book.chapters.map((chapter, index) => (
            <button
              className={`w-full text-left p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 ${
                selectedChapterIndex === index
                  ? "bg-violet-50 border-l-4 border-l-violet-600"
                  : ""
              }`}
              key={index}
              onClick={() => {
                onSelectChapter(index);
                onClose();
              }}
            >
              <div
                className={`font-medium text-xl truncate ${
                  selectedChapterIndex === index ? "text-violet-900" : "text-gray-900"
                }`}
              >
                {chapter.title || `Chapter ${index + 1}`}
              </div>

              <div className="text-lg text-gray-500 mt-2">Chapter {index + 1}</div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default ViewChapterSidebar;
