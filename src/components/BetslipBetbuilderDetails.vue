<script setup>
import { useMatchDetails } from "@/composables/useMatchDetails";
import { TrashIcon } from "@heroicons/vue/24/outline";
import { useRouter } from "vue-router";
import { useFormatDates } from "../composables/useFormatDates";
import TwoUpIcon from "./TwoUpIcon.vue";

defineProps({
  item: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  deleteAnItemFromBetslip: {
    type: Function,
    required: true,
  },
});
const router = useRouter();

const { goToMatchDetails } = useMatchDetails();

const { humanFriendlyDate } = useFormatDates();
</script>
<template>
  <div class="w-full px-2 pt-2 pb-1 flex justify-between">
    <div
      :class="['text-gray-700 dark:text-gray-300']"
      class="w-full flex justify-between leading-none space-x-2"
    >
      <div
        class="flex space-x-2 cursor-pointer"
        @click="goToMatchDetails(item, router, item.live)"
      >
        <div
          class="flex font-black h-6 w-6 justify-center text-green-600 items-center cursor-pointer rounded-full hover:bg-[#373444]"
        >
          {{ index + 1 }}
        </div>
        <div class="leading-none">
          <span class="text-sm">Bet Builder</span>
          <div class="flex w-full justify-between items-center">
            <div
              class="text-xs font-medium text-gray-600/90 dark:text-slate-300/90"
            >
              <span>{{ item.homeTeam }}</span> <span>-vs-</span>
              <span>{{ item.awayTeam }}</span>
            </div>
          </div>
          <BetBuilderSelections
            class="w-full flex"
            :selections="item.selections"
          />
          <div class="text-xs pt-1.5 font-light dark:text-slate-400">
            Starts {{ humanFriendlyDate(item.startTime) }}
          </div>
        </div>
      </div>
      <div class="flex flex-col justify-between items-end h-full">
        <div
          class="flex gap-1.5 justify-between items-center cursor-pointer rounded-full"
        >
          <TwoUpIcon
            v-if="item?.twoGoalUpActive && item?.outcomeName !== 'x'"
          />
          <TrashIcon
            class="w-5 h-5 text-red-500 dark:text-red-800 hover:text-red-500 stroke-width-4"
            @click="deleteAnItemFromBetslip(item.customId)"
          />
        </div>
        <div
          :class="['text-gray-950', 'dark:text-gray-300']"
          class="font-black flex items-end text-sm rounded-md cursor-pointer"
          @click="goToMatchDetails(item.parentMatchId, router, item.live)"
        >
          {{ item.oddValue }}
        </div>
      </div>
    </div>
  </div>

  <!-- <div class="w-full px-2 py-2 flex justify-between">
    <div
      :class="['text-gray-700 dark:text-gray-300']"
      class="w-full flex justify-between leading-none space-x-2"
    >
      <div
        class="flex space-x-2 cursor-pointer"
        @click="goToMatchDetails(item.parentMatchId, router, route, item.live)"
      >
        <div
          class="flex font-black h-6 w-6 justify-center text-green-600 items-center cursor-pointer rounded-full hover:bg-[#373444]"
        >
          {{ index + 1 }}
        </div>
        <BetBuilderSelections
          class="w-full flex"
          :selections="item.selections"
        />
      </div>
      <div class="flex flex-col justify-between items-end h-full">
        <div
          class="flex gap-1.5 justify-between items-center cursor-pointer rounded-full"
        >
          <TwoUpIcon
            v-if="item?.twoGoalUpActive && item?.outcomeName !== 'x'"
          />
          <TrashIcon
            class="w-5 h-5 text-red-500 dark:text-red-800 hover:text-red-500 stroke-width-4"
            @click="deleteAnItemFromBetslip(item.customId)"
          />
        </div>
        <div
          :class="['text-gray-950', 'dark:text-gray-300']"
          class="font-black flex items-end text-sm rounded-md cursor-pointer"
          @click="
            goToMatchDetails(item.parentMatchId, router, route, item.live)
          "
        >
          {{ item.oddValue }}
        </div>
      </div>
    </div>
  </div> -->
</template>
