import { useFormik } from "formik";
import React from "react";

import Input from "@components/global/forms/Input";
import { Button } from "@components/global/button";
import { useRouter } from "next/navigation";
import { useDebouncedClick } from "@hooks/useDebouncedClick";
import { errorHandler } from "@utils/errorHandler";
import { UN_AUTHENTICATED_ROUTES } from "@enums/routes.enum";
import ESteps from "@enums/steps.enum";
import { authService } from "@services/auth.service";
import SocialAuth from "@components/socialAuth";
import { IIdentify, identifySchema } from "@validations/auth/identify";
import { toast } from "react-toastify";
import { EText } from "@enums/text.enum";
import Helper from "@services/helper.service";

/**
 * LoginModule component handles the login functionality.
 * It allows users to identify themselves using their email address.
 * After identification, it redirects users to appropriate routes based on the next step in the authentication process.
 * @returns {JSX.Element} The JSX element representing the LoginModule component.
 */
const LoginModule = () => {
  // Next.js router hook for navigation
  const router = useRouter();

  // Custom hook for handling debounced click events
  const [handleClick, loadingStates] = useDebouncedClick();

  /**
   * Function for handling user login.
   * Sends request to authentication service to identify user using provided email address.
   * Redirects user to appropriate routes based on the next step in the authentication process.
   * @param {IIdentify} values - User identification values (e.g., email).
   * @param {Function} setFieldError - Function to set form field errors.
   * @returns {Promise<void>} A promise representing the login operation.
   */
  const handleLogin = async (
    values: IIdentify,
    setFieldError: (field: string, message: string | undefined) => void
  ): Promise<void> => {
    try {
      // Send request to identify user
      const response = await authService.identifyHandler(values);

      // Extract next step from response
      const next_step = response?.payload?.nextStep as string;

      // Determine the route based on the next step
      let route = UN_AUTHENTICATED_ROUTES.SIGNUP_PASSWORD as Function;
      if (next_step === ESteps.USER_REGISTER) {
        route = UN_AUTHENTICATED_ROUTES.SIGNUP_PASSWORD as Function;
      } else if (next_step === ESteps.VERIFY_EMAIL) {
        route = UN_AUTHENTICATED_ROUTES.VERIFY_EMAIL as Function;
      } else if (next_step === ESteps.SET_PASSWORD) {
        route = UN_AUTHENTICATED_ROUTES.LOGIN_PASSWORD as Function;
      }

      // Redirect user to the determined route
      router.push(route(Helper.encodeToken(values.email)));
    } catch (error: unknown) {
      // Handle error
      errorHandler(error, setFieldError);
    }
  };

  // Formik hook for managing form state and validation
  const formik = useFormik<IIdentify>({
    initialValues: {
      email: "",
    },
    validationSchema: identifySchema,
    validateOnBlur: true,
    /**
     * Submit handler for the login form.
     * @param {IIdentify} values - Form values.
     * @param {Function} setFieldError - Function to set form field errors.
     */
    onSubmit: async (values: IIdentify, { setFieldError }) => {
      // Handle click event using debounced click handler
      handleClick(async () => {
        // Call login function with form values and setFieldError function
        handleLogin(values, setFieldError);
      }, "loginLoading");
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
        <h2 className="mb-2 font-medium text-white text-white lg:text-white">
          {EText.WELCOME}
        </h2>
        <p className="text-sm text-white text-white lg:text-white">
          {EText.SIGN_IN_DESCRIPTION}
        </p>
      </div>
      <div className="form-group mb-8">
        <Input
          id={"email"}
          name={"email"}
          type={"email"}
          label={"Email"}
          onKeyDown={handleInputKeyDown}
          required={true}
          containerClass={"mb-6"}
          placeholder={"Enter Your Email"}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur} // Make sure onBlur is called to trigger validation
          error={formik.touched.email ? formik.errors.email : undefined}
        />
      </div>

      <div className="form-group mb-8 sm:mb-10">
        <Button
          size="lg"
          onClick={formik.handleSubmit}
          color="primary"
          isLoading={loadingStates["loginLoading"]}
          disabled={loadingStates["loginLoading"]}
          className="w-full"
        >
          Continue With Email
        </Button>
      </div>
      <div className="form-group after:bg-blackRussian2 relative mb-4 flex items-center justify-center after:absolute after:left-0 after:top-1/2 after:h-[1px] after:w-full after:translate-y-[-50%]">
        <span className="bg-blackRussian4 relative z-[1] p-2.5 text-sm ">
          or continue with
        </span>
      </div>
      <SocialAuth />
    </form>
  );
};

export default LoginModule;
