<script setup>
import { storeToRefs } from "pinia";
import { onBeforeUnmount, onMounted } from "vue";
import { useCasinoStore } from "../stores/casino";

import { useModalStore } from "@/stores/modal";
import { useLaunchCasinoGame } from "../composables/useLaunchCasinoGame";
import ErrorLaunchingGame from "./ErrorLaunchingGame.vue";

const { initGame } = useLaunchCasinoGame();

const { closeModal } = useModalStore();

const { launchData, responseOK, pending } = storeToRefs(useCasinoStore());

onMounted(() => {
  initGame();
});

onBeforeUnmount(() => {
  closeModal();
});

function addStyleToLaunchData(launchData) {
  return (
    launchData.launchBody +
    "<style>body{margin:0;}#egamings_container {width: 100vw; overflow: scroll;}</style>"
  );
}
</script>

<template>
  <CasinoAnimate v-if="pending" />

  <div v-else class="w-full h-full overflow-scroll scrollbar-hide">
    <ErrorLaunchingGame v-if="!responseOK" />
    <div v-else class="w-full max-w-[1680px] mx-auto">
      <iframe
        v-if="launchData"
        class="w-full min-h-[70dvh]"
        :srcdoc="addStyleToLaunchData(launchData)"
        allow="fullscreen; autoplay; encrypted-media; accelerometer; gyroscope"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>
