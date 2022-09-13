<script setup>
import { inject, ref } from "vue";
import DetailShowcase from "./detailShowcase.vue";

const projects = inject("projects");

// cyrb53 hashing function based on MurmurHash3,
// credit to bryc on GitHub.
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
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}

const projectsHash = cyrb53(JSON.stringify(projects)).toString();

const isEqualHash = ref(projectsHash === localStorage.getItem("project-hash"));
const showDetail = ref(false);
/* eslint-disable max-len */
function parseProject(projectArray) {
  const htmlTemplate = projectArray.map((project) => {
    return `<h3>${project.title}</h3>${
      project.url
        ? `<a href="${project.url}" target="_blank" download="${project.downloadTitle}" aria-label="${project.downloadTitle}"><img src="${project.image}" alt="${project.downloadTitle}" /></a>`
        : `<img src="${project.image}" alt="${project.downloadTitle}" />`
    }`;
  });

  return htmlTemplate.join("");
}
/* eslint-enable max-len */
const displayContents = {
  title: "現在進行中のプロジェクト",
  richTextContent: parseProject(projects),
};

function markAsRead() {
  localStorage.setItem("project-hash", projectsHash);
  isEqualHash.value = true;
}

function viewProject() {
  showDetail.value = true;
}

function handleSigClose() {
  showDetail.value = false;
  markAsRead();
}

function closeOnce() {
  isEqualHash.value = true;
}
</script>

<template>
  <transition name="transition-showcase">
    <div id="container-project-showcase" v-if="!isEqualHash">
      <p class="content">新たな研究プロジェクトがあります。</p>

      <div class="button" role="button" @click="closeOnce">一度閉じる</div>
      <div class="button recommend" role="button" @click="viewProject">
        詳細を見る
      </div>
    </div>
  </transition>
  <transition name="detail-viewer">
    <detail-showcase
      v-show="showDetail"
      :config="displayContents"
      @sigClose="handleSigClose"
    />
  </transition>
</template>

<style scoped>
#container-project-showcase {
  grid-gap: 2rem 1rem;
  display: grid;
  position: fixed;
  bottom: 0;
  grid-template-areas:
    "content content"
    "button-close button-view";
  align-items: center;
  justify-items: stretch;
  z-index: 9999;
  margin: auto;
  background: #333;
  padding: 1.5rem 1rem;
  min-width: min(30rem, 100vw);
  color: #fff;
}

.content {
  grid-area: content;
  font-weight: 700;
  font-size: 1.25rem;
  text-align: center;
}

.button {
  cursor: pointer;
  border: 2px solid #fff;
  padding: 0.5rem;
  user-select: none;
  text-align: center;
}

.recommend {
  background: #fff;
  color: #333;
  font-weight: 700;
}

.transition-showcase-enter-active,
.transition-showcase-leave-active,
.detail-viewer-enter-active,
.detail-viewer-leave-active {
  transition: all 0.375s ease-in-out;
}

.transition-showcase-enter-from,
.transition-showcase-leave-to {
  transform: translate3d(0, 100%, 0);
}

.detail-viewer-enter-from,
.detail-viewer-leave-to {
  opacity: 0;
}

@media screen and (max-width: 768px) {
  .detail-viewer-enter-from,
  .detail-viewer-leave-to {
    transform: translate3d(0, 100vh, 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .detail-viewer-enter-from,
  .detail-viewer-leave-to {
    transform: none;
    opacity: 0;
  }
}
</style>
