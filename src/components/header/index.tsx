import React from "react";
import useLoggedInStatus from "@hooks/useLoggedInStatus";
import UserDropDown from "@components/global/userDropdown/UserDropdown";

/**
 * Header component to display user dropdown if logged in.
 */
const Header: React.FC = () => {
  const [isLoggedIn] = useLoggedInStatus();

  return (
    <div className="text-right">{isLoggedIn ? <UserDropDown /> : null}</div>
  );
};

export default Header;
