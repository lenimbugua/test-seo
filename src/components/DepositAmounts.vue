<script setup>
import { storeToRefs } from "pinia";
import { useDepositStore } from "../stores/deposit";
const { depositAmounts, deposit } = storeToRefs(useDepositStore());

const { setDeposit } = useDepositStore();
</script>
<template>
  <div class="">
    <div>
      <span class="text-gray-600 dark:text-slate-400 text-xs capitalize"
        >Select Amount to deposit</span
      >
    </div>

    <div
      class="grid grid-cols-4 md:grid-cols-7 flex-wrap gap-1 dark:text-white"
    >
      <div
        v-for="(deposit2, index) in depositAmounts"
        :key="deposit2.amount"
        :class="
          deposit === deposit2.amount
            ? ' bg-[#1F692D] border-dark-purple-17 text-white'
            : ' bg-gray-300 dark:bg-[#393444] text-gray-600 dark:text-dark-purple-5'
        "
        type="text"
        class="relative block shadow font-medium rounded-lg cursor-pointer py-0.5 px-5 overflow-clip"
        @click="setDeposit(deposit2.amount)"
      >
        <div class="block mt-3">
          <div
            class="text-center font-medium text-md flex items-center"
            :class="
              deposit === deposit2.amount
                ? 'text-white'
                : 'text-gray-700 dark:text-slate-300'
            "
          >
            {{ deposit2.amount
            }}<span v-if="index + 1 === depositAmounts.length">+</span>
          </div>
          <div
            class="block absolute right-0 top-0 py-0.5 px-1 rounded-bl-lg border-red-600 bg-[#EF4444] text-[0.45rem] leading-none text-white"
          >
            bonus +{{ deposit2.bonus }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
