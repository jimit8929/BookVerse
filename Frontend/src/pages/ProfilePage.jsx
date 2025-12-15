import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { User, Mail } from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";
import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance.js";
import { API_PATHS } from "../utils/apiPaths.js";

const ProfilePage = () => {
  const { user, updateUser, loading: authLoading } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  // Load user data when context is ready
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // FIXED ✔
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axiosInstance.put(API_PATHS.AUTH.UPDATE_PROFILE, {
        name: formData.name,
      });

      updateUser(response.data);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update Profile.");
    } finally {
      setIsLoading(false);
    }
  };

  // Loading UI FIXED
  if (authLoading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-white">
        <div className="w-16 h-16 rounded-full bg-linear-to-r from-violet-500 to-fuchsia-500 animate-ping"></div>
        <p className="mt-8 text-xl text-gray-600 font-medium">
          Loading Profile...
        </p>
      </div>
    );
  }

  return (
    <DashboardLayout activeMenu="profile">
      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Profile</h1>
          <p className="text-lg text-slate-600 mt-2">
            Manage your personal information and account details.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Full Name */}
            <InputField
              label="Full Name"
              name="name"
              type="text"
              icon={User}
              value={formData.name}
              onChange={handleChange}
              required
            />

            {/* Email (disabled) */}
            <div className="opacity-80">
              <InputField
                label="Email"
                name="email"
                type="email"
                icon={Mail}
                value={formData.email}
                disabled
              />
              <p className="text-sm text-slate-500 mt-2">
                Your email cannot be changed.
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-200"></div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                isLoading={isLoading}
                className="px-8 py-3 text-lg"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
