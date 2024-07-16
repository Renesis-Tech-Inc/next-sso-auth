import React from "react";
import Input from "@components/global/forms/Input";
import { Button } from "@components/global/button";
import { useRouter } from "next/router";
import { useDebouncedClick } from "@hooks/useDebouncedClick";
import {
  IForgotPassword,
  forgotPasswordSchema,
} from "@validations/auth/forgotPassword";
import { useFormik } from "formik";
import { authService } from "@services/auth.service";
import { toast } from "react-toastify";
import { UN_AUTHENTICATED_ROUTES } from "@enums/routes.enum";
import { errorHandler } from "@utils/errorHandler";
import Helper from "@services/helper.service";
/**
 * Component for handling forgot password functionality.
 * @returns {JSX.Element} JSX element for forgot password form.
 */
const ForgotPasswordModule = (): JSX.Element => {
  const router = useRouter();

  const [handleClick, loadingStates] = useDebouncedClick();

  // Formik hook for form handling
  const formik = useFormik<IForgotPassword>({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordSchema,
    validateOnBlur: true,
    /**
     * Submit handler for forgot password form.
     * @param {IForgotPassword} values - Form values.
     * @param {Function} resetForm - Function to reset the form after submission.
     */
    onSubmit: async (values, { resetForm, setFieldError }) => {
      handleClick(async () => {
        try {
          const response = await authService.forgotPasswordHandler(values);
          toast.success(response?.message);
          resetForm();
          let route = UN_AUTHENTICATED_ROUTES.VERIFY_OTP as Function;
          router.push(route(Helper.encodeToken(values.email)));
        } catch (error: unknown) {
          errorHandler(error, setFieldError);
        }
      }, "loading");
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
        <h2 className=" mb-2 font-medium text-white lg:text-white">
          Forgot your account password?
        </h2>
        <p className="text-sm text-black-56">
          Please submit your email address below to reset your account password.
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
      <div className="form-group mb-12">
        <Button
          size="lg"
          type="button"
          color="primary"
          disabled={loadingStates["loading"]}
          isLoading={loadingStates["loading"]}
          onClick={formik.handleSubmit}
          className="w-full"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default ForgotPasswordModule;
