<script setup>
import { useMatchesStore } from "../stores/matches";
import { storeToRefs } from "pinia";

const { countries } = storeToRefs(useMatchesStore());
</script>
<template>
  <CompetitionsLayout :categories="countries" />
</template>
