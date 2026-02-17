<script setup>
// import { StarIcon } from "@heroicons/vue/24/outline";
import { storeToRefs } from "pinia";
// import { useRouter } from "vue-router";
import { usePopular } from "../composables/usePopular";
import { useCasinoStore } from "../stores/casino";
import { usePopularStore } from "../stores/popular";

import { useCasino } from "../composables/useCasino";

const { launchCasino } = useCasino();

// const router = useRouter();

const { allGames } = usePopular();
const { reset } = usePopularStore();

reset();

const { categoryIsPending } = storeToRefs(useCasinoStore());

// const { setLaunchGameId } = useCasinoStore();

// async function goToCasinoGames(game) {
//   if (game.gameName == "Haki League") {
//     await router.push({ name: "haki-league" });
//     return;
//   }
//   if (game.gameName == "Haki Turbo") {
//     await router.push({ name: "haki-turbo" });
//     return;
//   }
//   if (game.gameName == "Haki Jackpot") {
//     await router.push({ name: "haki-virtual-jackpot" });
//     return;
//   }
//   setLaunchGameId(game.id);
//   router.push({ name: "games", params: { name: game.gameName } });
// }
</script>

<template>
  <CasinoGridLoader v-if="categoryIsPending" />
  <div v-else class="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 pb-6">
    <div
      v-for="game in allGames"
      :key="game.id"
      class="space-y-1 cursor-pointer"
      @click="launchCasino(game.id, game.gameName, game.routeName)"
    >
      <div class="relative aspect-[3/2] rounded-lg overflow-clip">
        <img
          class="top-0 right-0 left-0 bottom-0 object-cover h-full w-full"
          :src="`${game.imgFullUrl}`"
        />
        <!-- <div class="absolute top-0 left-0  text-2xl text-white font-black">{{ game.gameName }}</div> -->
      </div>
      <div
        class="flex justify-between text-xs whitespace-nowrap items-center text-gray-700 dark:text-gray-200"
      >
        <p
          class="font-bold text-gray-950 dark:text-gray-400 text-ellipsis overflow-hidden"
        >
          {{ game.gameName }}
        </p>
        <!-- <StarIcon class="w-4 h-4" /> -->
      </div>
    </div>
  </div>
  <!-- <EmptyState v-if="searchByName.length == 0" class="max-w-md mx-auto" /> -->
</template>
