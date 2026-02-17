<script setup>
import { useMatchDetails } from "@/composables/useMatchDetails";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useSearchStore } from "../stores/search";

const router = useRouter();

const { goToMatchDetails } = useMatchDetails();

const { matches, pending } = storeToRefs(useSearchStore());
</script>

<template>
  <AnimatePulse v-if="pending" :rows="10" />

  <Lazy v-if="matches" class="dark:border-dark-purple-23">
    <div v-for="match in matches" :key="match.parentMatchId">
      <MatchTwo
        :match="match"
        @click="goToMatchDetails(match, router, match.isLive)"
      />
    </div>
  </Lazy>
  <EmptyState v-if="matches?.length == 0" />
  <AnimatePulse v-if="pending" class="z-[1]" :rows="7" />
</template>
