<script setup>
import { inject } from "vue";

const awardTimelineComposer = (prev, curr) => {
  // transform object to array, enables expansion operation
  const previous = Array.isArray(prev) ? prev : [].concat(prev);
  const previousAward = previous.pop();
  if (previousAward.year !== curr.year) {
    if ("contents" in previousAward) {
      return [...previous, previousAward, curr];
    } else {
      return [
        ...previous,
        {
          year: previousAward.year,
          contents: [
            {
              text: previousAward.text,
              url: previousAward.url,
            },
          ],
        },
        curr,
      ];
    }
  } else {
    if ("contents" in previousAward) {
      return [
        ...previous,
        {
          year: previousAward.year,
          contents: [
            ...previousAward.contents,
            {
              text: curr.text,
              url: curr.url,
            },
          ],
        },
      ];
    } else {
      return [
        ...previous,
        {
          year: previousAward.year,
          contents: [
            {
              text: previousAward.text,
              url: previousAward.url,
            },
            {
              text: curr.text,
              url: curr.url,
            },
          ],
        },
      ];
    }
  }
};

const showType = inject("showType");

/* eslint-disable indent */
const contents =
  "award" === showType
    ? inject("awards").reduce(awardTimelineComposer)
    : inject("career").map((item) => {
        const { year, undergrad, grad } = item;
        const contents = [];
        for (const text of [undergrad, grad]) {
          if (text) {
            contents.push({
              text,
              url: "",
            });
          }
        }

        return {
          year: year,
          contents: contents,
        };
      });
/* eslint-enable indent */
</script>

<template>
  <div id="timeline">
    <div
      v-for="(contentsByYear, index) in contents"
      class="timeline-by-year-container"
      :key="index"
    >
      <div class="container-year">
        <div class="timeline-year">{{ contentsByYear.year }}</div>
        <div class="dialog-triangle year"></div>
      </div>
      <div
        v-for="(award, index) in contentsByYear.contents"
        class="container-card"
        :class="0 === index % 2 ? 'upper' : 'lower'"
        :key="index"
      >
        <div class="dialog-triangle lower" v-if="!(0 === index % 2)"></div>
        <div class="content-card">
          <p class="content-text">{{ award.text }}</p>
          <a v-if="award.url" :href="award.url" target="_blank">READ MORE</a>
        </div>
        <div class="dialog-triangle upper" v-if="0 === index % 2"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#timeline {
  display: flex;
  align-items: center;
  margin-left: 10vw;
  background: linear-gradient(
    0deg,
    transparent 0%,
    transparent 49%,
    var(--color-text, #000) 49%,
    var(--color-text, #000) 51%,
    transparent 51%,
    transparent 100%
  );
}

#timeline > div:first-child > div.container-year > div.timeline-year {
  margin-left: 0;
}

#timeline > div:last-child > div:last-child {
  margin-right: 5vw;
}

#timeline::before {
  transform: translateX(-0.8rem);
  border-radius: 50%;
  background: radial-gradient(
    circle,
    var(--color-text) 0%,
    var(--color-text) 30%,
    var(--color-background) 30%,
    var(--color-background) 51%,
    var(--color-text) 51%,
    var(--color-text) 100%
  );
  width: 1rem;
  height: 1rem;
  content: "";
}

.container-year,
.container-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  content-visibility: auto;
  margin-left: 1rem;
}

.container-year {
  margin-right: 0.5rem;
}

.timeline-year {
  background-color: var(--color-text);
  padding: 0.2em 0.5em;
  color: var(--color-background-lighter);
  font-weight: bold;
  font-size: 1.25rem;
  user-select: none;
}

.timeline-by-year-container {
  display: flex;
  align-items: center;
}

.container-card {
  filter: drop-shadow(0 0 0.5rem rgba(0, 0, 0, 0.1));
  margin: 0 0.5rem;
  width: 13rem;
}

.container-card:not(:nth-child(2)) {
  margin-left: -2rem;
}

.content-card {
  grid-gap: 0.5rem;
  display: grid;
  grid-template-areas:
    "content"
    "menu";
  place-items: center;
  transition: all 0.125s ease-in-out;
  background-color: var(--color-background-lighter);
  padding: 0.5em;
  height: fit-content;
  overflow-wrap: anywhere;
}

.content-text {
  -webkit-line-clamp: 6;
  line-clamp: 6;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  grid-area: content;
  transition: all 0.125s ease-in-out;
  height: fit-content;
  overflow: hidden;
  text-align: justify;
  text-overflow: ellipsis;
  color: var(--color-text);
}

a {
  display: inline-block;
  grid-area: menu;
  background-color: var(--color-text);
  padding: 0.3rem 0.5rem;
  width: fit-content;
  color: var(--color-background-lighter);
  font-weight: 700;
  user-select: none;
  -webkit-user-select: none;
  text-decoration: none;
}

.content-card:hover > .content-text {
  display: flex;
}

.dialog-triangle {
  border-right: 0.5rem solid transparent;
  border-left: 0.5rem solid transparent;
  width: 0;
  height: 0;
}

.dialog-triangle.year {
  border-top: 0.5rem solid var(--color-text);
  transform: translate3d(0, -1px, 0);
}

.dialog-triangle.lower {
  border-bottom: 0.5rem solid var(--color-background-lighter);
  transform: translate3d(0, 1px, 0);
}

.dialog-triangle.upper {
  border-top: 0.5rem solid var(--color-background-lighter);
  transform: translate3d(0, -1px, 0);
}

.container-year,
.container-card.upper {
  transform: translateY(-54%);
}

.container-card.lower {
  transform: translateY(54%);
}
</style>
