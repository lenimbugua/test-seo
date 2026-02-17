<script setup>
import { onBeforeUnmount, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useScreenSizes } from "../composables/useScreenSizes";
import { useCasinoStore } from "../stores/casino";

const { setLaunchGameId } = useCasinoStore();
const router = useRouter();

let currentSlide = ref(0);
let intervalId = null;
const showLoader = ref(true);
let shouldAnimate = ref(false); // Add this flag

const aviatorGameId = import.meta.env.VITE_AVIATOR_GAME_ID;
const jetXId = import.meta.env.VITE_JETX_GAME_ID;
const depositId = 1000;
const hakiLeagueGameId = import.meta.env.VITE_HAKI_LEAGUE_GAME_ID;

let items = [
  { name: "aviator", id: aviatorGameId, image: "/aviator banner.png" },
  {
    name: "haki-league",
    id: hakiLeagueGameId,
    image: "/haki-league-banner.jpg",
  },
  { name: "deposit", id: depositId, image: "/cashback.jpeg" },
  { name: "haki-league", id: hakiLeagueGameId, image: "/haki-league.jpg" },
  { name: "jetx", id: jetXId, image: "/jetx banner.png" },
  { name: "haki-league", id: hakiLeagueGameId, image: "/bonusboost.jpg" },
  { name: "deposit", id: depositId, image: "/cashback.jpeg" },
  { name: "aviator", id: aviatorGameId, image: "/aviator-banner.jpg" },
  { name: "jetx", id: jetXId, image: "/jetx-banner.jpg" },
  // Add more items as needed
  // Add more items as needed
];

const nextSlide = () => {
  if (currentSlide.value === items.length - 1) {
    currentSlide.value = 0;
    return;
  }
  currentSlide.value = currentSlide.value + 1;
};

watch(currentSlide, () => {
  shouldAnimate.value = true; // Trigger animation
  setTimeout(() => {
    shouldAnimate.value = false; // Reset after animation
  }, 4000); // Match animation duration
});

const startInterval = async () => {
  intervalId = setInterval(() => {
    showLoader.value = true;
    nextSlide();
  }, 8000);
  //   showLoader.value = false;
};

function launchCasino(gameId, gameName) {
  if (gameId === depositId) {
    router.push({ name: "deposit" });
    return;
  }
  if (gameId === hakiLeagueGameId) {
    router.push({ name: "haki-league" });
    return;
  }

  setLaunchGameId(gameId);
  router.push({ name: "games", params: { name: gameName } });
}

onBeforeUnmount(() => {
  clearInterval(intervalId);
});

const { isMediumScreen, isLargeScreen } = useScreenSizes();

startInterval();
</script>
<template>
  <div class="w-full overflow-hidden sm:px-0">
    <div class="relative w-full h-24 md:h-48 overflow-clip">
      <img
        v-if="isLargeScreen || isMediumScreen"
        :src="items[currentSlide].image"
        class="absolute w-full cursor-pointer h-full rounded-md overflow-clip inset-0 aspect-video object-cover"
        :class="{ 'anim-active anim-bounceInRight': shouldAnimate }"
        :alt="items[currentSlide].name + ' promotional banner'"
        @click="launchCasino(items[currentSlide].id, items[currentSlide].name)"
      />
      <img
        v-else
        :src="items[currentSlide].image"
        class="w-full cursor-pointer h-full top-0 right-0 bottom-0 left-0 object-cover"
        :class="{ 'anim-active anim-bounceInRight': shouldAnimate }"
        :alt="items[currentSlide].name + ' promotional banner'"
        @click="launchCasino(items[currentSlide].id, items[currentSlide].name)"
      />
      <div
        v-if="showLoader"
        class="loader absolute bottom-0 w-full h-[0.15rem]"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.loader {
  background: linear-gradient(#009260 0 0) 0/0% no-repeat #ddd;
  animation: l1 8s infinite linear;
}
@keyframes l1 {
  100% {
    background-size: 100%;
  }
}
</style>
