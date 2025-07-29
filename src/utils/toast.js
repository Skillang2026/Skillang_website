import React, { useEffect } from "react";
import { Toast } from "react-bootstrap";

const ToastMessage = ({ showToast, onClose, toastVariant, status }) => {
  useEffect(() => {
    if (showToast) {
      // ✅ NEW - Using public folder paths directly
      const audioPath =
        toastVariant === "success"
          ? "/sounds/success.mp3" // Public folder path
          : "/sounds/rejected.mp3"; // Public folder path

      const sound = new Audio(audioPath);

      // ✅ IMPROVED - Added error handling for audio play
      sound.play().catch((error) => {
        // console.log("Audio play failed:", error);
        // This is normal - browsers require user interaction before playing audio
      });
    }
  }, [showToast, toastVariant]);
  return (
    <Toast
      show={showToast}
      onClose={onClose}
      autohide
      delay={3000}
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        zIndex: 9999,
        minWidth: "300px",
      }}
    >
      <Toast.Header closeButton className={`bg-${toastVariant} text-white`}>
        <strong className="me-auto">🔔 Skillang</strong>
      </Toast.Header>
      <Toast.Body>{status}</Toast.Body>
    </Toast>
  );
};

export default ToastMessage;
