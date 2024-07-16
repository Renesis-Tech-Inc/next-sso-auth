import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import { Button } from "@components/global/button";
import OtpInput from "react-otp-input";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { authService } from "@services/auth.service";
import { errorHandler } from "@utils/errorHandler";
import { socialAuthService } from "@services/social-auth.service";
import { useDebouncedClick } from "@hooks/useDebouncedClick";
import { decodeTokenHandler } from "@utils/decodeTokenHandler";

import NiceModal from "@ebay/nice-modal-react";
import EModals from "@enums/modals.enum";
import Helper from "@services/helper.service";

/**
 * LinkAccountModules component handles linking user accounts with social providers.
 * Retrieves OTP token from the URL query params and submits it to the authentication service
 * to link the user account with the specified social provider.
 * Allows the user to resend the OTP if needed.
 * @returns {JSX.Element} The JSX element representing the LinkAccountModules component.
 */
const LinkAccountModules = (): JSX.Element => {
  // Next.js router hook for navigation
  const router = useRouter();

  // Get query params from router
  const { query }: any = useRouter();

  // State for storing OTP value
  const [otp, setOtp] = useState<string>("");
  const [Email, setEmail] = useState<string>("");

  // Custom hook for handling debounced click events
  const [handleClick, loadingStates] = useDebouncedClick(setOtp);

  /**
   * Function for handling form submission.
   * Submits OTP to authentication service to link user account with social provider.
   * Navigates to appropriate routes based on response.
   * @returns {Promise<void>} A promise representing the form submission.
   */
  const handleSubmit = async (): Promise<void> => {
    handleClick(
      async () => {
        try {
          // Check if required query params are present
          if (!query.providerId || !query.provider || !query.otp_token) {
            // Navigate back if required params are missing
            router.back();
            return;
          }

          // Send request to link account with social provider
          let response = await socialAuthService.linkAccount({
            otp,
            providerId: Helper.decodeToken(query.providerId),
            provider: Helper.decodeToken(query.provider),
            email: Helper.decodeToken(query.otp_token as string),
          });
          const email = response?.payload?.user.email ?? "";

          NiceModal.show(EModals.ACCOUNT_VERIFIED, {
            response,
            formatEmail: email,
          });
        } catch (error: unknown) {
          // Handle error
          errorHandler(error);
        }
      },
      "linkAccountloading",
      ""
    );
  };

  /**
   * Function for resending OTP to user email.
   * Sends request to authentication service to resend OTP.
   * Displays success message upon successful request.
   * @returns {Promise<void>} A promise representing the OTP resend operation.
   */
  const handleResendOTP = async (): Promise<void> => {
    try {
      let formatEmail = decodeTokenHandler(query.otp_token as string);
      if (!formatEmail) {
        // Display error message if email is missing
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
   * Function for handling change in OTP input value.
   * Validates if the entered value is a number and updates the OTP state.
   * @param {string} value - The new value of the OTP input.
   */
  const handleChange = (value: string): void => {
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
      !(e.metaKey || e.ctrlKey)
    ) {
      e.preventDefault();
    }
  };
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = e.clipboardData.getData("text");
    if (/^\d*$/.test(pastedData) && pastedData.length <= 4) {
      setOtp(pastedData);
    } else {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (query.otp_token) {
      const email = decodeTokenHandler(query.otp_token as string);
      setEmail(email);
    }
  }, [router]);

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
      <div className="mb-10 flex items-center justify-center gap-2">
        <figure className="bg-blackRussian2 flex h-14 w-14 items-center justify-center rounded-[7px]">
          <Image
            src="/assets/images/logo-icon.svg"
            width={26}
            height={26}
            className="h-[35px] w-[26px]"
            alt="logo"
          />
        </figure>
        <span>{/* <PlusIcon className="text-white" /> */}</span>
        <div className="flex h-14 w-14 items-center justify-center rounded-[7px] bg-white shadow-[0px_4px_20px_0px_rgba(35,106,189,0.12)]">
          <FcGoogle className="text-[26px]" />
        </div>
      </div>
      <div className="mb-10">
        <h2 className="fs-32 mb-2 text-center font-semibold">Link Accounts</h2>
        <span className="mb-2 block text-center text-sm text-white">
          As: <span className="text-primary-100 text-sm">{Email || ""}</span>
        </span>
        <p className="mb-4 text-center text-sm text-white">
          We need your SSO Auth password so we can link your google account.
          You&apos;ll only need to do this once. We&apos;ve sent a 4-character
          code to <span className="text-primary-100"> {Email || ""}. </span> so
          we can Please enter it soon, as it expires shortly.
        </p>
        <div className="flex items-center justify-center gap-1">
          <button
            onClick={() => handleClick(handleResendOTP, "loading2")}
            // disabled={loadingStates["loading2"] || timeLeft > 0}
            type="button"
            className="ml-2 font-bold text-primary"
          >
            Resend OTP
          </button>
          <span className="text-primary-100 text-base">{timeLeft}s</span>
        </div>
      </div>
      <div className="form-group otpInput-box mb-8">
        <OtpInput
          value={otp}
          onChange={handleChange}
          numInputs={4}
          renderSeparator={<span>-</span>}
          renderInput={(props) => (
            <input {...props} onKeyDown={handleKeyDown} onPaste={handlePaste} />
          )}
        />
      </div>
      <div className="form-group">
        <Button
          size="lg"
          type="button"
          disabled={
            loadingStates["linkAccountloading"] || !otp || otp.length < 4
          }
          isLoading={loadingStates["linkAccountloading"]}
          onClick={handleSubmit}
          color="primary"
          className="w-full"
        >
          Link Accounts
        </Button>
      </div>
    </form>
  );
};

export default LinkAccountModules;
