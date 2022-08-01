<script setup>
import { defineProps, ref, unref } from "vue";
import DetailShowcase from "./detailShowcase.vue";

const props = defineProps({
  config: {
    type: Object,
    default() {
      return {
        type: "",
        title: "",
        tags: [],
        richTextContent: "",
      };
    },
  },
});

const params = unref(props.config);
const showDetail = ref(false);
function sendSigClose() {
  showDetail.value = false;
}

const displayContents = {
  image: "",
  title: "",
  tags: [],
  abstract: "",
  richTextContent: "",
};

function getAbstract(contentString) {
  const textString = contentString.replaceAll(/<[^>]*>/g, "");
  return textString.slice(0, 220) + "...";
}

switch (params.type) {
  case "indexWelcome":
  case "academicSupport": {
    displayContents.image = params.image;
    displayContents.title = params.title;
    displayContents.tags = params.tags;
    displayContents.abstract = getAbstract(unref(params.richTextContent));
    displayContents.richTextContent = params.richTextContent;
    break;
  }
}
</script>

<template>
  <div class="container-showcase-preview">
    <transition name="content-fade">
      <detail-showcase
        v-if="showDetail"
        :config="displayContents"
        @sigClose="sendSigClose"
      />
    </transition>
    <div class="preview-cards" @click="showDetail = true">
      <img
        class="preview-image"
        src="/src/assets/error.png"
        v-lazy-load="displayContents.image.src"
        :alt="displayContents.image?.alt"
      />
      <div class="preview-contents">
        <h2 class="preview-title">{{ displayContents.title }}</h2>
        <div class="preview-tags" v-if="displayContents.tags.length > 0">
          <a
            class="tag"
            v-for="tag in displayContents.tags"
            @click.stop
            :key="tag.name"
            :href="tag.url"
            target="_blank"
          >
            {{ tag.name }}
          </a>
        </div>
        <div class="preview-abstract">{{ displayContents.abstract }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container-showcase-preview {
  margin-bottom: 2rem;
}

.content-fade-enter-active,
.content-fade-leave-active {
  transition: all 0.375s ease-in-out;
}

.content-fade-enter-from,
.content-fade-leave-to {
  opacity: 0;
}

@media screen and (max-width: 768px) {
  .content-fade-enter-from,
  .content-fade-leave-to {
    transform: translateY(100vh);
  }
}

@media (prefers-reduced-motion: reduce) {
  .content-fade-enter-from,
  .content-fade-leave-to {
    opacity: 0;
    transform: none;
  }
}

.preview-cards {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  max-width: 40rem;
  background-color: #ffffff;
  box-shadow: 2px 2px 0.5rem 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.preview-image {
  width: 100%;
  height: auto;
  max-height: 15rem;
  object-fit: cover;
}

.preview-contents {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: nowrap;
  padding: 2rem;
  box-shadow: 0 0 2rem 2rem #0000004d;
}

.preview-title {
  font-family: "Noto Serif JP", -apple-system, BlinkMacSystemFont, system-ui,
    serif;
}

.preview-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  align-content: space-between;
}

.preview-tags {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.tag {
  display: flex;
  align-items: center;
  color: #6b6b6b;
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 700;
  background-color: #f0f0f0;
  border-radius: 0.25rem;
  padding: 0 0.5rem 0 0.25rem;
  height: 1.5rem;
  margin-top: 0.25rem;
  margin-right: 0.25rem;
}

.tag::before {
  content: "\e892";
  font-family: "Material Icons", serif;
  padding-right: 0.1rem;
}

.preview-abstract {
  color: #9a9a9a;
  font-size: 1rem;
  margin-top: 0.25rem;
  text-align: justify;
}

.preview-abstract::after {
  content: "もっと見る";
  color: #0b08f2;
  cursor: pointer;
}

@media (max-width: 768px) {
  .preview-cards {
    max-width: calc(100vw - 2rem);
  }

  .tag {
    padding: 0.35rem 0.5rem 0.25rem 0.35rem;
    font-size: 1rem;
  }
}
</style>
