<script setup>
defineProps({
  totalOdds: {
    type: Number,
    default: 0,
  },
});
</script>
<template>
  <div class="flex space-x-1 items-center justify-between">
    <div
      :class="['text-[#56CB05]']"
      class="font-bold dark:font-light text-xs"
    >
      Odds
    </div>
    <div
      :class="['dark:text-gray-400 text-gray-800']"
      class="text-sm font-bold"
    >
      {{ totalOdds }}
    </div>
  </div>
</template>
