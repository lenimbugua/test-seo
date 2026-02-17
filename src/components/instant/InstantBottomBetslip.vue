<script setup>
import { ArrowUpIcon } from "@heroicons/vue/20/solid";

import { useModalStore } from "@/stores/modal";

import { useModalTypes } from "@/composables/useModalTypes";

import { useInstantBetslipStore } from "@/stores/instant-betslip.js";
import { storeToRefs } from "pinia";

const { openModal } = useModalStore();
const { showModal } = storeToRefs(useModalStore());

const { instantBetslip } = useModalTypes();
const { betslip, totalOdds } = storeToRefs(useInstantBetslipStore());
</script>
<template>
  <div
    class="flex-col items-center text-black bg-[#FFC400]"
    @click="openModal(instantBetslip)"
  >
    <div
      v-if="betslip.length && !showModal"
      class="p-2 flex items-center justify-between bg-[#FFC303]"
    >
      <div class="flex space-x-2 text-sm font-bold text-black">
        <div class="flex justify-between items-center space-x-1">
          <div class="bg-[#707070] shadow rounded-md px-1.5 text-white p-0.5">
            {{ betslip.length }}
          </div>
        </div>
        <div class="flex items-center">Betslip</div>
      </div>
      <ArrowUpIcon class="text-black w-4 h-4" />
    </div>

    <div
      v-if="betslip.length"
      class="pl-6 py-4 pr-2 flex w-full justify-between space-x-1 text-sm font-bold items-center"
    >
      <div class="font-semibold">Odds:</div>
      <div class="font-bold">{{ totalOdds }}</div>
    </div>
  </div>
</template>
