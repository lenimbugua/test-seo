<script setup>
import { useModalStore } from "@/stores/modal";

const { closeModal } = useModalStore();

const paybillNo = import.meta.env.VITE_PAYBILL_NO;
</script>
<template>
  <div
    class="w-full dark:text-slate-400 text-gray-600 text-sm border dark:border-white/10 rounded-md p-2 bg-gray-100 dark:bg-black/20"
  >
    <div class="flex items-center">
      <img class="w-24" src="/mpesa.png" alt="safaricom logo" /> -
      <h5 class="text-[#07983D] text-xl font-bold">Paybill {{ paybillNo }}</h5>
    </div>
    <p class="">1. Go to Mpesa Menu on your mobile phone.</p>
    <p class="">2. Select Lipa na Mpesa.</p>
    <p class="">3. Choose Paybill.</p>
    <p class="">
      4. Enter Business Number
      <span class="font-black text-[#20682D] dark:text-green-500">{{ paybillNo }}</span>
    </p>
    <p class="">
      5. Enter Account Number -
      <span class="font-black text-[#20682D] dark:text-green-500">haki</span>
    </p>
    <p class="">6. Enter Amount</p>
    <p class="">3. Enter Mpesa PIN and Confirm.</p>
    <p class="">5. You will receive Mpesa Confirmation.</p>
    <p class="">
      <RouterLink
        :to="{ name: 'sort-deposit' }"
        class="text-[#20682D] dark:text-green-500"
        href="!"
        @click="closeModal"
        >Click here</RouterLink
      >
      to sort your deposit if you can't see your deposit.
    </p>
  </div>
</template>
