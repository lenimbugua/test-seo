<script setup>
import { useBetslip } from "@/composables/useBetslip";
import { useLoginStore } from "@/stores/login";
import { useProfileStore } from "@/stores/profile";
import { UserIcon } from "@heroicons/vue/20/solid";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import TotalOdds from "./TotalOdds.vue";

const props = defineProps({
  setStake: {
    type: Function,
    required: true,
  },
  stake: {
    type: Number,
    required: true,
  },
  totalOdds: {
    type: Number,
    default: 0,
  },
});

const { isAuthenticated } = storeToRefs(useLoginStore());
const { balance } = storeToRefs(useProfileStore());

const { stakeAmounts } = useBetslip();
const selectedStakeAmount = ref(props.stake);

function updateStake(amount) {
  selectedStakeAmount.value = amount;
  props.setStake(amount);
}
</script>

<template>
  <div class="px-4">
    <div class="pb-1 flex items-center justify-between">
      <div>
        <div
          v-if="balance && isAuthenticated"
          :class="['text-gray-600 dark:text-slate-400']"
          class="flex space-x-1 items-center text-sm font-bold"
        >
          <div class="flex items-center">
            <UserIcon class="h-5 w-5" />
            <div class="font-light text-xs">Bal.</div>
          </div>
          <div>
            {{ parseFloat(balance).toFixed("2") }}
            <span class="font-light text-xs">KES</span>
          </div>
        </div>
      </div>
      <TotalOdds :total-odds />
    </div>
    <div class="flex flex-col space-y-2">
      <div class="flex justify-between items-center space-x-2">
        <div
          v-for="stakeAmount in stakeAmounts"
          :key="stakeAmount"
          class="w-full"
          @click="updateStake(stakeAmount)"
        >
          <div
            :class="
              selectedStakeAmount == stakeAmount
                ? 'bg-[#0F8F21]/80 border-dark-purple-17 text-gray-950'
                : 'bg-gray-300 dark:bg-dark-purple-21 text-gray-950 dark:text-gray-50'
            "
            class="text-xs font-bold justify-center text-center cursor-pointer items-center rounded-md px-2 p-3 py-2.5"
          >
            {{ stakeAmount }}/-
          </div>
        </div>
      </div>
      <div class="flex justify-between items-center">
        <div
          :class="['text-gray-700 dark:text-slate-300']"
          class="text-xs font-bold"
        >
          Stake
        </div>
        <div class="flex relative">
          <span
            class="absolute text-sm inset-y-0 left-0 flex items-center pl-2 text-gray-950 dark:text-white"
            >KES</span
          >

          <input
            v-model="selectedStakeAmount"
            type="number"
            class="pl-12 text-base font-extrabold bg-gray-300 text-gray-950 dark:bg-dark-purple-21 dark:text-white justify-center items-center focus:border-0 w-52 rounded-md px-1 p-3 py-2 focus:outline-none fucus:shadow focus:ring focus:ring-[#3E7A3E]"
            required
            @input="updateStake(selectedStakeAmount)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
