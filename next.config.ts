import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
/** Set when the site is served at a custom domain root (not github.io/repo-name). */
const isGithubPagesCustomDomain =
  isGithubPages && process.env.GITHUB_PAGES_CUSTOM_DOMAIN === "true";
const isCpanel = process.env.CPANEL === "true";
const repoName = "website";
/** Project Pages URL: https://<org>.github.io/website/ */
const basePath =
  isGithubPages && !isGithubPagesCustomDomain ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    qualities: [75, 90],
  },
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_CONTACT_EMAIL:
      process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "inquiries@pjbumitech.com",
    // formsubmit (default) | web3forms
    NEXT_PUBLIC_CONTACT_PROVIDER:
      process.env.NEXT_PUBLIC_CONTACT_PROVIDER === "web3forms"
        ? "web3forms"
        : "formsubmit",
    // Required only when NEXT_PUBLIC_CONTACT_PROVIDER=web3forms
    NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY:
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "",
  },
  ...(isGithubPages && basePath
    ? {
        basePath,
        assetPrefix: `${basePath}/`,
      }
    : {}),
};

export default nextConfig;
