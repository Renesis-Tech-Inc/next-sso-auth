import React from "react";
import Input from "@components/global/forms/Input";
import { Button } from "@components/global/button";
import {
  IResetPassword,
  resetPasswordSchema,
} from "@validations/auth/resetPassword";
import { useDebouncedClick } from "@hooks/useDebouncedClick";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { authService } from "@services/auth.service";
import { toast } from "react-toastify";
import NiceModal from "@ebay/nice-modal-react";
import { errorHandler } from "@utils/errorHandler";
import EModals from "@enums/modals.enum";
import Helper from "@services/helper.service";

const ResetPasswordModule = () => {
  const { query } = useRouter();

  const [handleClick, loadingStates] = useDebouncedClick();

  // Formik hook for form handling
  const formik = useFormik<IResetPassword>({
    initialValues: {
      password: "",
      confirm_password: "",
    },
    validationSchema: resetPasswordSchema,
    validateOnBlur: true,
    /**
     * Submit handler for updating password.
     * @param {IResetPassword} values - Form values.
     * @param {Function} resetForm - Function to reset the form after submission.
     */
    onSubmit: async (values, { resetForm, setFieldError }) => {
      handleClick(async () => {
        try {
          let otp = Helper.decodeToken(query.otp as string);
          if (!otp) {
            toast.error("OTP is required");
            return;
          }
          await authService.resetPasswordHandler({
            password: values.password,
            otp: otp,
            confirm_password: "",
          });
          resetForm();
          NiceModal.show(EModals.PASSWORD_UPDATED);
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
      <div className="mb-10">
        <legend className="fs-32 mb-2 text-center font-semibold ">
          Reset Your Password
        </legend>
        <p className="text-center text-sm ">
          Enter your new password and you are good to go.
        </p>
      </div>
      <div className="form-group mb-4">
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
      </div>

      <div className="form-group mb-8">
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
      <div className="form-group">
        <Button
          size="md"
          color="primary"
          disabled={loadingStates["loading"]}
          isLoading={loadingStates["loading"]}
          onClick={formik.handleSubmit}
          type="button"
          className="w-full"
        >
          Reset Password
        </Button>
      </div>
    </form>
  );
};

export default ResetPasswordModule;
