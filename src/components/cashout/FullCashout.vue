<script setup>
import { useCashoutStore } from "@/stores/cashout.js";
import { InformationCircleIcon } from "@heroicons/vue/24/solid";
import { computed, toRefs } from "vue";
const { cashoutNow, cancelAutoCashout } = useCashoutStore();

const {
  pending,
  betId,
  // responseOK
} = toRefs(useCashoutStore());

const cashoutData = computed(() => useCashoutStore().cashoutData(betId.value));
</script>
<template>
  <div class="px-6 py-2 text-gray-600 dark:text-slate-400">
    <div
      class="flex gap-2 items-center w-full justify-center text-gray-700 dark:text-slate-200 text-xl"
    >
      <InformationCircleIcon class="h-6 w-6 text-green-600" />
      <Span class="">Full Cashout</Span>
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-7 w-7 text-green-500"
          viewBox="0 0 24 24"
        >
          <!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE -->
          <path
            fill="currentColor"
            d="M11.475 14.475L7.85 10.85q-.075-.075-.112-.162T7.7 10.5q0-.2.138-.35T8.2 10h7.6q.225 0 .363.15t.137.35q0 .05-.15.35l-3.625 3.625q-.125.125-.25.175T12 14.7t-.275-.05t-.25-.175"
          />
        </svg>
      </span>
      <span class="font-bold text-xl text-gray-700 dark:text-slate-300"
        >{{ cashoutData.cashOutValue }} Ksh</span
      >
    </div>
    <div v-if="cashoutData.autoCashOutEnabled">
      <p class="py-2 text-sm">
        Auto cashout is enabled, cancel it before full cashout.
      </p>
      <button
        class="w-full bg-[#0F8F21] p-2 rounded-md text-green-50 flex items-center justify-center"
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
        By clicking Full Cashout you confirm your choice. You will not be able
        to revert your decision.
      </p>
      <button
        class="w-full bg-green-800 p-2 rounded-md text-green-50 flex items-center justify-center"
        @click="cashoutNow(betId)"
      >
        <div v-if="pending" class="px-3 text-black">
          <TheButtonSpin />
        </div>
        <span>Full Cashout </span>
      </button>
    </div>
  </div>
</template>
