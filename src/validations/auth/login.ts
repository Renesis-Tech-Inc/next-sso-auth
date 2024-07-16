import * as yup from "yup";

/**
 * Schema for validating login request data.
 */
export const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email("Invalid Email format")
    .required("Email is required"),
  password: yup.string(),
});

/**
 * Interface representing the data structure for login request,
 * inheriting type validation from `loginSchema`.
 */
export interface ILogin extends yup.InferType<typeof loginSchema> {}
