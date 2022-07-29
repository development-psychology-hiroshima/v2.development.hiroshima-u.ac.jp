import { createApp } from "vue";
import AwardTimeline from "./components/awardTimeline.vue";
import ShowcaseWrapper from "./components/showcaseWrapper.vue";
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
    case "index": {
      createApp(SplashScreen)
        .provide("config", config.menuItems)
        .provide("backgrounds", config.backgrounds)
        .mount("#splash");
      createApp(AwardTimeline)
        .provide("awards", config.awards)
        .mount("#container-timeline");
      const welcomeHtml = (document.getElementById("welcome-message") || "")
        .innerHTML;
      const academicSupportHtml = (
        document.getElementById("academic-support-introduction") || ""
      ).innerHTML;
      createApp(ShowcaseWrapper)
        .provide("showType", "indexWelcome")
        .provide("welcomeHtml", welcomeHtml)
        .provide("academicSupportHtml", academicSupportHtml)
        .directive("lazyLoad", {
          mounted: async (el, binding) => {
            const isImageExists = function (urlString) {
              return new Promise((resolve) => {
                let img = new Image();
                img.onload = function () {
                  if (this.complete === true) {
                    resolve(true);
                    img = null;
                  }
                };
                img.onerror = function () {
                  resolve(false);
                  img = null;
                };
                img.src = urlString;
              });
            };

            let isExist = await isImageExists(binding.value);

            if (isExist) {
              el.src = `${binding.value}`;
            }
          },
        })
        .mount("#container-introduction");
      break;
    }
    default:
      //do nothing
      break;
  }
});
