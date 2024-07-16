import Layout from "@components/global/layout";
import useRedirectAuthenticatedUser from "@hooks/useRedirectAuthenticatedUser";

interface AuthProps {
  props: any;
  showHeader: boolean;
}
type ComponentWithInitialProps = React.ComponentType<any> & {
  getInitialProps?: (ctx: any) => Promise<any>;
};

/**
 * Higher-order component for wrapping a component with authentication checks and layout.
 *
 * @param {React.ComponentType<any>} Component - The component to be wrapped with authentication.
 * @param {boolean} [showHeader=false] - Whether to show the header in the layout.
 * @returns {React.FC<any>} The wrapped component with authentication.
 */
const withoutAuthentication = (
  Component: ComponentWithInitialProps
): React.FC<AuthProps> => {
  /**
   * Auth component that performs authentication checks and renders the wrapped component within a layout.
   *
   * @param {any} props - Props passed to the wrapped component.
   * @returns {JSX.Element} Rendered component with authentication and layout.
   */
  const Auth = ({ props }: AuthProps) => {
    useRedirectAuthenticatedUser();
    return (
      <Layout>
        <Component {...props} />
      </Layout>
    );
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withoutAuthentication;
