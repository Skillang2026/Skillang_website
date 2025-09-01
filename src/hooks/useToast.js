// ALTERNATIVE: Even better approach - Custom hook
// Create a custom hook instead of a component wrapper

// hooks/useToast.js
import { useCallback } from "react";
import { toast } from "sonner";

export const useToast = () => {
  const showToast = useCallback((variant, message, description) => {
    // Play sound effect
    const audioPath =
      variant === "success" ? "/sounds/success.mp3" : "/sounds/rejected.mp3";
    const sound = new Audio(audioPath);
    sound.play().catch(console.log);

    // Show toast
    switch (variant) {
      case "success":
        return toast.success(message || "Event has been created", {
          description,
          duration: 4000,
        });
      case "error":
        return toast.error(message || "Something went wrong", {
          description,
          duration: 4000,
        });
      case "warning":
        return toast.warning(message || "Warning", {
          description,
          duration: 4000,
        });
      case "info":
        return toast.info(message || "Information", {
          description,
          duration: 4000,
        });
      default:
        return toast(message || "Notification", {
          description,
          duration: 4000,
        });
    }
  }, []);

  return { showToast };
};
