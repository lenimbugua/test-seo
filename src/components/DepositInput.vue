<script setup>
import { MAX_DEPOSIT, MIN_DEPOSIT } from "@/composables/useDefinedConstants";
import { useDepositStore } from "@/stores/deposit.js";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const { deposit } = storeToRefs(useDepositStore());
const { setDeposit } = useDepositStore();
const selectedDepositAmount = ref(deposit);
</script>
<template>
  <div>
    <p class="text-xs text-gray-600 dark:text-slate-400 capitalize">
      <span class="font-medium text-gray-900 dark:text-slate-300 mr-2">Or</span
      >Enter Amount to Deposit
    </p>
    <div
      class="flex items-center rounded-md overflow-clip border border-gray-300 dark:border-white/20"
    >
      <div
        class="text-md p-1.5 flex items-center uppercase bg-gray-300 dark:bg-[#241E34] text-gray-700 dark:text-slate-400"
      >
        KES
      </div>
      <input
        id="amount"
        v-model="selectedDepositAmount"
        :max="MAX_DEPOSIT"
        :min="MIN_DEPOSIT"
        type="number"
        class="font-medium w-full flex text-md flex-grow bg-white dark:bg-[#393444] dark:text-white ring-0 outline-none p-1.5"
        placeholder="Enter amount"
        name="deposit"
        required
        @input="setDeposit(selectedDepositAmount)"
      />
    </div>
  </div>
</template>
