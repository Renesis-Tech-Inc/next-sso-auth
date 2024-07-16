import { FcGoogle } from "react-icons/fc";
import { Button } from "@components/global/button";

/**
 * SocialAuth component renders buttons for social authentication.
 * It provides options for users to log in using Google or Facebook.
 * @returns {JSX.Element} The JSX element representing the SocialAuth component.
 */
export default function SocialAuth(): JSX.Element {
  /**
   * Handles Google login by redirecting the user to the Google authentication endpoint.
   */
  const handleGoogleLogin = async () => {
    window.location.href =
      process.env.NEXT_PUBLIC_API_URL + "/social-auth/google";
  };
  const FacebookLogin = async () => {
    window.location.href =
      process.env.NEXT_PUBLIC_API_URL + "/social-auth/facebook";
  };
  return (
    <div className="text-center ">
      <Button
        onClick={handleGoogleLogin}
        className="btn-outline  text-blackrussian !border-blackRussian3 flex !h-12 w-full items-center gap-2 !rounded-md py-3.5 !font-normal capitalize "
      >
        <FcGoogle className="text-xl" />
        <span>Google</span>
      </Button>
    </div>
  );
}
