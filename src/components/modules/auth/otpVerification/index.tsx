import React, { useEffect, useRef, useState } from "react";
import { Button } from "@components/global/button";
import OtpInput from "react-otp-input";
import { toast } from "react-toastify";
import { authService } from "@services/auth.service";
import { errorHandler } from "@utils/errorHandler";
import { useDebouncedClick } from "@hooks/useDebouncedClick";
import { useRouter } from "next/router";
import NiceModal from "@ebay/nice-modal-react";
import EModals from "@enums/modals.enum";
import Helper from "@services/helper.service";

/**
 * OtpVarificationModules component handles the verification of OTP (One-Time Password).
 * It allows users to submit an OTP for email verification and handles the submission of the OTP form.
 * Additionally, it provides functionality to resend OTP and handles OTP input change.
 * @returns {JSX.Element} The JSX element representing the OtpVarificationModules component.
 */
const OtpVarificationModules = (): JSX.Element => {
  // Next.js router query object
  const { query } = useRouter();

  // State for storing OTP value
  const [otp, setOtp] = useState<string>("");

  
  // Custom hook for handling debounced click events
  const [handleClick, loadingStates] = useDebouncedClick(setOtp);

  /**
   * Function for handling form submission.
   * Sends request to authentication service to verify email using provided OTP.
   * Redirects user to appropriate routes based on the response.
   * @returns {Promise<void>} A promise representing the form submission operation.
   */
  const handleSubmit = async (): Promise<void> => {
    // Handle click event using debounced click handler
    handleClick(
      async () => {
        try {
          // Extract email from query parameters
          let formatEmail = Helper.decodeToken(query.email as string);
          if (!formatEmail) {
            toast.error("Email is required");
            return;
          }

          await authService.verifyEmail2FA({
            otp,
            isVerifyEmail: false,
            email: formatEmail,
          });

          NiceModal.show(EModals.OTP_VERIFIED, { otp, formatEmail });
        } catch (error: unknown) {
          // Handle error
          errorHandler(error);
        }
      },
      "loading",
      ""
    );
  };

  /**
   * Function for resending OTP.
   * Sends request to authentication service to resend OTP to the user's email address.
   * @returns {Promise<void>} A promise representing the OTP resend operation.
   */
  const HandleResendOTP = async (): Promise<void> => {
    try {
      // Extract email from query parameters
      let formatEmail = Helper.decodeToken(query.email as string);
      if (!formatEmail) {
        toast.error("Email is required");
        return;
      }

      // Send request to resend OTP
      let response = await authService.resendOTPHandler({ email: formatEmail });
      setTimeLeft(60);
      // Display success message
      toast.success(response?.message);
    } catch (error: unknown) {
      // Handle error
      errorHandler(error);
    }
  };

  /**
   * Function for handling OTP input change.
   * Validates and updates the OTP state based on the entered value.
   * @param {string} value - The new value of the OTP input.
   */
  const handleChange = (value: string) => {
    // Validate if the entered value is a number
    if (!isNaN(Number(value)) && !value.includes(".")) {
      setOtp(value);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      !/^\d$/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight" &&
      e.key !== "v" && // Allow 'v' key for paste (Ctrl+V or Cmd+V)
      !e.metaKey
    ) {
      e.preventDefault();
    } else if (e.ctrlKey || e.key == "Enter") {
      handleSubmit();
    }
  };
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = e.clipboardData.getData("text");
    if (/^\d*$/.test(pastedData) && pastedData.length <= 4) {
      setOtp(pastedData);
      // handleSubmit();
    } else {
      e.preventDefault();
    }
  };
  const [timeLeft, setTimeLeft] = useState(60); // Initialize the timer with 60 seconds

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      // Cleanup the interval on component unmount
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  return (
    <form>
      <div className="mb-10">
        <h2 className="mb-2 text-center font-medium text-white lg:text-white">
          OTP Verification
        </h2>

        <p className="text-center text-sm ">
          We have sent a 4-character code to{" "}
          <span className="text-blue-5s00">
            {" "}
            {` ${Helper.decodeToken(query.email as string) ?? ""} `}{" "}
          </span>{" "}
          <br />
          Please enter it soon, as it expires shortly.
        </p>
      </div>

      <div className="form-group otpInput-box mb-8">
        <OtpInput
          value={otp}
          onChange={handleChange}
          numInputs={4}
          renderInput={(props) => (
            <input {...props} onKeyDown={handleKeyDown} onPaste={handlePaste} />
          )}
          renderSeparator={<span>-</span>}
        />
      </div>
      <div className="form-group mb-8">
        <Button
          size="lg"
          disabled={loadingStates["loading"] || !otp || otp.length < 4}
          isLoading={loadingStates["loading"]}
          onClick={handleSubmit}
          color="primary"
          className="w-full"
        >
          Verify
        </Button>
      </div>
      <div className="flex items-center justify-center gap-1">
        <button
          onClick={() => handleClick(HandleResendOTP, "loading2")}
          disabled={loadingStates["loading2"] || timeLeft > 0}
          type="button"
          className="text-aluminium"
        >
          Resend OTP
        </button>
        <span className="text-primary-100 text-base">{timeLeft}s</span>
      </div>
    </form>
  );
};

export default OtpVarificationModules;
