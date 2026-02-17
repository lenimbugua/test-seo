<script setup>
import { onBeforeUnmount, onMounted } from "vue";
import DarkBorderDivider from "../components/DarkBorderDivider.vue";
import HeaderLinks from "../components/HeaderLinks.vue";
import MainCategories from "../components/MainCategories.vue";
import NewLive3 from "../components/NewLive3.vue";
import { useScreenSizes } from "../composables/useScreenSizes";
import { useLiveMatchesStore } from "../stores/live-matches";
import { useNewLiveStore } from "../stores/new-live";
const { pollLiveMatches } = useNewLiveStore();
const { pollLiveMatches: pollLiveMatches2 } = useLiveMatchesStore();

const pollFrequency = parseInt(import.meta.env.VITE_LIVE_POLL_INTERVAL)
  ? parseInt(import.meta.env.VITE_LIVE_POLL_INTERVAL)
  : 10000;

let intervalId = null;

onMounted(() => {
  pollLiveMatches2();
  intervalId = setInterval(() => {
    pollLiveMatches();
  }, pollFrequency);
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
});

const { isSmallScreen, isMediumScreen, isLargeScreen } = useScreenSizes();
</script>
<template>
  <div>
    <div v-if="isLargeScreen">
      <HeaderLinks />
      <div class="max-w-[1680px] mx-auto px-3">
        <div class="w-full pt-4 flex justify-between">
          <div class="sticky bottom-0">
            <TheSidebar />
          </div>
          <NewLive3 />
          <div class="flex sticky">
            <SportsBetslipPanel />
          </div>
        </div>
      </div>
      <Footer />
    </div>
    <div v-else-if="isMediumScreen">
      <HeaderLinks />
      <div
        class="w-full max-w-9xl flex mx-auto justify-between px-6 pt-4 space-x-4"
      >
        <div class="w-1/3">
          <TheSidebar />
        </div>
        <div class="w-2/3 flex-col">
          <NewLive3 />
        </div>
      </div>
      <MobileFooter />
      <Footer />
    </div>
    <div
      v-else-if="isSmallScreen"
      class="matches-scroll-container max-h-dvh flex flex-col overflow-scroll"
    >
      <div class="flex-grow bg-white dark:bg-dark-purple-20">
        <div class="sticky top-0 pb-2 bg-white dark:bg-[#241E34]">
          <TheDepositBar />
          <HeaderLinks />
          <MainCategories class="py-1 px-2" />
          <NewLive3 />
        </div>
        <DarkBorderDivider border-size="1px" />
      </div>
      <MobileFooter />
      <Footer />
    </div>
  </div>
</template>
