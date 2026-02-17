<script setup>
import { useBetslipDataLayer } from "@/composables/useBetslipDataLayer";
import { TrashIcon } from "@heroicons/vue/24/outline";
import { storeToRefs } from "pinia";
import { useBetslipStore } from "../stores/sports-betslip.js";
import BetslipMatchDetails from "./BetslipMatchDetails.vue";
import EmptyBetslip from "./EmptyBetslip.vue";
import MultibetBoost from "./MultibetBoost.vue";

const { betslip, betslipLength } = storeToRefs(useBetslipStore());
const { clearBetslip, deleteAnItemFromBetslip } = useBetslipStore();

function showStatusBar(deviation, status) {
  if (status !== 1) {
    return true;
  }
  if (typeof deviation === "undefined") {
    return false;
  }
  if (deviation !== 0) {
    return true;
  }
  return false;
}

function getDeviationCssClass(prevOddValue, currentOddValue) {
  const deviation = currentOddValue - prevOddValue;
  if (deviation > 0) {
    return "bg-green-500/15 text-green-500 ";
  }
  if (deviation < 0) {
    return "bg-red-500/15 text-red-400";
  }

  return "";
}

function cleanBetslip() {
  const { removeFromCartDataLayer } = useBetslipDataLayer();
  const slip = betslip.value;
  slip.forEach((item) => {
    removeFromCartDataLayer(item.customId);
  });
  clearBetslip();
}
</script>
<template>
  <EmptyBetslip v-if="betslipLength === 0" />
  <div v-else :class="['bg-neutral-50 dark:bg-dark-purple-23']" class="w-full">
    <div class="sticky top-0">
      <div>
        <div class="p-1">
          <MultibetBoost />
        </div>
        <div
          :class="['bg-neutral-50 dark:bg-dark-purple-23']"
          class="border-y dark:border-none w-full dark:border-dark-purple-20 h-full flex justify-between items-center py-1 px-2 z-10"
        >
          <div
            :class="['bg-green-500', 'text-white dark:text-black']"
            class="text-xs rounded-full h-6 w-6 font-extrabold flex justify-center items-center"
          >
            {{ betslipLength }}
          </div>
          <div
            class="space-x-1 cursor-pointer flex items-center text-xs text-red-600 p-1 bg-gray-300 dark:bg-white/10 rounded-md"
            @click="cleanBetslip"
          >
            <TrashIcon class="w-4 h-4 mr-0.5 stroke-width-4" />
            Remove All
          </div>
        </div>
      </div>
    </div>
    <div
      class="h-[24rem] w-full bg-white dark:bg-[#241E34] overflow-y-scroll scrollbar-hide"
    >
      <div
        v-for="(item, index) in betslip"
        :key="item.customId"
        :class="['bg-gray-50 w-full dark:bg-black/10']"
      >
        <RowColorWrapper>
          <div class="w-full">
            <BetslipBetbuilderDetails
              v-if="item.isBetBuilder"
              class="w-full"
              :item
              :index
              :delete-an-item-from-betslip="deleteAnItemFromBetslip"
            />
            <BetslipMatchDetails
              v-else
              :item
              :index
              :delete-an-item-from-betslip="deleteAnItemFromBetslip"
            />
            <div
              v-if="showStatusBar(item.deviation, item.status)"
              class="w-full"
            >
              <div
                v-if="item.status !== 1"
                class="w-full bg-red-500/20 text-red-500 text-xs px-4"
              >
                Odds for this match have been deactivated
              </div>
              <div
                v-else
                :class="getDeviationCssClass(item.prevOddValue, item.oddValue)"
                class="w-full text-xs px-4"
              >
                Odds for this match have changed from {{ item.prevOddValue }} to
                {{ item.oddValue }}
              </div>
            </div>
          </div>
        </RowColorWrapper>
      </div>
    </div>
    <BetControls />
  </div>
</template>
