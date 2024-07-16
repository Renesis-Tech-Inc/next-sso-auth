import withoutAuthentication from "@components/hoc/withoutAuthentication";
import AuthLayout from "@components/global/authLayout";
import LinkAccountModules from "@components/modules/auth/linkAccount";
import MetaTags from "@components/config/metaTags";
import { ImageUrl } from "@utils/images";

/**
 * LinkAccount component renders the link account page.
 * @returns {JSX.Element} JSX for the link account page.
 */
const LinkAccount: React.FC = () => {
  return (
    <>
      <MetaTags title="Link Accounts" />
      <AuthLayout
        title="Start your journey with us"
        authClass="bg-uth-bg2"
        imgClass="!right-[-52%] 2xl:!w-771"
        imageSrc={ImageUrl.signUp}
        imgHeight={560}
        imgWidth={771}
      >
        <LinkAccountModules />
      </AuthLayout>
    </>
  );
};

export default withoutAuthentication(LinkAccount);
