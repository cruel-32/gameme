module.exports = {
  // Since `gatsby-plugin-typescript` is automatically included in Gatsby you
  // don't need to define it here (just if you need to change the options)
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        // Add any options here
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-180692520-1',
        head: false,
        anonymize: true,
        respectDNT: true,
        // Enables Google Optimize using your container Id
        optimizeId: 'OPT-KJ72SLS',
        // Enables Google Optimize Experiment ID
        experimentId: 'QuPUqjsMTKOurIDasuz-8g',
        // Set Variation ID. 0 for original 1,2,3....
        // variationId: 'YOUR_GOOGLE_OPTIMIZE_VARIATION_ID',
        // Any additional create only fields (optional)
        sampleRate: 5,
        siteSpeedSampleRate: 10,
        cookieDomain: 'test-world.netlify.app',
        icon: `/images/common/favicon.png`,
      },
    },
  ],
};
