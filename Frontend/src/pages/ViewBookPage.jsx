import React from "react";
import { useEffect, useState } from "react";
import CustomToaster from "../components/ui/Custom_Toaster";
import { Book } from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";

import axiosInstance from "../utils/axiosInstance.js";
import { API_PATHS } from "../utils/apiPaths.js";
import ViewBook from "../components/view/ViewBook.jsx";
import { useParams } from "react-router-dom";

const ViewBookSkeleton = () => {
  <div className="animate-pulse">
    <div className="h-8 bg-slate-200 rounded w-1/2 mb-4"></div>
    <div className="h-4 bg-slate-200 rounded w-1/4 mb-8"></div>
    <div className="flex gap-8">
      <div className="w-1/4">
        <div className="h-96 bg-slate-200 rounded-lg"></div>
      </div>

      <div className="w-3/4">
        <div className="h-full bg-slate-200 rounded-lg"></div>
      </div>
    </div>
  </div>;
};

const ViewBookPage = () => {
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { bookId } = useParams();

  useEffect(() => {
    let isMounted = true; // prevents state updates after unmount

    const fetchBook = async () => {
      try {
        setIsLoading(true);

        const response = await axiosInstance.get(
          `${API_PATHS.BOOKS.GET_BOOK_BY_ID}/${bookId}`
        );

        if (isMounted) {
          setBook(response.data);
        }
      } catch (error) {
        if (isMounted) CustomToaster.error("Failed to fetch eBook.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    if (bookId) fetchBook();

    return () => {
      isMounted = false;
    };
  }, [bookId]);

  return (
    <DashboardLayout>
      {isLoading ? (
        <ViewBookSkeleton />
      ) : book ? (
        <ViewBook book={book} />
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-slate-300 rounded-xl mt-8">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
            <Book className="w-12 h-12 text-slate-400"/>
          </div>
          <h3 className="text-3xl font-medium text-slate-900 mb-4">
            eBook Not Found
          </h3>
          <p className="text-slate-500 mb-8 max-w-md">
            The eBook you are looking for does not exist or you do not have permission to view it.
          </p>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ViewBookPage;
