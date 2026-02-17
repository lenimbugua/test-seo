<template>
  <div class="flex space-x-0.5">
    <RollingDigit v-for="(d, i) in digits" :key="i" :digit="parseInt(d)" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import RollingDigit from "./RollingDigit.vue";

const props = defineProps({
  value: { type: Number, required: true },
});

// Break into string digits
const digits = computed(() => props.value.toString().split(""));
</script>
