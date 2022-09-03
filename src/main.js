import { createApp } from "vue";
import AwardTimeline from "./components/awardTimeline.vue";
import MenuBar from "./components/menuBar.vue";
import ShowcaseWrapper from "./components/showcaseWrapper.vue";
import SplashScreen from "./components/splashScreen.vue";
import { useRegisterSW } from "virtual:pwa-register/vue";
import "./style.css";
import { getConfig } from "./utils.js";

useRegisterSW();

function getCurrentPage(urlString) {
  const currentPage = urlString
    .split("/")
    .pop()
    .replaceAll(/(\.html|#.*$)/g, "");

  return "" === currentPage ? "index" : currentPage;
}

const currentPage = getCurrentPage(window.location.href);
console.log(`currentPage: ${currentPage}`);

async function lazyLoad(el, binding) {
  function isImageExists(urlString) {
    return new Promise((resolve) => {
      if (!urlString) {
        resolve(false);
      }

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
}

getConfig("configs/main.yml", "src/defaultMain.json").then((config) => {
  switch (currentPage) {
    case "index": {
      createApp(SplashScreen)
        .provide("menuItems", config.menuItems)
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
          mounted: async (el, binding) => await lazyLoad(el, binding),
        })
        .mount("#container-introduction");
      createApp(ShowcaseWrapper)
        .provide("showType", "faculties")
        .provide("faculties", config.faculties)
        .directive("lazyLoad", {
          mounted: async (el, binding) => await lazyLoad(el, binding),
        })
        .mount("#container-researches");
      break;
    }
    default:
      break;
  }

  if ("index" !== currentPage) {

    createApp(MenuBar)
      .provide("menuItems", config.menuItems)
      .mount("#menu-bar");
  }
});

export { getCurrentPage };
