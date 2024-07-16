import Link from "next/link";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import Input from "@components/global/forms/Input";
import { Button } from "@components/global/button";

import SocialAuth from "@components/socialAuth";
import { ILogin, loginSchema } from "@validations/auth/login";
import { useDebouncedClick } from "@hooks/useDebouncedClick";
import { authService } from "@services/auth.service";
import { EAuthenticationRoutes } from "@enums/routes.enum";
import { errorHandler } from "@utils/errorHandler";

import { useRouter } from "next/router";
import { HttpService } from "@services/base.service";
import { toast } from "react-toastify";
import Helper from "@services/helper.service";

/**
 * LoginPasswordModule component handles login functionality with email and password.
 * If an OTP token is present in the URL query params, it sets the email field with the token value.
 * On form submission, it sends a login request to the authentication service,
 * sets the authentication token and cookies upon successful login, and redirects the user to the home route.
 * @returns {JSX.Element} The JSX element representing the LoginPasswordModule component.
 */
const LoginPasswordModule = () => {
  // Next.js router hook for navigating between pages
  const router = useRouter();

  // Custom hook for handling debounced click events
  const [handleClick, loadingStates] = useDebouncedClick();

  // Effect hook for setting email field if OTP token is present in the URL query params
  useEffect(() => {
    const otp_token = router.query.otp_token as string;
    const setEmail = async () => {
      try {
        formik.setFieldValue("email", Helper.decodeToken(otp_token));
      } catch (error) {}
    };
    if (otp_token) {
      setEmail();
    }
  }, [router]);

  /**
   * Function for handling login.
   * Sends a login request to the authentication service, sets the authentication token and cookies upon successful login,
   * resets the form, and redirects the user to the home route.
   * @param {ILogin} values - The login form values containing email and password.
   * @param {Function} resetForm - Function to reset the form after submission.
   * @param {Function} setFieldError - Function to set field errors in the form.
   * @returns {Promise<void>} A promise representing the login operation.
   */
  const handleLogin = async (
    values: ILogin,
    resetForm: () => void,
    setFieldError: (field: string, message: string | undefined) => void
  ) => {
    try {
      // Send login request to authentication service
      const response = await authService.loginHandler(values);

      // Extract token, user ID, role, and activity status from response
      const token: string = response?.payload?.token.token ?? "";
      const userId = response?.payload?.user._id ?? "";
      const avatar = response?.payload?.user.avatar ?? "";
      const fullName = response?.payload?.user.fullName ?? "";
      const email = response?.payload?.user.email ?? "";
      const role = response?.payload?.user.role ?? "";
      const isActive = response?.payload?.user.isActive;
      // Validate user role and activity status
      if (!role || role !== "USER" || isActive === false) {
        toast.error("Unauthorized access!");
        return;
      }

      // Set authentication token and cookies
      HttpService.setToken(token);
      HttpService.setCookie("token", token);

      HttpService.setCookie("userId", userId);

      HttpService.setCookie("avatar", avatar);
      HttpService.setCookie("fullName", fullName.split(" ").join("_"));
      HttpService.setCookie("email", email);

      // Reset form after successful login
      resetForm();

      // Redirect user to the home route
      let route = EAuthenticationRoutes.SETTINGS as string;
      router.push(route);
    } catch (error: unknown) {
      // Handle error with form field validation
      errorHandler(error, setFieldError);
    }
  };

  // Formik hook for managing form state and submission
  const formik = useFormik<ILogin>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    validateOnBlur: true,
    /**
     * Submit handler for the login form.
     * Calls handleLogin function with form values, resetForm, and setFieldError functions.
     * @param {ILogin} values - Form values.
     * @param {Function} resetForm - Function to reset the form after submission.
     * @param {Function} setFieldError - Function to set field errors in the form.
     */
    onSubmit: async (values: ILogin, { resetForm, setFieldError }) => {
      handleClick(
        async () => {
          handleLogin(values, resetForm, setFieldError);
        },
        "loginPassLoading",
        null,
        true,
        4000
      );
    },
  });

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      formik.handleSubmit();
      e.preventDefault(); // Prevent the default behavior of Enter (form submission)
    } else if (e.key === "Enter" && e.shiftKey) {
      formik.handleSubmit();
      e.preventDefault();
    }
  };
  return (
    <form>
      <div className="mb-8">
        <h2 className="mb-2 font-medium  lg:text-white">
          Welcome to SSO Auth!
        </h2>
        <p className="text-sm text-white lg:text-white">
          Enter your SSO Auth password for{" "}
          <span className="text-blue-500">
            {" "}
            {Helper.decodeToken(router?.query?.otp_token ?? "")}
          </span>
        </p>
      </div>

      <div className="form-group relative mb-2">
        <Input
          id={"password"}
          name={"password"}
          type={"password"}
          label={"Password"}
          onKeyDown={handleInputKeyDown}
          required={true}
          containerClass={"mb-6"}
          placeholder={"Enter Your Password"}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur} // Make sure onBlur is called to trigger validation
          error={formik.touched.password ? formik.errors.password : undefined}
        />
      </div>
      <div className="form-group mb-8 flex items-center justify-end">
        <Link href="/forgot-password" className="text-sm text-white">
          Forgot Password?
        </Link>
      </div>

      <div className="form-group mb-8 sm:mb-10">
        <Button
          size="lg"
          onClick={formik.handleSubmit}
          color="primary"
          isLoading={loadingStates["loginPassLoading"]}
          disabled={loadingStates["loginPassLoading"]}
          className="w-full"
        >
          Login
        </Button>
      </div>
      <div className="form-group after:bg-blackRussian2 relative mb-4 flex items-center justify-center after:absolute after:left-0 after:top-1/2 after:h-[1px] after:w-full after:translate-y-[-50%]">
        <span className="bg-blackRussian4 relative z-[1] p-2.5 text-sm text-white">
          or continue with
        </span>
      </div>
      <SocialAuth />
    </form>
  );
};

export default LoginPasswordModule;
