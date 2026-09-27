import rawSite from "../data/site.json";

interface SocialLink {
  label: string;
  url: string;
}

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  heroEyebrow: string;
  heroTitle: string;
  heroText: string;
  email: string;
  socialLinks: SocialLink[];
}

export const site = rawSite as SiteSettings;
