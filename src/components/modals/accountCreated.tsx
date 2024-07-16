import NiceModal, { useModal } from "@ebay/nice-modal-react";
import React from "react";
import BasicModal from "@components/global/basicModal";
import { Button } from "@components/global/button";
import Image from "next/image";

/**
 * Component for displaying a modal indicating successful account creation.
 *
 * @returns {JSX.Element} Rendered modal component.
 */
const AccountCreated = NiceModal.create(() => {
  const modal = useModal();

  return (
    <BasicModal show={modal.visible} hide={modal.hide} close notOnSideClick>
      <div className="theme_modal bg-blackRussian2 flex w-full flex-col items-center rounded-[20px] p-5 sm:w-[538px] md:p-10">
        <figure className="mx-auto h-[234px] w-[234px]">
          <Image
            src="/assets/images/success-gif.gif"
            width={234}
            height={234}
            alt="Email sent success image"
          />
        </figure>
        <h2 className="fs-24 mb-2.5 font-medium leading-[30px]">
          Create Account Successfully
        </h2>
        <p className="text-dark-50 mb-8 text-base">
          Your account has been created successfully.
        </p>
        <Button size="lg" onClick={modal.hide} className="!w-full">
          Continue
        </Button>
      </div>
    </BasicModal>
  );
});

export default AccountCreated;
