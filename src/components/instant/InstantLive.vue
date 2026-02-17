<script setup>
import { useInstantStore } from "@/stores/instant";
import InstantCounter from "./InstantCounter.vue";
import InstantLeagueTitle from "./InstantLeagueTitle.vue";
import MySelections from "./MySelections.vue";
import SkipToResults from "./SkipToResults.vue";

import { storeToRefs } from "pinia";

const { pending } = storeToRefs(useInstantStore());
</script>

<template>
  <AnimatePulse v-if="pending" :rows="10" />

  <div
    v-else
    class="max-w-5xl mx-auto shadow border dark:border-dark-purple-18 rounded-md scrollbar-hide"
  >
    <InstantLeagueTitle />
    <div class="w-full">
      <InstantCounter />
    </div>
    <MySelections />
    <InstantLive1 />
    <SkipToResults />
  </div>
</template>
