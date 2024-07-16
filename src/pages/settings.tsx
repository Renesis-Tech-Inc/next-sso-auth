import MetaTags from "@components/config/metaTags";
import SettingsModule from "@components/modules/settings";
import withAuthentication from "@components/hoc/withAuthentication";

/**
 * Settings component renders the user settings page.
 * @returns {JSX.Element} JSX for the user settings page.
 */
const Settings: React.FC = () => {
  return (
    <>
      <MetaTags title="Settings" />
      <SettingsModule />
    </>
  );
};

export default withAuthentication(Settings);
