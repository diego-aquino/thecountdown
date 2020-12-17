const fs = require('fs');
const PrebuildPlugin = require('prebuild-webpack-plugin');

function createGoogleSearchVerificationFile() {
  const googleSearchConsoleKey = process.env.GOOGLE_SEARCH_CONSOLE_KEY;

  if (!googleSearchConsoleKey) {
    return;
  }

  const filePath = `./public/${googleSearchConsoleKey}.html`;
  const content = `google-site-verification: ${googleSearchConsoleKey}.html`;

  fs.writeFileSync(filePath, content, (error) => {
    if (error) {
      console.error(`Could not write file ${filePath}: ${error}`);
    }
  });
}

module.exports = {
  images: {
    domains: ['avatars3.githubusercontent.com'],
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && isServer) {
      config.plugins.push(
        new PrebuildPlugin({
          build: () => {
            createGoogleSearchVerificationFile();
          },
        }),
      );
    }

    return config;
  },
};
