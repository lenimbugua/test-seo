<script setup>
import { GiftIcon } from "@heroicons/vue/24/solid";
</script>

<template>
  <div class="p-3">
    <div class="flex justify-between items-center space-x-3">
      <div class="w-1/2">
        <RouterLink
          type="button"
          :to="{ name: 'deposit' }"
          class="relative w-full block text-center p-3 text-white uppercase bg-[#177C29]/80 rounded-md"
        >
          <div
            class="flex bg-amber-400 capitalize text-black text-[0.65rem] whitespace-nowrap font-medium rounded-tl-full px-2 absolute rounded-r-full right-0 -top-2"
          >
            <GiftIcon class="w-3 h-3 text-fuchsia-700 mr-1" />
            <span
              >Enjoy <span class="line-through">tax</span> free deposits</span
            >
          </div>
          Deposit
        </RouterLink>
      </div>
      <div class="w-1/2">
        <RouterLink
          :to="{ name: 'withdraw' }"
          type="button"
          class="w-full block text-center p-2.5 border dark:border-dark-purple-16 dark:text-white rounded-md bg-black/15"
        >
          Withdraw
        </RouterLink>
      </div>
    </div>
  </div>
</template>
