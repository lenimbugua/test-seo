<script setup>
import { useAviatorStore } from "@/stores/aviator";
import { onBeforeUnmount } from "vue";
import CasinoEmbedd from "../components/CasinoEmbedd.vue";
import { useCasinoStore } from "../stores/casino";
const { setLaunchGameId } = useCasinoStore();

setLaunchGameId(import.meta.env.VITE_AVIATOR_GAME_ID);

const { setView } = useAviatorStore();

onBeforeUnmount(() => {
  setView("");
});
</script>

<template>
  <CasinoEmbedd />
</template>
