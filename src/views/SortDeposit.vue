<script setup>
import Goback from "../components/Goback.vue";
</script>

<template>
  <div class="h-dvh flex flex-col">
    <div>
      <HeaderLinks />
      <div class="flex justify-between items-center dark:text-white py-2">
        <Goback />
        <div></div>
      </div>
    </div>
    <div class="flex-grow max-w-3xl px-1 my-4 md:mx-auto">
      <SortYourDeposit />
    </div>
    <MobileFooter />
    <Footer />
  </div>
</template>
