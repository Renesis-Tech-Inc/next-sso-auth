import NiceModal, { useModal } from "@ebay/nice-modal-react";
import React from "react";
import BasicModal from "@components/global/basicModal";
import { Button } from "@components/global/button";
import Image from "next/image";
import { UN_AUTHENTICATED_ROUTES } from "@enums/routes.enum";
import { useRouter } from "next/router";
import { useDebouncedClick } from "@hooks/useDebouncedClick";
import Helper from "@services/helper.service";

/**
 * Component for displaying a modal indicating OTP verification success.
 *
 * @param {object} props - Component props.
 * @param {string} props.otp - OTP value used for verification.
 * @returns {JSX.Element} Rendered modal component.
 */
const OtpVerified = NiceModal.create(({ otp }: { otp: string }) => {
  const router = useRouter();
  const [handleClick, loadingStates] = useDebouncedClick();
  const modal = useModal();

  /**
   * Handles the action after OTP verification.
   */
  const handleAuth = () => {
    handleClick(async () => {
      modal.remove();
      let route = UN_AUTHENTICATED_ROUTES.RESET_PASSWORD as Function;
      router.push(route(Helper.encodeToken(otp)));
    }, "verifyOTPLoading");
  };

  return (
    <BasicModal show={modal.visible} hide={modal.hide} close notOnSideClick>
      <div className="theme_modal bg-blackRussian2 flex w-full flex-col items-center rounded-[20px] p-5 sm:w-[538px] md:p-10">
        <figure className="mx-auto h-[234px] w-[234px]">
          <Image
            src="/assets/images/success-gif.gif"
            width={234}
            height={234}
            alt="email send image"
          />
        </figure>
        <h2 className="fs-24 mb-2.5 font-medium leading-[30px]">
          OTP Verified
        </h2>
        <p className="text-dark-50 mb-8 text-base">
          Your OTP has been verified successfully.
        </p>
        <Button
          className="!w-full"
          size="lg"
          onClick={handleAuth}
          isLoading={loadingStates["verifyOTPLoading"]}
          disabled={loadingStates["verifyOTPLoading"]}
        >
          Continue
        </Button>
      </div>
    </BasicModal>
  );
});

export default OtpVerified;
