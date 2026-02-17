<script setup>
import { useInstantStore } from "@/stores/instant";
import { storeToRefs } from "pinia";
const { selectedCompetition } = storeToRefs(useInstantStore());
</script>
<template>
  <div class="w-full flex justify-center py-1.5 items-center">
    <h3 class="font-semibold text-gray-800 dark:text-gray-300 capitalize">
      {{ selectedCompetition.name }}
    </h3>
  </div>
</template>
