<script setup>
import { useKironStore } from "@/stores/kiron";
import { storeToRefs } from "pinia";
import { useKiron } from "../composables/useKiron";

import { useRoute } from "vue-router";

const route = useRoute();

const {
  hakiLeagueRouteName,
  hakiTurboRouteName,
  hakiJackpotRouteName,
  hakiLeagueGameId,
  hakiTurboGameId,
  hakiJackpotGameId,
} = useKiron();

const { getLaunchDetail } = useKironStore();

function getLaunchUrl() {
  if (route.name === hakiLeagueRouteName) {
    getLaunchDetail(hakiLeagueGameId);
  }
  if (route.name === hakiTurboRouteName) {
    getLaunchDetail(hakiTurboGameId);
  }
  if (route.name === hakiJackpotRouteName) {
    getLaunchDetail(hakiJackpotGameId);
  }
}

getLaunchUrl();

const { launchUrl, pending } = storeToRefs(useKironStore());
</script>
<template>
  <CasinoAnimate v-if="pending" />

  <div v-else class="flex flex-col iframe-container">
    <div class="sticky top-0">
      <CasinoHeader />
    </div>
    <div class="w-full flex-grow max-w-[1680px] mx-auto h-full">
      <iframe
        class="w-full the-iframe"
        :src="launchUrl"
        allow="fullscreen; autoplay; encrypted-media; accelerometer; gyroscope"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<style scoped>
.iframe-container {
  height: 100svh; /* Full viewport height */
  overflow-y: scroll;
  position: relative; /* Needed for proper containment */
}

.the-iframe {
  height: calc(
    100svh - 2.5rem
  ); /* Subtracting the height of the sticky icons container */
  width: 100%;
}
</style>
T
