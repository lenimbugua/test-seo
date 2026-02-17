<script setup>
defineProps({
  game: { type: Object, required: true },
  rank: { type: Number, default: 0 },
});

defineEmits(["play"]);
</script>

<template>
  <div
    :class="[
      'group cursor-pointer flex-shrink-0',
      rank
        ? 'w-[120px] sm:w-[180px] md:w-[200px] lg:w-[220px]'
        : 'w-[100px] sm:w-[150px] md:w-[170px] lg:w-[180px]',
    ]"
    @click="$emit('play', game)"
  >
    <div class="relative">
      <!-- Rank number — absolutely positioned, never affects card size -->
      <span
        v-if="rank"
        class="rank-number absolute bottom-0 left-0 z-[2] select-none pointer-events-none leading-[0.8]"
      >
        {{ rank }}
      </span>

      <!-- Card image — fixed left margin creates space for the number -->
      <div
        class="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-200 dark:bg-[#1a1a2e] z-[1]"
        :class="rank ? 'ml-6 sm:ml-9 md:ml-10' : ''"
      >
        <img
          :src="game.imgFullUrl"
          :alt="game.gameName"
          class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        <!-- Hover overlay -->
        <div
          class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
        >
          <div
            class="bg-[#2CB14A] text-white font-bold text-xs px-5 py-2 rounded-full shadow-lg"
          >
            Play
          </div>
        </div>
      </div>
    </div>

    <p
      class="mt-1 text-[10px] sm:text-xs font-medium text-gray-600 dark:text-[#b0b0b0] truncate group-hover:text-gray-900 dark:group-hover:text-white transition-colors"
      :class="rank ? 'ml-6 sm:ml-9 md:ml-10' : ''"
    >
      {{ game.gameName }}
    </p>
  </div>
</template>

<style scoped>
.rank-number {
  font-size: 3.5rem;
  font-weight: 900;
  font-style: italic;
  color: #0d0d1a;
  -webkit-text-stroke: 2px #2cb14a;
  paint-order: stroke fill;
  font-family: "Inter", "Arial Black", sans-serif;
}

@media (min-width: 640px) {
  .rank-number {
    font-size: 5.5rem;
    -webkit-text-stroke: 2.5px #2cb14a;
  }
}

@media (min-width: 768px) {
  .rank-number {
    font-size: 6.5rem;
    -webkit-text-stroke: 3px #2cb14a;
  }
}

[data-theme="light"] .rank-number {
  color: #f3f4f6;
  -webkit-text-stroke: 2px #2cb14a;
}
</style>
