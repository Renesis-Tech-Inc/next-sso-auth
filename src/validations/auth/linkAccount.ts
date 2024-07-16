import * as yup from "yup";
import { otpVerifySchema } from "@validations/auth/verifyOTP";

/**
 * Interface representing the data structure for linking accounts, extending from OTP verification schema.
 */
export interface IAccountLink extends yup.InferType<typeof otpVerifySchema> {
  providerId?: string;
  provider?: string;
}
