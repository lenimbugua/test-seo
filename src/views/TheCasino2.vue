<script setup>
import TheCrash2 from "@/components/TheCrash2.vue";
import { toRefs } from "vue";

import { useGamesStore } from "../stores/games";

import { useGamesMenus } from "../composables/useGamesMenus";


const { fetchGames } = useGamesStore();

const {  games } = toRefs(useGamesStore());

const { popular } = useGamesMenus();

fetchGames(popular);
</script>
<template>
  <TheDepositBar class="md:hidden" />
  <HeaderLinks />
  <div class="w-full h-full max-w-6xl sm:px-3 mx-auto overflow-scroll">
    <div class="flex w-full px-3 lg:px-0 lg:pt-3">
      
      <div class="w-full">
        <div class="md:hidden w-full overflow-x-scroll py-3">
          <MainCategories />
        </div>
        <!-- <h1
          class="font-bold text-xl flex justify-center w-full text-center sm:text-left text-gray-950 dark:text-white mt-4"
        >
          POPULAR GAMES
        </h1> -->
        <div class="flex w-full justify-center my-2 space-x-3">
          <CasinoTabs />
        </div>
        <div class="pb-4">
          <TheCrash2 :games="games" />
        </div>
      </div>
    </div>
  </div>
  <MobileFooter />
  <Footer />
</template>
