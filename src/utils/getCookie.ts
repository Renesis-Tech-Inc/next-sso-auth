/**
 * Retrieves the value of a cookie by name from the document object.
 * Returns undefined if the cookie is not found or if document object is unavailable.
 * @param {string} name - The name of the cookie to retrieve.
 * @returns {string | undefined} The value of the cookie if found, otherwise undefined.
 */
export const getCookie = (name: string): string | undefined => {
  if (typeof document === "undefined") {
    console.error("Cannot access document object in this environment");
    return undefined;
  }

  const value: string = `; ${document.cookie}`;
  const parts: string[] = value.split(`; ${name}=`);

  if (parts.length === 2) {
    const lastPart: string | undefined = parts.pop();
    if (lastPart !== undefined) {
      return lastPart.split(";").shift();
    }
  }

  return undefined;
};
