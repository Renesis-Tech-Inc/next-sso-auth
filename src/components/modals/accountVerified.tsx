import NiceModal, { useModal } from "@ebay/nice-modal-react";
import React from "react";
import BasicModal from "@components/global/basicModal";
import { Button } from "@components/global/button";
import Image from "next/image";
import ESteps from "@enums/steps.enum";
import { EAuthenticationRoutes, UN_AUTHENTICATED_ROUTES } from "@enums/routes.enum";
import { useRouter } from "next/router";
import { HttpService } from "@services/base.service";
import { useDebouncedClick } from "@hooks/useDebouncedClick";
import { toast } from "react-toastify";
import Helper from "@services/helper.service";

/**
 * Component for displaying a modal to inform user that their account has been verified.
 *
 * @param {object} props - Props passed to the component.
 * @param {object} props.response - Response data containing details about the verification.
 * @param {string} props.formatEmail - Formatted email address of the user.
 * @returns {JSX.Element} Rendered modal component.
 */
const AccountVerified = NiceModal.create(({ response, formatEmail }: any) => {
  const router = useRouter();
  const [handleClick, loadingStates] = useDebouncedClick();

  const modal = useModal();

  /**
   * Handles authentication and redirects user based on the verification step.
   *
   * @param {string} modalName - Name of the modal.
   */
  const handleAuth = (modalName: string) => {
    handleClick(async () => {
      const next_step = response?.payload?.nextStep as string;
      modal.remove();

      // Determine the route based on the next step
      if (next_step === ESteps.SETUP_PASSWORD) {
        let route = UN_AUTHENTICATED_ROUTES.SETUP_PASSWORD as Function;
        router.push(route(Helper.encodeToken(formatEmail)));
        return;
      }
      if (next_step == ESteps.VERIFY_EMAIL) {
        let route = UN_AUTHENTICATED_ROUTES.VERIFY_EMAIL as Function;
        router.push(route(Helper.encodeToken(formatEmail)));
        return;
      }

      // Extract user details and token from response
      const userId = response?.payload?.user._id ?? "";
      const token: string = response?.payload?.token.token ?? "";
      const avatar = response?.payload?.user.avatar ?? "";
      const fullName = response?.payload?.user.fullName ?? "";
      const email = response?.payload?.user.email ?? "";
      const role = response?.payload?.user.role ?? "";
      const isActive = response?.payload?.user.isActive;

      if (!role || role !== "USER" || isActive === false) {
        toast.error("Unauthorized access!");
        return;
      }
      // Set token and cookies
      HttpService.setToken(token);
      HttpService.setCookie("token", token);
      HttpService.setCookie("userId", userId);
      HttpService.setCookie("avatar", avatar);
      HttpService.setCookie("fullName", fullName.split(" ").join("_"));
      HttpService.setCookie("email", email);

      // Redirect user to settings page
      router.push(EAuthenticationRoutes.SETTINGS as string);
    }, "verifyEmailLoading");
  };

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
          Account Verified
        </h2>
        <p className="text-dark-50 mb-8 text-base">
          Your account has been verified successfully.
        </p>
        <Button
          className="!w-full"
          size="lg"
          onClick={handleAuth}
          isLoading={loadingStates["verifyEmailLoading"]}
          disabled={loadingStates["verifyEmailLoading"]}
        >
          Continue
        </Button>
      </div>
    </BasicModal>
  );
});

export default AccountVerified;
