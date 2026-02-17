<script setup>
import { useDefaultSport } from "@/composables/useDefaultSport";
import { useBannersStore } from "@/stores/banners";
import "swiper/css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import { onMounted, ref, toRefs } from "vue";
import { useRouter } from "vue-router";
// import { useCasinoStore } from "../stores/casino";
import { useCasino } from "../composables/useCasino";

const { launchCasino } = useCasino();

const { banners } = toRefs(useBannersStore());
const { fetchBanners } = useBannersStore();

fetchBanners();

const { initDefaultSport } = useDefaultSport();
// const { setLaunchGameId } = useCasinoStore();
const router = useRouter();
const modules = [Autoplay, Pagination, Navigation];
const progress = ref(0);

const onAutoplayTimeLeft = (swiper, time, progressRatio) => {
  progress.value = 1 - progressRatio;
};

// const aviatorGameId = import.meta.env.VITE_AVIATOR_GAME_ID;
// const jetXId = import.meta.env.VITE_JETX_GAME_ID;
// const depositId = 1000;
// const freebetId = 1000000;
// const bethubId = 1000012;
// const homeId = 100001777;
// const turboId = 1000013;
// const affiliateId = 1000014;
// const hakiLeagueGameId = import.meta.env.VITE_HAKI_LEAGUE_GAME_ID;
// const maestroGameId = import.meta.env.VITE_MAESTRO_GAME_ID;
// const aviatrixId = import.meta.env.VITE_AVIATRIX_GAME_ID;

// let items = [
//   { name: "aviator", id: aviatorGameId, image: "banners/aviator5freebets.png" },
//   { name: "multibetboost", id: homeId, image: "banners/multiboost.png" },
//   { name: "twogoalsup", id: homeId, image: "banners/twogoalsup.png" },
//   { name: "aviator", id: aviatorGameId, image: "banners/aviatorcashback.png" },
//   { name: "affiliate", id: affiliateId, image: "banners/affiliate.jpg" },
//   { name: "turbo", id: turboId, image: "banners/turbo.jpeg" },
//   { name: "bethub", id: bethubId, image: "banners/bethub.png" },
//   { name: "aviator", id: aviatorGameId, image: "banners/aviator.png" },
//   {
//     name: "haki-league",
//     id: hakiLeagueGameId,
//     image: "banners/haki-league-banner.jpg",
//   },
//   { name: "deposit", id: depositId, image: "banners/cashback.png" },
//   { name: "jetx", id: jetXId, image: "banners/jetx.png" },
//   //   { name: "freebet", id: freebetId, image: "banners/freebet.png" },
//   { name: "aviatrix", id: aviatrixId, image: "banners/aviatrix.png" },
//   { name: "maestro", id: maestroGameId, image: "banners/maestro.png" },
// ];

const goToSports = () => {
  initDefaultSport(true);
  router.push({ name: "sports", params: { sport: "soccer" } });
};

function goToRoute(banner) {
  if (banner.app_route_name === "sports") {
    goToSports();
    return;
  }

  if (!banner.game_id.Valid) {
    router.push({ name: banner.app_route_name });
    return;
  }
  launchCasino(banner.game_id.String, banner.game_name.String);

  //   router.push({ name: "games", params: { name: gameName } })

  //   if (gameId === affiliateId) {
  //     router.push({ name: "join-affiliate" });
  //     return;
  //   }
  //   if (gameId === homeId) {
  //     goToSports();
  //     return;
  //   }
  //   if (gameId === depositId) {
  //     router.push({ name: "deposit" });
  //     return;
  //   }
  //   if (gameId === hakiLeagueGameId) {
  //     router.push({ name: "haki-league" });
  //     return;
  //   }
  //   if (gameId === freebetId) {
  //     router.push({ name: "freebet" });
  //     return;
  //   }
  //   if (gameId === bethubId) {
  //     router.push({ name: "share-bets" });
  //     return;
  //   }
  //   if (gameId === turboId) {
  //     router.push({ name: "haki-turbo" });
  //     return;
  //   }

  //   setLaunchGameId(gameId);
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
  <div class="w-full overflow-hidden sm:px-0">
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
          v-for="(item, i) in banners"
          :ref="(el) => (slideRefs[i] = el)"
          :key="item.id"
        >
          <img
            :src="item.image_url"
            class="w-full cursor-pointer h-full top-0 right-0 bottom-0 left-0 object-cover"
            :alt="item.app_route_name || 'Promotional banner'"
            @click="goToRoute(item)"
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
