import React from "react";
import { Toaster } from "react-hot-toast";

const CustomToaster = () => {
  return (
    <Toaster
      position="bottom-right"
      gutter={12}
      containerStyle={{
        bottom: 24,
        right: 24,
      }}
      toastOptions={{
        style: {
          display: "flex",
          alignItems: "center",
          gap: "14px",
          padding: "18px 24px",
          fontSize: "22px",
          maxWidth: "400px",
          borderRadius: "14px",
          background: "#ffffff",
          border: "1px solid #eee",
          boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
          fontWeight: 500,
        },

        success: {
          iconTheme: {
            primary: "#8b5cf6",
            secondary: "#ffffff",
          },
          style: {
            background: "#faf5ff",
            border: "1px solid #e9d5ff",
            padding: "20px 26px",
            display: "flex",
            alignItems: "center",
            justifyContent:"space-between",
            gap: "14px",
            borderRadius: "14px",
            fontSize: "22px",
          },
        },

        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "#ffffff",
          },
          style: {
            background: "#fef2f2",
            border: "1px solid #fecaca",
          },
        },
      }}
    />
  );
};

export default CustomToaster;
