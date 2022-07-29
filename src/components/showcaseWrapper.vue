<script setup>
import { inject } from "vue";
import ContentShowcase from "./contentShowcase.vue";

const showType = inject("showType");
const configs = [];

switch (showType) {
  case "indexWelcome": {
    const rtc = inject("welcomeHtml").replaceAll(/\n|\s{2,}/g, "");
    const welcomeBody = document.createElement("div");
    welcomeBody.innerHTML = rtc || "";
    const title = Array.from(welcomeBody.getElementsByTagName("h2") || []).pop().innerHTML;
    const image = Array.from(welcomeBody.getElementsByTagName("img") || []).pop();
    const richTextContent = (
      welcomeBody.getElementsByClassName("main-content")[0] || ""
    ).innerHTML;

    welcomeBody.innerHTML = (
      welcomeBody.getElementsByClassName("tags")[0] || ""
    ).innerHTML;
    const tags = Array.from(welcomeBody.getElementsByTagName("a") || []).map(
      (tag) => {
        const tagName = tag.innerHTML;
        const tagUrl = tag.href;
        return {
          name: tagName,
          url: tagUrl,
        };
      }
    );

    configs.push({
      type: "indexWelcome",
      image: image ? image.src : "",
      title: title ? title : "",
      tags: tags ? tags : [],
      richTextContent: richTextContent ? richTextContent : "",
    });

    const academicRtc = inject("academicSupportHtml").replaceAll(/\n|\s{2,}/g, "");
    const academicBody = document.createElement("div");
    academicBody.innerHTML = academicRtc || "";
    const academicTitle = Array.from(academicBody.getElementsByTagName("h2") || []).pop().innerHTML;
    const academicImage = Array.from(academicBody.getElementsByTagName("img") || []).pop();
    const academicRichTextContent = (
      academicBody.getElementsByClassName("main-content")[0] || ""
    ).innerHTML;

    configs.push({
      type: "academicSupport",
      image: academicImage ? academicImage.src : "",
      title: academicTitle ? academicTitle : "",
      tags: [],
      richTextContent: academicRichTextContent ? academicRichTextContent : "",
    });
    break;
  }
}
</script>

<template>
  <content-showcase v-for="(config, index) in configs" :key="index" :config="config" />
</template>

<style scoped></style>
