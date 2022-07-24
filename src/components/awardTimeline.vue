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
    <div v-for="(awardsByYear, index) in awards" :key="index">
      {{awardsByYear.year}}
    </div>
  </div>
</template>

<style scoped></style>
