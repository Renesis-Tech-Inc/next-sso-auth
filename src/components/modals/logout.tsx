import NiceModal, { useModal } from "@ebay/nice-modal-react";
import React from "react";
import BasicModal from "@components/global/basicModal";
import { Button } from "@components/global/button";
import { errorHandler } from "@utils/errorHandler";
import { useDebouncedClick } from "@hooks/useDebouncedClick";
import { useRouter } from "next/router";
import { HttpService } from "@services/base.service";
import { EUnauthenticatedRoutes, UN_AUTHENTICATED_ROUTES } from "@enums/routes.enum";

/**
 * Component for displaying a logout confirmation modal.
 *
 * @returns {JSX.Element} Rendered modal component.
 */
const DeleteModal = NiceModal.create(() => {
  const modal = useModal();
  const router = useRouter();

  // Custom hook for handling debounced click events
  const [handleClick, loadingStates] = useDebouncedClick();

  /**
   * Handles the logout action.
   */
  const handleLogout = async () => {
    handleClick(async () => {
      try {
        HttpService.clearCookie();
        const route = EUnauthenticatedRoutes.LOGIN as string;
        router.push(route);
        modal.remove();
      } catch (error: unknown) {
        // Handle error
        errorHandler(error);
      }
    }, "logout");
  };

  return (
    <BasicModal show={modal.visible} hide={modal.hide}>
      <div className="theme_modal bg-blackRussian2 flex w-full flex-col items-center rounded-lg p-8 pt-10 sm:w-[400px]">
        <h2 className="fs-24 mb-4 font-medium">Logout</h2>
        <p className="text-aluminium mb-8 text-sm">
          Are you sure you want to logout?
        </p>
        <div className="flex w-full gap-4">
          <Button
            size="md"
            variant="outline"
            onClick={() => {
              modal.remove();
            }}
          >
            Cancel
          </Button>

          <Button
            isLoading={loadingStates["logout"]}
            disabled={loadingStates["logout"]}
            size="lg"
            onClick={handleLogout}
            className="!w-full"
          >
            Yes, Logout
          </Button>
        </div>
      </div>
    </BasicModal>
  );
});

export default DeleteModal;
