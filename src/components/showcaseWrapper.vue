<script setup>
import { inject } from "vue";
import ContentShowcase from "./contentShowcase.vue";

const showType = inject("showType");
const configs = [];

function parseTemplate(htmlTemplate) {
  const cleanTemplate = htmlTemplate.replaceAll(/\n|\s{2,}/g, "");
  const template = document.createElement("div");
  template.innerHTML = cleanTemplate || "";
  const title = template.querySelector("h2")?.innerHTML;
  const image = {
    src: template.querySelector("img")?.src,
    alt: template.querySelector("img")?.alt,
  };

  const richTextContent = template.querySelector(".main-content")?.innerHTML;

  const tags = template.querySelector(".tags")
    ? Array.from(template.querySelector(".tags")?.querySelectorAll("a")).map(
        (tag) => {
          return {
            name: tag.innerHTML,
            url: tag.href,
          };
        }
      )
    : [];

  return {
    title,
    image,
    tags,
    richTextContent,
  };
}

switch (showType) {
  case "indexWelcome": {
    const rtc = inject("welcomeHtml");
    const { title, image, tags, richTextContent } = parseTemplate(rtc);

    configs.push({
      type: "indexWelcome",
      image: image ? image : "",
      title: title ? title : "",
      tags: tags ? tags : [],
      richTextContent: richTextContent ? richTextContent : "",
    });

    const academicRtc = inject("academicSupportHtml");
    const {
      image: academicImage,
      title: academicTitle,
      richTextContent: academicRichTextContent,
    } = parseTemplate(academicRtc);

    configs.push({
      type: "academicSupport",
      image: academicImage ? academicImage : "",
      title: academicTitle ? academicTitle : "",
      tags: [],
      richTextContent: academicRichTextContent ? academicRichTextContent : "",
    });
    break;
  }
  case "faculties": {
    const avatars = inject("faculties");
    avatars.forEach((avatar) => {
      const { name, english, avatar: avatarImage, email, link } = avatar;
      configs.push({
        type: "avatar",
        name: name || "",
        english: english || "",
        avatar: avatarImage || "",
        email: email || "",
        link: link || "",
      });
    });
  }
}
</script>

<template>
  <content-showcase
    v-for="(config, index) in configs"
    :key="index"
    :config="config"
  />
</template>

<style scoped></style>
