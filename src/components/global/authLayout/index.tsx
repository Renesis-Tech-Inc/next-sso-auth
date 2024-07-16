import React, { useEffect } from "react";

import { BackIcon } from "@assets/svgs";
import { Ubuntu } from "next/font/google";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

/**
 * Interface for AuthLayout component props.
 */
interface AuthLayoutProps {
  title?: string;
  children: React.ReactNode;
  authClass?: string;
  imageSrc?: string;
  imgClass?: string;
  imgWidth?: number;
  imgHeight?: number;
  className?: string;
}

// Google Font //
const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--Ubuntu",
});

/**
 * AuthLayout component for wrapping authentication-related pages.
 *
 * @param {AuthLayoutProps} props - Component props.
 * @returns {JSX.Element} The rendered AuthLayout component.
 */
const AuthLayout: React.FC<AuthLayoutProps> = ({ children, className }) => {
  const pathname = usePathname();
  const nextRouter = useRouter();

  useEffect(() => {
    const nextElement = document.getElementById("__next");
    if (nextElement) {
      nextElement.className = `wrapper ${ubuntu.variable}`;
    }
  }, []);

  return (
    <main id="main" className={`main authlayout ${className}`}>
      <div className="rt-authContent bg-dark-3 flex grow">
        <div className="rt-authContentHolder">
          {pathname !== "/" && (
            <span
              onClick={() => nextRouter.back()}
              className="rt-backBtn cursor-pointer"
            >
              <BackIcon /> Back
            </span>
          )}
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
