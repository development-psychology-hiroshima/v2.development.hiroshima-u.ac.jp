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
function handleSigClose() {
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
  const textString = contentString.replaceAll(
    /<[^>]*>|<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    ""
  );
  return textString.slice(0, 220) + "...";
}

function getEmailLink(emailString) {
  return emailString.startsWith("mailto:")
    ? emailString
    : "mailto:" + emailString;
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
    displayContents.name = params.name;
    displayContents.image = {
      src: params.avatar,
      alt: params.name,
    };
    displayContents.english = params.english;
    displayContents.email = params.email;
    displayContents.link = params["link"];
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
        @sigClose="handleSigClose"
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

  <a class="container-avatar-preview" :href="displayContents.link" v-else>
    <img
      class="avatar-preview"
      src="/src/assets/fallback_image_error.png"
      v-lazy-load="displayContents.image.src"
      :alt="displayContents.image?.alt"
    />

    <div class="container-avatar-info">
      <p class="avatar-name">
        {{ displayContents.name }}
      </p>

      <p class="avatar-english-name">
        {{ displayContents.english }}
      </p>

      <div class="avatar-email" v-if="displayContents.email">
        <a :href="getEmailLink(displayContents.email)">
          {{ displayContents.email }}
        </a>
      </div>
    </div>
  </a>
</template>

<style scoped>
.container-showcase-preview,
.container-avatar-preview {
  transition: all 0.375s ease-in-out;
  margin-bottom: 2rem;
}

:is(.container-showcase-preview, .container-avatar-preview):hover {
  box-shadow: 4px 4px 1rem 0 rgba(0, 0, 0, 0.2);
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
    transform: translate3d(0, 100vh, 0);
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
  color: var(--color-set-link, #6750a4);
}

.container-avatar-preview {
  display: flex;
  box-shadow: 2px 2px 0.5rem 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  padding-right: 1rem;
  min-width: clamp(20rem, 30vw, 30rem);
  max-width: min(100vw, 30rem);
  overflow: hidden;
}

.avatar-preview {
  width: 10rem;
  height: 10rem;
}

.container-avatar-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 1rem;
}

.avatar-name {
  margin-top: 1rem;
  margin-bottom: 0.25rem;
  color: #000000;
  font-weight: 700;
  font-size: 1.5rem;
  font-family: "Noto Serif JP", -apple-system, BlinkMacSystemFont, system-ui,
    serif;
}

.avatar-english-name {
  color: #000000;
  text-transform: uppercase;
}

.avatar-email {
  display: flex;
  flex: 1;
  align-items: center;
  color: #9a9a9a;
  font-weight: 400;
}

.avatar-email::before {
  padding-right: 0.1rem;
  content: "\e0be";
  font-family: "Material Icons", serif;
}

.avatar-email a {
  color: #9a9a9a;
}

a {
  text-decoration: none;
}

@media (max-width: 768px) {
  .preview-cards {
    max-width: calc(100vw - 2rem);
  }

  .tag {
    padding: 0.35rem 0.5rem 0.25rem 0.35rem;
    font-size: 1rem;
  }

  .container-avatar-preview {
    width: calc(100vw - 2rem);
  }

  .avatar-preview {
    width: 7rem;
    height: 7rem;
  }

  .avatar-name {
    margin-top: 0.5rem;
    font-size: 1.25rem;
  }

  .avatar-email a {
    font-size: 0.9rem;
    overflow-wrap: anywhere;
  }
}
</style>
