import React from "react";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import { Button } from "@components/global/button";
import BasicModal from "@components/global/basicModal";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { UN_AUTHENTICATED_ROUTES } from "@enums/routes.enum";
import Helper from "@services/helper.service";

/**
 * Component for displaying a modal indicating successful sign-up.
 *
 * @param {object} values - Values passed to the component.
 * @param {string} values.email - Email address of the signed-up user.
 * @returns {JSX.Element} Rendered modal component.
 */
const SignUp = NiceModal.create((values: { email: string }) => {
  const router = useRouter();
  const modal = useModal();

  /**
   * Handles the action after successful sign-up.
   */
  const handleContinue = () => {
    let route = UN_AUTHENTICATED_ROUTES.VERIFY_EMAIL as Function;
    router.push(route(Helper.encodeToken(values.email)));
    modal.hide();
  };

  return (
    <BasicModal show={modal.visible} hide={modal.hide} close notOnSideClick>
      <div className="bg-blackRussian2 theme_modal rounded-2xl p-5 sm:w-[31.25rem] md:p-8">
        <figure>
          <Image
            priority
            className="mx-auto mb-8 object-cover"
            src="/assets/images/success-gif.gif"
            alt="Success"
            height={170}
            width={170}
          />
        </figure>
        <h2 className="fs-32 mb-4 font-semibold text-white">
          Signed Up Successfully!
        </h2>
        <p className="text-grey mb-8 text-sm">
          Congratulations, you have successfully signed up
        </p>
        <Button
          onClick={handleContinue}
          size="md"
          type="button"
          color="primary"
          className="w-full"
        >
          Continue
        </Button>
      </div>
    </BasicModal>
  );
});

export default SignUp;
