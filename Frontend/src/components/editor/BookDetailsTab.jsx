import React from "react";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import { UploadCloud } from "lucide-react";
import { BASE_URL } from "../../utils/apiPaths.js";

const BookDetailsTab = ({
  book,
  onBookChange,
  onCoverUpload,
  isUploading,
  fileInputRef,
}) => {
  // Safe cover image handling (no crash if undefined)
  const coverImageUrl = book?.coverImage
    ? book.coverImage.startsWith("http")
      ? book.coverImage
      : `${BASE_URL}/Backend${book.coverImage}`.replace(/\\/g, "/") 
    : "/placeholder-cover.png"; 

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Book Details */}
      <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
        <h3 className="text-3xl font-semibold text-slate-900 mb-6">
          Book Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <InputField
            label="Title"
            name="title"
            value={book.title}
            onChange={onBookChange}
          />

          <InputField
            label="Author"
            name="author"
            value={book.author}
            onChange={onBookChange}
          />

          <div className="md:col-span-2">
            <InputField
              label="Subtitle"
              name="subtitle"
              value={book.subtitle || ""}
              onChange={onBookChange}
            />
          </div>
        </div>
      </div>

      {/* Cover Image */}
      <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm mt-8">
        <h3 className="text-3xl font-semibold text-slate-900 mb-6">
          Cover Image
        </h3>

        <div className="flex items-start gap-10">
          <img
            src={coverImageUrl}
            alt="Cover"
            className="w-40 h-56 object-cover rounded-lg bg-slate-100 shadow-sm border border-slate-200"
          />

          <div>
            <p className="text-xl text-slate-600 mb-8">
              Upload a new cover image. Recommended size: 600×800px.
            </p>

            {/* Input (hidden) */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={onCoverUpload}
              className="hidden"
              accept="image/*"
            />

            <Button
              variant="primary"
              onClick={() =>
                fileInputRef.current && fileInputRef.current.click()
              } // FIXED: safe click
              isLoading={isUploading}
              icon={UploadCloud}
            >
              Upload Image
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsTab;
