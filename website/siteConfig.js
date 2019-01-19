/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

// List of projects/orgs using your project for the users page.
const users = [
  {
    caption: 'LibreTrader',
    // You will need to prepend the image path with your baseUrl
    // if it is not '/', like: '/test-site/img/docusaurus.svg'.
    image: '/img/lt_logo.png',
    infoLink: 'https://github.com/LibreTrader/libretrader',
    pinned: true,
  },
];

const siteConfig = {
  title: "ZMAPI", // Title for your website.
  tagline: "Universal Market API",
  url: "https://zmapi.org", // Your website URL
  baseUrl: "/", // Base URL for your project */
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',

  // Used for publishing and more
  projectName: "ZMAPI",
  organizationName: "zmapi.org",
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    { doc: "try-it-out", label: "Docs" },
    { page: "help", label: "Help" },
    { blog: true, label: "Blog" },
    { href: "https://github.com/zmapi", label: "GitHub" },
    { href: "https://fixplorer.zmapi.org", label: "Fixplorer" },
    { search: true }
  ],

  // If you have users set above, you add it here:
  users,

  /* path to images for header/footer */
  headerIcon: "img/nav_logo.png",
  /* footerIcon: 'img/docusaurus.svg', */
  disableHeaderTitle: true,
  favicon: "img/zmapi_logo_square.png",

  /* Colors for website */
  colors: {
    primaryColor: "#000",
    /* primaryColor: "#FFD572", */
    secondaryColor: "#FFD572",
    linkColor: "#B94802"
  },

  /* Custom fonts for website */
  /*
  fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },
  */

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} ZMAPI`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: "default"
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: ["https://buttons.github.io/buttons.js"],

  // On page navigation for the current documentation page.
  onPageNav: "separate",
  // No .html extensions for paths.
  cleanUrl: true,

  // Open Graph and Twitter card images.
 /*  ogImage: "img/docusaurus.png",
  twitterImage: "img/docusaurus.png" */

  // Show documentation's last contributor's name.
  // enableUpdateBy: true,

  // Show documentation's last update time.
  // enableUpdateTime: true,

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  //   repoUrl: 'https://github.com/facebook/test-site',
	
	algolia: {
		apiKey: "855f5cdb6af3bc9183a88b68ab332688",
		indexName: "zmapi"
		// algoliaOptions: {
		// 	facetFilters: [ 
		// 		"language:LANGUAGE",
		// 		"version:VERSION" ]
    // }
	}
};

module.exports = siteConfig;
