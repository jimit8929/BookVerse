import React from "react";
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  Sparkles,
  FileDown,
  Save,
  Menu,
  X,
  Edit,
  NotebookText,
  ChevronDown,
  FileText,
} from "lucide-react";

import { arrayMove } from "@dnd-kit/sortable";

import axiosInstance from "../utils/axiosInstance.js";
import { API_PATHS } from "../utils/apiPaths.js";
import Dropdown from "../components/ui/Dropdown.jsx";
import { DropdownItem } from "../components/ui/Dropdown.jsx";
import InputField from "../components/ui/InputField.jsx";
import Button from "../components/ui/Button.jsx";
import Modal from "../components/ui/Modal.jsx";
import SelectField from "../components/ui/SelectField.jsx";
import ChapterSidebar from "../components/editor/ChapterSidebar.jsx";
import ChapterEditorTab from "../components/editor/ChapterEditorTab.jsx";
import BookDetailsTab from "../components/editor/BookDetailsTab.jsx";

const EditorPage = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("editor");
  const fileInputRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [isOutlineModalOpen, setIsOutlineModalOpen] = useState(false);
  const [aiTopic, setAiTopic] = useState("");
  const [aiStyle, setAiStyle] = useState("Informative");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axiosInstance.get(
          `${API_PATHS.BOOKS.GET_BOOK_BY_ID}/${bookId}`
        );
        setBook(response.data);
      } catch (error) {
        console.error("Upload Error:", error);

        if (error.response?.data?.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Failed to load book details");
        }
        navigate("/dashboard");
      } finally {
        setIsLoading(false);
      }
    };
    fetchBook();
  }, [bookId, navigate]);

  const handleBookChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleChapterChange = (e) => {
    const { name, value } = e.target;
    const updatedChapters = [...book.chapters];
    updatedChapters[selectedChapterIndex][name] = value;
    setBook((prev) => ({ ...prev, chapters: updatedChapters }));
  };

  const handleAddChapter = () => {
    const newChapter = {
      title: `Chapter ${book.chapters.length + 1}`,
      content: "",
    };

    const updatedChapters = [...book.chapters, newChapter];
    setBook((prev) => ({ ...prev, chapters: updatedChapters }));
    setSelectedChapterIndex(updatedChapters.length - 1);
  };

  const handleDeleteChapter = (index) => {
    if (book.chapters.length <= 1) {
      toast.error("A book must have atleast one chapter.");
      return;
    }

    const updatedChapters = book.chapters.filter((_, i) => i !== index);
    setBook((prev) => ({ ...prev, chapters: updatedChapters }));
    setSelectedChapterIndex((prevIndex) =>
      prevIndex >= index ? Math.max(0, prevIndex - 1) : prevIndex
    );
  };

  const handleReorderChapters = (oldIndex, newIndex) => {
    setBook((prev) => ({
      ...prev,
      chapters: arrayMove(prev.chapters, oldIndex, newIndex),
    }));
    setSelectedChapterIndex(newIndex);
  };

  const handleSaveChanges = async (bookToSave = book, showToast = true) => {
    setIsSaving(true);

    try {
      await axiosInstance.put(
        `${API_PATHS.BOOKS.UPDATE_BOOK}/${bookId}`,
        bookToSave
      );

      if (showToast) {
        toast.success("Changes saved Successfully!");
      }
    } catch (error) {
      console.log("Error", error);
      toast.error("Failed to save changes.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCoverImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("coverImage", file);
    setIsUploading(true);

    try {
      const response = await axiosInstance.put(
        `${API_PATHS.BOOKS.UPDATE_COVER}/${bookId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      // setBook(response.data);
      setBook((prev) => {
        // If backend returned a full book, response.data.chapters may exist — prefer server copy
        if (response.data && response.data.chapters) {
          return { ...prev, ...response.data };
        }
        // Otherwise merge safely (preserve prev.chapters)
        return { ...prev, ...response.data, chapters: prev?.chapters ?? [] };
      });

      toast.success("Cover Image Updated!");
    } catch (error) {
      console.error("Upload Error:", error);

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to upload cover image");
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleGenerateChapterContent = async (index) => {
    const chapter = book.chapters[index];
    if (!chapter || !chapter.title) {
      toast.error("Chapter title is required to generate content");
      return;
    }
    setIsGenerating(index);

    try {
      const response = await axiosInstance.post(
        API_PATHS.AI.GENERATE_CHAPTER_CONTENT,
        {
          chapterTitle: chapter.title,
          chapterDescription: chapter.description || "",
          style: aiStyle,
        }
      );

      const updatedChapters = [...book.chapters];
      updatedChapters[index].content = response.data.content;

      const updatedBook = { ...book, chapters: updatedChapters };
      setBook(updatedBook);
      toast.success(`Content for "${chapter.title}" generated`);

      await handleSaveChanges(updatedBook, false);
    } catch (error) {
      console.error("Upload Error:", error);

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to upload cover image");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExportPDF = async () => {
    toast.loading("Generating PDF....");

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.EXPORT.PDF}/${bookId}/pdf`,
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${book.title}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.dismiss();
      toast.success("PDF export started");
    } catch (error) {
      toast.dismiss();

      console.error("Upload Error:", error);

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to upload PDF");
      }
    }
  };

  const handleExportDoc = async () => {
    toast.loading("Generating PDF....");

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.EXPORT.DOC}/${bookId}/doc`,
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${book.title}.docx`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.dismiss();
      toast.success("Document export started");
    } catch (error) {
      toast.dismiss();

      console.error("Upload Error:", error);

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to Export document");
      }
    }
  };

  if (isLoading || !book) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center px-6">
        <div className="relative">
          <div className="h-24 w-24 rounded-full bg-linear-to-br from-violet-300 to-purple-400 blur-2xl opacity-40"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-14 w-14 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin"></div>
          </div>
        </div>

        <h2 className="mt-8 text-4xl font-semibold text-gray-900">
          Loading Editor...
        </h2>
        <p className="text-xl text-gray-500 mt-2">
          Setting up your writing workspace
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex bg-slate-50 font-sans relative min-h-screen">
        {/* Mobile Sidebar */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 flex md:hidden"
            role="dialog"
            aria-modal="true"
          >
            <div
              className="fixed inset-0 bg-black/20 bg-opacity-75"
              aria-hidden="true"
              onClick={() => setIsSidebarOpen(false)}
            ></div>

            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  className="ml-2 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white "
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <span className="sr-only">Close Sidebar</span>
                  <X className="w-8 h-8 text-white" />
                </button>
              </div>

              <ChapterSidebar
                book={book}
                selectedChapterIndex={selectedChapterIndex}
                onSelectChapter={setSelectedChapterIndex}
                onAddChapter={handleAddChapter}
                onDeleteChapter={handleDeleteChapter}
                onGenerateChapterContent={handleGenerateChapterContent}
                isGenerating={isGenerating}
                onReorderChapters={handleReorderChapters}
              />
            </div>
            <div className="shrink-0 w-14 " aria-hidden="true"></div>
          </div>
        )}

        {/* Desktop Sidebar */}
        <div className="hidden md:flex md:shrink-0 sticky top-0 h-screen">
          <ChapterSidebar
            book={book}
            selectedChapterIndex={selectedChapterIndex}
            onSelectChapter={(index) => {
              setSelectedChapterIndex(index);
              setIsSidebarOpen(false);
            }}
            onAddChapter={handleAddChapter}
            onDeleteChapter={handleDeleteChapter}
            onGenerateChapterContent={handleGenerateChapterContent}
            isGenerating={isGenerating}
            onReorderChapters={handleReorderChapters}
          />
        </div>

        <main className="flex-1 h-full flex flex-col">
          <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-slate-200 p-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <button
                className="md:hidden p-2 text-slate-500 hover:text-slate-800"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </button>

              <div className="hidden sm:flex space-x-1 bg-slate-100 p-1 rounded-lg">
                <button
                  className={`flex items-center justify-center flex-1 py-2 px-4 text-xl font-medium rounded-md transition-colors duration-200 ${
                    activeTab === "editor"
                      ? "bg-white text-slate-800 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  } `}
                  onClick={() => setActiveTab("editor")}
                >
                  <Edit className="w-4 h-4 mr-2" /> Editor
                </button>

                <button
                  className={`flex items-center justify-center flex-1 py-2 px-4 text-xl font-medium rounded-md transition-colors duration-200 whitespace-nowrap ${
                    activeTab === "details"
                      ? "bg-white text-slate-800 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                  onClick={() => setActiveTab("details")}
                >
                  <NotebookText className="w-4 h-4 mr-2" /> Book Details
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <Dropdown
                trigger={
                  <Button variant="secondary" icon={FileDown}>
                    Export
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </Button>
                }
              >
                <DropdownItem onClick={handleExportPDF}>
                  <FileText className="w-4 h-4 mr-2 text-slate-500" /> Export as
                  PDF
                </DropdownItem>

                <DropdownItem onClick={handleExportDoc}>
                  <FileText className="w-4 h-4 mr-2 text-slate-500" /> Export as
                  DOC
                </DropdownItem>
              </Dropdown>

              <Button
                onClick={() => handleSaveChanges()}
                isLoading={isSaving}
                icon={Save}
              >
                Save Changes
              </Button>
            </div>
          </header>

          <div className="w-full">
            {activeTab === "editor" ? (
              <ChapterEditorTab
                book={book}
                selectedChapterIndex={selectedChapterIndex}
                onChapterChange={handleChapterChange}
                onGenerateChapterContent={handleGenerateChapterContent}
                isGenerating={isGenerating}
              />
            ) : (
              <BookDetailsTab
                book={book}
                onBookChange={handleBookChange}
                onCoverUpload={handleCoverImageUpload}
                isUploading={isUploading}
                fileInputRef={fileInputRef}
              />
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default EditorPage;
