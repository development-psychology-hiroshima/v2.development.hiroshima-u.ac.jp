<script setup>
import { ref, unref } from "vue";
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
  type: "",
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

function splitName(nameString) {
  const nameArray = nameString.split(/\s/);
  const firstName = nameArray[0];
  const lastName = nameArray.slice(1).join(" ");
  return {
    firstName,
    lastName,
  };
}

switch (params.type) {
  case "indexWelcome":
  case "academicSupport": {
    displayContents.type = "intro";
    displayContents.image = params.image;
    displayContents.title = params.title;
    displayContents.tags = params.tags;
    displayContents.abstract = getAbstract(unref(params.richTextContent));
    displayContents.richTextContent = params.richTextContent;
    break;
  }
  case "avatar": {
    displayContents.type = "avatar";
    displayContents.name = splitName(params.name);
    displayContents.image = {
      src: params.avatar,
      alt: params.name,
    };
    displayContents.link = params.link;
    displayContents.alt = params.name;
  }
}
</script>

<template>
  <div
    class="container-showcase-preview"
    v-if="'intro' === displayContents.type"
  >
    <transition name="content-fade">
      <detail-showcase
        v-if="showDetail"
        :config="displayContents"
        @sigClose="sendSigClose"
      />
    </transition>
    <div
      class="preview-cards"
      tabindex="0"
      @click="showDetail = true"
      @keydown.enter="showDetail = true"
    >
      <img
        class="preview-image"
        src="/src/assets/fallback_image_error.png"
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

  <a
    class="container-avatar-preview"
    :href="displayContents.link"
    target="_blank"
    v-else
  >
    <img
      class="avatar-preview"
      src="/src/assets/fallback_image_error.png"
      v-lazy-load="displayContents.image.src"
      :alt="displayContents.image?.alt"
    />
    <div class="avatar-text">
      <span class="name-text">{{ displayContents.name.firstName }}</span>
      <span class="name-text">{{ displayContents.name.lastName }}</span>
    </div>
  </a>
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
    transform: none;
    opacity: 0;
  }
}

.preview-cards {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: stretch;
  box-shadow: 2px 2px 0.5rem 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  max-width: 40rem;
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
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  box-shadow: 0 0 2rem 2rem #0000004d;
  padding: 2rem;
}

.preview-title {
  font-family: "Noto Serif JP", -apple-system, BlinkMacSystemFont, system-ui,
    serif;
}

.preview-tags {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  justify-content: flex-start;
  align-items: center;
}

.preview-tags {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.tag {
  display: flex;
  align-items: center;
  margin-top: 0.25rem;
  margin-right: 0.25rem;
  border-radius: 0.25rem;
  background-color: #f0f0f0;
  padding: 0 0.5rem 0 0.25rem;
  min-height: 1.5rem;
  color: #6b6b6b;
  font-weight: 700;
  font-size: 0.8rem;
  text-decoration: none;
}

.tag::before {
  padding-right: 0.1rem;
  content: "\e892";
  font-family: "Material Icons", serif;
}

.preview-abstract {
  margin-top: 0.25rem;
  color: #9a9a9a;
  font-size: 1rem;
  text-align: justify;
}

.preview-abstract::after {
  cursor: pointer;
  content: "もっと見る";
  color: #0b08f2;
}

.container-avatar-preview {
  display: grid;
  grid-template-areas: "avatar";
  place-items: stretch;
  margin-bottom: 2rem;
  box-shadow: 2px 2px 0.5rem 0 rgba(0, 0, 0, 0.1);
  width: 15rem;
  height: 15rem;
  overflow: hidden;
}

.avatar-preview {
  grid-area: avatar;
  width: 15rem;
  height: 15rem;
}

.avatar-text {
  display: flex;
  grid-area: avatar;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: translateY(100%);
  transition: all 0.375s ease-in-out;
  background-color: #0b08f2;
  color: #ffffff;
  font-size: 3rem;
}

a {
  text-decoration: none;
}

.container-avatar-preview:hover .avatar-text,
.container-avatar-preview:focus .avatar-text {
  transform: translateY(0);
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
