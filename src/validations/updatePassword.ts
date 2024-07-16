import * as yup from "yup";

/**
 * Schema for validating password update data.
 */
export const updatePasswordSchema = yup.object({
  oldPassword: yup.string().required("Current Password is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d\s]).{8,}$/,
      "Password must contain at least one number, one lowercase letter, one uppercase letter, and one special character"
    )
    .required("Password is required")
    .test(
      "not-equal-to-old-password",
      "New password must be different from the current password",
      function (value) {
        return value !== this.parent.oldPassword;
      }
    ),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Passwords must match")
    .required("Confirm Password is required"),
});

/**
 * Interface representing the data structure for updating a password,
 * inheriting type validation from `updatePasswordSchema`.
 */
export interface IUpdatePassword
  extends yup.InferType<typeof updatePasswordSchema> {}
