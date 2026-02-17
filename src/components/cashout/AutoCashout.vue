<script setup>
import { useCashoutStore } from "@/stores/cashout.js";
import { InformationCircleIcon } from "@heroicons/vue/24/solid";
import { computed, ref, toRefs } from "vue";

const autoCashoutAmount = ref(0);
const {
  betId,

  pending,
  // responseOK
} = toRefs(useCashoutStore());

const cashoutData = computed(() => useCashoutStore().cashoutData(betId.value));
const { setAutoCashout, cancelAutoCashout } = useCashoutStore();

const min = (cashoutData.value.cashOutValue + 0.1).toFixed(2);

const isValid = ref(true);

function isValidCashoutAmount() {
  isValid.value =
    autoCashoutAmount.value >= min &&
    autoCashoutAmount.value <= cashoutData.value.possibleWin;
}
const handleCashout = (betId) => {
  isValidCashoutAmount();
  if (!isValid.value) return;
  setAutoCashout(autoCashoutAmount.value, betId);
};
</script>
<template>
  <form
    class="px-6 py-2 text-gray-600 dark:text-slate-400"
    @submit.prevent="handleCashout(cashoutData.betId)"
  >
    <div
      class="flex gap-2 items-center w-full justify-center text-gray-700 dark:text-slate-200 text-xl"
    >
      <InformationCircleIcon class="h-6 w-6 text-green-600" />
      <Span class="">Auto Cashout</Span>
      <!-- <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-7 w-7 text-green-500"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M11.475 14.475L7.85 10.85q-.075-.075-.112-.162T7.7 10.5q0-.2.138-.35T8.2 10h7.6q.225 0 .363.15t.137.35q0 .05-.15.35l-3.625 3.625q-.125.125-.25.175T12 14.7t-.275-.05t-.25-.175"
          />
        </svg>
      </span>
      <span class="font-bold text-xl text-gray-700 dark:text-slate-300"
        >427 Ksh</span
      > -->
    </div>
    <div v-if="cashoutData.autoCashOutEnabled">
      <p class="py-2 text-sm">
        Auto cashout is enabled, cancel it before setting a new auto cashout.
      </p>
      <button
        class="w-full bg-green-600 p-2 rounded-md text-green-50 flex items-center justify-center"
        @click="cancelAutoCashout(cashoutData.betId)"
      >
        <div v-if="pending" class="px-3 text-black">
          <TheButtonSpin />
        </div>
        <span>Cancel Auto Cashout</span>
        <span class="text-sm"> ( {{ cashoutData.autoCashOutAmount }} KES)</span>
      </button>
    </div>
    <div v-else>
      <p class="py-2 text-sm">
        If the Cashout value reaches your set amount, the bet will automatically
        settle and the winnings will be credited to your account. You can cancel
        this option anytime before the Cashout value hits your set amount. Once
        settled, the bet is closed and cannot be reversed. If the Cashout value
        never reaches the set amount, the bet will continue normally.
      </p>
      <div
        class="w-full justify-center flex-col text-gray-700 dark:text-slate-300 text-center flex gap-2"
      >
        <div class="flex items-center gap-2 py-3">
          <label
            for="autoCashoutAmount"
            class="block text-md w-1/2 font-semibold leading-6 text-gray-600 dark:text-gray-400"
            >Amount</label
          >
          <div class="w-1/2">
            <input
              id="autoCashoutAmount"
              v-model="autoCashoutAmount"
              required
              type="number"
              step="0.01"
              :class="{ 'border-red-500': !isValid }"
              class="mt-1 pb-1 w-full appearance-none text-slate-900 dark:text-gray-400 bg-white dark:bg-[#141019]/50 rounded-md block p-2 sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 shadow focus:ring-[#36C31F] ring-2 ring-black/20 dark:ring-white/25"
            />
            <div v-if="!isValid" class="text-red-500 text-sm mt-0.5">
              Invalid Amount
            </div>
            <div class="flex gap-2 text-sm text-center mt-1">
              <span>Min </span
              ><span class="text-green-600 font-bold text-md"
                >{{ min }} Ksh</span
              >
              <span>Max </span
              ><span class="text-green-600 font-bold text-md"
                >{{ cashoutData.possibleWin }} Ksh</span
              >
            </div>
          </div>
        </div>
      </div>
      <button
        class="w-full bg-green-800 p-2 rounded-md text-green-50 flex items-center justify-center"
      >
        <div v-if="pending" class="px-3 text-black">
          <TheButtonSpin />
        </div>
        <span>Auto Cashout</span>
      </button>
    </div>
  </form>
</template>
