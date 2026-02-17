<script setup>
import { toRefs } from "vue";

import { useBetBuilderStore } from "../stores/betbuilder";
const { hub: hubs } = toRefs(useBetBuilderStore());
const { fetchJengaHub } = useBetBuilderStore();
fetchJengaHub();
</script>
<template>
  <div class="z-50">
    <!-- <div class="font-bold text-sm dark:text-slate-300 pb-1.5">Bet Builder</div> -->
    <div class="flex items-center w-full overflow-scroll scrollbar-hide">
      <div class="flex w-full overflow-scroll scrollbar-hide gap-2">
        <div
          v-for="hub in hubs"
          :key="`${hub.parentMatchId}${hub.oddValue}${hub.startTime}`"
          class="w-full"
        >
          <BetBuilderCompetition :hub />
        </div>
      </div>
    </div>
  </div>
</template>
