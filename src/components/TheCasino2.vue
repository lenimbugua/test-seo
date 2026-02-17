<script setup>
import { toRefs } from "vue";

import { useGamesStore } from "../stores/games";

import { useCasino } from "../composables/useCasino";
import { useGamesMenus } from "../composables/useGamesMenus";

const { launchCasino } = useCasino();

const { fetchGames } = useGamesStore();

const { pending, games } = toRefs(useGamesStore());

const { popular } = useGamesMenus();

fetchGames(popular);
</script>

<template>
  <CasinoGridLoader v-if="pending" />
  <div
    v-for="gameCategory in games.gameCategories"
    v-else
    :key="gameCategory.id"
  >
    <div class="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 pb-6">
      <div
        v-for="game in gameCategory.Games"
        :key="game.id"
        class="space-y-1 cursor-pointer group transform transition-transform duration-200 hover:scale-105"
        @click="launchCasino(game.game_id, game.game_name)"
      >
        <div class="relative rounded-lg overflow-hidden shadow-md">
          <img
            class="object-contain w-full h-full"
            :src="game.img_full_url"
            :alt="game.game_name"
          />
          <div
            class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-sm p-2 truncate"
          >
            {{ game.game_name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
