import NiceModal, { useModal } from "@ebay/nice-modal-react";
import React from "react";
import BasicModal from "@components/global/basicModal";
import { Button } from "@components/global/button";
import Image from "next/image";

/**
 * Component for displaying a modal indicating that an email has been sent.
 *
 * @returns {JSX.Element} Rendered modal component.
 */
const EmailSend = NiceModal.create(() => {
  const modal = useModal();

  return (
    <BasicModal show={modal.visible} hide={modal.hide}>
      <div className="flex w-full flex-col items-center rounded-[20px] bg-white px-10 py-12 sm:max-w-[538px] md:px-20 md:py-20">
        <h2 className="fs-32 mb-3 leading-10">Email has been sent!</h2>
        <p className="text-dark-50 mb-8 text-base">
          Check your inbox and click on the received link to reset your
          password.
        </p>
        <figure className="mx-auto mb-8 h-[180px] w-[180px]">
          <Image
            src="/assets/images/email-sendimg.svg"
            width={180}
            height={180}
            alt="Email send image"
          />
        </figure>
        <Button size="lg" className="w-full">
          Continue
        </Button>
      </div>
    </BasicModal>
  );
});

export default EmailSend;
