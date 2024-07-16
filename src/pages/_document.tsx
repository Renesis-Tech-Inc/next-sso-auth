import { Html, Head, Main, NextScript } from "next/document";
import { site } from "@components/config/site";
import EApp from "@enums/text.enum";

/**
 * Custom Next.js Document component.
 * Renders the base HTML structure and sets up metadata for SEO and social sharing.
 * @returns {JSX.Element} JSX for the document structure.
 */
const Document: React.FC = () => {
  return (
    <Html className="scroll-smooth antialiased" lang="en">
      <Head>
        <meta name="theme-color" content="#c29901" />
        {/* Primary Meta Tags */}
        <meta name="title" content={EApp.APP_DESCRIPTION} />
        <meta name="description" content={EApp.APP_DESCRIPTION} />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={site.metaTag} />
        <meta property="og:title" content={EApp.APP_DESCRIPTION} />
        <meta property="og:description" content={EApp.APP_DESCRIPTION} />
        <meta property="og:image" content={site.metaTag} />
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={site.metaTag} />
        <meta property="twitter:title" content={EApp.APP_DESCRIPTION} />
        <meta property="twitter:description" content={EApp.APP_DESCRIPTION} />
        <meta property="twitter:image" content={site.metaTag} />
        <link rel="icon" href={site.favIcon} />
        <meta property="og:image" content={site.favIcon} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
