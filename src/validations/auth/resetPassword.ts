import * as yup from "yup";

/**
 * Schema for validating password reset data.
 */
export const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d\s]).{8,}$/,
      "Password must contain at least one number, one lowercase letter, one uppercase letter, and one special character"
    )
    .required("Password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Passwords must match")
    .required("Confirm Password is required"),
});

/**
 * Interface representing the data structure for password reset,
 * inheriting type validation from `resetPasswordSchema`.
 */
export interface IResetPassword
  extends yup.InferType<typeof resetPasswordSchema> {
  otp?: string; // Optional OTP field
  email?: string; // Optional email field
}
