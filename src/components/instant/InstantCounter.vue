<script setup>
import { useInstantStore } from "@/stores/instant";
import { useModalStore } from "@/stores/modal";
import { useModalTypes } from "@/composables/useModalTypes";
import { storeToRefs } from "pinia";
import { onBeforeUnmount, onMounted } from "vue";
const { openModal } = useModalStore();

const { instantBetWonModal } = useModalTypes();

const { count, endedTime, resetCountTime, halfTime, timeToShowWonModal, won } =
  storeToRefs(useInstantStore());
const { increaseCount, resetLiveData } = useInstantStore();

let intervalId = null;

const startCountdown = () => {
  if (intervalId) {
    clearInterval(intervalId);
  }

  intervalId = setInterval(() => {
    increaseCount();

    if (count.value >= timeToShowWonModal.value && won.value > 0) {
      openModal(instantBetWonModal);
    }

    if (count.value >= resetCountTime.value) {
      clearInterval(intervalId);
      resetLiveData();
    }
  }, 300);
};

onMounted(() => {
  startCountdown();
});

onBeforeUnmount(() => {
  resetLiveData();
  clearInterval(intervalId);
});
</script>
<template>
  <div class="pb-2 border-b border-gray-300 dark:border-dark-purple-19">
    <div
      class="text-[#D01D23] text-5xl italic w-10 flex justify-center mx-auto"
    >
      <span v-if="count <= endedTime">{{ count }}</span>
      <span v-else>Ended</span>
    </div>
    <div
      v-if="count <= endedTime"
      class="w-full flex justify-center text-xs text-gray-800 dark:text-gray-400"
    >
      <div v-if="count <= halfTime">First Half</div>
      <div v-else-if="count == halfTime">Half Time</div>
      <div v-else>Second Half</div>
    </div>
  </div>
</template>
