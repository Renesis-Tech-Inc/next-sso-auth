import * as yup from "yup";

/**
 * Schema for validating setup password data.
 */
export const setupPasswordSchema = yup.object({
  email: yup.string().trim(),

  password: yup
    .string()
    .min(8, "Must be at least 8 characters")
    .max(50)
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-!$%^&*()_+|~=`{}\[\]:;"'<>,.?\\/@#])/,
      "Password must contain at least one number, one lowercase letter, one uppercase letter, and one special character"
    )
    .required("Password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Passwords must match")
    .required("Confirm Password is required"),
});

/**
 * Interface representing the data structure for setting up a password,
 * inheriting type validation from `setupPasswordSchema`.
 */
export interface ISetupPassword
  extends yup.InferType<typeof setupPasswordSchema> {}
