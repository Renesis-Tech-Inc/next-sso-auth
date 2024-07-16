import React, { FC } from "react";
import { PasswordIcon, ProfileIcon } from "@assets/svgs";

/**
 * Tab item interface.
 */
interface TabItem {
  name: string;
  icon: JSX.Element;
  current: boolean;
}

/**
 * Props for the SettingsTabs component.
 */
interface SettingsTaIButtonStyleProps {
  setSelectedTabIdx: (index: number) => void;
  selectedTabIdx: number;
}

/**
 * SettingsTabs component for rendering navigation tabs.
 *
 * @param {SettingsTaIButtonStyleProps} props - The props for the SettingsTabs component.
 */
const SettingsTabs: FC<SettingsTaIButtonStyleProps> = ({
  setSelectedTabIdx,
  selectedTabIdx,
}) => {
  const tabs: TabItem[] = [
    { name: "Profile Settings", icon: <ProfileIcon />, current: true },
    { name: "Password", icon: <PasswordIcon />, current: false },
  ];

  return (
    <ul className="settings__tabs" aria-label="Tabs">
      {tabs.map((tab, i) => (
        <li key={tab.name} onClick={() => setSelectedTabIdx(i)}>
          <button
            onClick={() => setSelectedTabIdx(i)}
            className={`${
              i === selectedTabIdx ? "btn-active text-white" : ""
            } flex w-full items-center gap-3 rounded-md px-4 py-2.5  `}
          >
            <span
              className={`${
                i === selectedTabIdx ? "text-white" : "opacity-40"
              }`}
            >
              {tab.icon}
            </span>
            <span className="text-sm">{tab.name}</span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default SettingsTabs;
