import withoutAuthentication from "@components/hoc/withoutAuthentication";
import AuthLayout from "@components/global/authLayout";
import OtpVerificationModules from "@components/modules/auth/otpVerification";
import MetaTags from "@components/config/metaTags";
import { ImageUrl } from "@utils/images";

/**
 * OtpVerification component renders the OTP verification page.
 * @returns {JSX.Element} JSX for the OTP verification page.
 */
const OtpVerification: React.FC = () => {
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
        <OtpVerificationModules />
      </AuthLayout>
    </>
  );
};

export default withoutAuthentication(OtpVerification);
