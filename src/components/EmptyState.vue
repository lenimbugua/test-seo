<script setup lang="ts">
import MoreOptions from "./MoreOptions.vue";
</script>

<template>
  <div class="w-full py-10 flex flex-col items-center flex-wrap justify-center">
    <div
      class="h-40 w-40 pt-8 flex justify-center items-center rounded-full"
    >
      <div class="noData"></div>

      <!-- <img src="/nodata.png" alt="empty-state" /> -->
    </div>
    <div>
      <h2
        class="text-center text-black text-xl font-semibold leading-loose pb-2 dark:text-slate-200"
      >
        No Data
      </h2>
      <p
        class="text-center text-black text-base font-normal leading-relaxed pb-4 dark:text-slate-400"
      >
        - There’s no data here - <br />Choose more options below
      </p>
    </div>
  </div>
  <div class="flex justify-center items-center">
    <MoreOptions />
  </div>
</template>
