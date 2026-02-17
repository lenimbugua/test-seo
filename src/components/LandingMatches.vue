<script setup>
import { useMatchesStore } from "../stores/matches";
import DesktopEventCard from "./DesktopEventCard.vue";

const { fetchLandingMatches } = useMatchesStore();

fetchLandingMatches();
</script>
<template>
  <DesktopEventCard />
</template>
