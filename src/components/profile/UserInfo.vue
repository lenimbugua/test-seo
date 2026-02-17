<script setup>
import { useLoginStore } from "@/stores/login";
import { UserCircleIcon } from "@heroicons/vue/20/solid";
import { storeToRefs } from "pinia";
const { msisdn } = storeToRefs(useLoginStore());
</script>
<template>
  <div class="flex w-full items-center dark:text-gray-400 px-3 pt-2 space-x-2">
    <UserCircleIcon
      class="h-14 w-14 fill-current dark:text-gray-300 text-dark-purple-17"
    />
    <div v-if="msisdn" class="flex-col items-center leading-5">
      <div class="text-sm font-medium text-gray-800 dark:text-gray-50">
        User: {{ msisdn }}
      </div>
      <div class="text-gray-600 text-md dark:text-gray-400">{{ msisdn }}</div>
    </div>
  </div>
</template>
