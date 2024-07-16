import AccountVerified from "@components/modals/accountVerified";
import AccountCreated from "@components/modals/accountCreated";
import EmailSend from "@components/modals/email";
import SignUp from "@components/modals/signup";
import PasswordUpdated from "@components/modals/passwordUpdated";
import LogoutModal from "@components/modals/logout";
import OtpVerified from "@components/modals/verifyOTP";
import NiceModal from "@ebay/nice-modal-react";
import EModals from "@enums/modals.enum";
/**
 * Represents a modal configuration object.
 *
 * @interface ModalConfig
 * @property {string} name - The name of the modal.
 * @property {React.ComponentType<any>} source - The component source of the modal.
 */
/**
 * Represents a modal configuration object.
 */
interface ModalConfig {
  name: EModals;
  source: React.FC<any>;
}

/**
 * List of modals to be registered with NiceModal.
 *
 * @type {ModalConfig[]}
 */
const modalList: ModalConfig[] = [
  // SignUp Modal
  { name: EModals.SIGNUP, source: SignUp },
  // Email Send Modal
  { name: EModals.SEND_EMAIL, source: EmailSend },
  // Update Password Modal
  { name: EModals.PASSWORD_UPDATED, source: PasswordUpdated },
  // Account Verified Modal
  { name: EModals.ACCOUNT_VERIFIED, source: AccountVerified },
  // OTP Verified Modal
  { name: EModals.OTP_VERIFIED, source: OtpVerified },
  // Create Account Successfully Modal
  { name: EModals.ACCOUNT_CREATED, source: AccountCreated },
  // Logout Modal
  { name: EModals.LOGOUT, source: LogoutModal },
];

/**
 * Register all modals defined in modalList with NiceModal.
 */
modalList.forEach((modal: ModalConfig) =>
  NiceModal.register(modal.name, modal.source)
);

export default modalList;
