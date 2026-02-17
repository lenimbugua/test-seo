<script setup>
import { ref } from "vue";
const menuItems = ref([
  {
    name: "Aviator",
    img: "aviator.svg",
    bgColor: "bg-[#009260]",
    routeName: "home",
  },
  {
    name: "JetX",
    img: "jet-x.svg",
    bgColor: "bg-[#DC2027]",
    routeName: "",
  },

  {
    name: "Crash Royale",
    img: "crash-royale.svg",
    bgColor: "bg-[#060102]",
    routeName: "casino",
  },
  {
    name: "Laki League",
    img: "league.svg",
    bgColor: "bg-[#F1BB47]",
    routeName: "instant",
  },
  {
    name: "Sports Quiz",
    img: "sports-quiz.svg",
    bgColor: "bg-[#98CC99]",
    routeName: "",
  },
  {
    name: "Spin2Win",
    img: "spin2win.svg",
    bgColor: "bg-[#01B7BD]",
    routeName: "",
  },
  {
    name: "Rocket Man",
    img: "rocketman.svg",
    bgColor: "bg-[#000000]",
    routeName: "",
  },
]);
const imageBasePath = "/popular-icons/";
function getFullImagePath(img) {
  return new URL(`${imageBasePath}${img}`, import.meta.url).href;
}
</script>
<template>
  <div
    class="flex w-full space-x-1.5 h-full justify-between overflow-x-scroll scrollbar-hide"
  >
    <RouterLink
      v-for="item in menuItems"
      :key="item.routeName"
      class="flex w-full"
      :to="{ name: item.routeName }"
    >
      <div class="block">
        <div
          class="flex h-16 w-16 sm:h-24 sm:w-24 relative items-center justify-center rounded-md shadow overflow-clip"
        >
          <img
            class="h-full w-full aspect-square"
            :src="getFullImagePath(item.img)"
          />
        </div>
        <div
          :class="['text-gray-800 dark:text-gray-100']"
          class="text-xs flex items-center justify-center font-semibold mt-1 whitespace-nowrap"
        >
          {{ item.name }}
        </div>
      </div>
    </RouterLink>
  </div>
</template>
