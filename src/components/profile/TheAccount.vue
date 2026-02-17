<script setup>
import { useProfileStore } from "@/stores/profile";
import {
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/vue/24/outline";

import { ref } from "vue";

import { storeToRefs } from "pinia";

const { balance, bonus, pending } = storeToRefs(useProfileStore());
const { getProfileInfo } = useProfileStore();

getProfileInfo();

const showBalance = ref(true);
</script>
<template>
  <div v-if="balance" class="pb-2 space-y-3">
    <div
      class="shadow border dark:border-white/10 rounded-md overflow-clip"
    >
      <div class="dark:bg-dark-purple-19 bg-gray-200 p-3 w-full">
        <div class="w-full flex justify-between items-center">
          <div
            class="text-xs font-semibold flex items-center space-x-2 dark:text-gray-50"
          >
            Total balance KES
            <div class="text-sm sm:text-lg ml-1.5">
              <div v-if="showBalance">
                {{ balance }}
              </div>
              <div v-else>****</div>
            </div>
            <div class="cursor-pointer" @click="showBalance = !showBalance">
              <EyeIcon v-if="showBalance" class="h-4 w-4" />
              <EyeSlashIcon v-else class="h-4 w-4" />
            </div>
          </div>
          <div class="cursor-pointer" @click="getProfileInfo()">
           <div
              class="bg-white dark:bg-black/30 px-2 py-1 rounded-md"
              style="display: flex"
            >
              <svg
                width="16"
                class="h-6 w-6 text-green-600 fill-current"
                :class="{ 'animate-spin': pending }"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4 -3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35Z"
                ></path>
                <path fill="none" d="M0 0h24v24H0Z"></path></svg
              ><span class="text-green-600">Refesh</span>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full dark:bg-dark-purple-20 p-3 dark:text-gray-50">
        <div class="flex w-full">
          <div class="w-1/2 flex-col justify-center items-center space-y-50">
            <div class="w-full text-xs flex justify-center items-center">
              Main balance(KES)
            </div>
            <div
              class="w-full flex justify-center items-center text-md sm:text-2xl"
            >
              <div v-if="showBalance">{{ balance }}</div>
              <div v-else>****</div>
            </div>
          </div>
          <div
            class="w-1/2 flex-col border-l dark:border-dark-purple-18 justify-center items-center"
          >
            <div class="w-full text-xs flex justify-center items-center">
              Bonus balance(KES)
            </div>
            <div
              class="w-full flex justify-center items-center text-md sm:text-2xl"
            >
              <div v-if="showBalance">{{ bonus }}</div>
              <div v-else>****</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <DepositWithdrawLinks /> -->
</template>
