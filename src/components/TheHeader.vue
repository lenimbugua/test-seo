<script setup>
import AccountAccess from "./AccountAccess.vue";
import PeekNav from "./PeekNav.vue";
const paybillNo = import.meta.env.VITE_PAYBILL_NO;
</script>
<template>
  <div class="bg-[#241E34]">
    <div class="py-2.5"></div>
    <RouterLink
      class="px-3 py-2 bg-[#FFFAF1] flex justify-between text-gray-700 font-bold text-[0.6rem]"
      :to="{ name: 'deposit' }"
    >
      <span>Deposit via MPESA Paybill {{ paybillNo }}</span>
      <span>Click to Deposit <i class="bi bi-caret-right-fill"></i></span>
    </RouterLink>
    <div class="px-3 p-2">
      <div class="flex items-center justify-between">
        <RouterLink
          class="text-[2rem] font-bold leading-none tracking-tight"
          :to="{ name: 'home' }"
          ><TheLogo
        /></RouterLink>
        <div class="flex justify-between items-center space-x-3">
          <i class="bi bi-search"></i>
          <AccountAccess />
        </div>
      </div>
      <div class="py-2">
        <PeekNav />
      </div>
    </div>
  </div>
</template>
