/**
 * Redirects unauthenticated users away from authenticated routes.
 * If an unauthenticated user tries to access an authenticated route,
 * they will be redirected to the login page.
 */
import { useEffect } from "react";
import { useRouter } from "next/router";
import { getCookie } from "@utils/getCookie";
import {
  EAuthenticationRoutes,
  EUnauthenticatedRoutes,
  UN_AUTHENTICATED_ROUTES,
} from "@enums/routes.enum";

const useRedirectUnAuthenticatedUser = (): void => {
  const router: any = useRouter();

  useEffect(() => {
    // Check if the user is unauthenticated
    if (!getCookie("token")) {
      let authenticatedRoute = Object.values(EAuthenticationRoutes).includes(
        router.pathname
      );

      if (authenticatedRoute) {
        // If the user is unauthenticated and tries to access an authenticated route,
        // redirect the user to the login page
        let route = EUnauthenticatedRoutes.LOGIN as string;
        router.push(route);
      }
    }
  }, [router]);
};

export default useRedirectUnAuthenticatedUser;
