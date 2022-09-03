<script setup>
import { inject, onBeforeUnmount, onMounted, ref } from "vue";

const menuItems = inject("menuItems").filter((item) => false !== item.show);

let ticking = false;
const handle = () => {
  if (window.scrollY > 0) {
    document.getElementById("menu-pc")?.classList.add("floating");
  } else {
    document.getElementById("menu-pc")?.classList.remove("floating");
  }
  ticking = false;
};
const throttle = () => {
  if (!ticking) {
    window.requestAnimationFrame(handle);
    ticking = true;
  }
};

const showMenu = ref(false);

function toggleMenu() {
  showMenu.value = !showMenu.value;
}

function closeMenu() {
  showMenu.value = false;
}

onMounted(() => {
  window.addEventListener("scroll", throttle, false);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", throttle, false);
});
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

    <div id="menubar-mobile" class="floating">
      <div class="mobile-title">広島大学発達心理学研究室</div>
      <div
        class="button"
        role="button"
        aria-label="メニューを開く"
        tabindex="0"
        @click="toggleMenu"
        @keydown.space="toggleMenu"
        @keydown.enter="toggleMenu"
        @keydown.esc="closeMenu"
      >
        <span class="menu-line start" :class="showMenu ? 'active' : ''"></span>
        <span class="menu-line middle" :class="showMenu ? 'active' : ''"></span>
        <span class="menu-line end" :class="showMenu ? 'active' : ''"></span>
      </div>
    </div>

    <transition name="menu-transition">
      <div id="menu-mobile" class="floating" v-show="showMenu">
        <a
          v-for="(menuItem, index) in menuItems"
          class="mobile-link"
          :href="menuItem.url"
          :key="index"
          >{{ menuItem.name }}</a
        >
      </div>
    </transition>

    <div
      id="mobile-submenu-controller"
      v-show="showMenu"
      @click="closeMenu"
    ></div>
  </div>
</template>

<style scoped>
#menu-pc,
#menubar-mobile {
  z-index: 999;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  transition: box-shadow 0.375s ease-in-out;
  padding: 0.5rem;
  width: 100vw;
}

#menu-pc {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  background: radial-gradient(#ffffffa1, #fff 2px);
  background-size: 4px 4px;
}

#menubar-mobile {
  display: none;
  background-color: #fffffff2;
}

.mobile-title {
  justify-self: flex-start;
  font-weight: 700;
  font-size: 1.2rem;
}

.button {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  height: 1.2rem;
}

.menu-line {
  display: block;
  transition: all 0.375s ease-in-out;
  background-color: #000;
  width: 1.5rem;
  height: 2px;
  user-select: none;
  -webkit-user-select: none;
}

.menu-line.start.active {
  transform: rotate3d(0, 0, 1, 45deg)
    translate3d(
      var(--trigo-param-positive, 10.608px),
      var(--trigo-param-positive, 10.608px),
      0
    )
    scale3d(1.414, 1, 1);
}

.menu-line.middle.active {
  transform: scale3d(0, 0, 0);
  opacity: 0;
}

.menu-line.end.active {
  transform: rotate3d(0, 0, 1, -45deg)
    translate3d(
      var(--trigo-param-positive, 10.608px),
      var(--trigo-param-negative, -10.608px),
      0
    )
    scale3d(1.414, 1, 1);
}

#mobile-submenu-controller {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -2;
  width: 100vw;
  height: 100vh;
}

#menu-mobile {
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: -1;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  background: #ffffffe6;
  padding: 1rem 0;
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

.floating {
  box-shadow: 0 0.1rem 0.25rem 0 #0000000f;
}

.menu-transition-enter-active,
.menu-transition-leave-active {
  transition: all 0.375s ease;
}

.menu-transition-enter-from,
.menu-transition-leave-to {
  transform: translate3d(0, -100%, 0);
  opacity: 0;
}

@media screen and (max-width: 768px) {
  #menu-pc {
    display: none;
  }

  #menubar-mobile {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
  }

  .mobile-link {
    display: block;
    box-sizing: border-box;
    margin: 0;
    padding: 0.5rem 0;
    text-align: center;
    width: 100vw;
    font-weight: 500;
  }
}
</style>
