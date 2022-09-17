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
const menuItems = inject("menuItems").filter((item) => false !== item.show);

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
            tabindex="1"
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
            tabindex="0"
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
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-position: right center;
  background-size: cover;
  background-repeat: repeat-x;
  width: 100vw;
  height: 100vh;
}

#mask-underlay {
  position: absolute;
  top: 0;
  right: 0;
  opacity: 0;
  transition: opacity 0.625s ease-in-out;
  background: radial-gradient(#0000007f, #000000 2px);
  background-size: 3px 3px;
  width: 100vw;
  height: 100vh;
  user-select: none;
  -webkit-user-select: none;
}

#mask-underlay.show {
  opacity: 1;
}

#splash-menu {
  display: grid;
  grid-template-columns: 1fr 1.618fr;
  grid-template-areas: "menu title";
  place-items: center;
  transform: translate3d(-38.2%, 0, 0);
  z-index: 1;
  transition: all 0.625s ease-in-out;
  box-shadow: 61.8vw 0 0 0 rgba(0, 0, 0, 0);
  background-color: var(--color-background-lighter);
  min-width: 61.8vw;
  height: 100vh;
  color: var(--color-text);
}

#splash-lazyload-image-container {
  display: flex;
  flex-direction: row;
  background-position: right center;
  background-size: cover;
  background-repeat: repeat-x;
}

#splash-menu.show-menu {
  transform: translate3d(0, 0, 0);
}

#splash-content {
  display: flex;
  grid-area: title;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.title-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;
  font-weight: 700;
  font-size: 3rem;
  font-family: "Helvetica Neue", "Helvetica", "Noto Sans JP", sans-serif;
  user-select: none;
  -webkit-user-select: none;
}

.title-container.ja {
  font-size: 2rem;
}

#title-first-line {
  letter-spacing: -0.05em;
}

#splash-menu-button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-top: 1em;
  background-color: var(--color-text);
  padding: 1em;
}

.arrow {
  fill: var(--color-background-lighter);
  transform: scale3d(-1, 1, 1);
  transition: transform 0.625s ease-in-out;
  width: 2em;
  height: 2em;
}

.arrow.point-left {
  transform: scale3d(1, 1, 1);
}

#splash-toc {
  grid-gap: 2rem;
  display: grid;
  grid-auto-flow: row;
  grid-area: menu;
  font-weight: 400;
  font-size: 1.25rem;
  font-family: "Helvetica Neue", "Helvetica", "Noto Sans JP", sans-serif;
}

#splash-toc > a:first-child {
  color: var(--color-text);
  font-weight: 700;
}

#splash-toc > a:first-child::before {
  display: block;
  position: absolute;
  transform: translateX(-1em);
  background-color: var(--color-text);
  width: 0.5rem;
  height: 1.25rem;
  content: "";
}

a {
  display: flex;
  align-items: center;
  transition: all 0.175s ease-in-out;
  padding: 0 0.5rem;
  height: 2.5rem;
  color: var(--color-gray);
  text-decoration: none;
}

#splash-toc > a:hover {
  background-color: var(--color-text);
  color: var(--color-background-lighter);
  font-weight: 700;
}

@media screen and (max-width: 768px) {
  #splash-lazyload-image-container {
    width: 100vw;
    overflow-x: hidden;
  }

  #splash-menu {
    grid-template-columns: repeat(2, 100vw);
    align-items: start;
    transform: translate3d(-100vw, 0, 0);
    background-color: #00000054;
    min-width: 200vw;
    color: #fff;
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
    grid-auto-rows: minmax(max-content, 4rem);
    margin: auto;
    height: calc(100vh - 12rem);
    overflow-y: scroll;
  }

  #splash-menu.show-menu {
    transform: translate3d(0, 0, 0);
  }

  #splash-menu-button {
    position: absolute;
    bottom: 5rem;
    align-self: center;
    transition: all 0.625s ease-in-out;
    border: solid 0.2rem #ffffff;
    background-color: #ffffff2e;
    padding: 0.5em 0;
    width: 80vw;
  }

  #splash-menu.show-menu #splash-menu-button {
    transform: translate3d(-100vw, 0, 0);
  }

  .arrow {
    fill: #ffffff;
  }

  #splash-toc > a:first-child {
    color: #ffffff;
    font-weight: 700;
  }

  #splash-toc > a:first-child::before {
    background-color: #ffffff;
  }

  a {
    height: 2rem;
    color: #e8eded;
  }

  #splash-toc > a:hover,
  #splash-toc > a:focus {
    background-color: #ffffff;
    color: #000000;
    font-weight: 700;
  }
}

@media (prefers-color-scheme: dark) {
  #mask-underlay {
    opacity: 0.5;
    background-color: #00000080;
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
