/**
 * Interface representing an authentication token.
 */
export interface IToken {
  /**
   * The access token string.
   */
  token: string;

  /**
   * The refresh token string.
   */
  refreshToken: string;

  /**
   * The expiration time of the access token in seconds.
   */
  expiresIn: number;
}
