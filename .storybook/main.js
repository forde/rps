const path = require("path");
const tsconfig = require("../tsconfig");

const pathAliases = Object.entries(tsconfig.compilerOptions.paths).map(
  ([alias, paths]) => {
    return [
      alias.replace("/*", ""),
      paths.map((p) => path.resolve(__dirname, "..", p))[0].replace("/*", ""),
    ];
  }
);

module.exports = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    {
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          implementation: require("postcss"),
        },
      },
    },
  ],
  webpackFinal: async (config, { configType }) => {
    config.resolve.modules = [path.resolve(__dirname, ".."), "node_modules"];
    config.resolve.alias = {
      ...config.resolve.alias,
      ...Object.fromEntries(pathAliases),
    };

    return config;
  },
};
