import axios from "axios";
import { toast } from "react-toastify";
import { UN_AUTHENTICATED_ROUTES } from "@enums/routes.enum";
const emailVerifiedAMessage =
  "Email is not verified yet. Please check your email.";

const handleBackendErrors = (
  errors: { [key: string]: string }[],
  setFieldError: FormikHelpers<any>["setFieldError"]
) => {
  errors.forEach((error) => {
    Object.entries(error).forEach(([field, errorMessage]) => {
      setFieldError(field, errorMessage);
    });
  });
};
/**
 * Handles errors, particularly Axios errors, and displays a toast notification.
 * @param {unknown} error - The error to handle.
 */
import { FormikHelpers } from "formik";

export const errorHandler = (
  error: unknown,
  setFieldError?: FormikHelpers<any>["setFieldError"]
) => {
  let message = "Something went wrong";
  let email = "";

  if (axios.isAxiosError(error)) {
    if (error?.response?.data?.errors && setFieldError) {
      handleBackendErrors(error?.response?.data?.errors, setFieldError);
      return;
    }
    console.log(error?.response, "error?.response");

    message = error?.response?.data?.message;
    email = error?.config?.data && JSON.parse(error?.config?.data).email;
  } else {
    console.error("An unexpected error occurred:", error);
  }

  toast.error(message);

  if (message === emailVerifiedAMessage && email) {
    let route = UN_AUTHENTICATED_ROUTES.VERIFY_EMAIL as Function;
    setTimeout(() => {
      window.location.href = route(email);
    }, 2000);
  }
};
