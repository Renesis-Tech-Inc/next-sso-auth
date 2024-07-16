import React from "react";
import withoutAuthentication from "@components/hoc/withoutAuthentication";
import AuthLayout from "@components/global/authLayout";
import LoginPasswordModule from "@components/modules/auth/login/password";
import MetaTags from "@components/config/metaTags";
import { ImageUrl } from "@utils/images";

/**
 * LoginPassword component.
 * Renders the login password page with authentication layout.
 */
const LoginPassword: React.FC = () => {
  return (
    <>
      <MetaTags title="Login" />
      <AuthLayout
        title="Initiate your exploration"
        authClass="bg-uth-bg1"
        imageSrc={ImageUrl.login}
        imgHeight={528}
        imgWidth={735}
      >
        <LoginPasswordModule />
      </AuthLayout>
    </>
  );
};

export default withoutAuthentication(LoginPassword);
