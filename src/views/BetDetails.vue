<script setup>
import { ChevronLeftIcon } from "@heroicons/vue/20/solid";
import { storeToRefs } from "pinia";
import BetDetails from "../components/BetDetails.vue";

import { useBetsStore } from "../stores/bets";

const { pending } = storeToRefs(useBetsStore());
</script>
<template>
  <div class="bg-white dark:bg-dark-purple-20">
    <BetsLoader v-if="pending" />
    <div class="border shadow dark:border-dark-purple-23 p-2">
      <div class="flex items-center space-x-2 dark:text-gray-50">
        <ChevronLeftIcon
          class="w-7 h-7 cursor-pointer"
          @click="$router.go(-1)"
        />
        <div class="ml-2 text-xl tracking-wide">Bet Details</div>
      </div>

      <div class="border dark:border-black rounded-md shadow-md">
        <BetDetails />
      </div>
    </div>
  </div>
</template>
