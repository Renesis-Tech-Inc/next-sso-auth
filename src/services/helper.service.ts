import axios from "axios";
import { toast } from "react-toastify";
import { UN_AUTHENTICATED_ROUTES } from "@enums/routes.enum";
import { FormikHelpers } from "formik";
import { EText } from "@enums/text.enum";


class Helper {
  /**
   * Decodes a base64 encoded string.
   * @param {string} encodedString - The base64 encoded string.
   * @returns {string} The decoded string.
   */
  static decodeToken(encodedString: any): string {
    return Buffer.from(encodedString, "base64").toString();
  }
  /**
   * Encodes a base64 decoded string.
   * @param {string} decodedString - The base64 decoded string.
   * @returns {string} The decoded string.
   */
  static encodeToken(decodedString: string): string {
    return Buffer.from(decodedString).toString("base64");
  }

  /**
   * Handles backend validation errors and sets field errors in Formik.
   * @param {Record<string, string>[]} errors - The backend validation errors.
   * @param {FormikHelpers<any>['setFieldError']} setFieldError - The Formik setFieldError function.
   */
  static handleBackendErrors(
    errors: Record<string, string>[],
    setFieldError: FormikHelpers<any>["setFieldError"]
  ): void {
    errors.forEach((error) => {
      Object.entries(error).forEach(([field, errorMessage]) => {
        setFieldError(field, errorMessage);
      });
    });
  }

  /**
   * Handles errors, particularly Axios errors, and displays a toast notification.
   * @param {unknown} error - The error to handle.
   * @param {FormikHelpers<any>['setFieldError']} [setFieldError] - The Formik setFieldError function.
   */
  static handleError(
    error: unknown,
    setFieldError?: FormikHelpers<any>["setFieldError"]
  ): void {
    let message = "Something went wrong";
    let email = "";

    if (axios.isAxiosError(error)) {
      if (error?.response?.data?.errors && setFieldError) {
        Helper.handleBackendErrors(
          error?.response?.data?.errors,
          setFieldError
        );
        return;
      }

      console.log(error?.response, "error?.response");
      message = error?.response?.data?.message || message;
      email = error?.config?.data ? JSON.parse(error?.config?.data).email : "";
    } else {
      console.error("An unexpected error occurred:", error);
    }

    toast.error(message);

    if (message === EText.EMAIL_VERIFIED_MESSAGE && email) {
      const route = UN_AUTHENTICATED_ROUTES.VERIFY_EMAIL as (
        email: string
      ) => string;
      setTimeout(() => {
        window.location.href = route(email);
      }, 2000);
    }
  }

  /**
   * Retrieves the value of a cookie by name.
   * @param {string} name - The name of the cookie to retrieve.
   * @returns {string | undefined} The value of the cookie if found, otherwise undefined.
   */
  static getCookie(name: string): string | undefined {
    if (typeof document === "undefined") {
      console.error("Cannot access document object in this environment");
      return undefined;
    }

    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) {
      const lastPart = parts.pop();
      if (lastPart !== undefined) {
        return lastPart.split(";").shift();
      }
    }

    return undefined;
  }
}

export default Helper;
