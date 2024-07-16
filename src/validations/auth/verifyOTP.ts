import * as yup from "yup";

/**
 * Schema for validating OTP verification request data.
 */
export const otpVerifySchema = yup.object({
  otp: yup.string().required("OTP is required"),
  email: yup
    .string()
    .trim()
    .email("Invalid Email format")
    .required("Email is required"),
});

/**
 * Interface representing the data structure for OTP verification request,
 * inheriting type validation from `otpVerifySchema`.
 */
export interface IOTPVerify extends yup.InferType<typeof otpVerifySchema> {
  isVerifyEmail?: boolean; // Optional field to indicate email verification status
}
