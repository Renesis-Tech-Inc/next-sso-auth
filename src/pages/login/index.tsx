import React from "react";
import LoginModule from "@components/modules/auth/login";
import withoutAuthentication from "@components/hoc/withoutAuthentication";
import AuthLayout from "@components/global/authLayout";
import MetaTags from "@components/config/metaTags";
import { ImageUrl } from "@utils/images";

/**
 * Login component.
 * Renders the login page with authentication layout.
 */
const Login: React.FC = () => {
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
        <LoginModule />
      </AuthLayout>
    </>
  );
};

export default withoutAuthentication(Login);
