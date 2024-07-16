/**
 * Represents data structure for uploading a document.
 */
export interface IUploadDocument {
  /**
   * Base64-encoded data of the document.
   */
  base64Data: string;

  /**
   * Name of the file.
   */
  fileName: string;

  /**
   * Type of the file (e.g., 'pdf', 'jpg', 'png').
   */
  fileType: string;
}
