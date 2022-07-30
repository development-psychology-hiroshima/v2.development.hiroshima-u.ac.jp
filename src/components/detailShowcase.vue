<script setup>
import {
  defineEmits,
  defineProps,
  onBeforeUnmount,
  onBeforeUpdate,
  onMounted,
} from "vue";

const emit = defineEmits(["sigClose"]);

const props = defineProps({
  config: {
    type: Object,
    default() {
      return {
        type: "",
        image: "",
        title: "",
        tags: [],
        richTextContent: "",
      };
    },
  },
});

function handleClose(e) {
  if ("Escape" === e.key) {
    emit("sigClose");
  }
}

onMounted(() => {
  window.addEventListener("keydown", handleClose);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleClose);
});
</script>

<template>
  <div
    class="showcase-container"
    @click="$emit('sigClose')"
    @keydown.esc="$emit('sigClose')"
  >
    <div class="details-html-container" @keydown.esc="$emit('sigClose')">
      <div class="details-content" @click.stop>
        <h2>{{ config.title }}</h2>
        <div class="details-html" v-html="config.richTextContent"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.showcase-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  background: radial-gradient(#0000007f, #000000 2px);
  background-size: 3px 3px;
}

.details-html-container {
  max-width: 50vw;
  max-height: 80vh;
  overflow-y: scroll;
  background-color: #ffffff;
  display: flex;
  align-content: flex-end;
  flex-direction: column;
  align-items: flex-end;
  box-shadow: 2px 2px 0.5rem 0 rgba(0, 0, 0, 0.1);
}

.details-html-container::before {
  content: "\e5cd";
  position: absolute;
  transform: translateX(110%);
  width: 3rem;
  height: 3rem;
  background-color: #000000;
  font-family: "Material Symbols Outlined", serif;
  font-variation-settings: "wght" 100;
  font-size: 3rem;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.details-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2rem;
}

h2 {
  font-family: "Noto Serif JP", -apple-system, BlinkMacSystemFont, system-ui,
    serif;
  margin-bottom: 1.5rem;
}

.details-html {
  font-family: "Helvetica Neue", "Helvetica", "Noto Sans JP", sans-serif;
}

@media screen and (max-width: 768px) {
  .showcase-container {
    align-items: flex-end;
  }

  .details-html-container::before {
    transform: translateY(-110%);
  }

  .details-html-container {
    max-width: 100vw;
    max-height: calc(100vh - 4rem);
    box-shadow: 0 -1rem 1rem 0 rgba(0, 0, 0, 0.1);
  }
}
</style>
