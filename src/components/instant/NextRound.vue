<script setup>
import { ChevronDoubleRightIcon } from "@heroicons/vue/24/outline";

import { useInstantStore } from "@/stores/instant";
import InstantKickoff from "./InstantKickoff.vue";
import { storeToRefs } from "pinia";

const { fetchInstantMatches, setCompetitionIsLoading } = useInstantStore();
const { hasKickOff } = storeToRefs(useInstantStore());


async function fetchMatches() {
  setCompetitionIsLoading(true);
  const url = `&market_id=Match_Result&skip=1`;
  await fetchInstantMatches(url);
  setCompetitionIsLoading(false);
}
</script>

<template>
  <InstantKickoff v-if="hasKickOff" />
  <div
    v-else
    class="uppercase text-black dark:text-white flex items-center w-full justify-center"
    @click="fetchMatches"
  >
    <div class="w-full flex items-center py-2.5 justify-center bg-[#504B5C]">
      <span class="text-sm font-bold text-white">Next Round</span>
      <ChevronDoubleRightIcon class="text-white w-4 h-4" />
    </div>
  </div>
</template>
