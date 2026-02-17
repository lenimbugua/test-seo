<script setup>
import { useSecondaryNavGames } from "@/composables/useSecondaryNavGames";
import {
  RocketLaunchIcon,
  TrophyIcon,
  PuzzlePieceIcon,
  BoltIcon,
  FireIcon,
  StarIcon,
  PlayIcon,
} from "@heroicons/vue/24/outline";
import { useRouter } from "vue-router";

const router = useRouter();
const { games, launchGame } = useSecondaryNavGames();

const iconMap = {
  "crash-games": RocketLaunchIcon,
  "virtuals-games": TrophyIcon,
  casino: PuzzlePieceIcon,
};
const iconCycle = [FireIcon, BoltIcon, StarIcon, RocketLaunchIcon, TrophyIcon, PuzzlePieceIcon];

function getIcon(game, index) {
  if (iconMap[game.routeName]) return iconMap[game.routeName];
  return iconCycle[index % iconCycle.length];
}
</script>

<template>
  <div class="w-[16rem] my-4 z-[1]">
    <!-- Header -->
    <div class="flex items-center gap-1.5 px-3 py-2 rounded-t-lg bg-gray-100 dark:bg-[#1b1627] border border-b-0 border-gray-200 dark:border-white/5">
      <span class="text-sm">🔥</span>
      <span class="text-sm font-semibold text-gray-800 dark:text-slate-100">Top Games</span>
    </div>

    <!-- Game list -->
    <div class="bg-white dark:bg-[#221C31] rounded-b-lg border border-gray-200 dark:border-white/5 divide-y divide-gray-100 dark:divide-white/5">
      <button
        v-for="(game, index) in games"
        :key="game.gameName"
        class="side-game-item w-full flex items-center gap-2.5 px-3 py-2.5 transition-all duration-200 group last:rounded-b-lg"
        @click="launchGame(router, game)"
      >
        <div class="flex items-center justify-center w-7 h-7 rounded-md bg-[#2CB14A]/10 dark:bg-[#2CB14A]/15 group-hover:bg-[#2CB14A]/20 transition-colors flex-shrink-0">
          <component
            :is="getIcon(game, index)"
            class="w-4 h-4 text-[#2CB14A]"
          />
        </div>
        <span class="flex-1 text-left text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors truncate capitalize">
          {{ game.gameName }}
        </span>
        <PlayIcon class="w-3.5 h-3.5 text-gray-300 dark:text-gray-600 group-hover:text-[#2CB14A] transition-colors flex-shrink-0" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.side-game-item:hover {
  background-color: rgba(44, 177, 74, 0.04);
}

:is(.dark) .side-game-item:hover {
  background-color: rgba(44, 177, 74, 0.06);
}
</style>
