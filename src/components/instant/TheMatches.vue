<script setup>
import { storeToRefs } from "pinia";
import { useInstantStore } from "@/stores/instant";

const store = useInstantStore();
const {
  outcomesCount,
  //   timelineIsLoading,
  //   competitionIsLoading,
  //   marketFilterIsLoading,
} = storeToRefs(store);

// const showLoader = () => {
//   return (
//     competitionIsLoading.value ||
//     timelineIsLoading.value ||
//     marketFilterIsLoading.value
//   );
// };
</script>

<template>
  <!-- <div v-if="showLoader()" class="">
    <AnimatePulse />
  </div> -->
  <div class="w-md">
    <ThreeOrLessOutcomes v-if="outcomesCount <= 3" />
    <MoreThanThreeOutcomes v-if="outcomesCount > 3" />
  </div>
</template>
