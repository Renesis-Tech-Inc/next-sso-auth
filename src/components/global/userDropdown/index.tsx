import React from "react";
import Link from "next/link";
import { Fragment } from "react";
import { RightCircleArrow, ProfileIcon } from "@assets/svgs";
import ShimmerImage from "@components/global/shimmerImage";
import { getCookie } from "@utils/getCookie";
import NiceModal from "@ebay/nice-modal-react";
import { ImageUrl } from "@utils/images";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import EModals from "@enums/modals.enum";
import { EAuthenticationRoutes } from "@enums/routes.enum";

/**
 *
 * Props for the UserDropDown component.
 */
interface IProps {
  className?: string;
}

/**
 * Dropdown menu for user profile actions.
 *
 * @param {IProps} props - The props for the UserDropDown component.
 * @returns {JSX.Element} The rendered UserDropDown component.
 */
const UserDropDown: React.FC<IProps> = ({ className }: IProps): JSX.Element => {
  const Nav = [
    {
      title: "Profile Settings",
      icon: <ProfileIcon className="text-black-48" />,
      href: EAuthenticationRoutes.SETTINGS,
      onClick: () => {},
    },
    {
      title: "Log Out",
      icon: <RightCircleArrow />,
      href: "#",
      onClick: () => {
        NiceModal.show(EModals.LOGOUT);
      },
    },
  ];

  const AVATAR: string = getCookie("avatar") || "";

  return (
    <>
      <Menu as="div" className="theme__dropdown">
        <MenuButton className="theme__dropdown__button">
          <figure className="profile__img">
            <ShimmerImage
              priority
              width={40}
              height={40}
              alt="Profile Image"
              src={AVATAR || ImageUrl.userImg}
              className="h-full w-full object-cover"
            />
          </figure>
        </MenuButton>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems className="theme__dropdown__menu profile__dropdown__menu">
            <Menu as={"ul"} className="space-y-1">
              {Nav &&
                Nav.map((item: any, i: number) => (
                  <MenuItem key={i} as={"li"} className={`last:border-t`}>
                    {({ active }) => (
                      <a
                        className="flex cursor-pointer items-center space-x-2"
                        onClick={item.onClick}
                      >
                        {item.icon && <i>{item.icon}</i>}
                        <span>{item.title}</span>
                      </a>
                    )}
                  </MenuItem>
                ))}
            </Menu>
          </MenuItems>
        </Transition>
      </Menu>
    </>
  );
};

export default UserDropDown;
