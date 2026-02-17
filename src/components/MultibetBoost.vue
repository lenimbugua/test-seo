<script setup>
import { useMultibetBonus } from "@/composables/useMultibetBonus";
import { useBetslip } from "@/composables/useBetslip";
import { toRefs } from "vue";
import { useBetslipStore } from "../stores/sports-betslip";

const { calculatePossibleWin } = useBetslip();

const { betslip, stake } = toRefs(useBetslipStore());

const {
  getCurrentBoost,
  getNextBoost,
  getLegsToNextBonus,
  calculateBoostBonus,
} = useMultibetBonus();
</script>
<template>
  <div
    class="p-1 text-xs space-y-0.5 bg-green-700 text-green-50 rounded-md leading-tight"
  >
    <div class="">
      <div class="flex items-center">
        <div class="relative aspect-[3/2] h-8 w-8 rounded-lg overflow-clip">
          <img
            class="top-0 right-0 left-0 bottom-0 object-cover h-full w-full"
            src="/bolt.png"
          />
          <!-- <div class="absolute top-0 left-0  text-2xl text-white font-black">{{ game.gameName }}</div> -->
        </div>
        <!-- <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          class="w-4 h-4 text-amber-500"
          viewBox="0 0 14 14"
        >
          <g fill="none">
            <path
              fill="currentColor"
              d="M4.657.626a.75.75 0 1 0-.804 1.267l.958.607H1.5C.778 2.5 0 2.989 0 3.806v1.416c0 .762.677 1.24 1.354 1.3l-.017.005h5.038V3.884h1.25v2.643h5.038l-.018-.006C13.324 6.461 14 5.984 14 5.222V3.806c0-.817-.778-1.306-1.5-1.306H9.189l.958-.607A.75.75 0 0 0 9.344.626L7 2.112zM13 7.777H7.625V14H11.5a1.5 1.5 0 0 0 1.5-1.5zm-6.625 0H1V12.5A1.5 1.5 0 0 0 2.5 14h3.875z"
            />
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.25"
              d="M9.197 3.38h-4.5"
            />
          </g>
        </svg> -->
        <div>
          <div v-if="getCurrentBoost() > 0">
            <span class="font-bold text-amber-500"
              >{{ getCurrentBoost() }}% Boost unlocked!</span
            >
            <span class="font-bold">
              (KSH
              {{
                calculateBoostBonus(
                  calculatePossibleWin(betslip, stake)
                ).toFixed("2")
              }}
              )
            </span>
          </div>
          <div>
            <div class="font-bold text-xs">
              Add {{ getLegsToNextBonus() }} more qualifying bet to get a
              <span class="text-amber-500 font-black"
                >{{ getNextBoost() }}%</span
              >
              boost!
            </div>
            <div class="text-xs">1.3 minimum odds per game</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
