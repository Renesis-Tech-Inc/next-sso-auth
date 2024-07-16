import React from "react";
import withoutAuthentication from "@components/hoc/withoutAuthentication";
import AuthLayout from "@components/global/authLayout";
import LoginModule from "@components/modules/auth/login";
import MetaTags from "@components/config/metaTags";
import { ImageUrl } from "@utils/images";

/**
 * SignUp component.
 * Renders the sign-up page with authentication layout.
 */
const SignUp: React.FC = () => {
  return (
    <>
      <MetaTags title="OTP Verification" />

      <AuthLayout
        title="Initiate your exploration"
        authClass="bg-uth-bg1"
        imageSrc={ImageUrl.login}
        imgHeight={528}
        imgWidth={735}
      >
        <LoginModule />
      </AuthLayout>
    </>
  );
};

export default withoutAuthentication(SignUp);
