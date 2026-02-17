<script setup>
import { useLiveMatchesStore } from "../stores/live-matches";
import { storeToRefs } from "pinia";

const { matches, pending } = storeToRefs(useLiveMatchesStore());
</script>

<template>
  <AnimatePulse v-if="pending" :rows="8" />

  <Lazy v-else class="dark:border-dark-purple-23">
    <div v-for="match in matches" :key="match.parentMatchId">
      <LiveMatchTwo :match="match" />
    </div>
  </Lazy>
  <!-- <AnimatePulse v-if="pending" class="z-[1]" :rows="8" /> -->
</template>
