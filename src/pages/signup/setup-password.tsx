import React from "react";
import withoutAuthentication from "@components/hoc/withoutAuthentication";
import AuthLayout from "@components/global/authLayout";
import MetaTags from "@components/config/metaTags";
import SetupPasswordModule from "@components/modules/auth/signup/password";
import { ImageUrl } from "@utils/images";

/**
 * SetupPassword component.
 * Renders the setup password page with authentication layout.
 */
const SetupPassword: React.FC = () => {
  return (
    <>
      <MetaTags title="Sign Up" />

      <AuthLayout
        title="Start your journey with us"
        authClass="bg-uth-bg2"
        imgClass="!right-[-52%] 2xl:!w-771"
        imageSrc={ImageUrl.signUp}
        imgHeight={560}
        imgWidth={771}
      >
        <SetupPasswordModule />
      </AuthLayout>
    </>
  );
};

export default withoutAuthentication(SetupPassword);
