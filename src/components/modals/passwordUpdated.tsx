import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Button } from "@components/global/button";
import BasicModal from "@components/global/basicModal";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { EUnauthenticatedRoutes } from "@enums/routes.enum";

/**
 * Component for displaying a modal indicating successful password reset.
 *
 * @returns {JSX.Element} Rendered modal component.
 */
const UpdatePassword = NiceModal.create(() => {
  const modal = useModal();
  const router = useRouter();

  /**
   * Handles the action to navigate back to the login page.
   */
  const handleLogin = () => {
    router.push(EUnauthenticatedRoutes.LOGIN);
    modal.hide();
  };

  return (
    <BasicModal show={modal.visible} hide={modal.hide}>
      <div className="theme_modal bg-blackRussian2 rounded-2xl p-5 sm:w-[31.25rem] md:p-8">
        <figure>
          <Image
            className="mx-auto my-8"
            src="/assets/images/success-gif.gif"
            alt="Update Password"
            height={140}
            width={265}
          />
        </figure>
        <h2 className="fs-32 mb-4 font-semibold leading-tight text-white">
          Password Reset Successfully
        </h2>
        <p className="text-grey mb-8">
          Your Password has been reset successfully.
        </p>
        <Button
          onClick={handleLogin}
          size="md"
          type="submit"
          color="primary"
          className="w-full"
        >
          Back to Login
        </Button>
      </div>
    </BasicModal>
  );
});

export default UpdatePassword;
