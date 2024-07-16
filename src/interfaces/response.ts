/**
 * Interface representing a standard API response.
 *
 * @template T - The type of the payload.
 */
export interface IResponse<T = null> {
  /**
   * The status code of the response.
   */
  statusCode: string;

  /**
   * The message accompanying the response.
   */
  message: string;

  /**
   * The payload of the response.
   */
  payload: T;
}
