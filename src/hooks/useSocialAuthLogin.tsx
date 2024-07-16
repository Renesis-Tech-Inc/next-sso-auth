import { useEffect } from "react";
import { useRouter } from "next/router";
import { HttpService } from "@services/base.service";
import { errorHandler } from "@utils/errorHandler";
import { getCookie } from "@utils/getCookie";
import { EAuthenticationRoutes } from "@enums/routes.enum";
import { toast } from "react-toastify";
import { decodeTokenHandler } from "@utils/decodeTokenHandler";

/**
 * Custom hook for handling social authentication login.
 * Extracts token and user information from URL params, validates user role and activity status,
 * sets token and cookies, and redirects the user to the appropriate route.
 * @returns {void}
 */
export const useSocialAuthLogin = () => {
  // Hook for accessing Next.js router
  const router = useRouter();

  useEffect(() => {
    /**
     * Handler function for token and user extraction and processing.
     * @returns {void}
     */
    const handleTokenAndUser = () => {
      // Get token and user from URL params
      const { token, user }: any = router.query;

      if (token && user) {
        try {
          // Decode and parse user data
          const decodedUser = JSON.parse(decodeTokenHandler(user));

          const role = decodedUser.role ?? "";
          const isActive = decodedUser.isActive;
          const avatar = decodedUser.avatar ?? "";
          const fullName = decodedUser.fullName ?? "";
          const email = decodedUser.email ?? "";

          // Validate user role and activity status
          if (!role || role !== "USER" || isActive === false) {
            toast.error("Unauthorized access!");
            return;
          }
          const decodedToken: any = JSON.parse(decodeTokenHandler(token));

          // Set token and cookies
          HttpService.setToken(decodedToken.token);
          HttpService.setCookie("token", decodedToken.token);
          HttpService.setCookie("userId", decodedUser._id);
          HttpService.setCookie("avatar", avatar);
          HttpService.setCookie("fullName", fullName.split(" ").join("_"));
          HttpService.setCookie("email", email);

          if (getCookie("token")) {
            router.replace("/");
            // Redirect user to the home route
            window.location.href = EAuthenticationRoutes.SETTINGS;
          }
        } catch (error: unknown) {
          // Handle error
          errorHandler(error);
        }
      }
    };

    // Invoke handler function
    handleTokenAndUser();

    // Cleanup function
    return () => {};
  }, [router]);
};
