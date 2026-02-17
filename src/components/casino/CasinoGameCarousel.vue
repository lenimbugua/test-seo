<script setup>
import { ref } from "vue";
import CasinoGameCard from "./CasinoGameCard.vue";

defineProps({
  title: { type: String, required: true },
  games: { type: Array, required: true },
  icon: { type: String, default: "" },
  showRank: { type: Boolean, default: false },
});

defineEmits(["play", "see-all"]);

const scrollContainer = ref(null);

function scrollLeft() {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: -600, behavior: "smooth" });
  }
}

function scrollRight() {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: 600, behavior: "smooth" });
  }
}
</script>

<template>
  <section v-if="games.length > 0" class="mb-3 sm:mb-6">
    <!-- Section header -->
    <div class="flex items-center justify-between mb-2 sm:mb-3 px-1">
      <div class="flex items-center space-x-1.5 sm:space-x-2">
        <span v-if="icon" class="text-sm sm:text-lg">{{ icon }}</span>
        <h2 class="text-gray-900 dark:text-white text-sm sm:text-base font-bold">{{ title }}</h2>
        <span class="text-gray-400 dark:text-[#555] text-xs">({{ games.length }})</span>
      </div>
      <div class="flex items-center space-x-2">
        <!-- Scroll arrows -->
        <button
          class="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-[#1e1e3a] hover:bg-gray-200 dark:hover:bg-[#2a2a4a] text-gray-500 dark:text-[#888] hover:text-gray-900 dark:hover:text-white transition-colors"
          @click="scrollLeft"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="w-4 h-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button
          class="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-[#1e1e3a] hover:bg-gray-200 dark:hover:bg-[#2a2a4a] text-gray-500 dark:text-[#888] hover:text-gray-900 dark:hover:text-white transition-colors"
          @click="scrollRight"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="w-4 h-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
        <!-- See All -->
        <button
          class="text-[#2CB14A] hover:text-[#36d154] text-sm font-semibold transition-colors whitespace-nowrap ml-2"
          @click="$emit('see-all')"
        >
          See All
        </button>
      </div>
    </div>

    <!-- Horizontal scroll row -->
    <div
      ref="scrollContainer"
      class="flex space-x-2 sm:space-x-3 overflow-x-auto scrollbar-hide pb-1 sm:pb-2 scroll-smooth"
    >
      <CasinoGameCard
        v-for="(game, index) in games"
        :key="game.id"
        :game="game"
        :rank="showRank && index < 10 ? index + 1 : 0"
        @play="$emit('play', $event)"
      />
    </div>
  </section>
</template>
