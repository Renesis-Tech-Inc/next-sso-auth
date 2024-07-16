import * as yup from "yup";

/**
 * Schema for validating forgot password request data.
 */
export const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email("Invalid Email format")
    .required("Email is required"),
});

/**
 * Interface representing the data structure for forgot password request,
 * inheriting type validation from `forgotPasswordSchema`.
 */
export interface IForgotPassword extends yup.InferType<typeof forgotPasswordSchema> {}
