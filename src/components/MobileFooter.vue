<script setup>
import { useBetslipDataLayer } from "@/composables/useBetslipDataLayer";
import { useModalTypes } from "@/composables/useModalTypes";
import { useLoginStore } from "@/stores/login";
import { useModalStore } from "@/stores/modal";
import { DocumentTextIcon, UserIcon } from "@heroicons/vue/16/solid";
import { storeToRefs } from "pinia";
import { RouterLink, useRouter } from "vue-router";
import { useBetslipStore } from "../stores/sports-betslip.js";
import BoostBonusStrip from "./BoostBonusStrip.vue";
// import BoostCard from "./BoostCard.vue";
import { TrophyIcon } from "@heroicons/vue/24/outline";
import OddPayoutStrip from "./OddPayoutStrip.vue";
import OneCutStrip from "./OneCutStrip.vue";
// import OpenBetsLength from "./OpenBetsLength.vue";

const router = useRouter();

const { msisdn, token } = storeToRefs(useLoginStore());
const { betslipLength } = storeToRefs(useBetslipStore());
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

function showIfRouteIncludes() {
  const routesToInclude = [
    "home",
    "sports",
    "match-details",
    "freebet",
    "country",
    "countries",
    "live",
    "leagues",
  ];
  return routesToInclude.includes(router.currentRoute.value.name);
}
</script>

<template>
  <!------------Mobile Footer--------------->
  <div
    class="block xl:hidden z-[50] fixed rounded-t-lg bg-gray-50 border border-gray-300 dark:border-black/5 shadow-lg dark:bg-[#1B1627] text-slate-400 text-md font-medium w-full bottom-0"
  >
    <div
      v-if="betslipLength > 0 && showIfRouteIncludes()"
      class="cursor-pointer bg-gradient-to-t from-green-800 to-green-600 rounded-t-lg"
      @click="openBetslip"
    >
      <!-- <BoostCard /> -->
      <BoostBonusStrip />
      <OneCutStrip />
      <OddPayoutStrip />
    </div>
    <div class="flex w-full p-1.5 justify-between">
      <RouterLink
        :to="{ name: 'home' }"
        class="flex flex-col w-1/5 items-center"
      >
        <span class="">
          <svg
            aria-label="Home"
            fill="currentColor"
            height="24"
            role="img"
            class="dark:text-slate-300 text-gray-600 w-6 h-6 fill-current"
            viewBox="0 0 24 24"
            width="24"
          >
            <title>Home</title>
            <path
              d="M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002 1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1Z"
            ></path>
          </svg>
        </span>
        <span class="text-xs font-semibold text-gray-700 dark:text-slate-200"
          >Home</span
        >
      </RouterLink>
      <RouterLink
        :to="{ name: 'leaderboard' }"
        class="flex flex-col w-1/5 justify-center items-center"
      >
        <span class="relative">
          <span
            class="absolute -right-5 -top-2.5 p-0.5 px-1 rounded-lg border-red-600 bg-[#EF4444] text-[0.6rem] font-bold leading-none text-white"
            >NEW</span
          >
          <TrophyIcon class="h-6 w-6 text-amber-500 dark:text-amber-400" />
        </span>
        <span
          class="text-xs relative font-semibold text-gray-700 dark:text-slate-200"
        >
          Leaderboard
        </span>
      </RouterLink>

      <div
        data-fly-target="betslip"
        class="flex flex-col w-1/5 justify-center items-center"
        @click="openBetslip"
      >
        <div
          class="flex z-[60] justify-center items-center icon -mt-8 w-12 h-12 rounded-full"
        >
          <span
            class="relative p-1.5 rounded-full bg-green-500/50 flex justify-center items-center"
          >
            <span
              class="animate-ping absolute inline-flex h-[1.8rem] w-[1.8rem] rounded-full bg-green-500"
            ></span>
            <span
              class="relative inline-flex text-xl text-white font-black items-center justify-center rounded-full h-10 w-10 bg-amber-500"
              >{{ betslipLength }}</span
            >
          </span>
        </div>
        <span
          class="text-xs mt-2 font-semibold text-gray-700 dark:text-slate-200"
          >Betslip</span
        >
      </div>
      <RouterLink
        :to="{ name: 'my-bets' }"
        class="flex flex-col w-1/5 justify-center items-center relative"
      >
        <span class="relative">
          <DocumentTextIcon class="h-6 w-6 dark:text-slate-300 text-gray-600" />
        </span>
        <span class="text-xs font-semibold text-gray-700 dark:text-slate-200"
          >My Bets</span
        >
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
        <span class="text-sm font-semibold text-gray-700 dark:text-slate-200"
          >Promos</span
        >
      </RouterLink> -->
      <div
        class="flex flex-col w-1/5 cursor-pointer justify-center items-center"
        @click="goToProfile"
      >
        <span class="">
          <UserIcon class="h-6 w-6 dark:text-slate-300 text-gray-600" />
        </span>
        <span class="text-xs font-semibold text-gray-700 dark:text-slate-200"
          >Me</span
        >
      </div>
    </div>
  </div>
</template>
