import { useFormik } from "formik";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Input from "@components/global/forms/Input";
import NiceModal from "@ebay/nice-modal-react";
import { Button } from "@components/global/button";
import { IRegister, registerSchema } from "@validations/auth/register";
import { useDebouncedClick } from "@hooks/useDebouncedClick";
import { authService } from "@services/auth.service";
import { errorHandler } from "@utils/errorHandler";
import SocialAuth from "@components/socialAuth";
import EModals from "@enums/modals.enum";
import { EText } from "@enums/text.enum";
import Helper from "@services/helper.service";

/**
 * SignupModule component handles the sign-up process.
 * It allows users to register with their full name, email, and password.
 * The component includes form validation and submission functionality.
 * @returns {JSX.Element} The JSX element representing the SignupModule component.
 */
const SignupModule = (): JSX.Element => {
  // Next.js router query object

  const { query } = useRouter();

  // Custom hook for handling debounced click events
  const [handleClick, loadingStates] = useDebouncedClick(undefined);

  // Formik hook for managing form state and validation
  const formik = useFormik<IRegister>({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: registerSchema,
    validateOnBlur: true,
    /**
     * Submit handler for the sign-up form.
     * @param {IRegister} values - Form values.
     * @param {Function} resetForm - Function to reset the form after submission.
     * @param {Function} setFieldError - Function to set error messages for form fields.
     */
    onSubmit: async (values: IRegister, { resetForm, setFieldError }) => {
      // Extract email from query parameters
      let formatEmail = Helper.decodeToken(query.otp_token as string);
      if (!formatEmail) {
        toast.error("Email is required");
        return;
      }

      // Handle form submission using debounced click handler
      handleClick(async () => {
        try {
          // Call authentication service to sign up user
          await authService.signupHandler(values);
          // Reset form after successful submission
          resetForm();
          // Display sign-up success modal
          NiceModal.show(EModals.SIGNUP, { email: values.email });
        } catch (error: unknown) {
          // Handle form submission error
          errorHandler(error, setFieldError);
        }
      }, "loading");
    },
  });

  // Effect hook to pre-fill email field if provided in query parameters
  useEffect(() => {
    if (query.otp_token) {
      formik.setFieldValue(
        "email",
        Helper.decodeToken(query.otp_token as string)
      );
    }
  }, [query]);

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
        <h2 className="mb-2 font-medium  text-white lg:text-white">
          {EText.SIGNUP_TITLE}
        </h2>
        <p className="text-sm text-white text-white lg:text-white">
          {EText.SIGNUP_DESCRIPTION}
        </p>
      </div>
      <div className="mb-8 flex flex-col gap-4">
        <Input
          id={"fullName"}
          name={"fullName"}
          type={"text"}
          label={"Enter Name"}
          onKeyDown={handleInputKeyDown}
          required={true}
          containerClass={"mb-6"}
          placeholder={"Enter Name"}
          value={formik.values.fullName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur} // Make sure onBlur is called to trigger validation
          error={formik.touched.fullName ? formik.errors.fullName : undefined}
        />
        <Input
          id={"password"}
          name={"password"}
          type={"password"}
          label={"New Password"}
          onKeyDown={handleInputKeyDown}
          required={true}
          containerClass={"mb-6"}
          placeholder={"Enter Your Password"}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur} // Make sure onBlur is called to trigger validation
          error={formik.touched.password ? formik.errors.password : undefined}
        />
        <Input
          id={"password"}
          name={"confirm_password"}
          type={"password"}
          label={"Confirm Password"}
          onKeyDown={handleInputKeyDown}
          required={true}
          containerClass={"mb-6"}
          placeholder={"Enter Your Password"}
          value={formik.values.confirm_password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur} // Make sure onBlur is called to trigger validation
          error={
            formik.touched.confirm_password
              ? formik.errors.confirm_password
              : undefined
          }
        />
      </div>

      <div className="form-group mb-8 sm:mb-10">
        <Button
          size="lg"
          color="primary"
          className="w-full"
          disabled={loadingStates["loading"]}
          isLoading={loadingStates["loading"]}
          onClick={formik.handleSubmit}
          type="button"
        >
          Sign Up
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

export default SignupModule;
