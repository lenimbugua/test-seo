<script setup>
import { useBetslipDataLayer } from "@/composables/useBetslipDataLayer";
import { useModalTypes } from "@/composables/useModalTypes";
import { useLoginStore } from "@/stores/login";
import { useModalStore } from "@/stores/modal";
import { DocumentTextIcon, UserIcon } from "@heroicons/vue/16/solid";
import {
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
  HomeIcon,
} from "@heroicons/vue/24/outline";
import { RouterLink, useRouter } from "vue-router";
import { useBetslipStore } from "../stores/sports-betslip.js";

// import BoostBonusStrip from "./BoostBonusStrip.vue";
// import BoostCard from "./BoostCard.vue";
// import OddPayoutStrip from "./OddPayoutStrip.vue";
// import OneCutStrip from "./OneCutStrip.vue";
import { ref, toRefs } from "vue";
import BoostBonusLevel from "./BoostBonusLevel.vue";
import OneCutStripLevel from "./OneCutStripLevel.vue";

const router = useRouter();

const showLevel = ref(true);

const { msisdn, token } = toRefs(useLoginStore());
const { betslipLength, totalOdds, possibleWin } = toRefs(useBetslipStore());
const { verifyBetslip } = useBetslipStore();
const { betslip } = useModalTypes();
const { openModal } = useModalStore();
const { addViewBetslipDataLayer } = useBetslipDataLayer();

function openBetslip() {
  verifyBetslip();
  openModal(betslip);
  addViewBetslipDataLayer();
}

function goToProfile() {
  if (!token.value && !msisdn.value) {
    router.push({ name: "login" });
    return;
  }
  router.push({ name: "profile" });
}
</script>

<template>
  <!------------Mobile Footer--------------->
  <div
    class="fixed bottom-0 w-full bg-gradient-to-t from-green-800 to-green-600 dark:bg-gray-800 px-2 py-2 block justify-between items-center z-50"
  >
    <div
      class="flex w-full bottom-3 justify-between items-center"
      @click="showLevel = !showLevel"
    >
      <div class="flex items-center gap-1">
        <ChevronDoubleDownIcon
          v-if="showLevel"
          class="text-green-100 h-7 w-7"
        />
        <ChevronDoubleUpIcon v-else class="text-green-100 h-7 w-7" />
        <div class="flex items-center text-xs gap-0.5">
          <span class="text-green-200">{{ totalOdds }}</span>
          <span class="text-green-300">odds</span>
        </div>
      </div>
      <div class="flex">
        <div class="flex items-center text-xs gap-0.5">
          <span class="text-green-200">{{ possibleWin }}</span>
          <span class="text-green-300">KES</span>
        </div>
        <ChevronDoubleDownIcon
          v-if="showLevel"
          class="text-green-100 h-7 w-7"
        />
        <ChevronDoubleUpIcon v-else class="text-green-100 h-7 w-7" />
      </div>
    </div>
    <div v-if="showLevel" class="cursor-pointer mb-7 mt-2">
      <!-- <BoostCard /> -->
      <BoostBonusLevel />
      <!-- <OneCutStrip /> -->
      <OneCutStripLevel />
    </div>
    <div class="flex w-full p-1.5 justify-between">
      <RouterLink :to="{ name: 'home' }" class="flex flex-col items-center">
        <span class="">
          <HomeIcon class="h-6 w-6 text-green-50" />
        </span>
        <span class="text-sm font-semibold text-slate-200">Home</span>
      </RouterLink>
      <RouterLink
        :to="{ name: 'join-affiliate' }"
        class="flex flex-col justify-center items-center"
      >
        <span class="relative">
          <span
            class="absolute -right-4 -top-1 p-0.5 px-1 rounded-lg border-red-600 bg-[#EF4444] text-[0.6rem] font-bold leading-none text-white"
            >HOT</span
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="text-green-50 w-6 h-6 fill-current"
            viewBox="0 0 24 24"
          >
            <!-- Icon from Tabler Icons by Paweł Kuna - https://github.com/tabler/tabler-icons/blob/master/LICENSE -->
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 7a4 4 0 1 0 8 0a4 4 0 0 0-8 0M3 21v-2a4 4 0 0 1 4-4h4c.96 0 1.84.338 2.53.901M16 3.13a4 4 0 0 1 0 7.75M16 19h6m-3-3v6"
            />
          </svg>
        </span>
        <span class="text-sm relative font-semibold text-slate-200">
          Affiliate
        </span>
      </RouterLink>

      <div
        class="flex flex-col justify-center items-center"
        @click="openBetslip"
      >
        <div
          class="flex z-[50] justify-center items-center icon -mt-7 w-12 h-12 rounded-full"
        >
          <span
            class="relative p-1.5 rounded-full bg-green-500/50 flex justify-center items-center"
          >
            <span
              class="animate-ping absolute inline-flex h-[1.8rem] w-[1.8rem] rounded-full bg-green-500"
            ></span>
            <span
              class="relative inline-flex text-lg text-white font-black items-center justify-center rounded-full h-10 w-10 bg-amber-500"
              >{{ betslipLength }}</span
            >
          </span>
        </div>
        <span class="text-sm mt-1 font-semibold text-slate-200">Betslip</span>
      </div>
      <RouterLink
        :to="{ name: 'my-bets' }"
        class="flex flex-col justify-center items-center"
      >
        <span class="">
          <DocumentTextIcon class="h-6 w-6 text-green-50" />
        </span>
        <span class="text-sm font-semibold text-slate-200">My Bets</span>
      </RouterLink>
      <!-- <RouterLink
        :to="{ name: 'promotions' }"
        class="flex flex-col justify-center items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 dark:text-slate-300 text-gray-600"
          viewBox="0 0 24 24"
        >
          <g
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            color="currentColor"
          >
            <path
              d="M14.926 2.911L8.274 6.105a2.43 2.43 0 0 1-1.617.182a8 8 0 0 0-.695-.14C4.137 5.94 3 7.384 3 9.045v.912c0 1.66 1.137 3.105 2.962 2.896a7 7 0 0 0 .695-.139a2.43 2.43 0 0 1 1.617.183l6.652 3.193c1.527.733 2.291 1.1 3.142.814c.852-.286 1.144-.899 1.728-2.125a12.17 12.17 0 0 0 0-10.556c-.584-1.226-.876-1.84-1.728-2.125c-.851-.286-1.615.08-3.142.814"
            ></path>
            <path
              d="M11.458 20.77L9.967 22c-3.362-2.666-2.951-3.937-2.951-9H8.15c.46 2.86 1.545 4.216 3.043 5.197c.922.604 1.112 1.876.265 2.574M7.5 12.5v-6"
            ></path>
          </g>
        </svg>
        <span class="text-sm font-semibold text-slate-200"
          >Promos</span
        >
      </RouterLink> -->
      <div
        class="flex flex-col cursor-pointer justify-center items-center"
        @click="goToProfile"
      >
        <span class="">
          <UserIcon class="h-6 w-6 text-green-50" />
        </span>
        <span class="text-sm font-semibold text-slate-200">Me</span>
      </div>
    </div>
  </div>
</template>
