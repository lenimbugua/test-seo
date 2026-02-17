<script setup>
import WithdrawFunds from "@/components/WithdrawFunds.vue";
import Goback from "../components/Goback.vue";
</script>

<template>
  <div class="h-dvh flex flex-col">
    <div>
      <HeaderLinks />
      <div
        class="max-w-xl mx-auto flex justify-between items-center dark:text-white py-2"
      >
        <Goback />
        <div class="font-bold text-xl">Withdraw To MPESA</div>
        <div></div>
      </div>
    </div>
    <div class="flex-grow">
      <WithdrawFunds class="max-w-3xl mx-auto" />
    </div>
    <MobileFooter />
    <Footer />
  </div>
</template>
