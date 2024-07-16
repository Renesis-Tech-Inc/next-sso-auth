import { Fragment, ReactNode } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Dialog, Transition } from "@headlessui/react";
import { Ubuntu } from "next/font/google";

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--Ubuntu",
});

/**
 * Props for the BasicModal component.
 */
interface BasicModalProps {
  className?: string;
  children: ReactNode;
  show: boolean;
  hide: (value: boolean) => void;
  state?: any;
  setstate?: any;
  minimize?: any;
  afterClose?: () => void;
  close?: boolean;
  crossStyle?: string;
  notOnSideClick?: boolean;
}

/**
 * BasicModal component for displaying modal dialogs.
 *
 * @param {BasicModalProps} props - The props for the BasicModal component.
 * @returns {JSX.Element} The rendered BasicModal component.
 */
const BasicModal: React.FC<BasicModalProps> = ({
  show,
  hide,
  close,
  state,
  children,
  minimize,
  crossStyle,
  className,
  afterClose,
  notOnSideClick,
}) => {
  return (
    <Transition show={show} as={Fragment} afterLeave={afterClose}>
      <Dialog
        as="div"
        className={`${ubuntu.variable} fixed inset-0 z-50 overflow-y-auto`}
        onClose={() => hide(false)}
      >
        <div className="modal">
          <Transition.Child>
            <div
              className={`modal_backdrop ${
                notOnSideClick ? "pointer-events-none" : ""
              }`}
            ></div>
          </Transition.Child>
          <span
            className="hidden h-screen sm:inline-block sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div className={`modal_body ${className}`}>
            <div
              className={`${
                close ? "hidden" : "flex"
              } ${crossStyle} modal_close`}
            >
              <button
                type="button"
                className="modal_close_button"
                onClick={() => {
                  hide(false);
                }}
              >
                <span className="sr-only">Close</span>
                <AiOutlineClose className="stroke-2" />
              </button>
            </div>
            {children}
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default BasicModal;
