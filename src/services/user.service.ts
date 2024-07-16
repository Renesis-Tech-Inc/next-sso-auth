// Importing base class
import { HttpService } from "@services/base.service";

// Importing interfaces

import { IResponse } from "@interfaces/response";
import { IUser } from "@interfaces/user";
import { IUpdateProfile } from "@validations/updateProfile";
import { IUpdatePassword } from "@validations/updatePassword";
import { IUploadDocument } from "@validations/uploadDocument";

class UserService extends HttpService {
  private readonly prefix: string = "user";

  /**
   * Retrieves the user's profile information.
   * @returns A promise that resolves to the response containing the user profile.
   */
  getProfileHandler = (): Promise<IResponse<{ user: IUser }>> =>
    this.get(`${this.prefix}`);

  /**
   * Updates the user's profile information.
   * @param data - The updated profile data.
   * @returns A promise that resolves to the response indicating success or failure.
   */
  updateProfileHandler = (data: IUpdateProfile): Promise<IResponse> =>
    this.put(`${this.prefix}`, data);

  /**
   * Updates the user's password.
   * @param data - The updated password data.
   * @returns A promise that resolves to the response indicating success or failure.
   */
  updatePasswordHandler = (data: IUpdatePassword): Promise<IResponse> =>
    this.put(`${this.prefix}/password`, data);

  /**
   * Updates the user's profile image.
   * @param data - The updated profile image data.
   * @returns A promise that resolves to the response indicating success or failure.
   */
  updateProfileImageHandler = (
    data: IUploadDocument
  ): Promise<IResponse<{ user: IUser }>> =>
    this.put(`${this.prefix}/avatar`, data);
}
export const userService = new UserService();
