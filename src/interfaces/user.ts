/**
 * Interface representing a user object.
 */
export interface IUser {
  _id: string;
  email: string;
  fullName?: string;
  avatar?: string;
  emailVerifiedAt?: Date;
  isActive?: boolean;
  role?: string;
}
