import MetaTags from "@components/config/metaTags";
import VerifyEmailModules from "@components/modules/auth/verifyEmail";
import AuthLayout from "@components/global/authLayout";
import { ImageUrl } from "@utils/images";
import withoutAuthentication from "@components/hoc/withoutAuthentication";

/**
 * OtpVerification component renders the OTP verification page.
 * @returns {JSX.Element} JSX for the OTP verification page.
 */
const OtpVarification: React.FC = () => {
  return (
    <>
      <MetaTags title="OTP Verification" />
      <AuthLayout
        title="Start your journey with us"
        authClass="bg-uth-bg2"
        imgClass="!right-[-52%] 2xl:!w-771"
        imageSrc={ImageUrl.signUp}
        imgHeight={560}
        imgWidth={771}
      >
        <VerifyEmailModules />
      </AuthLayout>
    </>
  );
};

export default withoutAuthentication(OtpVarification);
