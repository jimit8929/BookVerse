import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/apiPaths.js";
import { Edit, Trash2 } from "lucide-react";

const BookCard = ({ book, onDelete }) => {
  const navigate = useNavigate();

  const coverImageUrl = book.coverImage
    ? `${BASE_URL}/backend${book.coverImage}`.replace(/\\/g, "/")
    : null;

  return (
    <div
      className="
        group relative bg-white rounded-2xl overflow-hidden border border-gray-100 
        transition-all duration-300 cursor-pointer 
        hover:shadow-[0_10px_35px_rgba(0,0,0,0.08)]
        hover:-translate-y-1 hover:border-gray-200
      "
      onClick={() => navigate(`/view-book/${book._id}`)}
    >
      {/* IMAGE */}
      <div className="relative bg-linear-to-br from-gray-50 to-gray-100">
        {coverImageUrl ? (
          <img
            src={coverImageUrl}
            alt={book.title}
            className="
              w-full aspect-16/25 object-cover 
              rounded-t-2xl
              transition-transform duration-500 
              group-hover:scale-105
            "
            onError={(e) => (e.target.style.display = "none")}
          />
        ) : (
          <div className="w-full aspect-16/25 bg-gray-200 flex items-center justify-center text-gray-400 text-xl">
            No Cover
          </div>
        )}

        {/* FLOATING ACTION BUTTONS */}
        <div
          className="
            absolute top-3 right-3 flex gap-2
            opacity-0 group-hover:opacity-100 
            transition-all duration-300
          "
        >
          {/* EDIT */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/editor/${book._id}`);
            }}
            className="
              w-11 h-11 bg-white/90 backdrop-blur-md rounded-full
              flex items-center justify-center shadow-md
              hover:bg-white transition-all
              hover:shadow-lg hover:scale-[1.07]
            "
          >
            <Edit className="w-6 h-6 text-gray-700" />
          </button>

          {/* DELETE */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(book._id);
            }}
            className="
              w-11 h-11 bg-white/90 backdrop-blur-md rounded-full
              flex items-center justify-center shadow-md
              hover:bg-red-50 transition-all 
              hover:shadow-lg hover:scale-[1.07]
            "
          >
            <Trash2 className="w-6 h-6 text-red-500" />
          </button>
        </div>
      </div>

      {/* TITLE OVERLAY */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>

        <div className="relative z-10">
          <h3 className="font-semibold text-white text-lg leading-tight line-clamp-2 drop-shadow-md">
            {book.title}
          </h3>
          <p className="text-base text-gray-200 font-medium drop-shadow-sm">
            {book.author}
          </p>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div
        className="
          absolute bottom-0 left-0 right-0 h-[3px]
          bg-linear-to-r from-orange-500 via-amber-500 to-rose-500
          opacity-0 group-hover:opacity-100 
          transition-opacity duration-300
        "
      />
    </div>
  );
};

export default BookCard;
