<script setup>
import { useInstantStore } from "@/stores/instant";
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";

const { count } = storeToRefs(useInstantStore());

const scores = ref([]);

const props = defineProps({
  scoreTimes: {
    type: String,
    required: true,
  },
});

function splitScores() {
  return props.scoreTimes.split(",").filter((word) => word !== "");
}
const filterLessThanOrEqual = (newCount) => {
  return splitScores().filter((item) => item <= newCount);
};

watch(count, ({ newCount }) => {
  scores.value = filterLessThanOrEqual(newCount);
});
</script>

<template>
  <div class="flex items-center space-x-1.5">
    <div
      v-for="(score, index) in scores"
      :key="`${score}${index}`"
      class="text-xs"
    >
      {{ score }}'
    </div>
  </div>
</template>
