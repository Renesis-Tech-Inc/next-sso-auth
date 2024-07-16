// Importing base class
import { HttpService } from "@services/base.service";

// Importing interfaces
import { IResponse } from "@interfaces/response";
import { IUser } from "@interfaces/user";
import { IAccountLink } from "@validations/auth/linkAccount";
import { IToken } from "@interfaces/token";

/**
 * SocialAuthService class extending HttpService for social authentication related operations.
 */
class SocialAuthService extends HttpService {
  private readonly prefix: string = "social-auth";

  /**
   * Links user account with external service.
   * @param {IAccountLink} data The data to link accounts.
   * @returns {Promise<IResponse<{ token: IToken; user: IUser; nextStep: string }>>} A promise that resolves with the response data containing token, user, and next step information.
   */
  linkAccount = (
    data: IAccountLink
  ): Promise<IResponse<{ token: IToken; user: IUser; nextStep: string }>> =>
    this.post(`${this.prefix}/link-accounts`, data);
}

export const socialAuthService = new SocialAuthService();
