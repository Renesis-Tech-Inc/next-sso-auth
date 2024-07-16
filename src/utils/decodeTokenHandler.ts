/**
 * Decodes the token with the given name.
 * @param {string} name The name of the token to decode.
 * @returns {string} The decoded token value.
 */
export const decodeTokenHandler = (name: string): string => {
  return Buffer.from(name, "base64").toString();
};
