<script setup>
import { inject, onMounted } from "vue";
import MemberShowbox from "./memberShowbox.vue";

const members = inject("members");
const obogs = inject("obogs");

onMounted(() => {
  const url = new URL(window.location.href);
  const hash = url.hash;

  if (hash) {
    const target = document.querySelector(hash);
    if (target) {
      target.classList.add("target");
      target.scrollIntoView();
    }
  }
});
</script>

<template>
  <h2>メンバー紹介</h2>
  <member-showbox
    v-for="member in members"
    :member="member"
    :key="member.name"
  />
  <h2>OB・OG</h2>
  <member-showbox v-for="member in obogs" :member="member" :key="member.name" />
</template>

<style scoped>
h2 {
  width: fit-content;
  font-size: 1.5rem;
}
</style>
