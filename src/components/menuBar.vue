<script setup>
import { inject } from "vue";

const menuItems = inject("menuItems").filter((item) => false !== item.show);
</script>

<template>
  <div style="display: contents">
    <div id="menu-pc">
      <a
        v-for="(menuItem, index) in menuItems"
        :href="menuItem.url"
        :key="index"
        >{{ menuItem.name }}</a
      >
    </div>
  </div>
</template>

<style scoped>
#menu-pc {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
}

a {
  transition: all 0.175s ease-in-out;
  margin: 0 0.5rem;
  padding: 0.2rem 0.5rem;
  color: #000;
  font-weight: bold;
  font-size: 1.25rem;
  text-decoration: none;
  text-shadow: 0 0 0.25rem #fff;
}

a:hover {
  background-color: #000;
  color: #fff;
  text-shadow: none;
}
</style>
