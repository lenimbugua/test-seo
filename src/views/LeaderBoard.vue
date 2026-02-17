<script setup>
import EligibleCasinoGame from "@/components/leaderboard/EligibleCasinoGame.vue";
import {
  CalendarIcon,
  GiftIcon,
  PuzzlePieceIcon,
  TrophyIcon,
  ViewfinderCircleIcon,
} from "@heroicons/vue/24/outline";
import { computed, ref, toRefs } from "vue";
import { useLeaderboardStore } from "../stores/leaderboard";
import { useLoginStore } from "../stores/login";
import formatStuff from "../utilities/format-stuff";

const { formattedNumber, formCloudflareImage } = formatStuff();

const podiumImageId = "decc1027-a40f-4a67-01cf-fe902dd13400";

const store = useLeaderboardStore();
const { fetchLeaderboard, setSelected } = store;
const { isSelected, categories, pending, leaderboard } = toRefs(store);

const loginStore = useLoginStore();
const { msisdn } = toRefs(loginStore);

const myRank = computed(() => {
  if (!msisdn.value || !leaderboard.value?.length) return null;
  return leaderboard.value.find((p) => p.msisdn === msisdn.value) || null;
});

fetchLeaderboard();

const showHowPoints = ref(false);
const casinoSubTab = ref("leaderboard");

const getCurrentWeek = () => {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const daysPassed = Math.floor((now - startOfYear) / (24 * 60 * 60 * 1000));
  const weekNumber = Math.ceil((daysPassed + startOfYear.getDay() + 1) / 7);
  return weekNumber.toString().padStart(2, "0");
};

const firstPlace = computed(() => leaderboard.value?.[0]);
const secondPlace = computed(() => leaderboard.value?.[1]);
const thirdPlace = computed(() => leaderboard.value?.[2]);

const tablePlayers = computed(() => {
  if (!leaderboard.value?.length) return [];
  return leaderboard.value.slice(3);
});

const handleTabChange = (category) => {
  setSelected(category);
  casinoSubTab.value = "leaderboard";
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-black/20 pb-6">
    <!-- Title + Tabs -->
    <div
      class="px-3 sm:px-4 py-2 sm:py-3 flex items-start justify-between gap-2"
    >
      <div>
        <h1 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
          Leaderboards
        </h1>
        <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          Compete for the top spot and win
          <span class="text-[#2D9B00] dark:text-[#57CC05] font-semibold"
            >KES 150,000 Weekly!</span
          >
        </p>
      </div>
      <div
        class="relative inline-grid grid-cols-2 bg-white dark:bg-dark-purple-19 rounded-md border border-gray-200 dark:border-dark-purple-17 p-0.5 shrink-0"
      >
        <div
          class="absolute top-0.5 bottom-0.5 rounded bg-[#2D9B00] dark:bg-[#57CC05] transition-all duration-300 ease-in-out"
          :style="{
            left: isSelected(categories[0]) ? '2px' : '50%',
            width: 'calc(50% - 2px)',
          }"
        />
        <button
          :class="[
            'relative z-10 flex items-center justify-center gap-1 px-3 py-1 rounded text-xs font-semibold transition-colors whitespace-nowrap',
            isSelected(categories[0])
              ? 'text-white'
              : 'text-gray-500 dark:text-gray-400',
          ]"
          @click="handleTabChange(categories[0])"
        >
          <!-- Soccer ball icon -->
          <svg
            class="w-3.5 h-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path
              d="M12 2l3 7h-6l3-7z M2.5 9.5l6.5 2-4 5.5z M21.5 9.5l-6.5 2 4 5.5z M7 21l2-6.5h6l2 6.5z"
            />
          </svg>
          <span>Sport</span>
        </button>
        <button
          :class="[
            'relative z-10 flex items-center justify-center gap-1 px-3 py-1 rounded text-xs font-semibold transition-colors whitespace-nowrap',
            isSelected(categories[1])
              ? 'text-white'
              : 'text-gray-500 dark:text-gray-400',
          ]"
          @click="handleTabChange(categories[1])"
        >
          <!-- Spade icon -->
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12 2C12 2 4 10 4 14a4 4 0 004 4c1.5 0 2.8-.8 3.5-2-.2 1.8-.8 3.5-1.5 4h4c-.7-.5-1.3-2.2-1.5-4 .7 1.2 2 2 3.5 2a4 4 0 004-4c0-4-8-12-8-12z"
            />
          </svg>
          <span>Casino</span>
        </button>
      </div>
    </div>

    <!-- How Points + Banner (flex row on large screens) -->
    <div class="mx-3 sm:mx-4 mb-2 sm:mb-4 flex flex-row gap-2 sm:gap-3">
      <!-- How Points Are Calculated -->
      <div
        class="bg-white dark:bg-dark-purple-19 rounded-lg p-2.5 sm:p-3 border border-gray-200 dark:border-dark-purple-17 cursor-pointer flex-1 min-w-0"
        @click="showHowPoints = !showHowPoints"
      >
        <div class="flex items-start justify-between">
          <div>
            <div
              class="flex items-center gap-1.5 text-[#2D9B00] dark:text-[#57CC05] text-xs sm:text-sm font-semibold mb-0.5"
            >
              <span><LightBulbIcon /></span> How Points Are Calculated
            </div>
            <p
              v-if="isSelected(categories[0])"
              class="text-xs text-gray-500 dark:text-gray-400 leading-relaxed"
            >
              Place a multibet with
              <span class="font-bold">3+ selections</span>, each at odds of
              <span class="font-bold">1.6</span> or higher, and earn
              <span class="text-[#2D9B00] dark:text-[#57CC05]">1 point</span>
              for every <span class="font-bold">KES 20</span> you stake.
            </p>
            <p
              v-if="isSelected(categories[1])"
              class="text-xs text-gray-500 dark:text-gray-400 leading-relaxed"
            >
              Play with a <span class="font-bold">2x</span> multiplier or higher
              and stake at least <span class="font-bold">KES 20</span> to earn
              <span class="text-[#2D9B00] dark:text-[#57CC05]">1 point</span>
              per wager.
            </p>
          </div>
        </div>
      </div>

      <!-- Banner -->
      <div
        class="rounded-lg bg-gradient-to-r from-[#2D9B00]/20 via-amber-500/20 to-[#2D9B00]/20 dark:from-[#57CC05]/30 dark:via-amber-900/30 dark:to-[#57CC05]/30 p-2.5 sm:p-4 flex items-center justify-between border border-[#2D9B00]/20 dark:border-[#57CC05]/10 flex-1 min-w-0"
      >
        <div>
          <p class="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">
            Earn Points, Climb the Leaderboard!
          </p>
          <p
            class="text-xs sm:text-sm font-bold text-[#2D9B00] dark:text-[#57CC05]"
          >
            Win KES 150,000 Weekly!
          </p>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div
      v-if="pending"
      class="flex space-x-2 justify-center items-center w-full p-6 sm:p-10 h-32 sm:h-48"
    >
      <span class="sr-only">Loading...</span>
      <div
        class="h-3 w-3 bg-[#2D9B00] dark:bg-[#57CC05] rounded-full animate-bounce [animation-delay:-0.3s]"
      ></div>
      <div
        class="h-3 w-3 bg-purple-600 rounded-full animate-bounce [animation-delay:-0.15s]"
      ></div>
      <div class="h-3 w-3 bg-amber-500 rounded-full animate-bounce"></div>
    </div>

    <template v-else>
      <!-- Info Cards -->
      <div class="mx-3 sm:mx-4 mb-3 sm:mb-6 grid grid-cols-3 gap-1.5 sm:gap-2">
        <div
          class="bg-white dark:bg-dark-purple-19 rounded-lg p-2 sm:p-3 border border-gray-200 dark:border-dark-purple-17"
        >
          <div class="flex items-center gap-1 mb-1">
            <div
              class="w-4 h-4 rounded bg-gray-100 dark:bg-dark-purple-17 flex items-center justify-center shrink-0"
            >
              <CalendarIcon
                class="w-2.5 h-2.5 text-gray-500 dark:text-gray-400"
              />
            </div>
            <p
              class="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 leading-none"
            >
              Period
            </p>
          </div>
          <p class="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">
            2026, Wk {{ getCurrentWeek() }}
          </p>
        </div>
        <div
          class="bg-white dark:bg-dark-purple-19 rounded-lg p-2 sm:p-3 border border-gray-200 dark:border-dark-purple-17"
        >
          <div class="flex items-center gap-1 mb-1">
            <div
              class="w-4 h-4 rounded bg-[#2D9B00]/10 dark:bg-[#57CC05]/10 flex items-center justify-center shrink-0"
            >
              <ViewfinderCircleIcon
                class="w-2.5 h-2.5 text-[#2D9B00] dark:text-[#57CC05]"
              />
            </div>
            <p
              class="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 leading-none"
            >
              Min Points
            </p>
          </div>
          <p
            class="text-xs sm:text-sm font-bold text-[#2D9B00] dark:text-[#57CC05]"
          >
            5 Points
          </p>
        </div>
        <div
          class="bg-white dark:bg-dark-purple-19 rounded-lg p-2 sm:p-3 border border-[#2D9B00]/50 dark:border-[#57CC05]/50 shadow-[0_0_12px_rgba(45,155,0,0.25)] dark:shadow-[0_0_12px_rgba(87,204,5,0.2)]"
        >
          <div class="flex items-center gap-1 mb-1">
            <div
              class="w-4 h-4 rounded bg-[#2D9B00]/10 dark:bg-[#57CC05]/10 flex items-center justify-center shrink-0"
            >
              <GiftIcon
                class="w-2.5 h-2.5 text-[#2D9B00] dark:text-[#57CC05]"
              />
            </div>
            <p
              class="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 leading-none"
            >
              Weekly Prize
            </p>
          </div>
          <p
            class="text-xs sm:text-sm font-bold text-[#2D9B00] dark:text-[#57CC05]"
          >
            KES 150,000
          </p>
        </div>
      </div>

      <!-- My Rank -->
      <div
        v-if="myRank"
        class="mx-3 sm:mx-4 mb-3 sm:mb-4 bg-gradient-to-r from-[#2D9B00]/10 to-emerald-500/10 dark:from-[#57CC05]/15 dark:to-emerald-900/15 rounded-lg p-3 sm:p-4 border border-[#2D9B00]/30 dark:border-[#57CC05]/30"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#2D9B00] dark:bg-[#57CC05] flex items-center justify-center text-white dark:text-gray-900 font-bold text-sm sm:text-lg shadow-md"
            >
              #{{ myRank.position }}
            </div>
            <div>
              <p
                class="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide"
              >
                My Rank
              </p>
              <p
                class="text-sm sm:text-base font-bold text-gray-900 dark:text-white"
              >
                {{ myRank.msisdn }}
              </p>
            </div>
          </div>
          <div class="text-right">
            <p class="text-xs text-gray-500 dark:text-gray-400">Points</p>
            <p
              class="text-sm sm:text-base font-bold text-[#2D9B00] dark:text-[#57CC05]"
            >
              {{ myRank.points }}
            </p>
            <p
              v-if="myRank.prizeAmount"
              class="text-xs font-semibold text-amber-600 dark:text-amber-400"
            >
              {{ formattedNumber(myRank.prizeAmount) }} KES
            </p>
          </div>
        </div>
      </div>

      <!-- Casino Sub-Tabs -->
      <div
        v-if="isSelected(categories[1])"
        class="mx-3 sm:mx-4 mb-2 sm:mb-4 flex justify-end"
      >
        <div
          class="relative inline-grid grid-cols-2 bg-white dark:bg-dark-purple-19 rounded-md border border-gray-200 dark:border-dark-purple-17 p-0.5"
        >
          <!-- Sliding indicator -->
          <div
            class="absolute top-0.5 bottom-0.5 rounded bg-[#2D9B00] dark:bg-[#57CC05] transition-all duration-300 ease-in-out"
            :style="{
              left: casinoSubTab === 'leaderboard' ? '2px' : '50%',
              width: 'calc(50% - 2px)',
            }"
          />

          <button
            class="relative z-10 flex items-center justify-center gap-1 px-3 py-1 rounded text-xs font-semibold transition-colors whitespace-nowrap"
            :class="
              casinoSubTab === 'leaderboard'
                ? 'text-white'
                : 'text-gray-500 dark:text-gray-400'
            "
            @click="casinoSubTab = 'leaderboard'"
          >
            <TrophyIcon class="w-3.5 h-3.5" />
            <span>Leaderboard</span>
          </button>

          <button
            class="relative z-10 flex items-center justify-center gap-1 px-3 py-1 rounded text-xs font-semibold transition-colors whitespace-nowrap"
            :class="
              casinoSubTab === 'games'
                ? 'text-white'
                : 'text-gray-500 dark:text-gray-400'
            "
            @click="casinoSubTab = 'games'"
          >
            <PuzzlePieceIcon class="w-3.5 h-3.5" />
            <span>Eligible Games</span>
          </button>
        </div>
      </div>

      <!-- Eligible Games (Casino only) -->
      <div
        v-if="isSelected(categories[1]) && casinoSubTab === 'games'"
        class="mx-3 sm:mx-4"
      >
        <EligibleCasinoGame />
      </div>

      <!-- Podium + Table -->
      <template
        v-if="isSelected(categories[0]) || casinoSubTab === 'leaderboard'"
      >
        <!-- Podium Section -->
        <div
          v-if="leaderboard && leaderboard.length >= 3"
          class="mx-3 sm:mx-4 mb-2 sm:mb-6"
        >
          <!-- Podium Image + Overlaid Player Details -->
          <div
            class="relative overflow-hidden rounded-lg max-w-sm sm:max-w-md mx-auto"
          >
            <img
              :src="formCloudflareImage(podiumImageId)"
              alt="Leaderboard Podium"
              class="w-full object-cover"
            />

            <!-- Player details pinned to bottom of image -->
            <div
              class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent pt-8 sm:pt-12 pb-2 sm:pb-3 px-1"
            >
              <div class="grid grid-cols-3 gap-0.5">
                <!-- 2nd Place -->
                <div class="text-center">
                  <div
                    class="inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full text-[10px] sm:text-xs font-bold text-gray-900 bg-gradient-to-br from-gray-200 to-gray-400 mb-0.5"
                  >
                    2
                  </div>
                  <p
                    class="text-[10px] sm:text-xs font-semibold text-white/90 truncate px-1"
                  >
                    {{ secondPlace?.msisdn }}
                  </p>
                  <p class="text-[10px] sm:text-xs font-bold text-gray-300">
                    {{ formattedNumber(secondPlace?.prizeAmount) }} KES
                  </p>
                </div>

                <!-- 1st Place -->
                <div class="text-center">
                  <div
                    class="inline-flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full text-xs sm:text-sm font-bold text-gray-900 bg-gradient-to-br from-yellow-300 to-amber-500 mb-0.5 ring-2 ring-yellow-400/50"
                  >
                    1
                  </div>
                  <p
                    class="text-[11px] sm:text-sm font-bold text-white truncate px-1"
                  >
                    {{ firstPlace?.msisdn }}
                  </p>
                  <p class="text-[11px] sm:text-sm font-bold text-yellow-400">
                    {{ formattedNumber(firstPlace?.prizeAmount) }} KES
                  </p>
                </div>

                <!-- 3rd Place -->
                <div class="text-center">
                  <div
                    class="inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full text-[10px] sm:text-xs font-bold text-gray-900 bg-gradient-to-br from-orange-300 to-amber-600 mb-0.5"
                  >
                    3
                  </div>
                  <p
                    class="text-[10px] sm:text-xs font-semibold text-white/90 truncate px-1"
                  >
                    {{ thirdPlace?.msisdn }}
                  </p>
                  <p class="text-[10px] sm:text-xs font-bold text-amber-400">
                    {{ formattedNumber(thirdPlace?.prizeAmount) }} KES
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Taglines -->
          <div class="text-center mt-2 sm:mt-3">
            <p
              class="font-semibold text-xs sm:text-sm text-gray-900 dark:text-white"
            >
              Claim Your winnings weekly
            </p>
            <p
              class="text-[#2D9B00] dark:text-[#57CC05] text-xs sm:text-sm font-medium"
            >
              Each stake brings you closer to the top
            </p>
          </div>
        </div>

        <!-- Leaderboard Table (Rank 4+) -->
        <div
          v-if="tablePlayers.length"
          class="mx-3 sm:mx-4 mb-3 sm:mb-6 bg-white dark:bg-dark-purple-19 rounded-lg border border-gray-200 dark:border-dark-purple-17 overflow-hidden"
        >
          <!-- Table Header -->
          <div
            class="grid grid-cols-4 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-[#2D9B00] dark:text-[#57CC05] bg-gray-50 dark:bg-dark-purple-18"
          >
            <span>Rank</span>
            <span>Player</span>
            <span class="text-center">Points</span>
            <span class="text-right">Prize</span>
          </div>
          <!-- Table Rows -->
          <div
            v-for="player in tablePlayers"
            :key="player.msisdn"
            :class="[
              'grid grid-cols-4 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm border-t items-center transition-colors',
              msisdn && player.msisdn === msisdn
                ? 'bg-[#2D9B00]/10 dark:bg-[#57CC05]/10 border-[#2D9B00]/30 dark:border-[#57CC05]/30 ring-1 ring-inset ring-[#2D9B00]/20 dark:ring-[#57CC05]/20'
                : 'border-gray-100 dark:border-dark-purple-17 hover:bg-gray-50 dark:hover:bg-dark-purple-18',
            ]"
          >
            <span class="font-bold text-gray-900 dark:text-white">
              {{ player.position }}
            </span>
            <span class="font-medium text-gray-700 dark:text-gray-300">
              {{ player.msisdn }}
            </span>
            <span class="text-center text-gray-600 dark:text-gray-400">
              {{ player.points }}
            </span>
            <span
              class="text-right font-semibold text-amber-600 dark:text-amber-400"
            >
              <template v-if="player.prizeAmount">
                {{ formattedNumber(player.prizeAmount) }}
              </template>
              <template v-else>-</template>
            </span>
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-if="!leaderboard || leaderboard.length === 0"
          class="mx-3 sm:mx-4 mb-3 sm:mb-6 text-center py-8 sm:py-12"
        >
          <p class="text-gray-500 dark:text-gray-400 text-sm">
            No leaderboard data available yet. Start playing to see rankings!
          </p>
        </div>
      </template>
    </template>

    <!-- Footer Note -->
    <div class="text-center px-3 sm:px-4">
      <p class="text-sm text-gray-500 dark:text-gray-400">
        Leaderboard updates in real-time. Keep wagering to climb to the top!
      </p>
    </div>
  </div>
</template>
