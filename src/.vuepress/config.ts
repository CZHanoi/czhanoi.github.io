import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

import { path } from "@vuepress/utils";

export default defineUserConfig({
  base: "/",

  lang: "en-US",
  title: "CZHanoi",
  description: "On the Road to Jerusalem",

  head: [
    ["link", { rel: "icon", type: "image/png", href: "/logoDark.png" }],
  ],

  theme,
  // plugins: [
  //   registerComponentsPlugin({
  //     componentsDir: path.resolve(__dirname, "./components"),
  //   }),
  // ],
  // Enable it with pwa
  // shouldPrefetch: false,
});
