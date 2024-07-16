// Importing base class
import { HttpService } from "@services/base.service";

// Importing interfaces
import { IResponse } from "@interfaces/response";
import { IUser } from "@interfaces/user";
import { IRegister } from "@validations/auth/register";
import { ILogin } from "@validations/auth/login";
import { IForgotPassword } from "@validations/auth/forgotPassword";
import { IResetPassword } from "@validations/auth/resetPassword";
import { IOTPVerify } from "@validations/auth/verifyOTP";
import { IToken } from "@interfaces/token";

/**
 * AuthService handles authentication related API requests.
 */
class AuthService extends HttpService {
  private readonly prefix: string = "auth";

  /**
   * Handles user registration.
   * @param data - Registration data.
   * @returns Promise<IResponse>
   */
  signupHandler = (data: IRegister): Promise<IResponse> =>
    this.post(`${this.prefix}/register`, data);

  /**
   * Handles user identification.
   * @param data - Login data.
   * @returns Promise<IResponse<{ token: IToken; user: IUser; nextStep: string }>>
   */
  identifyHandler = (
    data: ILogin
  ): Promise<IResponse<{ token: IToken; user: IUser; nextStep: string }>> =>
    this.post(`${this.prefix}/identify`, data);

  /**
   * Handles user login.
   * @param data - Login data.
   * @returns Promise<IResponse<{ token: IToken; user: IUser }>>
   */
  loginHandler = (
    data: ILogin
  ): Promise<IResponse<{ token: IToken; user: IUser }>> =>
    this.post(`${this.prefix}/login`, data);

  /**
   * Handles forgot password request.
   * @param data - Forgot password data.
   * @returns Promise<IResponse>
   */
  forgotPasswordHandler = (data: IForgotPassword): Promise<IResponse> =>
    this.post(`${this.prefix}/forgot-password`, data);

  /**
   * Handles reset password request.
   * @param data - Reset password data.
   * @returns Promise<IResponse>
   */
  resetPasswordHandler = (data: IResetPassword): Promise<IResponse> =>
    this.post(`${this.prefix}/reset-password`, data);

  /**
   * Handles two-factor authentication (2FA) verification.
   * @param data - OTP verification data.
   * @returns Promise<IResponse<{ token: IToken; user: IUser; nextStep: string }>>
   */
  verifyEmail2FA = (
    data: IOTPVerify
  ): Promise<IResponse<{ token: IToken; user: IUser; nextStep: string }>> =>
    this.post(`${this.prefix}/verify-email`, data);

  /**
   * Handles resend OTP request.
   * @param data - Forgot password data.
   * @returns Promise<IResponse>
   */
  resendOTPHandler = (data: IForgotPassword): Promise<IResponse> =>
    this.post(`${this.prefix}/resend-otp`, data);
}

export const authService = new AuthService();
