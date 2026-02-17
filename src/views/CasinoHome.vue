<script setup>
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import { storeToRefs } from "pinia";
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import CasinoCategoryPills from "../components/casino/CasinoCategoryPills.vue";
import CasinoGameCard from "../components/casino/CasinoGameCard.vue";
import CasinoGameCarousel from "../components/casino/CasinoGameCarousel.vue";
import CasinoHeroBanner from "../components/casino/CasinoHeroBanner.vue";

import { useHead } from "@unhead/vue";
import { useCasino } from "../composables/useCasino";
import { useCasinoStore } from "../stores/casino";
import { useLeaderboardStore } from "../stores/leaderboard";

const { launchCasino } = useCasino();
const casinoStore = useCasinoStore();
const leaderboardStore = useLeaderboardStore();
const { categoriesWithGames, categoriesLoading } = storeToRefs(casinoStore);

onMounted(() => {
  casinoStore.fetchCategoriesWithGames();
  leaderboardStore.fetchEligibleGames();
});

const route = useRoute();
const router = useRouter();

const searchTerm = ref("");
const searchOpen = ref(false);
const selectedCategory = ref("all");
const searchInputRef = ref(null);

// Map API category name to routeName for game launching
function getRouteName(categoryName) {
  const lower = categoryName.toLowerCase();
  if (lower.includes("crash")) return "crash-games";
  if (lower.includes("virtual")) return "virtuals-games";
  return "casino";
}

// Map category name to display icon
function getCategoryIcon(name) {
  const lower = name.toLowerCase();
  if (lower.includes("crash")) return "🚀";
  if (lower.includes("slot")) return "🎰";
  if (lower.includes("live")) return "🎥";
  if (lower.includes("table")) return "🃏";
  if (lower.includes("virtual")) return "⚽";
  if (lower.includes("roulette")) return "🎡";
  if (lower.includes("baccarat")) return "🎴";
  return "🎮";
}

// Map category to pill slug for navigation
function getCategorySlug(cat) {
  const slug = cat.name.toLowerCase().replace(/\s+/g, "_");
  const mapped = {
    crash_game: "crash",
    slots: "slots",
    live_casino: "live",
    table_games: "table",
    virtuals: "virtuals",
    roulette: "roulette",
    baccarat: "baccarat",
    top_games: "top",
    popular_games: "top",
    other: "other",
  };
  return mapped[slug] || slug;
}

// All games flattened, deduplicated & sorted by priority
const masterGames = computed(() => {
  const map = new Map();
  categoriesWithGames.value.forEach((cat) => {
    const routeName = getRouteName(cat.name);
    cat.games.forEach((g) => {
      if (!map.has(g.id)) map.set(g.id, { ...g, routeName });
    });
  });
  return Array.from(map.values()).sort(
    (a, b) => (b.priority ?? 0) - (a.priority ?? 0)
  );
});

// Dynamic categories from API with games sorted by priority
const sortedCategories = computed(() => {
  return categoriesWithGames.value.map((cat) => {
    const routeName = getRouteName(cat.name);
    const sortedGames = [...cat.games]
      .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))
      .map((g) => ({ ...g, routeName }));
    return {
      ...cat,
      games: sortedGames,
      icon: getCategoryIcon(cat.name),
      slug: getCategorySlug(cat),
    };
  });
});

// Search results (live as you type)
const searchResults = computed(() => {
  if (!searchTerm.value.trim()) return [];
  const term = searchTerm.value.toLowerCase();
  return masterGames.value.filter(
    (g) =>
      g.gameName.toLowerCase().includes(term) ||
      (g.providerName && g.providerName.toLowerCase().includes(term))
  );
});

const isSearching = computed(() => searchTerm.value.trim().length > 0);

// Dynamic category pills from API
const categoryPills = computed(() => {
  const pills = [{ id: "all", name: "All" }];
  categoriesWithGames.value.forEach((cat) => {
    const slug = cat.name.toLowerCase().replace(/\s+/g, "_");
    const mapped = {
      crash_game: "crash",
      slots: "slots",
      live_casino: "live",
      table_games: "table",
      virtuals: "virtuals",
      roulette: "roulette",
      baccarat: "baccarat",
      top_games: "top",
      popular_games: "top",
      other: "other",
    };
    const id = mapped[slug] || slug;
    pills.push({ id, name: cat.name, apiId: cat.id });
  });
  return pills;
});

// React to category query param changes (including initial navigation)
watch(
  () => route.query.category,
  (cat) => {
    if (cat) {
      selectedCategory.value = cat;
    }
  },
  { immediate: true }
);

// Keep canonical URL in sync with the active category
const canonicalUrl = computed(() => {
  const base = "https://hakibets.com/casino-home";
  const cat = route.query.category;
  return cat ? `${base}?category=${cat}` : base;
});

useHead({
  link: [{ rel: "canonical", href: canonicalUrl }],
});

const activeGridGames = computed(() => {
  const cat = sortedCategories.value.find(
    (c) => c.slug === selectedCategory.value
  );
  return cat ? cat.games : [];
});

const activeGridLabel = computed(() => {
  const cat = sortedCategories.value.find(
    (c) => c.slug === selectedCategory.value
  );
  if (cat) return cat.name;
  const pill = categoryPills.value.find((p) => p.id === selectedCategory.value);
  return pill ? pill.name : "Games";
});

// Category filter mode
function onCategorySelect(id) {
  selectedCategory.value = id;
  searchTerm.value = "";
  searchOpen.value = false;

  // Sync URL query — "all" is the default so keep the URL clean
  const query = id && id !== "all" ? { category: id } : {};
  router.replace({ name: "casino-home", query });

  nextTick(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  });
}

function playGame(game) {
  launchCasino(game.id, game.gameName, game.routeName);
  searchOpen.value = false;
  searchTerm.value = "";
}

function openSearch() {
  searchOpen.value = true;
  nextTick(() => {
    searchInputRef.value?.focus();
  });
}

function closeSearch() {
  searchOpen.value = false;
  searchTerm.value = "";
}

// Leaderboard eligible games from the dedicated API endpoint
const leaderboardGames = computed(() => {
  return leaderboardStore.eligibleGames.map((g) => ({
    ...g,
    routeName: "casino",
  }));
});
</script>

<template>
  <div class="min-h-screen">
    <div class="sticky top-0 z-[60] bg-white dark:bg-[#241E34]">
      <TheDepositBar class="md:hidden" />
      <HeaderLinks />
    </div>

    <div class="w-full bg-gray-50 dark:bg-[#241E31]">
      <div class="max-w-[1280px] mx-auto px-3 md:px-5 pt-4 pb-20">
        <!-- Hero Banner Carousel -->
        <CasinoHeroBanner />

        <!-- Category Tabs + Inline Search Row -->
        <div class="relative z-30 mb-5">
          <div class="flex items-center gap-2 overflow-hidden">
            <!-- Search: collapsed icon (left) / expanded full-width input -->
            <div
              :class="[
                'flex items-center transition-all duration-300 ease-in-out',
                searchOpen ? 'flex-1 min-w-0' : 'flex-shrink-0',
              ]"
            >
              <!-- Collapsed: search icon -->
              <button
                v-if="!searchOpen"
                class="flex items-center justify-center w-9 h-9 rounded-full border border-gray-300 dark:border-[#2a2a4a] hover:border-gray-400 dark:hover:border-[#444466] hover:bg-gray-100 dark:hover:bg-[#1a1a2e] transition-all"
                @click="openSearch"
              >
                <MagnifyingGlassIcon
                  class="w-4 h-4 text-gray-400 dark:text-[#8888aa]"
                />
              </button>

              <!-- Expanded: full-width search input -->
              <div
                v-else
                class="flex items-center flex-1 bg-white dark:bg-[#13132a] rounded-full border border-gray-300 dark:border-[#2a2a4a] focus-within:border-[#2CB14A]/50 transition-colors"
              >
                <MagnifyingGlassIcon
                  class="w-4 h-4 ml-3.5 text-gray-400 dark:text-[#555577] flex-shrink-0"
                />
                <input
                  ref="searchInputRef"
                  v-model="searchTerm"
                  type="search"
                  placeholder="Search games or providers..."
                  class="flex-1 bg-transparent py-2 px-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-[#555577] outline-none"
                />
                <button
                  class="mr-1.5 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-[#1e1e3a] transition-colors"
                  @click="closeSearch"
                >
                  <XMarkIcon
                    class="w-4 h-4 text-gray-400 dark:text-[#6b6b8a]"
                  />
                </button>
              </div>
            </div>

            <!-- Category pills — pushed right & hidden when search opens -->
            <div
              :class="[
                'flex-1 min-w-0 transition-all duration-300 ease-in-out',
                searchOpen
                  ? 'translate-x-full opacity-0 max-w-0 overflow-hidden'
                  : 'translate-x-0 opacity-100 max-w-full',
              ]"
            >
              <CasinoCategoryPills
                :active-category="selectedCategory"
                :categories="categoryPills"
                @select="onCategorySelect"
              />
            </div>
          </div>

          <!-- Search Results Dropdown -->
          <div
            v-if="searchOpen && isSearching"
            class="absolute left-0 right-0 top-full bg-white dark:bg-[#1a1a2e] border border-t-0 border-gray-200 dark:border-[#222244] rounded-b-lg shadow-2xl shadow-black/10 dark:shadow-black/60 max-h-[400px] overflow-y-auto z-40"
          >
            <div v-if="searchResults.length > 0">
              <div
                class="px-4 py-2 border-b border-gray-200 dark:border-[#222244]"
              >
                <span
                  class="text-gray-500 dark:text-[#6b6b8a] text-xs font-medium"
                >
                  {{ searchResults.length }} results
                </span>
              </div>
              <div
                v-for="game in searchResults.slice(0, 12)"
                :key="game.id"
                class="flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-[#222244] cursor-pointer transition-colors"
                @mousedown.prevent="playGame(game)"
              >
                <div
                  class="w-10 h-10 rounded-md overflow-hidden bg-gray-100 dark:bg-[#13132a] flex-shrink-0"
                >
                  <img
                    :src="game.imgFullUrl"
                    :alt="game.gameName"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div class="flex-1 min-w-0">
                  <p
                    class="text-gray-900 dark:text-white text-sm font-medium truncate"
                  >
                    {{ game.gameName }}
                  </p>
                  <p class="text-gray-400 dark:text-[#555577] text-xs truncate">
                    {{ game.providerName }}
                  </p>
                </div>
                <span
                  class="text-[#2CB14A] text-xs font-semibold flex-shrink-0"
                >
                  Play
                </span>
              </div>
              <div
                v-if="searchResults.length > 12"
                class="px-4 py-2.5 text-center border-t border-gray-200 dark:border-[#222244]"
              >
                <span class="text-gray-400 dark:text-[#555577] text-xs">
                  +{{ searchResults.length - 12 }} more results
                </span>
              </div>
            </div>
            <div v-else class="flex flex-col items-center py-8">
              <MagnifyingGlassIcon
                class="w-8 h-8 text-gray-300 dark:text-[#333355] mb-2"
              />
              <p class="text-gray-500 dark:text-[#6b6b8a] text-sm">
                No games found
              </p>
            </div>
          </div>
        </div>

        <!-- Click-away overlay when search is open -->
        <div
          v-if="searchOpen"
          class="fixed inset-0 z-20"
          @click="closeSearch"
        />

        <!-- Skeleton loader -->
        <div v-if="categoriesLoading" class="space-y-6">
          <div v-for="section in 3" :key="section">
            <div class="flex items-center gap-2 mb-3 px-1">
              <div
                class="w-20 h-5 rounded-md bg-gray-200 dark:bg-[#2a2445] animate-pulse"
              />
            </div>
            <div class="flex space-x-3 overflow-hidden">
              <div
                v-for="card in 6"
                :key="card"
                class="flex-shrink-0 w-[120px] sm:w-[180px]"
              >
                <div
                  class="aspect-[4/3] rounded-xl bg-gray-200 dark:bg-[#2a2445] animate-pulse"
                />
                <div
                  class="mt-1.5 h-3 w-3/4 rounded bg-gray-200 dark:bg-[#2a2445] animate-pulse"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- ALL: Show all carousel sections stacked -->
        <template v-else-if="selectedCategory === 'all'">
          <!-- First API category carousel (before leaderboard banner) -->
          <CasinoGameCarousel
            v-if="sortedCategories[0]"
            :title="sortedCategories[0].name"
            icon="🔥"
            :games="sortedCategories[0].games"
            show-rank
            @play="playGame"
            @see-all="onCategorySelect(sortedCategories[0].slug)"
          />

          <!-- Jackpot / Leaderboard Banner — Premium Redesign -->
          <section
            class="leaderboard-banner relative mb-3 sm:mb-6 rounded-xl md:rounded-2xl overflow-hidden"
          >
            <!-- Vivid gradient background -->
            <div
              class="absolute inset-0 bg-gradient-to-br from-[#4C1D95] via-[#1E1B4B] to-[#0E7490]"
            />
            <!-- Depth overlay -->
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/[0.03]"
            />
            <!-- Animated glow orbs -->
            <div
              class="absolute -left-20 -top-20 w-72 h-72 rounded-full bg-[#7C3AED]/40 blur-[120px] animate-pulse"
            />
            <div
              class="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-[#06B6D4]/30 blur-[100px] animate-pulse [animation-delay:1.5s]"
            />
            <div
              class="absolute left-1/3 top-0 w-48 h-48 rounded-full bg-[#EC4899]/15 blur-[80px]"
            />
            <!-- Shimmer sweep -->
            <div class="absolute inset-0 overflow-hidden">
              <div
                class="leaderboard-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent"
              />
            </div>
            <!-- Neon border glow -->
            <div
              class="absolute inset-0 rounded-xl md:rounded-2xl border border-[#7C3AED]/40 pointer-events-none"
            />

            <div
              class="relative px-4 sm:px-6 md:px-8 pt-5 sm:pt-7 pb-4 sm:pb-6"
            >
              <!-- Top row: Info + Prize tiers -->
              <div
                class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6 mb-5 sm:mb-6"
              >
                <!-- Left: Trophy + Prize info -->
                <div class="flex items-center gap-3 sm:gap-4">
                  <div class="relative shrink-0">
                    <div
                      class="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-[#FFD700]/25 to-[#FF8C00]/15 border border-[#FFD700]/30 flex items-center justify-center backdrop-blur-sm trophy-glow"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-7 h-7 sm:w-8 sm:h-8 text-[#FFD700] drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a.75.75 0 0 0 0 1.5h12.17a.75.75 0 0 0 0-1.5h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.707 6.707 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.658-.744 49.22 49.22 0 0 0-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 0 0-.657.744Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <!-- LIVE badge -->
                    <div
                      class="absolute -top-1.5 -right-1.5 flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#58CC03] shadow-[0_0_10px_rgba(88,204,3,0.5)]"
                    >
                      <span
                        class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"
                      />
                      <span
                        class="text-[6px] font-black text-white uppercase tracking-wider"
                        >Live</span
                      >
                    </div>
                  </div>
                  <div>
                    <span
                      class="text-[10px] sm:text-xs font-black tracking-[0.2em] text-[#C4B5FD] uppercase"
                      >Weekly Leaderboard</span
                    >
                    <div class="flex items-baseline gap-1.5 mt-1">
                      <span
                        class="text-[10px] sm:text-xs text-white/50 font-semibold"
                        >KES</span
                      >
                      <span
                        class="leaderboard-prize text-3xl sm:text-4xl md:text-5xl font-black tracking-tight"
                        >300,000</span
                      >
                    </div>
                    <p class="text-[10px] sm:text-xs text-white/40 mt-1">
                      <span class="text-[#06B6D4]">40 winners</span> &middot;
                      Resets every Monday
                    </p>
                  </div>
                </div>

                <!-- Right: Prize tiers — glassmorphism cards -->
                <div class="flex gap-2 sm:gap-3">
                  <div class="prize-tier prize-tier-gold flex-1 md:w-28">
                    <span
                      class="text-[7px] font-black tracking-wider text-[#FFD700]/70 uppercase"
                      >1st Place</span
                    >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="w-5 h-5 text-[#FFD700] drop-shadow-[0_0_6px_rgba(255,215,0,0.5)] my-0.5"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a.75.75 0 0 0 0 1.5h12.17a.75.75 0 0 0 0-1.5h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.707 6.707 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.658-.744 49.22 49.22 0 0 0-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 0 0-.657.744Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span
                      class="text-sm sm:text-base md:text-lg font-black text-[#FFD700]"
                      >30K</span
                    >
                  </div>
                  <div class="prize-tier flex-1 md:w-28">
                    <span
                      class="text-[7px] font-black tracking-wider text-white/40 uppercase"
                      >2nd</span
                    >
                    <span
                      class="text-sm sm:text-base md:text-lg font-black text-white/80 my-0.5"
                      >25K</span
                    >
                  </div>
                  <div class="prize-tier flex-1 md:w-28">
                    <span
                      class="text-[7px] font-black tracking-wider text-[#CD7F32]/70 uppercase"
                      >3rd</span
                    >
                    <span
                      class="text-sm sm:text-base md:text-lg font-black text-[#CD7F32] my-0.5"
                      >15K</span
                    >
                  </div>
                </div>
              </div>

              <!-- Eligible Games Row -->
              <div class="mb-4 sm:mb-5">
                <div class="flex items-center justify-between mb-2">
                  <span
                    class="text-[10px] sm:text-xs font-bold text-white/50 uppercase tracking-wider"
                    >Eligible Games</span
                  >
                  <span class="text-[9px] sm:text-[10px] text-[#C4B5FD]/60"
                    >Play to earn points</span
                  >
                </div>
                <div class="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                  <button
                    v-for="game in leaderboardGames"
                    :key="game.id"
                    class="eligible-game shrink-0 group"
                    @click="playGame(game)"
                  >
                    <div
                      class="w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden ring-1 ring-white/10 group-hover:ring-[#7C3AED]/60 group-hover:shadow-[0_0_12px_rgba(124,58,237,0.4)] transition-all duration-300"
                    >
                      <img
                        :src="game.imgFullUrl"
                        :alt="game.gameName"
                        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <span
                      class="text-[8px] sm:text-[9px] text-white/50 group-hover:text-[#C4B5FD] mt-1 block text-center truncate max-w-[56px] sm:max-w-[64px] transition-colors"
                    >
                      {{ game.gameName }}
                    </span>
                  </button>
                </div>
              </div>

              <!-- Bottom CTA -->
              <div
                class="flex items-center justify-between pt-3 border-t border-white/[0.08]"
              >
                <div class="flex items-center gap-3">
                  <div class="flex -space-x-1.5">
                    <div
                      class="w-6 h-6 rounded-full bg-[#FFD700]/20 border-2 border-[#FFD700]/40 flex items-center justify-center shadow-[0_0_8px_rgba(255,215,0,0.3)]"
                    >
                      <span class="text-[8px] font-black text-[#FFD700]"
                        >1</span
                      >
                    </div>
                    <div
                      class="w-6 h-6 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center"
                    >
                      <span class="text-[8px] font-black text-white/60">2</span>
                    </div>
                    <div
                      class="w-6 h-6 rounded-full bg-[#CD7F32]/20 border-2 border-[#CD7F32]/30 flex items-center justify-center"
                    >
                      <span class="text-[8px] font-black text-[#CD7F32]"
                        >3</span
                      >
                    </div>
                  </div>
                  <p class="text-[10px] sm:text-xs text-white/40">
                    Bet on multibets or casino games to climb
                  </p>
                </div>
                <RouterLink
                  :to="{ name: 'leaderboard' }"
                  class="leaderboard-cta inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-black px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-white transition-all active:scale-95"
                >
                  View Leaderboard
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2.5"
                    stroke="currentColor"
                    class="w-3 h-3"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </RouterLink>
              </div>
            </div>
          </section>

          <!-- Remaining API category carousels -->
          <CasinoGameCarousel
            v-for="cat in sortedCategories.slice(1)"
            :key="cat.id"
            :title="cat.name"
            :icon="cat.icon"
            :games="cat.games"
            @play="playGame"
            @see-all="onCategorySelect(cat.slug)"
          />
        </template>

        <!-- CATEGORY: Expanded full grid view -->
        <template v-else>
          <div class="mb-4">
            <!-- Back to all + section title -->
            <div class="flex items-center space-x-3 mb-4">
              <button
                class="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-[#1e1e3a] hover:bg-gray-200 dark:hover:bg-[#2a2a4a] text-gray-500 dark:text-[#888] hover:text-gray-900 dark:hover:text-white transition-colors"
                @click="onCategorySelect('all')"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
              <h2 class="text-gray-900 dark:text-white text-lg font-bold">
                {{ activeGridLabel }}
                <span class="text-gray-400 dark:text-[#555] text-xs ml-2"
                  >({{ activeGridGames.length }})</span
                >
              </h2>
            </div>

            <div
              v-if="activeGridGames.length > 0"
              class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3"
            >
              <CasinoGameCard
                v-for="game in activeGridGames"
                :key="game.id"
                :game="game"
                class="!w-full"
                @play="playGame"
              />
            </div>

            <div v-else class="flex flex-col items-center py-16">
              <p class="text-gray-500 dark:text-[#6b6b8a] font-medium">
                No games in this category
              </p>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
  <MobileFooter />
  <Footer />
</template>

<style scoped>
/* Leaderboard banner — outer neon glow */
.leaderboard-banner {
  box-shadow: 0 0 30px rgba(124, 58, 237, 0.25),
    0 0 60px rgba(6, 182, 212, 0.12), 0 8px 32px rgba(0, 0, 0, 0.4);
}

/* Trophy icon glow */
.trophy-glow {
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.25);
}

/* Prize amount — neon gradient text */
.leaderboard-prize {
  background: linear-gradient(
    180deg,
    #fff 0%,
    #c4b5fd 40%,
    #7c3aed 70%,
    #06b6d4 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 20px rgba(124, 58, 237, 0.5))
    drop-shadow(0 0 40px rgba(6, 182, 212, 0.25));
  font-variant-numeric: tabular-nums;
}

/* Prize tier cards — glassmorphism */
.prize-tier {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 10px 8px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.prize-tier:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(124, 58, 237, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(124, 58, 237, 0.2);
}

.prize-tier-gold {
  background: rgba(255, 215, 0, 0.08);
  border-color: rgba(255, 215, 0, 0.25);
  box-shadow: 0 0 16px rgba(255, 215, 0, 0.1);
}

.prize-tier-gold:hover {
  background: rgba(255, 215, 0, 0.15);
  border-color: rgba(255, 215, 0, 0.5);
  box-shadow: 0 0 24px rgba(255, 215, 0, 0.25),
    0 8px 24px rgba(255, 215, 0, 0.15);
}

@media (min-width: 640px) {
  .prize-tier {
    padding: 12px 14px;
  }
}

/* CTA button — gradient glow */
.leaderboard-cta {
  background: linear-gradient(135deg, #7c3aed, #06b6d4);
  box-shadow: 0 0 20px rgba(124, 58, 237, 0.4), 0 4px 12px rgba(0, 0, 0, 0.3);
}

.leaderboard-cta:hover {
  box-shadow: 0 0 30px rgba(124, 58, 237, 0.6), 0 0 60px rgba(6, 182, 212, 0.3),
    0 4px 16px rgba(0, 0, 0, 0.4);
  filter: brightness(1.15);
}

/* Eligible game cards */
.eligible-game {
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.eligible-game:hover {
  transform: translateY(-3px);
}

/* Shimmer sweep animation */
.leaderboard-shimmer {
  animation: leaderboard-shimmer-sweep 4s ease-in-out infinite;
}

@keyframes leaderboard-shimmer-sweep {
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* Hide scrollbar */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
