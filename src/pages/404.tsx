import { useEffect } from "react";
import { useRouter } from "next/router";
import { EUnauthenticatedRoutes } from "@enums/routes.enum";

/**
 * Custom 404 page component.
 * Redirects users to the login page after 3 seconds.
 * @returns {JSX.Element} JSX for the custom 404 page.
 */
const Custom404: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login page after 3 seconds
    const timer = setTimeout(() => {
      router.push(EUnauthenticatedRoutes.LOGIN);
    }, 3000);

    // Cleanup the timer
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="mb-4 text-3xl font-bold">Page Not Found</h1>
        <p className="mb-4">Redirecting you to the home page...</p>
        <svg
          className="mx-auto h-8 w-8 animate-spin text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Custom404;
