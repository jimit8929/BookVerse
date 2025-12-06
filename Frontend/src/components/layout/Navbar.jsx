import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import ProfileDropDown from "./ProfileDropdown";
import { Menu, X, BookOpen, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [profileDropDownOpen, setProfileDropOpen] = useState(false);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Testimonials", href: "#testimonials" },
  ];

  //close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (profileDropDownOpen) {
        setProfileDropOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [profileDropDownOpen]);

  return (
    <header>
      <div className="max-w-[1660px] mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 mt-4">
          <Link to="/" className="flex items-center space-x-2.5 group">
            <div className="w-9 h-9 bg-linear-to-br from-violet-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-all duration-300 group-hover:scale-105">
              <BookOpen className="w-5 h-5 text-white" />
            </div>

            <span className="text-2xl font-bold text-gray-900 space-x-1">
              AI eBook Creator
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                to={link.href}
                key={link.name}
                className="px-4 py-2 text-xl font-medium text-gray-600 hover:text-violet-600 rounded-lg hover:bg-violet-50/50 transition-all duration-300 hover:font-semibold"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons and Profile */}
          <div className="hidden lg:flex items-center space-x-3">
            {isAuthenticated ? (
              <ProfileDropDown
                isOpen={profileDropDownOpen}
                onToggle={(e) => {
                  e.stopPropagation();
                  setProfileDropOpen(!profileDropDownOpen);
                }}
                avatar={user?.avatar || ""}
                companyName={user?.name || ""}
                email={user?.email || ""}
                userRole={user?.role || ""}
                onLogout={() => console.log("Logout")}
              />
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-xl font-medium text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-all duration-300 hover:font-bold"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2 text-lg font-medium text-white bg-linear-to-r from-violet-400 to-purple-500 rounded-lg hover:from-violet-700 hover:to-purple-700 shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all duration-300 hover:scale-105 hover:font-bold"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-300"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="" />}
          </button>
        </div>
      </div>

      {/* {Mobile Menu} */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 animate-in slide-in-from-top duration-300">
          <nav className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                to={link.href}
                key={link.name}
                className="block px-4 py-2.5 rounded-lg text-xl font-medium text-gray-700 hover:text-violet-600 hover:bg-violet-50 transition-all duration-300"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="px-4 py-4 border-t border-gray-100">
            {isAuthenticated ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-3 px-2">
                  <div className="h-8 w-8 bg-linear-to-br from-violet-400 to-violet-500 rounded-xl flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>

                  <div>
                    <div className="text-lg font-medium text-gray-900">
                      {user?.name}
                    </div>
                    <div className="text-md text-gray-500">{user?.email}</div>
                  </div>
                </div>

                <button
                  className="w-full px-4 py-2.5 text-xl font-medium text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
                  onClick={() => logout()}
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link
                  to="/login"
                  className="block text-center px-4 py-2.5 text-xl font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-300"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="block text-center px-4 py-2.5 text-xl font-medium text-white bg-linear-to-r from-violet-600 to-purple-600 rounded-lg shadow-lg shadow-violet-500/30 transition-all duration-300"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
