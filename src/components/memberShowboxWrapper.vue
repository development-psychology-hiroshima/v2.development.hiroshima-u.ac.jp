<script setup>
import { inject } from "vue";
import MemberShowbox from "./memberShowbox.vue";

const members = inject("members");
const obogs = inject("obogs");
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

h2::after {
  display: block;
  backdrop-filter: invert(1);
  -webkit-backdrop-filter: invert(1);
  margin-top: -0.8rem;
  background: transparent;
  width: 100%;
  height: 0.5rem;
  content: "";
}
</style>
