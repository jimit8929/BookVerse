import React from "react";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Menu } from "lucide-react";
import ViewChapterSidebar from "./ViewChapterSidebar";

const ViewBook = ({ book }) => {
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  const [sidebarOpen, setIsSidebarOpen] = useState(false);
  const [fontSize, setFontSize] = useState(20);

  // defensive: if book is missing, render placeholder
  if (!book || !book.chapters) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-64px)]">
        <p className="text-gray-500">No book selected</p>
      </div>
    );
  }

  const selectedChapter = book.chapters[selectedChapterIndex] || {
    title: "",
    content: "",
  };

  // Format content with proper paragraphs and styling
  const formatContent = (content) => {
    return content
      .split("\n\n")
      .filter((paragraph) => paragraph.trim())
      .map((paragraph) => paragraph.trim())
      .map((paragraph) => {
        // Bold: **text**
        paragraph = paragraph.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

        // Italic: *text*
        paragraph = paragraph.replace(
          /(?<!\*)\*(?!\*)(.*?)(?<!\*)\*(?!\*)/g,
          "<em>$1</em>"
        );

        return `<p>${paragraph}</p>`;
      })
      .join("");
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-white text-gray-900">
      <ViewChapterSidebar
        book={book}
        selectedChapterIndex={selectedChapterIndex} // <-- FIXED: pass the index, not the chapter
        onSelectChapter={(idx) => setSelectedChapterIndex(idx)}
        isOpen={sidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-6">
            <button
              className="lg:hidden p-4 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-7 h-7" />
            </button>

            <div>
              <h1 className="font-semibold text-2xl md:text-3xl truncate">
                {book.title}
              </h1>
              {/* changed color to be visible on white */}
              <p className="text-lg text-gray-500">by {book.author}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4 mr-4">
              <button
                className="p-3 hover:bg-gray-100 rounded-lg transition-colors text-xl font-bold"
                onClick={() => setFontSize(Math.max(14, fontSize - 2))}
              >
                A-
              </button>
              <span className="text-lg text-gray-500">{fontSize}px</span>

              <button
                className="p-3 hover:bg-gray-100 rounded-lg transition-colors text-xl font-bold"
                onClick={() => setFontSize(Math.min(36, fontSize + 2))}
              >
                A+
              </button>
            </div>
          </div>
        </header>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[1660px] mx-auto px-6 py-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              {selectedChapter.title}
            </h1>

            <div
              className="reading-content"
              style={{
                fontSize: `${fontSize}px`,
                lineHeight: 1.7,
                fontFamily: "Charter, Georgia, 'Times New Roman', Serif",
              }}
              dangerouslySetInnerHTML={{
                __html: formatContent(selectedChapter.content),
              }}
            />

            <div className="flex justify-between items-center mt-16 pt-8 border-t border-gray-200">
              <button
                className="flex items-center gap-2 px-4 py-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() =>
                  setSelectedChapterIndex(Math.max(0, selectedChapterIndex - 1))
                }
                disabled={selectedChapterIndex === 0}
              >
                <ChevronLeft className="w-6 h-6" />
                Previous Chapter
              </button>

              <span className="text-lg text-gray-50">
                {selectedChapterIndex + 1} of {book.chapters.length}
              </span>

              <button
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() =>
                  setSelectedChapterIndex(
                    Math.min(book.chapters.length - 1, selectedChapterIndex + 1)
                  )
                }
                disabled={selectedChapterIndex === book.chapters.length - 1}
              >
                Next Chapter
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .reading-content {
          font-family: "Charter", "Georgia", serif;
          line-height: 1.75;
          color: #222;
        }

        .reading-content p {
          margin: 0 0 1.4em 0;
          text-align: justify;
          text-justify: inter-word;
          hyphens: auto;
        }

        /* First and last paragraph spacing refinement */
        .reading-content p:first-child {
          margin-top: 0;
        }
        .reading-content p:last-child {
          margin-bottom: 0;
        }

        /* Strong / Bold */
        .reading-content strong {
          font-weight: 700;
          color: #111;
        }

        /* Italic */
        .reading-content em {
          font-style: italic;
          color: #444;
        }

        /* Better spacing for headings if you add markdown headings later */
        .reading-content h1,
        .reading-content h2,
        .reading-content h3 {
          font-weight: 700;
          line-height: 1.3;
          margin: 1.2em 0 0.6em;
        }

        .reading-content h1 {
          font-size: 2rem;
        }
        .reading-content h2 {
          font-size: 1.6rem;
        }
        .reading-content h3 {
          font-size: 1.3rem;
        }

        /* Lists (for future content support) */
        .reading-content ul,
        .reading-content ol {
          margin: 1em 0 1.5em 1.2em;
          padding-left: 1.2em;
        }
        .reading-content li {
          margin-bottom: 0.6em;
        }

        /* Blockquote (very readable) */
        .reading-content blockquote {
          border-left: 4px solid #a78bfa;
          background: #faf8ff;
          padding: 1em 1.4em;
          margin: 1.2em 0;
          font-style: italic;
          color: #555;
        }
      `}</style>
    </div>
  );
};

export default ViewBook;
