<script setup>
import { useLeaderboardStore } from "@/stores/leaderboard";
import formatStuff from "@/utilities/format-stuff";
import { toRefs } from "vue";
const { formattedNumber } = formatStuff();

const getPositionStyles = (position) => {
  const styles = {
    1: "bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 hover:from-yellow-100 hover:to-amber-100 dark:hover:from-yellow-900/30 dark:hover:to-amber-900/30",
    2: "bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-800/20 dark:to-slate-800/20 hover:from-gray-100 hover:to-slate-100 dark:hover:from-gray-800/30 dark:hover:to-slate-800/30",
    3: "bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 hover:from-orange-100 hover:to-amber-100 dark:hover:from-orange-900/30 dark:hover:to-orange-900/30",
  };

  // 1. Check if it's a top-3 position
  if (styles[position]) {
    return styles[position];
  }

  // 2. Handle all other positions (even vs odd)
  // position % 2 === 0 returns true for even numbers
  return position % 2 === 0
    ? "bg-white dark:bg-[#2E283E]"
    : "bg-gray-100 dark:bg-[#221C31]";
};

const getPositionStylesBadge = (position) => {
  const styles = {
    1: "bg-gradient-to-br from-yellow-400 to-yellow-600",
    2: "bg-gradient-to-br from-gray-300 to-gray-500",
    3: "bg-gradient-to-br from-orange-400 to-amber-600",
  };

  // Return the style for the position, or a default style if position > 3
  return styles[position] || "";
};

const { leaderboard } = toRefs(useLeaderboardStore());
</script>
<template>
  <table v-if="leaderboard && leaderboard.length" class="w-full">
    <thead>
      <tr
        class="bg-gray-50 dark:bg-dark-purple-18 border-b border-gray-200 dark:border-dark-purple-17"
      >
        <th
          class="px-2 py-1 sm:py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider"
        >
          Rank
        </th>
        <th
          class="px-2 py-1 sm:py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider"
        >
          Player
        </th>
        <th
          class="px-2 py-1 sm:py-2 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider"
        >
          Points
        </th>
        <th
          class="px-2 py-1 sm:py-2 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider"
        >
          Prize
        </th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200 dark:divide-dark-purple-17">
      <tr
        v-for="player in leaderboard"
        :key="player.msisdn"
        :class="[
          'duration-300', // Common styles
          getPositionStyles(player.position), // Conditional styles
        ]"
        class="transition-colors"
      >
        <td class="px-2 py-1 sm:py-2 whitespace-nowrap">
          <div class="flex items-center space-x-2">
            <div
              :class="[
                'duration-300', // Common styles
                getPositionStylesBadge(player.position), // Conditional styles
              ]"
              class="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-gray-950 dark:text-slate-200 font-bold shadow-md"
            >
              {{ player.position }}
            </div>
            <svg
              v-if="player?.position == 1"
              class="w-5 h-5 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg>
            <svg
              v-if="player?.position == 2"
              class="w-5 h-5 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg>
            <svg
              v-if="player?.position == 3"
              class="w-5 h-5 text-orange-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg>
          </div>
        </td>
        <td class="px-2 py-1 sm:py-2 whitespace-nowrap">
          <div class="text-xs font-medium text-gray-900 dark:text-slate-400">
            {{ player?.msisdn }}
          </div>
        </td>
        <td class="px-2 py-1 sm:py-2 whitespace-nowrap flex flex-col items-end">
          <div
            class="text-xs flex items-center space-x-1 font-bold text-green-600 dark:text-green-400"
          >
            <span>{{ player?.points }}</span>
            <!-- <span class="text-xs text-gray-600 dark:text-slate-400"> Points</span> -->
          </div>
          <!-- <div class="text-xs font-bold text-amber-500 dark:text-yellow-400">
            {{ player?.prizeAmount }} <span class="text-xs text-gray-600 dark:text-slate-400"> KES</span>
          </div> -->
        </td>
        <td class="px-2 py-1 sm:py-2 whitespace-nowrap text-right">
          <div
            v-if="player?.prizeAmount"
            class="text-xs font-bold text-amber-600 dark:text-amber-400"
          >
            {{ formattedNumber(player?.prizeAmount) }}
          </div>
          <div
            v-else
            class="text-sm font-bold text-gray-600 dark:text-slate-400"
          >
           -
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
