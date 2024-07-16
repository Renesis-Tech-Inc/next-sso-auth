import React from "react";
import Input from "@components/global/forms/Input";
import { Button } from "@components/global/button";
import { useDebouncedClick } from "@hooks/useDebouncedClick";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { userService } from "@services/user.service";
import { errorHandler } from "@utils/errorHandler";
import {
  IUpdatePassword,
  updatePasswordSchema,
} from "@validations/updatePassword";

/**
 * PasswordSettings component for changing user password.
 *
 * This component renders a form with fields for the current password,
 * new password, and confirm password. It uses Formik for form state
 * management and validation.
 */
const PasswordSettings: React.FC = () => {
  const [handleClick, loadingStates] = useDebouncedClick();

  const formik = useFormik<IUpdatePassword>({
    initialValues: {
      oldPassword: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: updatePasswordSchema,
    validateOnBlur: true,

    onSubmit: async (values, { resetForm, setFieldError }) => {
      handleClick(async () => {
        try {
          const response = await userService.updatePasswordHandler(values);
          resetForm();
          toast.success(response?.message);
        } catch (error: unknown) {
          errorHandler(error, setFieldError);
        }
      }, "loading");
    },
  });

  return (
    <form>
      {/* <form onSubmit={formik.handleSubmit}> */}
      <div className="password__settings mb-10 flex grow flex-col">
        <div className="mb-8">
          <h5 className="font-medium text-white">Change Password</h5>
          <p className="text-aluminium text-sm">
            To update your account password, kindly input both your current and
            new passwords below.
          </p>
        </div>
        <div className="form-group relative mb-4">
          <Input
            id="oldPassword"
            name="oldPassword"
            type="password"
            label="Current Password"
            required
            containerClass="mb-6"
            placeholder="Current Password"
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.oldPassword ? formik.errors.oldPassword : undefined
            }
          />
        </div>
        <div className="form-group relative mb-4">
          <Input
            id="password"
            name="password"
            type="password"
            label="New Password"
            required
            containerClass="mb-6"
            placeholder="New Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password ? formik.errors.password : undefined}
          />
        </div>
        <div className="form-group relative mb-4">
          <Input
            id="confirm_password"
            name="confirm_password"
            type="password"
            label="Confirm Password"
            required
            containerClass="mb-6"
            placeholder="Confirm Password"
            value={formik.values.confirm_password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirm_password
                ? formik.errors.confirm_password
                : undefined
            }
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          size="lg"
          className="flex-none"
          disabled={loadingStates["loading"]}
          isLoading={loadingStates["loading"]}
          onClick={formik.handleSubmit as () => void}
        >
          Update Password
        </Button>
      </div>
      {/* </form> */}
    </form>
  );
};

export default PasswordSettings;
