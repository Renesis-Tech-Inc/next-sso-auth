import withoutAuthentication from "@components/hoc/withoutAuthentication";
import ForgotPasswordModule from "@components/modules/auth/forgotPassword";
import AuthLayout from "@components/global/authLayout";
import MetaTags from "@components/config/metaTags";
import { ImageUrl } from "@utils/images";

/**
 * ForgotPassword component renders the forgot password form.
 * @returns {JSX.Element} JSX for the forgot password page.
 */
const ForgotPassword: React.FC = () => {
  return (
    <>
      <MetaTags title="Forgot Password" />

      <AuthLayout
        title="Start your journey with us"
        authClass="bg-uth-bg1"
        imageSrc={ImageUrl.signUp}
        imgHeight={528}
        imgWidth={735}
      >
        <ForgotPasswordModule />
      </AuthLayout>
    </>
  );
};

export default withoutAuthentication(ForgotPassword);
