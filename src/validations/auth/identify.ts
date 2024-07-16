import * as yup from "yup";

/**
 * Schema for validating identify request data.
 */
export const identifySchema = yup.object({
  email: yup
    .string()
    .trim()
    .email("Invalid Email format")
    .required("Email is required"),
});

/**
 * Interface representing the data structure for identify request,
 * inheriting type validation from `identifySchema`.
 */
export interface IIdentify extends yup.InferType<typeof identifySchema> {}
