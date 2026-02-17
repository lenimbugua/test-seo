<script setup>
import { useDepositStore } from "@/stores/deposit.js";
import { useModalStore } from "@/stores/modal";
import { InformationCircleIcon } from "@heroicons/vue/24/outline";
import { GiftIcon } from "@heroicons/vue/24/solid";
import { storeToRefs } from "pinia";

// const depositTax = import.meta.env.VITE_DEPOSIT_TAX;

const { closeModal } = useModalStore();

const { pending } = storeToRefs(useDepositStore());
</script>
<template>
  <div class="">
    <div
      class="flex w-full items-center leading-none text-[0.65rem] dark:text-slate-300"
    >
      <InformationCircleIcon class="h-4 w-4 text-[#EF4444] mr-0.5" />
      <p>Bonus is only applicable for first deposit of the day.</p>
    </div>
    <button
      class="w-full relative bg-[#1F692D] py-1.5 md:py-2 font-medium text-white rounded-md mt-1"
      type="submit"
    >
      <div
        class="flex bg-amber-400 text-black text-xs font-medium rounded-tl-full px-2 rounded-r-full absolute right-0 -top-2"
      >
        <GiftIcon class="w-4 h-4 text-fuchsia-700 mr-1" />
        <span>Enjoy <span class="line-through">tax</span> free deposits</span>
      </div>
      <TheButtonSpin v-if="pending" />
      <span v-else> Deposit Now</span>
    </button>

    <div
      class="flex w-full py-1 items-center leading-none text-xs dark:text-slate-300"
    >
      <GiftIcon class="h-4 w-4 text-[#FEAF04] mr-1" />
      <p>We cover your deposit tax.</p>
    </div>
    <p class="">
      <RouterLink
        :to="{ name: 'sort-deposit' }"
        class="text-[#20682D] dark:text-green-500"
        href="!"
        @click="closeModal"
        >Failed Deposit? Click to sort</RouterLink
      >
    </p>
  </div>
</template>
