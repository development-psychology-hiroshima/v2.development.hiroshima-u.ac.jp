<script setup>
import { h, inject } from "vue";

const members = inject("members")
  .filter((member) => member.image && member.name)
  .map((member) => {
    return {
      name: member.name,
      position: member.position || "",
      image: member.image,
    };
  });

const cyrb53 = inject("hashingFunction");

const membersPerRow = (members.length / 3) | 0;
const memberFirstRow = members.splice(0, membersPerRow);
const memberSecondRow = members.splice(0, membersPerRow);

function normalizeName(name, replacementString = " ") {
  return name.replace(/\s+/g, replacementString);
}

function getMemberNameHashId(name) {
  return "member-" + cyrb53(normalizeName(name, ""));
}

function repeatArray(array, times) {
  return Array(times).fill(array).flat();
}

function render(memberArray) {
  return h(
    "div",
    {
      class: "homepage-member-row",
    },
    repeatArray(
      [
        h(
          "div",
          {
            class: "homepage-member-row__member",
          },
          memberArray.map((member) => {
            return h(
              "a",
              {
                class: "homepage-member-showcase",
                href: `members.html#${getMemberNameHashId(member.name)}`,
                target: "_blank",
              },
              [
                h("img", {
                  class: "homepage-member-image",
                  src: member.image,
                  alt: member.name,
                }),
                h(
                  "div",
                  {
                    class: "homepage-member-info",
                  },
                  [
                    h(
                      "p",
                      {
                        class: "homepage-member-name",
                      },
                      normalizeName(member.name)
                    ),
                    h(
                      "p",
                      {
                        class: "homepage-member-position",
                      },
                      member.position
                    ),
                  ]
                ),
              ]
            );
          })
        ),
      ],
      memberArray.length <= 4 ? 3 : 2
    )
  );
}

const root = h(
  "div",
  {
    class: "member-showbox-wrapper",
  },
  [
    render(memberFirstRow),
    render(memberSecondRow),
    [] !== members ? render(members) : undefined,
  ]
);
</script>

<template>
  <root />
</template>

<style>
.homepage-member-row {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 1rem;
}
.homepage-member-row__member {
  display: flex;
  animation: 60s float linear infinite;
}

.homepage-member-row:hover > * {
  animation-play-state: paused;
}

.homepage-member-row:nth-child(2) > div {
  animation-duration: 70s;
  animation-delay: 2s;
}

@keyframes float {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-100%, 0, 0);
  }
}

.homepage-member-showcase {
  display: flex;
  align-items: center;
  transition: all 0.375s ease-in-out;
  margin-left: 1rem;
  box-shadow: 2px 2px 0.5rem 0 rgba(0, 0, 0, 0.1);
  background-color: var(--color-background-lighter);
  min-width: 20rem;
  color: var(--color-text);
  font-weight: 700;
  font-family: "Noto Serif JP", -apple-system, BlinkMacSystemFont, system-ui,
    serif;
  text-decoration: none;
}

.homepage-member-showcase:hover {
  box-shadow: 2px 2px 0.5rem 0 rgba(0, 0, 0, 0.2);
}

.homepage-member-image {
  width: 5rem;
  height: 5rem;
  object-fit: cover;
}

.homepage-member-name,
.homepage-member-info {
  white-space: nowrap;
}

.homepage-member-name {
  padding-left: 1rem;
  font-size: 1.2rem;
}

.homepage-member-position {
  padding-left: 1rem;
  color: var(--color-gray);
  font-weight: 400;
  font-size: 1rem;
  font-family: "Noto Sans JP", -apple-system, BlinkMacSystemFont, system-ui,
    sans-serif;
}

@media screen and (max-width: 768px) {
  .homepage-member-showcase {
    padding-right: 1rem;
    min-width: 15rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .homepage-member-row__member {
    animation: none;
  }

  #container-members {
    overflow-x: scroll !important;
  }

  .homepage-member-row__member:not(:first-child) {
    display: none;
  }

  .homepage-member-row:nth-child(2) {
    margin-left: 0;
  }
}
</style>
