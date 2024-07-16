import React, { useState } from "react";
import Header from "@components/header";
import SettingsTabs from "@components/modules/settings/components/settingsTabs";
import ProfileSettings from "@components/modules/settings/components/profileSettings";
import PasswordSettings from "@components/modules/settings/components/passwordSettings";

/**
 * SettingsModule component for displaying settings with tabs for profile and password.
 */
const SettingsModule: React.FC = () => {
  const [selectedTabIdx, setSelectedTabIdx] = useState<number>(0);

  return (
    <section className="settings flex grow flex-col">
      <Header />
      <div className="settings__body mt-8">
        <div className="settings__main flex w-full flex-col items-start gap-6 md:grid md:grid-cols-12">
          <div className="settings__tabs border-vulcan w-full rounded-xl border p-5 md:col-span-4 lg:col-span-3">
            <SettingsTabs
              selectedTabIdx={selectedTabIdx}
              setSelectedTabIdx={setSelectedTabIdx}
            />
          </div>
          <div className="settings__inner flex w-full flex-col md:col-span-8 lg:col-span-9">
            {selectedTabIdx === 0 && <ProfileSettings />}
            {selectedTabIdx === 1 && <PasswordSettings />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SettingsModule;
