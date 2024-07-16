/**
 * Enum for unauthenticated routes.
 *
 * @enum {string}
 */
export enum EUnauthenticatedRoutes {
  HOME = "/",
  LOGIN = "/login",
  LOGIN_PASSWORD = "/login/password",
  LOGIN_GOOGLE = "/login/google",
  SIGNUP = "/signup",
  SIGNUP_PASSWORD = "/signup/password",
  SETUP_PASSWORD = "/signup/setup-password",
  FORGOT_PASSWORD = "/forgot-password",
  RESET_PASSWORD = "/reset-password",
  VERIFY_EMAIL = "/verify-email",
  VERIFY_OTP = "/otp-verify",
  LINK_ACCOUNT = "/link-account",
}
type UpdatePasswordRoute = (otp: string) => string;
type VERIFY_EMAIL = (email: string) => string;

export const UN_AUTHENTICATED_ROUTES: {
  [key: string]: string | UpdatePasswordRoute | VERIFY_EMAIL;
} = {
  LOGIN_PASSWORD: (email: string) =>
    `${EUnauthenticatedRoutes.LOGIN_PASSWORD}?otp_token=${email}`, // Route for login with password
  SIGNUP_PASSWORD: (email: string) =>
    `${EUnauthenticatedRoutes.SIGNUP_PASSWORD}?otp_token=${email}`, // Route for signup with password
  SETUP_PASSWORD: (email: string) =>
    `${EUnauthenticatedRoutes.SETUP_PASSWORD}?otp_token=${email}`, // Route for signup with password
  RESET_PASSWORD: (otp: string) => `${EUnauthenticatedRoutes.RESET_PASSWORD}?otp=${otp}`, // Route for updating password
  VERIFY_EMAIL: (email: string) =>
    `${EUnauthenticatedRoutes.VERIFY_EMAIL}?otp_token=${email}`, // Route for email verification
  VERIFY_OTP: (email: string) => `${EUnauthenticatedRoutes.VERIFY_OTP}?email=${email}`, // Route for OTP verification
};
/**
 * Enum for authenticated routes.
 *
 * @enum {string}
 */
export enum EAuthenticationRoutes {
  DASHBOARD = "/dashboard",
  PREFERENCES = "/preferences",
  SETTINGS = "/settings",
}
