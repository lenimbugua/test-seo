<script setup>
import { XMarkIcon } from "@heroicons/vue/24/solid";

import { useInstantBetslipStore } from "@/stores/instant-betslip.js";

import { TrashIcon } from "@heroicons/vue/24/outline";

import { storeToRefs } from "pinia";

const { betslip, betslipLength } = storeToRefs(useInstantBetslipStore());
const { deleteAnItemFromBetslip, clearBetslip } = useInstantBetslipStore();
</script>
<template>
  <div class="w-full mb-[7rem]">
    <EmptyBetslip v-if="betslipLength === 0" />
    <div v-else>
      <div
        :class="['bg-neutral-50 dark:bg-dark-purple-23']"
        class="border-b-2 dark:border-dark-purple-20 h-full flex justify-between items-center py-1 px-2"
      >
        <div
          :class="['bg-[#009260]', ' text-white']"
          class="text-xs rounded-full h-6 w-6 font-extrabold flex justify-center items-center"
        >
          {{ betslipLength }}
        </div>
        <div
          class="space-x-1 cursor-pointer flex items-center text-xs text-red-600 p-1 rounded-md"
          @click="clearBetslip()"
        >
          <TrashIcon
            class="w-4 h-4 mr-0.5 stroke-width-4"
            @click="deleteAnItemFromBetslip(item.customId)"
          />
          Remove All
        </div>
      </div>
      <div
        v-for="item in betslip"
        :key="item.customId"
        :class="['bg-gray-50 dark:bg-[#2F293E]']"
      >
        <RowColorWrapper>
          <div class="w-full">
            <div class="px-2 py-2 w-full flex justify-between">
              <div
                :class="['text-dark-purple-17 dark:text-dark-purple-6']"
                class="flex leading-none space-x-2"
              >
                <div
                  class="flex h-6 w-6 justify-center hover:text-gray-50 items-center cursor-pointer rounded-full hover:bg-[#373444]"
                >
                  <XMarkIcon
                    class="w-4 h-4 stroke-width-4"
                    @click="deleteAnItemFromBetslip(item.customId)"
                  />
                </div>
                <div class="space-y-1">
                  <div class="text-sm font-semibold">
                    {{ item.outcome_name }}
                  </div>
                  <div class="text-xs font-semibold">
                    {{ item.market_name }}
                  </div>
                  <div class="text-xs">
                    {{ item.home_team }} - {{ item.away_team }}
                  </div>
                </div>
              </div>
              <div
                :class="['text-dark-purple-23', 'dark:text-dark-purple-6']"
                class="h-6 font-black flex justify-center items-center text-sm rounded-md p-2 px-2"
              >
                {{ item.odd_value }}
              </div>
            </div>
          </div>
        </RowColorWrapper>
      </div>
    </div>
  </div>
  <div class="fixed bottom-0 w-full">
    <InstantFooter />
  </div>
</template>
