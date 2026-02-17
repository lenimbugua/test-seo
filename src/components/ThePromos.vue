<script setup>
import { usePromoStore } from "@/stores/promos";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { usePromos } from "../composables/usePromos";
import { useCasinoStore } from "../stores/casino";

import { useDefaultSport } from "@/composables/useDefaultSport";
import formatStuff from "../utilities/format-stuff";

const { formCloudflareImage } = formatStuff();

const { initDefaultSport } = useDefaultSport();

const { setLaunchGameId } = useCasinoStore();

const router = useRouter();

const {
  selectPromo,
  // fetchPromotions
} = usePromoStore();
// fetchPromotions();
const {
  promos,
  hakiLeaguePromo,
  cashbackPromo,
  bethubPromo,
  multibetBoostPromo,
  twoUpPromo,
  oneCutPromo,
  aviatorWelcomeBonus,
  dailyAviatorCashback,
  aviatorKaribuBonus,
  jengaBetsPromo,
  sambazaZaKrisiiPromo,
} = usePromos();

const { pending } = storeToRefs(usePromoStore());

const goToSports = () => {
  initDefaultSport(true);
  router.push({ name: "sports", params: { sport: "soccer" } });
};

function launchCasino(gameId, gameName) {
  if (gameName === sambazaZaKrisiiPromo) {
    router.push({ name: "share-happiness" });
    return;
  }
  if (gameName == hakiLeaguePromo) {
    router.push({ name: "haki-league" });
    return;
  }
  if (gameName == cashbackPromo) {
    router.push({ name: "deposit" });
    return;
  }
  if (gameName == bethubPromo) {
    router.push({ name: "share-bets" });
    return;
  }

  if (gameName == multibetBoostPromo) {
    goToSports();
    return;
  }
  if (gameName == twoUpPromo) {
    goToSports();
    return;
  }
  if (gameName == oneCutPromo) {
    goToSports();
    return;
  }
  if (gameName == jengaBetsPromo) {
    goToSports();
    return;
  }

  if (gameName == dailyAviatorCashback) {
    router.push({ name: "aviator" });
    return;
  }
  if (gameName == aviatorWelcomeBonus) {
    router.push({ name: "aviator" });
    return;
  }
  if (gameName == aviatorKaribuBonus) {
    router.push({ name: "deposit" });
    return;
  }
  setLaunchGameId(gameId);
  router.push({ name: "aviator" });
}

function goToPromoDetails(promo) {
  selectPromo(promo);
  router.push({ name: "promotion-details", params: { name: promo.name } });
}
</script>
<template>
  <div class="w-full px-3 md:px-10 max-w-6xl mx-auto">
    <div
      class="w-full flex items-center justify-between h-full cursor-pointer gap-2 py-3"
    >
      <div class="cursor-pointer" @click="$router.go(-1)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="size-6 stroke-2 text-gray-900 dark:text-white"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
      </div>
      <h1 class="font-black text-3xl dark:text-gray-50">Promotions</h1>
      <div></div>
    </div>

    <BetsLoader v-if="pending" />

    <div v-else>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:px-0">
        <div v-for="promo in promos" :key="promo.title" class="space-y-1">
          <div
            class="shadow border dark:border-dark-purple-10 rounded-md overflow-clip bg-white dark:bg-dark-purple-17"
          >
            <RouterLink :to="{name:promo.routeName}" class="blocl cursor-pointer">
              <img
                class="top-0 w-full h-full object-contain right-0 left-0 bottom-0"
                :src="formCloudflareImage(promo.img)"
              />
            </RouterLink >
            <div class="px-3 py-5">
              <div
                class="flex py-3 justify-between text-xs items-center text-gray-700 dark:text-gray-200"
              >
                <p
                  class="font-semibold text-lg text-gray-600 dark:text-slate-400"
                >
                  {{ promo.title }}
                </p>
              </div>
              <!-- <div class="py-4">
                <p class="font-light text-gray-950 dark:text-gray-400">
                  {{ promo.samary }}
                </p>
              </div> -->
              <div class="flex justify-between">
                <button
                  class="bg-[#1C7928] shadow w-1/2 px-2 py-1 text-white uppercase font-bold tracking-wide rounded-md"
                  @click="launchCasino(promo.id, promo.name)"
                >
                  Play Now
                </button>
                <div
                  v-if="promo.name != 'aviatrix' && promo.name != 'bethub'"
                  class="button border-2 border-[#01BB08] cursor-pointer text-[#01BB08] font-medium rounded-md flex justify-center items-center p-2 px-3 capitalize text-sm"
                  @click="goToPromoDetails(promo)"
                >
                  View Offer
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
