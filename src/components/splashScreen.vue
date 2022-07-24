<script setup>
import { ref } from "vue";
import { inject } from "vue";

/**
 * @namespace menuItems
 * @type {array}
 * @property {object} menuItem
 * @property {string} menuItem.name
 * @property {string} menuItem.english
 * @property {string} menuItem.show
 * @property {string} menuItem.url
 */
const menuItems = inject("config").filter((item) => false !== item.show);

/**
 * @namespace backgrounds
 * @type {object}
 * @property {string} lazyload
 * @property {string} normal
 */
const backgrounds = inject("backgrounds");

const showMenu = ref(false);
const userLanguage = ref("ja");

const validLazyload = backgrounds.lazyload
  ? backgrounds.lazyload.match(new RegExp(/\.(jpeg|jpg|gif|png|webp)$/g, "i"))
  : false;

function toggleMenu() {
  showMenu.value = !showMenu.value;
}

const currentPage = window.location.href.split("/").pop();

function resolveUrl(url) {
  const targetUrl = url.split("/").pop();
  const targetId = `${url.endsWith("html") ? "" : "#"}` + url.split("#").pop();
  switch (targetUrl) {
    case "index.html":
      return "/";
    case (["", "index.html"].includes(currentPage) ||
      currentPage.startsWith("#")) &&
      targetUrl:
      return targetId;
    case targetUrl.startsWith(currentPage) && "" !== currentPage:
      return targetUrl;
    default:
      return url;
  }
}
</script>

<template>
  <div
    id="splash-lazyload-image-container"
    :style="{
      backgroundImage: validLazyload ? `url(${backgrounds.lazyload})` : 'none',
    }"
  >
    <div
      id="splash-container"
      :style="{ backgroundImage: `url(${backgrounds.normal})` }"
    >
      <div
        id="mask-underlay"
        :class="showMenu ? 'show' : ''"
        @click="showMenu = false"
      ></div>
      <div id="splash-menu" :class="showMenu ? 'show-menu' : ''" @click.stop>
        <div id="splash-content">
          <div class="title-container">
            <p id="title-first-line" role="heading" aria-level="1">
              Developmental
            </p>
            <p role="heading" aria-level="1">Psychology</p>
            <p role="heading" aria-level="1">Hiroshima</p>
          </div>
          <div class="title-container ja">
            <p role="heading" aria-level="1">広島大学</p>
            <p role="heading" aria-level="1">発達心理学研究室</p>
          </div>

          <div
            id="splash-menu-button"
            role="button"
            aria-label="Toggle menu"
            tabindex="2"
            @click="toggleMenu"
            @keydown.space="toggleMenu"
            @keydown.enter="toggleMenu"
          >
            <svg
              class="arrow"
              :class="!showMenu ? 'point-right' : 'point-left'"
              viewBox="0 0 57.71 57.71"
            >
              <path
                d="m28.855 57.71 3.787-3.877L10.37 31.56h47.34v-5.41H10.37L32.642 3.877 28.855 0 0 28.855Z"
              />
            </svg>
          </div>
        </div>
        <div id="splash-toc">
          <a
            v-for="menuItem in menuItems"
            :key="menuItem.name"
            :href="resolveUrl(menuItem.url)"
            tabindex="1"
            >{{
              "en" === userLanguage && menuItem.english
                ? menuItem.english
                : menuItem.name
            }}</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#splash-container {
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: right center;
  background-repeat: repeat-x;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

#mask-underlay {
  user-select: none;
  position: absolute;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  opacity: 0;
  transition: opacity 0.625s ease-in-out;
}

#mask-underlay.show {
  opacity: 0.5;
}

#splash-menu {
  height: 100vh;
  min-width: 61.8vw;
  background-color: #fff;
  transition: all 0.625s ease-in-out;
  transform: translateX(-38.2%);
  display: grid;
  grid-template-areas: "menu title";
  grid-template-columns: 1fr 1.618fr;
  place-items: center;
  color: #000;
  box-shadow: 61.8vw 0 0 0 rgba(0, 0, 0, 0);
  z-index: 1;
}

#splash-lazyload-image-container {
  background-size: cover;
  background-position: right center;
  background-repeat: repeat-x;
  display: flex;
  flex-direction: row;
}

#splash-menu.show-menu {
  transform: translateX(0);
}

#splash-content {
  grid-area: title;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}

.title-container {
  display: flex;
  flex-direction: column;
  font-family: "Helvetica Neue", "Helvetica", "Noto Sans JP", sans-serif;
  font-weight: 700;
  font-size: 3rem;
  margin-bottom: 1em;
  user-select: none;
}

.title-container.ja {
  font-size: 2rem;
}

#title-first-line {
  letter-spacing: -0.02em;
}

#splash-menu-button {
  margin-top: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #000000;
  padding: 1em;
  cursor: pointer;
}

.arrow {
  fill: #ffffff;
  width: 2em;
  height: 2em;
  transition: transform 0.625s ease-in-out;
  transform: scaleX(-1);
}

.arrow.point-left {
  transform: scaleX(1);
}

#splash-toc {
  grid-area: menu;
  display: grid;
  grid-auto-flow: row;
  font-family: "Helvetica Neue", "Helvetica", "Noto Sans JP", sans-serif;
  font-weight: 400;
  grid-gap: 2rem;
  font-size: 1.25rem;
}

#splash-toc > a:nth-child(1) {
  font-weight: 700;
  color: #000000;
}

#splash-toc > a:nth-child(1)::before {
  content: "";
  position: absolute;
  display: block;
  width: 0.5rem;
  height: 1.25rem;
  transform: translate(-1em, 0.3em);
  background-color: #000000;
}

a {
  color: #707070;
  display: inline-block;
  text-decoration: none;
  padding: 0.5rem 0.5rem;
  transition: all 0.175s ease-in-out;
}

#splash-toc > a:nth-child(1):hover,
a:hover {
  font-weight: 700;
  color: #fff;
  background-color: #000;
}

@media screen and (max-width: 768px) {
  #splash-lazyload-image-container {
    width: 100vw;
    overflow-x: hidden;
  }

  #splash-menu {
    min-width: 200vw;
    grid-template-columns: repeat(2, 100vw);
    transform: translateX(-100vw);
    background-color: #00000054;
    color: #fff;
    align-items: start;
  }

  .title-container {
    font-size: 2.5rem;
  }

  .title-container.ja {
    font-size: 2rem;
  }

  #splash-content,
  #splash-toc {
    margin-top: 2rem;
  }

  #splash-toc {
    grid-gap: unset;
    height: calc(100vh - 12rem);
    overflow: scroll;
  }

  #splash-menu.show-menu {
    transform: translateX(0);
  }

  #splash-menu-button {
    position: absolute;
    width: 80vw;
    padding: 0.5em 0;
    background-color: #ffffff2e;
    border: solid 0.2rem #ffffff;
    align-self: center;
    bottom: 5rem;
    transition: all 0.625s ease-in-out;
  }

  #splash-menu.show-menu #splash-menu-button {
    transform: translateX(-100vw);
  }

  .arrow {
    fill: #ffffff;
  }

  #splash-toc > a:nth-child(1) {
    font-weight: 700;
    color: #ffffff;
  }

  #splash-toc > a:nth-child(1)::before {
    content: "";
    position: absolute;
    display: block;
    width: 0.5rem;
    height: 1.25rem;
    transform: translate(-1em, 0.3em);
    background-color: #ffffff;
  }

  a {
    color: #e8eded;
    padding: 0.5rem 0.5rem;
    height: fit-content;
  }

  #splash-toc > a:nth-child(1):hover,
  a:hover,
  #splash-toc > a:nth-child(1):focus,
  a:focus {
    font-weight: 700;
    color: #000000;
    background-color: #ffffff;
  }
}

@media (prefers-reduced-motion) {
  #splash-menu,
  #mask-underlay,
  #splash-menu-button,
  .arrow {
    transition: none;
  }
}
</style>
