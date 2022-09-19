<script setup>
import { inject } from "vue";
import MembersResearchShowbox from "./membersResearchShowbox.vue";

/**
 * @namespace researches
 * @type {Object}
 * @property {Array.<affiliate>} affiliates - 発達心理学研究室の出身・所属メンバーの論文
 * @property {Array.<bachelor>} bachelors - 学部生の論文
 * @property {Array.<master>} masters - 修士生の論文
 * @property {Array.<doctor>} doctors - 博士生の論文
 */
const researches = inject("researches");
const { affiliates, bachelors, masters, doctors } = researches;
</script>

<template>
  <h2>発達心理学研究室の出身・所属メンバーの主要論文</h2>
  <members-research-showbox
    v-for="affiliate in affiliates"
    :type="'detailed'"
    :content="affiliate"
    :key="affiliate.name"
  />
  <h2>過去のメンバーの卒業論文</h2>
  <members-research-showbox
    v-for="bachelor in bachelors"
    :type="'concise'"
    :content="bachelor"
    :key="bachelor.title"
  />
  <h2>過去のメンバーの修士論文</h2>
  <members-research-showbox
    v-for="master in masters"
    :type="'concise'"
    :content="master"
    :key="master.title"
  />
  <h2>過去のメンバーの博士論文</h2>
  <members-research-showbox
    v-for="doctor in doctors"
    :type="'concise'"
    :content="doctor"
    :key="doctor.title"
  />
</template>

<style scoped>
h2:not(:first-child) {
  margin-top: 1rem;
}
</style>
