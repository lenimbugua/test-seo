<script setup>
import { useModalTypes } from "@/composables/useModalTypes";
// import { ArrowUturnLeftIcon } from "@heroicons/vue/20/solid";
import { useModalStore } from "@/stores/modal";
import { storeToRefs } from "pinia";
import { computed, onBeforeUnmount, ref } from "vue";
import { useCashoutStore } from "../stores/cashout.js";
import TheButtonSpin from "./TheButtonSpin.vue";

const props = defineProps({
  betId: {
    type: Number,
    required: true,
  },

  bet: {
    type: Object,
    required: true,
  },
});

const cashoutData = computed(() =>
  useCashoutStore().cashoutData(props.bet.betId)
);

const { setSelectedCashout } = useCashoutStore();

// import { useBetsStore } from "../stores/bets";

const { openModal } = useModalStore();

const { cashout } = useModalTypes();

const { getCashoutValue, setBetId } = useCashoutStore();
const { pending, responseOK } = storeToRefs(useCashoutStore());

const autoCashoutPending = ref(false);
const instantCashoutPending = ref(false);

async function handleCashout(cashoutType) {
  setSelectedCashout(cashoutType);
  if (cashoutType === "auto") {
    autoCashoutPending.value = true;
  } else if (cashoutType === "instant") {
    instantCashoutPending.value = true;
  }
  await getCashoutValue(props.bet.betId);
  autoCashoutPending.value = false;
  instantCashoutPending.value = false;
  if (responseOK.value) {
    setBetId(props.bet.betId);
    openModal(cashout);
    return;
  }
}

let countdownInterval = null;

function startCountdown() {
  // Update the countdown every second
  countdownInterval = setInterval(() => {
    getCashoutValue(props.bet.betId, false);
  }, 30000);
}
startCountdown();

onBeforeUnmount(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
});

getCashoutValue(props.bet.betId, false);
</script>
<template>
  <div v-if="pending" class="flex justify-between">
    <div class="flex gap-0.5">
      <div
        class="h-7 w-20 bg-gray-200 dark:bg-[#504B5C] rounded-full animate-pulse"
      ></div>
      <div
        class="h-7 w-20 bg-gray-200 dark:bg-[#504B5C] rounded-full animate-pulse"
      ></div>
    </div>
    <div class="flex gap-0.5">
      <div
        class="h-7 w-20 bg-gray-200 dark:bg-[#504B5C] rounded-full animate-pulse"
      ></div>
      <div
        class="h-7 w-20 bg-gray-200 dark:bg-[#504B5C] rounded-full animate-pulse"
      ></div>
    </div>
  </div>
  <div v-else class="flex w-full justify-between">
    <div
      class="flex rounded-md overflow-clip text-gray-700 dark:text-slate-200 text-sm bg-gray-200 dark:bg-[#393444] items-center gap-0.5"
    >
      <div
        v-if="cashoutData?.cashOutAllowed"
        class="flex items-center divide-x divide-gray-950"
      >
        <div class="px-2">Cashout</div>
        <div class="px-2 font-bold text-[#FFB002]">
          KES {{ cashoutData?.cashOutValue }}
        </div>
      </div>
      <div v-else class="flex items-center">
        <div class="px-2 font-bold text-red-500">Cashout Unavailable</div>
      </div>
    </div>

    <div class="flex text-green-50 leading-none gap-3 text-xs font-medium">
      <button
        class="bg-[#0F8F21] py-1 px-2 md:px-10 rounded-md"
        :class="{ 'opacity-60': !cashoutData?.cashOutAllowed }"
        @click="handleCashout('instant')"
      >
        <TheButtonSpin v-if="instantCashoutPending" />
        <div v-else>
          <div>Instant</div>
          <div>Cashout</div>
        </div>
      </button>
      <button
        class="p-1 md:px-10 rounded-md flex flex-col items-center justify-center"
        :class="{
          'bg-amber-600': cashoutData?.autoCashOutEnabled,
          'bg-[#0F8F21]': !cashoutData?.autoCashOutEnabled,
          'opacity-75': !cashoutData?.cashOutAllowed,
        }"
        @click="handleCashout('auto')"
      >
        <TheButtonSpin v-if="autoCashoutPending" />
        <div v-else>
          <div>Auto cashout</div>
          <div v-if="cashoutData?.autoCashOutEnabled" class="px-1">
            {{ cashoutData?.autoCashOutAmount }}
          </div>
        </div>
      </button>
    </div>
  </div>
</template>
