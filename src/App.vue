<script setup>
import CollectAllModals from "@/components/CollectAllModals.vue";
import { useModalTypes } from "@/composables/useModalTypes";
import { usePropellarAds } from "@/composables/usePropellarAds";
import { useThemeSwitch } from "@/composables/useThemeSwitch";
import { useModalStore } from "@/stores/modal";
import { useRoadblockStore } from "@/stores/roadblock";
import { onBeforeMount, onBeforeUnmount, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useAppVersionStore } from "./stores/app-version";

const route = useRoute();
const appVersionStore = useAppVersionStore();

const { openModal } = useModalStore();
const { startRoadblockRotationTimer, stopRoadblockRotationTimer } =
  useRoadblockStore();
const { notification } = useModalTypes();
const { initPropellerAds } = usePropellarAds();
const { switchToDark } = useThemeSwitch();

// 🔹 Init non-reactive things early
initPropellerAds();
onBeforeMount(() => switchToDark());

onMounted(() => {
  // Start timers AFTER paint
  setTimeout(() => {
    startRoadblockRotationTimer(route);
  }, 500);

  // 🔹 Fire-and-forget version check (SAFE)
  appVersionStore.checkVersion();

  // 🔹 Modal logic independent
  const nav = performance.getEntriesByType("navigation")[0];
  const isReload = nav?.type === "reload";

  if (!isReload) {
    openModal(notification);
  }
});

onBeforeUnmount(() => {
  stopRoadblockRotationTimer();
});
</script>

<template>
  <div class="bg-white dark:bg-[#241E34] scroll-smooth">
    <router-view />
    <CollectAllModals />
  </div>
</template>
