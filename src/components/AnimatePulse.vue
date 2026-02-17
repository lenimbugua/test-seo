<script setup>
defineProps({
  rows: {
    type: Number,
    required: true,
  },
});
</script>
<template>
  <div class="shadow bg-pattern p-2 w-full bg-gray-100 dark:bg-dark-purple-22">
    <div
      v-for="i in rows"
      :key="i"
      class="animate-pulse flex w-full justify-between mb-2"
    >
      <div class="flex space-x-2">
        <div class="block">
          <div
            class="bg-gray-400 dark:bg-dark-purple-5/30 border-gray-400 dark:border-dark-purple-500/20 h-3 w-3 mb-3"
          ></div>
          <div
            class="bg-gray-400 dark:bg-dark-purple-5/30 border-gray-400 dark:border-dark-purple-500/20 h-3 w-3"
          ></div>
        </div>
        <div class="block">
          <div
            class="bg-gray-400 dark:bg-dark-purple-5/30 border-gray-400 dark:border-dark-purple-500/20 h-3 w-16 mb-3"
          ></div>
          <div
            class="bg-gray-400 dark:bg-dark-purple-5/30 border-gray-400 dark:border-dark-purple-500/20 h-3 w-24"
          ></div>
        </div>
      </div>
      <div class="grid grid-cols-3 gap-1">
        <div
          class="h-12 w-16 bg-gray-400 dark:bg-dark-purple-5/30 border-gray-400 dark:border-dark-purple-500/20 rounded"
        ></div>
        <div
          class="h-12 w-16 bg-gray-400 dark:bg-dark-purple-5/20 border-gray-400 dark:border-dark-purple-500/20 rounded"
        ></div>
        <div
          class="h-12 w-16 bg-gray-400 dark:bg-dark-purple-5/20 border-gray-400 dark:border-dark-purple-500/20 rounded"
        ></div>
      </div>
    </div>
  </div>
</template>
