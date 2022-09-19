<script setup>
const props = defineProps({
  type: {
    type: String,
    default: "concise",
  },
  content: {
    type: Object,
    default() {
      return {
        name: "",
        papers: [],
        title: "",
        url: "",
      };
    },
  },
});

const paperList =
  "detailed" === props.type ? props.content.papers : [props.content];

function normalizeFileName(fileName) {
  return `${fileName.replace(/\s+/g, "_")}${
    fileName.endsWith(".pdf") ? "" : ".pdf"
  }`;
}
</script>

<template>
  <div style="display: contents">
    <h3 v-if="'detailed' === type">{{ content.name }}</h3>
    <ul>
      <li
        :class="'detailed' !== type ? 'decorated' : ''"
        v-for="paper in paperList"
        :key="paper.title"
      >
        <p v-if="'detailed' === type">{{ paper.title }}</p>
        <a
          v-if="paper.url"
          :href="paper.url"
          target="_blank"
          :download="'detailed' !== type ? normalizeFileName(paper.title) : ''"
        >
          {{ "detailed" === type ? paper.url : paper.title }}
        </a>
        <p v-if="'detailed' !== type && !paper.url">
          {{ paper.title }}
        </p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
ul {
  margin-bottom: 0;
}

.decorated {
  border-left: 0.1rem solid var(--color-coquelicot);
  padding-left: 0.4rem;
}

h3 {
  display: flex;
  align-items: baseline;
}

h3::before {
  display: inline-block;
  margin-right: 0.5rem;
  background-color: var(--color-coquelicot);
  width: 1rem;
  height: 1rem;
  content: "";
}
</style>
