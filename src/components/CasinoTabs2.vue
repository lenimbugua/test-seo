<script setup>
import { ref } from "vue";

import { useGamesStore } from "../stores/games";

import { useGamesMenus } from "../composables/useGamesMenus";

const { fetchGames } = useGamesStore();

const {popular, crash, virtuals, spins,  } = useGamesMenus();

const tabs = ref([

  {
    name: popular,
    icon: "all",
  },
  {
    name: crash,
    icon: "crash",
  },
  {
    name: virtuals,
    icon: "virtuals",
  },
  {
    name: spins,
    icon: "spins",
  },
]);

fetchGames(popular);
</script>
<template>
  <div
    class="scrollbar-hide items-end flex justify-between space-x-3 lg:space-x-4 whitespace-nowrap no-scrollbar overflow-x-scroll"
  >
    <div
      v-for="category in tabs"
      :key="category.name"
      class="text-center text-slate-500 hover:text-muted-foreground cursor-pointer py-2"
      @click="fetchGames(category.name)"
    >
      <div
        class="flex-col justify-center items-center inline-flex"
        data-state="closed"
      >
        <div
          class="w-10 h-10 p-1.5 dark:bg-white/10 bg-black/10 flex justify-center items-center rounded-lg shadow"
        >
          <CasinoIcons
            :icon-css="'text-gray-700 dark:text-[#36C31F] h-6 w-6'"
            :icon="category.icon"
          />
        </div>
        <div class="text-xs font-medium mt-1 text-slate-3400">
          {{ category.name }}
        </div>
      </div>
    </div>
  </div>
</template>
