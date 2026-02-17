<script setup>
import { useInstantBetslipStore } from "@/stores/instant-betslip.js";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const { stake, betslip } = storeToRefs(useInstantBetslipStore());

const theStake = ref(stake.value);

const { setStake } = useInstantBetslipStore();
</script>
<template>
  <div
    v-if="betslip.length > 0"
    class="flex justify-between items-center bg-[#E4E4E4] dark:bg-white text-black py-2 px-3"
  >
    <div class="capitalize">stake</div>
    <input
      v-model="theStake"
      class="p-1.5 w-28 bg-white rounded-sm dark:bg-[#E4E4E4] outline-none focus:ring focus:ring-[#E4E4E4]"
      type="number"
      required
      @input="setStake(theStake)"
    />
  </div>
</template>
