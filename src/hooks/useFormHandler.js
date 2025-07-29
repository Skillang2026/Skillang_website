"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const useFormHandler = () => {
  // State variables remain the same
  const [validated, setValidated] = useState(false);
  const [otpVisible, setOtpVisible] = useState(false);
  const [otp, setOtp] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastVariant, setToastVariant] = useState("success");
  const [status, setStatus] = useState("");
  const [resendDisabled, setResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(30);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [formType, setFormType] = useState("standard"); // 'standard' or 'partner'

  // Both form data structures
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pincode: "",
    lookingFor: "",
    experience: "",
    county: "",
    origin: "",
    qualification: "",
    age: "",
    germanStatus: "",
    startPlanning: "",
    callBack: "",
  });

  const [partnerFormData, setPartnerFormData] = useState({
    type: "",
    name: "",
    email: "",
    phone: "",
    companyName: "",
    designation: "",
    origin: "",
  });

  // Countdown timer logic
  useEffect(() => {
    let timer;
    if (resendDisabled && otpVisible) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            setResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendDisabled, otpVisible]);

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOptionSelect = (field, value) => {
    setFormData((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleExperienceSelect = (value) => {
    setFormData((prevState) => ({ ...prevState, experience: value }));
  };

  const handlePartnerInputChange = (e) => {
    const { name, value } = e.target;
    setPartnerFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // *** FIXED: This function now handles both form types ***
  const sendFormData = async (formType = "standard") => {
    try {
      // Determine which form data to use based on formType
      const activeFormData =
        formType === "partner" ? partnerFormData : formData;

      // Extract email and name from the active form
      const { email, name } = activeFormData;

      // Validate that we have required fields
      if (!email || !name) {
        setStatus("❌ Email and name are required to send OTP");
        setToastVariant("danger");
        setShowToast(true);
        return false;
      }

      // Send OTP
      const payload = { email, name };
      await axios.post("https://www.skillang.com/api/send-otp", payload);

      setStatus("📩 OTP has been sent to your mail!");
      setToastVariant("info");
      setShowToast(true);
      setOtpVisible(true);
      return true;
    } catch (error) {
      console.error("❌ Error sending OTP:", error);
      setStatus("❌ Error sending OTP. Please try again.");
      setToastVariant("danger");
      setShowToast(true);
      return false;
    }
  };

  const handleResendOtp = () => {
    sendFormData(formType);
    setResendDisabled(true);
    setCountdown(30);
  };

  // *** FIXED: This function now handles both form types ***
  const handleVerifyOtp = async () => {
    try {
      // Determine which form data to use based on formType
      const activeFormData =
        formType === "partner" ? partnerFormData : formData;
      const email = activeFormData.email;

      const response = await axios.post(
        "https://www.skillang.com/api/verify-otp",
        {
          email: email,
          otp: otp.trim(),
        }
      );

      if (response.data.success) {
        setIsOtpVerified(true);
        setStatus("✅ OTP verified successfully!");
        setToastVariant("success");
        return true;
      } else {
        setStatus("❌ Invalid OTP. Please check and enter the correct OTP.");
        setToastVariant("danger");
        return false;
      }
    } catch (error) {
      console.error("❌ Wrong OTP, Please try again.", error);
      setStatus("❌ Wrong OTP, Please try again.");
      setToastVariant("danger");
      return false;
    } finally {
      setShowToast(true);
    }
  };

  // Submit functions - keep these separate
  const submitInquiry = async () => {
    try {
      const response = await axios.post(
        "https://www.skillang.com/api/submit-to-google-sheets",
        formData
      );

      setStatus(response.data.message || "✅ Inquiry submitted successfully!");
      setToastVariant("success");
      setShowToast(true);

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        pincode: "",
        lookingFor: "",
        experience: "",
        country: "",
        origin: "",
      });

      resetOtp();
    } catch (error) {
      console.error("❌ Error submitting inquiry:", error);
      setStatus("❌ Error submitting inquiry. Please try again.");
      setToastVariant("danger");
      setShowToast(true);
    }
  };

  const submitPartnershipInquiry = async () => {
    try {
      const response = await axios.post(
        "https://www.skillang.com/api/submit-partnership-to-google-sheets",
        partnerFormData
      );

      setStatus(
        response.data.message ||
          "✅ Partnership inquiry submitted successfully!"
      );
      setToastVariant("success");
      setShowToast(true);

      // Reset form
      setPartnerFormData({
        type: "",
        name: "",
        email: "",
        phone: "",
        companyName: "",
        designation: "",
        origin: "",
      });

      resetOtp();
    } catch (error) {
      console.error("❌ Error submitting partnership inquiry:", error);
      setStatus("❌ Error submitting inquiry. Please try again.");
      setToastVariant("danger");
      setShowToast(true);
    }
  };

  const resetOtp = () => {
    setOtp("");
    setIsOtpVerified(false);
    setIsOtpSent(false);
    setOtpVisible(false);
    setValidated(false);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  // *** NEW: Separate handlers for different form types ***
  const handleStandardSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setFormType("standard");

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    // if (!isOtpSent) {
    //   const success = sendFormData("standard");
    //   if (success) {
    //     setOtpVisible(true);
    //     setResendDisabled(true);
    //     setCountdown(30);
    //     setIsOtpSent(true);
    //   }
    //   return;
    // }

    // if (!isOtpVerified) {
    //   setStatus("❌ Please verify the OTP before submitting.");
    //   setToastVariant("danger");
    //   setShowToast(true);
    //   return;
    // }

    if (!formData.lookingFor) {
      setStatus("❌ Please select what you're looking for.");
      setToastVariant("danger");
      setShowToast(true);
      return;
    }

    submitInquiry();
    setValidated(true);
  };

  const handlePartnerSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setFormType("partner");

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    // if (!isOtpSent) {
    //   const success = sendFormData("partner");
    //   if (success) {
    //     setOtpVisible(true);
    //     setResendDisabled(true);
    //     setCountdown(30);
    //     setIsOtpSent(true);
    //   }
    //   return;
    // }

    // if (!isOtpVerified) {
    //   setStatus("❌ Please verify the OTP before submitting.");
    //   setToastVariant("danger");
    //   setShowToast(true);
    //   return;
    // }

    submitPartnershipInquiry();
    setValidated(true);
  };

  // Legacy handler that picks the right function based on form type
  const handleSubmit = (e, type = "auto") => {
    if (
      type === "partner" ||
      (type === "auto" && Object.values(partnerFormData).some((v) => v))
    ) {
      handlePartnerSubmit(e);
    } else {
      handleStandardSubmit(e);
    }
  };

  return {
    formData,
    partnerFormData,
    otp,
    otpVisible,
    showToast,
    toastVariant,
    status,
    resendDisabled,
    countdown,
    isOtpVerified,
    isOtpSent,
    validated,
    formType,
    handleInputChange,
    handleExperienceSelect,
    handleOptionSelect,
    handleSubmit,
    handleStandardSubmit,
    handlePartnerSubmit,
    handlePartnerInputChange,
    handleOtpChange,
    submitPartnershipInquiry,
    handleVerifyOtp,
    handleResendOtp,
    setOtp,
    setShowToast,
    setFormType,
    setPartnerFormData,
  };
};

export default useFormHandler;
