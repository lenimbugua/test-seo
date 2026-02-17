<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

const sportName = computed(() => route.params.sport);
</script>
<template>
  <div class="capitalize dark:text-white">{{ sportName }}</div>
</template>
