<script setup>
import { usePromos } from "@/composables/usePromos";
import { useRoute } from "vue-router";
import AviatorPromo from "../AviatorPromo.vue";
import AviatorWelcomeBonus from "../AviatorWelcomeBonus.vue";
import MultibetBoostPromo from "../MultibetBoostPromo.vue";
import OneCutPromo from "../OneCutPromo.vue";
import TwoUpPromo from "../TwoUpPromo.vue";
import AviatorFreeRains from "./AviatorFreeRains.vue";
import DepositBonus from "./DepositBonus.vue";
import HakiLeagueFreebets from "./HakiLeagueFreebets.vue";
import JengaBetsPromotion from "./JengaBetsPromotion.vue";

import formatStuff from "@/utilities/format-stuff";
import LeaderboardPromo from "./LeaderboardPromo.vue";
import TanoSupuu from "./TanoSupuu.vue";

const { formCloudflareImage } = formatStuff();

const route = useRoute();

const selectedPromo = route.params.name;

const {
  promos,
  aviatorPromo,
  hakiLeaguePromo,
  cashbackPromo,
  multibetBoostPromo,
  dailyAviatorCashback,
  aviatorKaribuBonus,
  twoUpPromo,
  oneCutPromo,
  aviatorWelcomeBonus,
  jengaBetsPromo,
  tanoSupuuPromo,
  sambazaZaKrisiiPromo,
  leaderboardPromo,
} = usePromos();

const newPromos = [
  aviatorKaribuBonus,
  multibetBoostPromo,
  twoUpPromo,
  oneCutPromo,
  dailyAviatorCashback,
  aviatorWelcomeBonus,
  jengaBetsPromo,
  tanoSupuuPromo,
  sambazaZaKrisiiPromo,
  leaderboardPromo,
];
function getPromoImageByName() {
  const promo = promos.find((p) => p.name === selectedPromo);
  return promo ? promo : null;
}

function getPromoImage() {
  const promo = getPromoImageByName();
  const imgId = promo ? promo.img : null;
  const img = formCloudflareImage(imgId);
  return img;
}

function promoExistsInNewPromos() {
  return newPromos.includes(selectedPromo);
}
</script>
<template>
  <div
    class="w-full flex items-center justify-between h-full cursor-pointer pt-3"
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
    <h1 class="font-black text-3xl dark:text-gray-50 leading-none">
      Promotion Details
    </h1>
    <div></div>
  </div>

  <DepositBonus v-if="selectedPromo === cashbackPromo" />
  <HakiLeagueFreebets v-if="selectedPromo === hakiLeaguePromo" />
  <AviatorFreeRains v-if="selectedPromo === aviatorPromo" />

  <RouterLink
    v-if="promoExistsInNewPromos() && getPromoImageByName()"
    :to="{ name: getPromoImageByName().routeName }"
    class="relative block aspect-video h-42 sm:h-[26rem] w-full my-4"
  >
    <img
      class="absolute top-0 w-full h-full right-0 left-0 bottom-0"
      :src="getPromoImage()"
    />
  </RouterLink>

  <AviatorKaribuBonus v-if="selectedPromo === aviatorKaribuBonus" />
  <AviatorPromo v-if="selectedPromo === dailyAviatorCashback" />
  <TwoUpPromo v-if="selectedPromo === twoUpPromo" />
  <MultibetBoostPromo v-if="selectedPromo === multibetBoostPromo" />
  <OneCutPromo v-if="selectedPromo === oneCutPromo" />
  <AviatorWelcomeBonus v-if="selectedPromo === aviatorWelcomeBonus" />
  <JengaBetsPromotion v-if="selectedPromo === jengaBetsPromo" />
  <TanoSupuu v-if="selectedPromo === tanoSupuuPromo" />
  <ShareKrisii v-if="selectedPromo === sambazaZaKrisiiPromo" />
  <LeaderboardPromo v-if="selectedPromo === leaderboardPromo" />
</template>
