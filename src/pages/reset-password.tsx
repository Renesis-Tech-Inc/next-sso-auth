import withoutAuthentication from "@components/hoc/withoutAuthentication";
import AuthLayout from "@components/global/authLayout";
import ResetPasswordModule from "@components/modules/auth/resetPassword";
import MetaTags from "@components/config/metaTags";
import { ImageUrl } from "@utils/images";

/**
 * ResetPassword component renders the reset password page.
 * @returns {JSX.Element} JSX for the reset password page.
 */
const ResetPassword: React.FC = () => {
  return (
    <>
      <MetaTags title="Reset Password" />
      <AuthLayout
        title="Start your journey with us"
        authClass="bg-uth-bg2"
        imgClass="!right-[-52%] 2xl:!w-771"
        imageSrc={ImageUrl.signUp}
        imgHeight={560}
        imgWidth={771}
      >
        <ResetPasswordModule />
      </AuthLayout>
    </>
  );
};

export default withoutAuthentication(ResetPassword);
