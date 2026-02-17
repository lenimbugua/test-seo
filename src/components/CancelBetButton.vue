<script setup>
import { useModalTypes } from "@/composables/useModalTypes";
import { useModalStore } from "@/stores/modal";
import { onUnmounted, ref } from "vue";
import { useBetsStore } from "../stores/bets";

const props = defineProps({
  betId: {
    type: Number,
    required: true,
  },
  betPlaceDate: {
    type: String,
    required: true,
  },
});

const { setSelectedBet } = useBetsStore();

const { confirm } = useModalTypes();

const { openModal } = useModalStore();

const showCancelButton = ref(false);

function openConfirmModal(betId) {
  openModal(confirm);
  setSelectedBet(betId);
}

function isPastFiveMinutes() {
  // Parse the input date string (format: DD/MM/YY HH:mm)
  const [day, month, year, hours, minutes] = props.betPlaceDate
    .match(/\d+/g)
    .map(Number);

  // Construct the date object (Note: Year 25 means 2025)
  const inputDate = new Date(2000 + year, month - 1, day, hours, minutes);

  // Get current time and subtract 5 minutes
  const fiveMinutesAgo = new Date();
  fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5);

  // Compare the input date with the adjusted current time
  return inputDate < fiveMinutesAgo;
}

const countDown = ref("00:00");

let countdownInterval = null;

function startCountdown() {
  if (isPastFiveMinutes()) return;
  const [datePart, timePart] = props.betPlaceDate.split(" ");
  const [day, month, year] = datePart.split("/");
  const [hours, minutes] = timePart.split(":");

  // Create a Date object with the input date and time
  const targetDate = new Date(
    `20${year}-${month}-${day}T${hours}:${minutes}:00`
  );

  // Add 5 minutes to the target date
  targetDate.setMinutes(targetDate.getMinutes() + 5);

  // Update the countdown every second
  countdownInterval = setInterval(() => {
    const now = new Date();
    const timeDifference = targetDate - now;

    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      showCancelButton.value = false;
      countDown.value = "00:00";
      return;
    }

    showCancelButton.value = true;

    const minutes = Math.floor(timeDifference / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    countDown.value = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }, 1000);
}
// Example usage
startCountdown();

onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
});
</script>
<template>
  <button
    v-if="showCancelButton"
    class="bg-red-500/25 text-red-600 dark:text-red-600/70 font-semibold py-1 px-3 rounded-md flex space-x-2"
    @click="openConfirmModal(betId)"
  >
    <span class="text-red-600">Cancel</span>
    <span class="text-gray-700 dark:text-slate-300">{{ countDown }}</span>
  </button>
</template>
