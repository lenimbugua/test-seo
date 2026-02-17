<script setup>
import { CheckCircleIcon, ShareIcon } from "@heroicons/vue/24/solid";
import { vConfetti } from "@neoconfetti/vue";
import {
  //   onBeforeUnmount,
  ref,
  //  nextTick,
  toRefs,
} from "vue";
import { useCasinoStore } from "../stores/casino";
import { useBetslipStore } from "../stores/sports-betslip";
import ClickToDeposit from "./ClickToDeposit.vue";
import PepetaGame from "./PepetaGame.vue";

const { afterBetDetails } = toRefs(useBetslipStore());
// const { clearAfterBetDetails } = useBetslipStore();
const { setLaunchGameId } = useCasinoStore();
const aviatorGameId = import.meta.env.VITE_AVIATOR_GAME_ID;
setLaunchGameId(aviatorGameId);

const showGame = ref(false);
const gameSection = ref(null);

function setShowGameTrue() {
  showGame.value = true;
}

// onBeforeUnmount(() => {
//   clearAfterBetDetails();
// });
</script>
<template>
  <div class="flex justify-center bg-white dark:bg-[#241E34]">
    <div v-confetti="{ particleCount: 200, force: 0.3 }" />
  </div>
  <div class="p-1 flex flex-col gap-y-2">
    <div
      class="relative rounded-xl shadow-3xl p-2 border dark:shadow-xl dark:border-dark-purple-23"
    >
      <div class="w-full flex justify-center">
        <div class="p-1.5 bg-[#56CB05]/20 rounded-full">
          <CheckCircleIcon class="w-10 h-10 mx-auto text-[#58CC03]" />
        </div>
      </div>
      <h4 class="text-lg text-center font-bold text-[#58CC03]">
        Your bet has been placed
      </h4>
      <div class="text-xs text-gray-600 dark:text-slate-300 py-1.5">
        <div class="flex justify-between items-center">
          <div>Stake</div>
          <div>KES {{ afterBetDetails.stake }}</div>
        </div>
        <div class="flex justify-between items-center">
          <div>Potential winnings</div>
          <div>KES {{ afterBetDetails.possibleWin }}</div>
        </div>
      </div>
      <div class="flex w-full gap-4">
        <ShareBet
          class="bg-[#FFB002] w-1/2 rounded-md p-1 text-md font-medium flex justify-center"
          :bet-id="parseInt(afterBetDetails.betId)"
        >
          <button class="flex justify-center gap-1 items-center w-full">
            <ShareIcon class="h-4 w-4" />

            Share
          </button>
        </ShareBet>
        <button class="bg-[#58CC03] w-1/2 rounded-md p-1 flex justify-center">
          <TheRebet :bet-id="parseInt(afterBetDetails.betId)" />
        </button>
      </div>
    </div>
    <div v-if="!showGame" class="rounded-xl pt-0">
      <!-- <h4 class="text-gray-700 dark:text-slate-400 text-center py-1 font-bold">
        Trending
      </h4> -->
      <BetBuilderTabSection />
    </div>
    <div
      v-if="showGame"
      ref="gameSection"
      class="flex-grow rounded-xl pt-0 border dark:shadow-xl dark:border-dark-purple-23 overflow-clip"
    >
      <ClickToDeposit />
      <div class="p-2 pb-40">
        <PepetaGame />
      </div>
    </div>

    <div
      v-else
      class="relative flex-grow rounded-md overflow-clip cursor-pointer border border-[#FACC15] shadow-[0_0_10px_#FACC15] hover:shadow-[0_0_25px_#FACC15] transition-all duration-300"
      @click="setShowGameTrue()"
    >
      <div class="absolute w-full top-5 flex justify-center">
        <button
          class="relative inline-flex items-center justify-center px-8 py-3 text-lg font-bold text-[#241E34] rounded-full bg-gradient-to-r from-[#FFB002] to-[#FFB002]/80 shadow-[0_0_15px_rgba(250,204,21,0.6)] transition-all duration-300 ease-out hover:scale-110 hover:rotate-1 hover:shadow-[0_0_25px_rgba(250,204,21,0.8)] active:scale-95 animate-playful"
        >
          Click to multiply your winnings!
        </button>
      </div>
      <img
        src="https://imagedelivery.net/ZY5OwFLlTE2ePHl_IE20jg/454bcfed-784b-47d2-ac1e-d9138972aa00/public"
        alt="Betting excitement"
      />
    </div>
  </div>
</template>

<style scoped>
@keyframes playful {
  0%,
  100% {
    transform: translateY(0) rotate(0deg) scale(1);
  }
  25% {
    transform: translateY(-4px) rotate(-2deg) scale(1.05);
  }
  50% {
    transform: translateY(2px) rotate(2deg) scale(0.98);
  }
  75% {
    transform: translateY(-3px) rotate(-1deg) scale(1.03);
  }
}

.animate-playful {
  animation: playful 2.5s ease-in-out infinite;
}
</style>
