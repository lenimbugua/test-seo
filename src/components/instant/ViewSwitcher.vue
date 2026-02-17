<script setup>
import { useInstantStore } from "@/stores/instant";
import { storeToRefs } from "pinia";

const { competitionIsLoading, viewToDisplay } = storeToRefs(useInstantStore());
</script>
<template>
  <div v-if="viewToDisplay === 'instantHome'">
    <InstantMarketSection v-if="!competitionIsLoading" />
    <MatchesHeader v-if="!competitionIsLoading" />
    <TheMatches />
    <InstantFooter class="fixed bottom-0 sm:bottom-0 max-w-5xl" />
  </div>
  <InstantLive v-else />
</template>
