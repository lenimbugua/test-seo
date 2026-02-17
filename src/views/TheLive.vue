<script setup>
import { useSportsQueryParamsStore } from "@/stores/sports-query-params";
import { useDark } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { onBeforeUnmount, onMounted } from "vue";
import DarkBorderDivider from "../components/DarkBorderDivider.vue";
import InfinityScrollLive from "../components/InfinityScrollLive.vue";
import MainCategories from "../components/MainCategories.vue";
import TheSports from "../components/TheSportsTab.vue";
import { useScreenSizes } from "../composables/useScreenSizes";
import { useLiveMatchesStore } from "../stores/live-matches";
const { setResource } = useSportsQueryParamsStore();
const { pollLiveMatches, getLiveMatches } = useLiveMatchesStore();
const { matches, pending } = storeToRefs(useLiveMatchesStore());

const pollFrequency = parseInt(import.meta.env.VITE_LIVE_POLL_INTERVAL)
  ? parseInt(import.meta.env.VITE_LIVE_POLL_INTERVAL)
  : 10000;

let intervalId = null;

onMounted(() => {
  getLiveMatches();
  intervalId = setInterval(() => {
    pollLiveMatches();
  }, pollFrequency);
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
});

const isDark = useDark();
const { isSmallScreen, isMediumScreen, isLargeScreen } = useScreenSizes();
onBeforeUnmount(() => {
  setResource("");
});
</script>
<template>
  <div v-if="isLargeScreen">
    <HeaderLinks />
    <div class="max-w-[1680px] mx-auto px-3">
      <div class="w-full pt-4 flex justify-between">
        <div class="sticky bottom-0">
          <TheSidebar />
        </div>
        <div class="w-full max-w-[800px] lg:max-w-1000 mx-8 flex-col">
          <div
            class="rounded-t-md border shadow overflow-clip dark:border-dark-purple-18"
          >
            <div class="bg-white dark:bg-dark-purple-20">
              <div
                class="sticky z-[2] top-20 bg-white dark:bg-dark-purple-20 pb-2 rounded-b-md"
              >
                <div class="border-b dark:border-black">
                  <TheSports />
                </div>
                <div v-if="matches?.length && !pending">
                  <MarketSection />
                </div>
              </div>
              <InfinityScrollLive class="w-full" />
            </div>
          </div>
          <SEOMarkupContent />
        </div>
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
        <div
          :class="[
            'bg-white dark:bg-[#241E34]',
            isDark ? 'dark-border' : 'custom-border',
          ]"
          class="max-w-5xl flex-col mx-auto rounded-t-lg"
        >
          <MainCategories class="p-2 mb-2 bg-dark-purple-21" />
          <DarkBorderDivider />
          <div :class="['bg-white dark:bg-[#241E34]']">
            <div
              :class="['bg-white dark:bg-[#241E34]']"
              class="sticky top-12 z-50"
            >
              <TheSports />
            </div>
            <div v-if="matches?.length && !pending">
              <MarketSection />
            </div>
            <SortSection class="w-full" />
            <DarkBorderDivider border-size="1px" />
            <div>
              <InfinityScrollLive />
            </div>
          </div>
        </div>
      </div>
    </div>
    <MobileFooter />
    <Footer />
  </div>
  <div v-else-if="isSmallScreen" class="flex flex-col h-dvh">
    <div class="flex-grow bg-white dark:bg-dark-purple-20">
      <div class="sticky top-0 pb-2 bg-white dark:bg-[#241E34]">
        <TheDepositBar />
        <HeaderLinks />
        <MainCategories class="py-3 px-2" />
        <div
          :class="['bg-white dark:bg-[#241E34]']"
          class="flex space-x-2 w-full z-[99] px-2 items-center border-t dark:border-black bg-[#241E34]"
        >
          <TheSports />
        </div>
        <div v-if="matches?.length && !pending">
          <MarketSection />
        </div>
      </div>
      <DarkBorderDivider border-size="1px" />
      <InfinityScrollLive />
    </div>
    <MobileFooter />
    <Footer />
  </div>
</template>
