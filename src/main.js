import { createApp } from "vue";
import AwardTimeline from "./components/awardTimeline.vue";
import SplashScreen from "./components/splashScreen.vue";
import { useRegisterSW } from "virtual:pwa-register/vue";
import "./style.css";
import { getConfig } from "./utils.js";

useRegisterSW();

function getCurrentPage() {
  const currentPage = window.location.href
    .split("/")
    .pop()
    .replaceAll(/(.html$|#.*$)/g, "");

  return "" === currentPage ? "index" : currentPage;
}

const currentPage = getCurrentPage();
console.log(`currentPage: ${currentPage}`);

getConfig("configs/main.yml", "src/defaultMain.json").then((config) => {
  switch (currentPage) {
    case "index":
      createApp(SplashScreen)
        .provide("config", config.menuItems)
        .provide("backgrounds", config.backgrounds)
        .mount("#splash");
      createApp(AwardTimeline)
        .provide("awards", config.awards)
        .mount("#container-timeline");
      break;
    default:
      //do nothing
      break;
  }
});
