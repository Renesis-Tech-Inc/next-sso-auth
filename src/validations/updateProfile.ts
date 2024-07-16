import * as yup from "yup";

/**
 * Schema for validating profile update data.
 */
export const updateProfileSchema = yup.object({
  fullName: yup
    .string()
    .required("Full Name is required")
    .min(3, "Full Name Must be at least 3 characters")
    .max(50, "Full Name Must be at most 50 characters"),
});

/**
 * Interface representing the data structure for updating a profile,
 * inheriting type validation from `updateProfileSchema`.
 */
export interface IUpdateProfile
  extends yup.InferType<typeof updateProfileSchema> {}
