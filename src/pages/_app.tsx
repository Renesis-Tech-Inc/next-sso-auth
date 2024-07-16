import "@assets/scss/styles.scss";
import "@components/modals";
import type { AppProps } from "next/app";
import "react-toastify/dist/ReactToastify.css";
import NiceModal from "@ebay/nice-modal-react";
import { ToastContainer } from "react-toastify";

/**
 * Main application component.
 * Initializes NiceModal provider and sets up global toast notifications.
 * @param {AppProps} props - Props provided by Next.js for the App component.
 * @returns {JSX.Element} JSX for the application layout.
 */
const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <NiceModal.Provider>
      <Component {...pageProps} />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        draggable={false}
        closeOnClick
        pauseOnHover
      />
    </NiceModal.Provider>
  );
};

export default App;
