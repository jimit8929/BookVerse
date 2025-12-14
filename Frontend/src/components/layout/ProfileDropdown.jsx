import React from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const ProfileDropdown = ({
  isOpen,
  onToggle,
  avatar,
  companyName,
  email,
  onLogout,
}) => {


  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50 transition-colors duration-300"
      >
        {avatar ? (
          <img
            src={avatar}
            alt="Avatar"
            className="h-9 w-9 object-cover rounded-xl"
          />
        ) : (
          <div className="h-8 w-8 bg-linear-to-br from-violet-400 to-violet-500 rounded-xl flex items-center justify-center">
            <span className="text-white font-semibold text-lg">
              {companyName?.charAt(0)?.toUpperCase() || ""}
            </span>
          </div>
        )}

        <div className="hidden sm:block text-left">
          <p className="text-xl font-medium text-gray-900">{companyName}</p>
          <p className="text-lg text-gray-500">{email}</p>
        </div>

        <ChevronDown className="h-4 w-4 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-xl font-medium text-gray-900">{companyName}</p>
            <p className="text-lg text-gray-500">{email}</p>
          </div>

          {/* Use Link with `to` for profile navigation */}
          <Link
            to="/profile"
            className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            View Profile
          </Link>

          <div className="border-t border-gray-100 mt-2 pt-2">
            {/* Use button for sign out */}
            <button
              type="button"
              onClick={() => {
                if (typeof onLogout === "function") onLogout();
              }}
              className="w-full text-left px-4 py-2 text-lg text-red-600 hover:bg-red-50 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
