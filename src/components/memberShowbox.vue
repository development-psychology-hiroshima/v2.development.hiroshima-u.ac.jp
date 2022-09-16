<script setup>
import { inject } from "vue";

defineProps({
  member: {
    type: Object,
    default() {
      return {
        name: "",
        position: "",
        image: "",
        intro: "",
        interest: "",
        others: [],
      };
    },
  },
});

const cyrb53 = inject("hashingFunction");

function normalizeName(name, replacementString = " ") {
  return name.replace(/\s+/g, replacementString);
}

function getMemberNameHashId(name) {
  return "member-" + cyrb53(normalizeName(name, ""));
}
</script>

<template>
  <div class="member-showbox">
    <div class="title-wrapper" :id="getMemberNameHashId(member.name)">
      <h3>
        {{ normalizeName(member.name) }}
      </h3>
      <p class="position">{{ member.position }}</p>
    </div>
    <img
      src="/images/students.svg"
      v-lazy-load="member.image"
      :alt="member.name"
    />
    <div class="description">
      <p v-if="member.intro">
        <span class="title">自己紹介：</span>
        <span v-html="member.intro"></span>
      </p>
      <p v-if="member.interest">
        <span class="title">研究テーマ／関心領域：</span>
        <span>{{ member.interest }}</span>
      </p>
      <p v-if="member.tutor">
        <span class="title">主指導教員：</span>
        <span>{{ member.tutor }}</span>
      </p>
      <p v-for="item in member.others" :key="item.title">
        <span class="title">{{ item.title }}：</span>
        <span v-html="item.content"></span>
      </p>
    </div>
  </div>
</template>

<style scoped>
.member-showbox {
  grid-gap: 0.5rem;
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-template-areas:
    "title title"
    "image description";
  margin: 1.5rem 0;
}

img {
  grid-area: image;
  width: 10rem;
  height: 10rem;
  object-fit: cover;
}

.title-wrapper {
  display: flex;
  grid-area: title;
  flex-direction: row;
  align-items: baseline;
}

h3 {
  border-left: 0.5rem solid #000;
  padding-left: 0.5rem;
  font-size: 1.5rem;
}

.position {
  margin-left: 0.75rem;
  color: var(--color-gray);
  font-weight: 500;
}

span.title {
  font-weight: 700;
}

.description {
  grid-row-gap: 0.5rem;
  display: grid;
  grid-auto-rows: max-content;
  grid-auto-flow: row;
  grid-area: description;
}

@media screen and (max-width: 768px) {
  .member-showbox {
    grid-template-columns: 1fr;
    grid-template-areas:
      "title"
      "image"
      "description";
  }

  .description {
    grid-row-gap: 1rem;
  }
}
</style>
