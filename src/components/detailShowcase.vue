<script setup>
/* eslint-disable max-len */
import { onBeforeUnmount, onMounted } from "vue";

const emit = defineEmits(["sigClose"]);
/**
 * @namespace config
 * @type {Object}
 * @property {String} type
 * @property {String} image
 * @property {String} title
 * @property {Array} tags
 * @property {String} richTextContent
 */
defineProps({
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
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  background: radial-gradient(#00000067, #000000e8 2px);
  background-size: 3px 3px;
  width: 100vw;
  height: 100vh;
}

.details-html-container {
  display: flex;
  flex-direction: column;
  align-content: flex-end;
  align-items: flex-end;
  box-shadow: 2px 2px 0.5rem 0 #00000019;
  background-color: var(--color-background-lighter);
  max-width: 50vw;
  max-height: 80vh;
  overflow-y: scroll;
}

.details-html-container::before {
  position: absolute;
  transform: translateX(110%);
  cursor: pointer;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbDpzcGFjZT0icHJlc2VydmUiIGlkPSJMYXllcl8xIiB4PSIwIiB5PSIwIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48c3R5bGU+LnN0MHtmaWxsOm5vbmU7c3Ryb2tlOiNmZmY7c3Ryb2tlLXdpZHRoOjIwO3N0cm9rZS1taXRlcmxpbWl0OjEwfTwvc3R5bGU+PHBhdGggZD0ibTExIDExIDQ5MCA0OTBNNTAxIDExIDExIDUwMSIgY2xhc3M9InN0MCIvPjwvc3ZnPg==");
  background-position: center;
  background-size: calc(100% - 1rem);
  background-repeat: no-repeat;
  background-color: var(--color-barn-red);
  width: 3rem;
  height: 3rem;
  content: "";
}

.details-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2rem;
}

h2 {
  margin-bottom: 1.5rem;
  font-family: "Noto Serif JP", -apple-system, BlinkMacSystemFont, system-ui,
    serif;
}

.details-html {
  font-family: "Helvetica Neue", "Helvetica", "Noto Sans JP", sans-serif;
}

@media screen and (max-width: 768px) {
  .showcase-container {
    top: -100vh;
    align-items: flex-end;
    height: 200vh;
  }

  .details-html-container::before {
    transform: translateY(-110%);
  }

  .details-html-container {
    box-shadow: 0 -1rem 1rem 0 #00000019;
    max-width: 100vw;
    max-height: calc(100vh - 4rem);
    overscroll-behavior-y: contain;
  }
}
</style>
