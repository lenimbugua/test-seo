<script setup>
import { useLoginStore } from "@/stores/login";
import { ExclamationCircleIcon } from "@heroicons/vue/24/solid";
const { openLoginModal } = useLoginStore();

</script>
<template>
  <div  class="py-20 px-2 w-full max-w-lg">
    <div class="px-3 relative space-y-3">
      <div class="flex w-full justify-center">
        <div
          style="z-index: 999"
          class="p-1 absolute -top-10 mx-auto bg-[#56CB05]/20 rounded-full"
        >
          <ExclamationCircleIcon
            style="z-index: 100"
            class="w-16 h-16 mx-auto text-red-500"
          />
        </div>
      </div>
      <div
        class="shadow relative border dark:border-dark-purple-18 rounded-md overflow-clip"
      >
        <div class="dark:bg-dark-purple-19 bg-gray-200 p-3 w-full">
          <div class="w-full flex justify-center items-center">
            <div
              class="text-xs font-semibold py-3 flex items-center space-x-2 dark:text-gray-50"
            >
              Your session has expired
            </div>
            
        </div>
        </div>
        <div class="w-full dark:bg-dark-purple-20 p-3 dark:text-gray-50">
          <div class="flex w-full">
            <div
              type="button"
              class="w-full block text-center p-3 text-white uppercase bg-green-600 rounded-md"
              @click="openLoginModal"
            >
              Login to continue
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
