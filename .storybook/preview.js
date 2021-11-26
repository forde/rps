import "../globals.css";

const viewports = {
  small: {
    name: "Mobile",
    styles: {
      width: "360",
      height: "963px",
    },
  },
  medium: {
    name: "Tablet",
    styles: {
      width: "768px",
      height: "1024px",
    },
  },
  large: {
    name: "Desktop",
    styles: {
      width: "1160px",
      height: "960px",
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  viewport: { viewports: viewports },
  options: {
    storySort: {
      order: ["Materials", "Components"],
    },
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
