import { Ubuntu } from "next/font/google";
import React, { useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";

/**
 * Props for the Layout component.
 */
interface IProps {
  children: ReactNode;
}

// Google Font //
const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--Ubuntu",
});

/**
 * Layout component that applies global styles and font, and wraps the main content.
 *
 * @param {IProps} props - The props for the Layout component.
 * @returns {JSX.Element} The rendered Layout component.
 */
const Layout: React.FC<IProps> = ({ children }: IProps): JSX.Element => {
  const pathname = usePathname();

  useEffect(() => {
    const nextElement = document.getElementById("__next");
    if (nextElement) {
      nextElement.className = `wrapper bg__wrapper ${ubuntu.variable}`;
    }
  }, []);

  return (
    <main
      id="main"
      className={`main ${pathname === "/pdf-preview" ? "!p-0" : ""}`}
    >
      {children}
    </main>
  );
};

export default Layout;
