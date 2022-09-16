import { createApp } from "vue";
import HomepageMemberShowbox from "./components/homepageMemberShowbox.vue";
import MemberShowboxWrapper from "./components/memberShowboxWrapper.vue";
import MenuBar from "./components/menuBar.vue";
import ProjectShowcase from "./components/projectShowcase.vue";
import ShowcaseWrapper from "./components/showcaseWrapper.vue";
import SplashScreen from "./components/splashScreen.vue";
import Timeline from "./components/timeline.vue";
import { useRegisterSW } from "virtual:pwa-register/vue";
import "./style.css";
import { getConfig } from "./utils.js";

useRegisterSW();

function getCurrentPage(urlString) {
  const currentPage = urlString.replaceAll(/(^\/|\.html|#.*$)/g, "");

  return "" === currentPage ? "index" : currentPage;
}

const currentPage = getCurrentPage(window.location.pathname);
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
  }

  let isExist = await isImageExists(binding.value);

  if (isExist) {
    el.src = `${binding.value}`;
  }
}

/**
 * @function cyrb53
 * @description cyrb53 hashing function based on MurmurHash3, credit to bryc on GitHub.
 * @param {String} str
 * @param {Number} seed
 * @return {String}
 */
function cyrb53(str, seed = 0) {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 =
    Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
    Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 =
    Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
    Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  const longHash = 4294967296 * (2097151 & h2) + (h1 >>> 0);
  return longHash.toString(16);
}

getConfig("configs/main.yml", "configs/fallback/main.json")
  .then((config) => {
    switch (currentPage) {
      case "index": {
        createApp(SplashScreen)
          .provide("menuItems", config.menuItems)
          .provide("backgrounds", config.backgrounds)
          .mount("#splash");
        createApp(ProjectShowcase)
          .provide("projects", config.projects)
          .provide("hashingFunction", cyrb53)
          .mount("#project-showcase");
        createApp(Timeline)
          .provide("awards", config.awards)
          .provide("showType", "award")
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
        createApp(HomepageMemberShowbox)
          .provide("members", config.members)
          .provide("hashingFunction", cyrb53)
          .directive("lazyLoad", {
            mounted: async (el, binding) => await lazyLoad(el, binding),
          })
          .mount("#container-members");
        createApp(Timeline)
          .provide("showType", "career")
          .provide("career", config.graduates)
          .mount("#container-career-development");
        break;
      }
      case "members": {
        createApp(MemberShowboxWrapper)
          .provide("members", config.members)
          .provide("obogs", config.obogs)
          .provide("hashingFunction", cyrb53)
          .directive("lazyLoad", {
            mounted: async (el, binding) => await lazyLoad(el, binding),
          })
          .mount("#app-mount-point");
        break;
      }
      default:
        break;
    }

    if ("index" !== currentPage) {
      if (document.getElementById("menu-bar")) {
        createApp(MenuBar)
          .provide("menuItems", config.menuItems)
          .mount("#menu-bar");
      }
    }

    const element = document.getElementById("copyright-year");
    if (element) {
      element.innerHTML = new Date().getFullYear().toString();
    }
  })
  .catch((e) => {
    console.error(e);
  });

export { getCurrentPage };
