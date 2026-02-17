<script setup>
import { ShareIcon } from "@heroicons/vue/24/solid";

import { storeToRefs } from "pinia";
import { useBetsStore } from "../stores/bets";
import { useBetsStatus } from "../composables/useBetsStatus";
import { useFormatScores } from "../composables/useFormatScores";
import { useMatchDetails } from "@/composables/useMatchDetails";
import { useRouter } from "vue-router";
import { useShareBetStore } from "../stores/sharebet.js";
import CashoutStrip from "./CashoutStrip.vue";
import DateBox from "./DateBox.vue";
import LiveBox from "./LiveBox.vue";

const { goToMatchDetails } = useMatchDetails();

const router = useRouter();

// import OpenMatchStatButton from "./OpenMatchStatButton.vue";

const { pending: sharePending } = storeToRefs(useShareBetStore());

const {
  homeScore,
  awayScore,
  // homeWon,
  // awayWon,
  // isDraw
} = useFormatScores();

const { getStatusText, getColor, cashedOut } = useBetsStatus();

const { fetchBetslip } = useBetsStore();

const { betDetails, selectedBet } = storeToRefs(useBetsStore());

function showScores(isLive, status) {
  status = parseInt(status);
  if (isLive) {
    return true;
  }
  if (status == 1) {
    return false;
  }
  if (status == 4) {
    return false;
  }
  return true;
}

fetchBetslip();
</script>

<template>
  <div
    class="w-full border-b dark:border-dark-purple-23 pb-1 dark:text-gray-400"
  >
    <div
      class="flex w-full justify-between border-b dark:border-dark-purple-23"
    >
      <div class="w-full">
        <div class="w-full flex justify-between items-center py-2 px-2">
          <div class="text-sm text-green-500">
            Multibet ({{ selectedBet?.totalGames }} selections)
          </div>
          <div
            :class="[
              getColor('text', selectedBet?.status),
              'uppercase font-bold tracking-wider',
            ]"
          >
            {{ getStatusText(selectedBet?.status) }}
          </div>
        </div>
      </div>
    </div>
    <div class="border-b dark:border-gray-950 px-3 py-2">
      <CashoutStrip
        v-if="selectedBet?.status == 1 && !selectedBet?.isBetBuilder"
        :bet="selectedBet"
        :cashout-value="selectedBet?.casheOutValue"
        :bet-id="selectedBet.betId"
        :cashout-allowed="selectedBet.cashOutAllowed"
      />
    </div>
    <div class="px-3 py-2">
      <div class="w-full flex items-center justify-between pb-2">
        <div class="flex items-center space-x-2 dark:text-slate-200">
          <div
            class="flex justify-center items-center bg-gray-300 dark:bg-[#504B5C] font-black p-1 gap-2 rounded-md"
          >
            <div class="text-xs">BET ID:</div>
            <div class="text-xs">
              {{ selectedBet?.betRefenceId }}
            </div>
          </div>

          <ShareBet
            :bet-id="selectedBet?.betId"
            class="flex justify-center items-center bg-gray-300 dark:bg-[#504B5C] p-1 gap-2 rounded-md"
          >
            <TheButtonSpin v-if="sharePending" />
            <div v-else class="flex justify-between space-x-1 items-center">
              <ShareIcon class="h-4 w-4 text-[#56CB05]" />
              <span class="text-xs dark:text-slate-200 font-semibold"
                >Share</span
              >
            </div>
          </ShareBet>
          <!-- <CopyToClipboard :source="selectedBet?.betRefenceId" /> -->
        </div>
        <div class="text-sm">{{ selectedBet?.date }}</div>
      </div>
      <div
        v-if="selectedBet?.status === cashedOut"
        class="flex justify-between"
      >
        <div class="text-xs text-gray-700 dark:text-gray-200">
          Cashed out Amount
        </div>
        <div class="font-black text-sm text-gray-700 dark:text-gray-200">
          {{ selectedBet?.cashedOutAmount?.toFixed("2") }}
        </div>
      </div>
      <div class="flex justify-between">
        <div class="text-xs">Stake:</div>
        <div class="text-xs font-bold text-gray-700 dark:text-gray-200">
          KES
          {{ selectedBet?.betAmount.toFixed("2") }}
        </div>
      </div>
      <!-- <div class="flex justify-between">
        <div class="text-xs">Excise Tax({{ exciseTax }}%):</div>
        <div class="text-xs text-gray-700 dark:text-gray-200">
          KES {{ calculateExciseTax(selectedBet?.betAmount).toFixed("2") }}
        </div>
      </div> -->
      <!-- <div class="flex justify-between">
        <div class="text-xs">Stake:</div>
        <div class="text-xs text-gray-700 dark:text-gray-200">
          KES {{ calculateTotalPay(selectedBet?.betAmount).toFixed("2") }}
        </div>
      </div> -->
      <div class="flex justify-between">
        <div class="text-xs">Total Odds:</div>
        <div class="text-xs font-semibold text-gray-700 dark:text-gray-200">
          {{ selectedBet?.totalOdd.toFixed("2") }}
        </div>
      </div>
      <!-- <div class="flex justify-between">
        <div class="text-xs">Withholding Tax({{ withHoldingTax }}%) :</div>
        <div class="text-xs text-gray-700 dark:text-gray-200">
          KES
          {{
            calculateWithhodingTax(
              selectedBet?.betAmount,
              selectedBet?.totalOdd
            ).toFixed("2")
          }}
        </div>
      </div> -->
      <div v-if="selectedBet?.status != cashedOut" class="flex justify-between">
        <div class="text-xs">Total Return:</div>
        <div class="text-sm font-black text-gray-700 dark:text-gray-200">
          KES {{ selectedBet?.possibleWin }}
        </div>
      </div>
    </div>
  </div>
  <div class="p-3">
    <div
      v-for="item in betDetails"
      :key="JSON.stringify(item)"
      class="border-b last:border-0 dark:border-dark-purple-23 py-3 w-full"
    >
      <div class="flex space-x-3 items-start w-full dark:text-gray-400">
        <div
          :class="[getColor('text', item.status)]"
          class="flex flex-col items-center justify-center font-black text-md leading-none"
        >
          <DateBox
            v-if="item.isLive == parseInt(0) && item.status == parseInt(1)"
            :date="item.date"
          />
          <LiveBox
            v-else
            :status-desc="item.periodicTime"
            :match-state="item.matchState"
            :is-live="item.isLive"
            :status="item.status"
          />
        </div>
        <div
          class="w-full flex justify-between gap-3"
          @click="goToMatchDetails(item, router, item.isLive)"
        >
          <div>
            <!-- <div class="flex justify-between text-xs">
              <div>ID:{{ item.betId }}</div>
              <div>{{ item.date }}</div>
              <BetIcon :status="item.status" />
            </div> -->
            <div
              class="flex flex-col text-xs font-bold text-gray-700 dark:text-slate-300"
            >
              <div class="flex gap-2">
                <div
                  v-if="showScores(item.isLive, item.status)"
                  class="text-amber-600"
                >
                  {{ homeScore(item.result) }}
                </div>
                {{ item.homeTeam }}
              </div>
              <!-- <div
                :class="[
                  homeWon(item.result) ? 'text-green-500' : '',
                  awayWon(item.result) ? 'text-red-500' : '',
                  isDraw(item.result)
                    ? 'text-slate-950 dark:text-slate-50'
                    : '',
                ]"
              >
                {{ homeScore(item.result) }}
              </div>
              <div>:</div>
              <div
                :class="[
                  homeWon(item.result) ? 'text-red-500' : '',
                  awayWon(item.result) ? 'text-green-500' : '',
                  isDraw(item.result)
                    ? 'text-slate-950 dark:text-slate-50'
                    : '',
                ]"
              >
                {{ awayScore(item.result) }}
              </div> -->
              <div class="flex gap-2">
                <div
                  v-if="showScores(item.isLive, item.status)"
                  class="text-amber-600"
                >
                  {{ awayScore(item.result) }}
                </div>
                {{ item.awayTeam }}
              </div>
            </div>
            <div class="flex gap-1 text-xs">
              <div class="text-green-600 font-semibold">
                {{ item.marketName }}
              </div>
              {{ item.specifiers }} <span class="text-lg leading-none">|</span>
              <div class="flex space-x-2 text-xs">
                <div>
                  Pick:
                  <span class="font-bold text-gray-700 dark:text-slate-200"
                    >{{ item.outcomeName }} {{ item.specifiers }}</span
                  >
                </div>
                <TwoUpIcon v-if="item?.twoGoalsUp" />
              </div>
            </div>

            <!-- <div
              class="flex text-xs font-light gap-1 w-full whitespace-normal break-words"
            >
              <SportsIcons :size="'h-4 w-4'" :icon="item.sportName" />
              |
              {{ item.sportName }}
              |
              {{ item.countryName }}

              |

              {{ item.competitionName }}
            </div> -->
          </div>

          <div class="flex flex-col justify-between items-end">
            <div class="flex items-center justify-between pb-1">
              <div
                :class="[
                  getColor('text', item.status),
                  'uppercase text-xs font-bold tracking-wider',
                ]"
              >
                {{ getStatusText(item.status) }}
              </div>
              <BetIcon class="h-4 w-4" :status="item.status" />
            </div>
            <div class="flex flex-col justify-between items-end">
              <div class="flex space-x-2 text-xs">
                <div>Odds:</div>
                <div class="font-black dark:text-gray-200">
                  {{ item.oddValue }}
                </div>
              </div>
              <div
                v-if="item.isLive"
                class="flex space-x-2 text-xs text-amber-600"
              >
                <div>live odds</div>
                <div class="font-black text-amber-600">
                  {{ item.currentOddValue }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-end">
        <OpenMatchStatButton :parent-match-id="item.parentMatchId" />
      </div>
    </div>
  </div>
</template>
