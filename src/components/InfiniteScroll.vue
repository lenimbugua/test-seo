<script setup>
import { storeToRefs } from "pinia";
import { useMatches2Store } from "../stores/matches2";
import { useSportsQueryParamsStore } from "../stores/sports-query-params";
import LeagueMatchCard from "./LeagueMatchCard.vue";

const { matches, pending } = storeToRefs(useMatches2Store());
const { page, layout } = storeToRefs(useSportsQueryParamsStore());
</script>

<template>
  <LeagueMatchCard v-if="layout == 'grid'" />
  <div v-else>
    <EmptyState v-if="matches?.length == 0 && !pending" />
    <AnimatePulse v-if="pending && page == 0" :rows="10" />
    <div v-else class="dark:border-dark-purple-23">
      <div v-for="match in matches" :key="match.parentMatchId">
        <MatchTwo :match="match" />
      </div>
    </div>
    <AnimatePulse v-if="pending" class="z-[1]" :rows="7" />
  </div>
</template>
