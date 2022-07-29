<script setup>
import { inject } from "vue";

const timelineComposer = (prev, curr) => {
  // transform object to array, enables expansion operation
  const previous = Array.isArray(prev) ? prev : [].concat(prev);
  const previousAward = previous.pop();
  if (previousAward.year !== curr.year) {
    if ("awards" in previousAward) {
      return [...previous, previousAward, curr];
    } else {
      return [
        ...previous,
        {
          year: previousAward.year,
          awards: [
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
    if ("awards" in previousAward) {
      return [
        ...previous,
        {
          year: previousAward.year,
          awards: [
            ...previousAward.awards,
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
          awards: [
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

const awards = inject("awards").reduce(timelineComposer);
</script>

<template>
  <div id="timeline">
    <div
      v-for="(awardsByYear, index) in awards"
      class="timeline-by-year-container"
      :key="index"
    >
      <div class="container-year">
        <div class="timeline-year">{{ awardsByYear.year }}</div>
        <div class="dialog-triangle year"></div>
      </div>
      <div
        v-for="(award, index) in awardsByYear.awards"
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
  margin-left: 10vw;
  display: flex;
  align-items: center;
  background: linear-gradient(
    0deg,
    transparent 0%,
    transparent 49%,
    black 49%,
    black 51%,
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
  content: "";
  width: 1rem;
  height: 1rem;
  background: radial-gradient(
    circle,
    black 0%,
    black 30%,
    #e8eded 30%,
    #e8eded 51%,
    black 51%,
    black 100%
  );
  border-radius: 50%;
  transform: translateX(-0.8rem);
}

.container-year,
.container-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 1rem;
  content-visibility: auto;
}

.container-year {
  margin-right: 0.5rem;
}

.timeline-year {
  font-size: 1.25rem;
  font-weight: bold;
  color: #ffffff;
  background-color: #000000;
  padding: 0.2em 0.5em;
}

.timeline-by-year-container {
  display: flex;
  align-items: center;
}

.container-card {
  margin: 0 0.5rem;
  width: 13rem;
  filter: drop-shadow(0 0 0.5rem rgba(0, 0, 0, 0.1));
}

.container-card:not(:nth-child(2)) {
  margin-left: -2rem;
}

.content-card {
  display: grid;
  grid-template-areas:
    "content"
    "menu";
  place-items: center;
  grid-gap: 0.5rem;
  overflow-wrap: anywhere;
  height: fit-content;
  transition: all 0.125s ease-in-out;
  background-color: #ffffff;
  padding: 0.5em;
}

.content-text {
  grid-area: content;
  height: fit-content;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 6; /* number of lines to show */
  line-clamp: 6;
  -webkit-box-orient: vertical;
  transition: all 0.125s ease-in-out;
  text-align: justify;
}

a {
  grid-area: menu;
  display: inline-block;
  width: fit-content;
  text-decoration: none;
  color: #ffffff;
  background-color: #000000;
  padding: 0.3rem 0.5rem;
  user-select: none;
  -webkit-user-select: none;
}

.content-card:hover > .content-text {
  display: flex;
}

.dialog-triangle {
  width: 0;
  height: 0;
  border-left: 0.5rem solid transparent;
  border-right: 0.5rem solid transparent;
}

.dialog-triangle.year {
  border-top: 0.5rem solid #000000;
}

.dialog-triangle.lower {
  border-bottom: 0.5rem solid #ffffff;
}

.dialog-triangle.upper {
  border-top: 0.5rem solid #ffffff;
}

.container-year,
.container-card.upper {
  transform: translateY(-54%);
}

.container-card.lower {
  transform: translateY(54%);
}
</style>
