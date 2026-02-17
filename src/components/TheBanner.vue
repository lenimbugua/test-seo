<script setup>
import { crashGamesRouteName, useCasino } from "@/composables/useCasino";
import { useDefaultSport } from "@/composables/useDefaultSport";
import formatStuff from "@/utilities/format-stuff";
import "swiper/css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useCasinoStore } from "../stores/casino";

const { launchCasino } = useCasino();

const { formCloudflareImageSized } = formatStuff();

const { initDefaultSport } = useDefaultSport();

const { setLaunchGameId } = useCasinoStore();
const router = useRouter();

const modules = [Autoplay, Pagination, Navigation];

const progress = ref(0);

const onAutoplayTimeLeft = (swiper, time, progressRatio) => {
  progress.value = 1 - progressRatio;
};

const aviatorGameId = import.meta.env.VITE_AVIATOR_GAME_ID;
const jetXId = import.meta.env.VITE_JETX_GAME_ID;
const depositId = 1000;
const freebetId = 1000000;
const bethubId = 1000012;
const homeId = 100001777;
const turboId = 1000013;
const affiliateId = 1000014;
const leaderboardId = 7638449785487;
const hakiLeagueGameId = import.meta.env.VITE_HAKI_LEAGUE_GAME_ID;
const maestroGameId = import.meta.env.VITE_MAESTRO_GAME_ID;
const aviatrixId = import.meta.env.VITE_AVIATRIX_GAME_ID;

let items = [
  {
    name: "Leaderboard",
    id: leaderboardId,
    image: "7b6bdb12-1c1b-4b0f-17ec-16b3af5e7d00",
    routeName: leaderboardId,
  },
  {
    name: "Tano Supuu",
    id: homeId,
    image: "6a8165c4-4d31-430b-746c-3347fecb3200",
    routeName: homeId,
  },
  {
    name: "Red Baron",
    id: 2184,
    image: "41e7186c-03fd-4cd6-d148-c2633afc1a00",
    routeName: crashGamesRouteName,
  },
  {
    name: "JengaBets",
    id: homeId,
    image: "1d0b96b8-1ce9-44ff-b357-80bbbe20c800",
    routeName: "",
  },
  {
    name: "OneCut",
    id: homeId,
    image: "3575434e-964c-4c78-03b3-3e33542e2500",
    routeName: "",
  },
  {
    name: "aviator",
    id: depositId,
    image: "a628872f-1761-4362-59d9-abf4f4442500",
    routeName: crashGamesRouteName,
  },
  {
    name: "aviator",
    id: aviatorGameId,
    image: "ddcf1561-e0ea-4ced-0907-2e773a9be200",
    routeName: crashGamesRouteName,
  },

  {
    name: "multibetboost",
    id: homeId,
    image: "a236ba52-60f4-4aa6-83e1-e8dad3cb6100",
    routeName: "",
  },
  {
    name: "twogoalsup",
    id: homeId,
    image: "ea1c217b-b443-4daf-f3a2-84972db25800",
    routeName: "",
  },
  {
    name: "aviator",
    id: aviatorGameId,
    image: "42c707d2-a887-48a5-8c1f-ad504ae6df00",
    routeName: crashGamesRouteName,
  },
  {
    name: "affiliate",
    id: affiliateId,
    image: "ee293721-0b95-4352-5107-532366559e00",
    routeName: "",
  },
  {
    name: "bethub",
    id: bethubId,
    image: "60cb2de2-cf1b-4181-48b9-5324f98e2100",
    routeName: "",
  },
  {
    name: "aviator",
    id: aviatorGameId,
    image: "77efb485-2ffd-409c-f35f-1e5073c7cc00",
    routeName: crashGamesRouteName,
  },
  {
    name: "haki-league",
    id: hakiLeagueGameId,
    image: "443bd4d0-1fd3-4e42-8a6a-e9ad2dda3900",
    routeName: "",
  },
  {
    name: "deposit",
    id: depositId,
    image: "b6510353-916b-42c9-5682-ddb602375f00",
    routeName: "",
  },
  {
    name: "jetx",
    id: jetXId,
    image: "a12607a9-962c-457a-ae0f-3a4a33572a00",
    routeName: crashGamesRouteName,
  },
  {
    name: "aviatrix",
    id: aviatrixId,
    image: "67829925-aff3-411c-a3da-bf20bfc16000",
    routeName: crashGamesRouteName,
  },
  {
    name: "maestro",
    id: maestroGameId,
    image: "19312ea9-64db-4ee8-37c4-4e0011d8b100",
    routeName: crashGamesRouteName,
  },
];

const goToSports = () => {
  initDefaultSport(true);
  router.push({ name: "sports", params: { sport: "soccer" } });
};

function launchGame(gameId, gameName, routeName) {
  if (gameId === affiliateId) {
    router.push({ name: "join-affiliate" });
    return;
  }
  if (gameId === leaderboardId) {
    router.push({ name: "leaderboard" });
    return;
  }
  if (gameId === homeId) {
    goToSports();
    return;
  }
  if (gameId === depositId) {
    router.push({ name: "deposit" });
    return;
  }
  if (gameId === hakiLeagueGameId) {
    router.push({ name: "haki-league" });
    return;
  }
  if (gameId === freebetId) {
    router.push({ name: "freebet" });
    return;
  }
  if (gameId === bethubId) {
    router.push({ name: "share-bets" });
    return;
  }
  if (gameId === turboId) {
    router.push({ name: "haki-turbo" });
    return;
  }

  setLaunchGameId(gameId);
  launchCasino(gameId, gameName, routeName);
  //   router.push({ name: "games", params: { name: gameName } });
}

const autoplayDelay = 4000; // ms
const loader = ref(null);
const loaderStyle = ref({
  width: "0%",
  transition: "none",
});

const slideRefs = ref([]);

const startLoader = () => {
  // Reset instantly
  loaderStyle.value = {
    width: "0%",
    transition: "none",
  };

  // Trigger animation after a tick
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      loaderStyle.value = {
        width: "100%",
        transition: `width ${autoplayDelay}ms linear`,
      };
    });
  });
};

// Run once on mount
onMounted(() => {
  startLoader();
});
</script>

<template>
  <div class="w-full rounded-lg overflow-clip sm:px-0">
    <div class="relative w-full h-full overflow-clip">
      <swiper
        :space-between="30"
        :centered-slides="true"
        :autoplay="{
          delay: autoplayDelay,
          disableOnInteraction: false,
        }"
        :navigation="false"
        :modules="modules"
        class="mySwiper"
        @slide-change="startLoader"
        @autoplay-time-left="onAutoplayTimeLeft"
      >
        <swiper-slide
          v-for="(item, i) in items"
          :ref="(el) => (slideRefs[i] = el)"
          :key="item.id"
        >
          <img
            :src="formCloudflareImageSized(item.image, 750, 170)"
            :srcset="`${formCloudflareImageSized(item.image, 750, 170)} 750w, ${formCloudflareImageSized(item.image, 1400, 340)} 1400w`"
            sizes="(max-width: 768px) 100vw, 750px"
            width="750"
            height="170"
            class="w-full cursor-pointer h-full top-0 right-0 bottom-0 left-0 object-cover"
            :alt="item.name + ' game banner'"
            :loading="i === 0 ? 'eager' : 'lazy'"
            :fetchpriority="i === 0 ? 'high' : 'auto'"
            decoding="async"
            @click="launchGame(item.id, item.name, item.routeName)"
          />
        </swiper-slide>
      </swiper>
      <!-- Bottom progress loader -->
      <div
        class="absolute z-50 bottom-0 w-full h-0.5 bg-gray-400 dark:bg-white"
      >
        <div
          ref="loader"
          class="h-full bg-[#56CB05]"
          :style="loaderStyle"
        ></div>
      </div>
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
