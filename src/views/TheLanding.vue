<script setup>
import { useDefaultSport } from "@/composables/useDefaultSport";
import { useDark } from "@vueuse/core";
import { onMounted, ref } from "vue";
import DarkBorderDivider from "../components/DarkBorderDivider.vue";
import HighlitsTab from "../components/HighlitsTab.vue";
import HotSection from "../components/HotSection.vue";
import InfiniteScroll from "../components/InfiniteScroll.vue";
import LazyInfinityScroll from "../components/LazyInfinityScroll.vue";
import MainCategories from "../components/MainCategories.vue";
import MarketSection from "../components/MarketSection.vue";
import SecondaryNav from "../components/SecondaryNav.vue";
import { useScreenSizes } from "../composables/useScreenSizes";
import { useScrollToViewedMatch } from "../composables/useScrollToViewedMatch";
import { useMatches2Store } from "../stores/matches2";
import MobileTest from "./MobileTest.vue";

const matchesStore = useMatches2Store();

const { initDefaultSport } = useDefaultSport();

const gameSection = ref(null);

onMounted(async () => {
  if (!matchesStore.restoreScroll) {
    initDefaultSport(true);
    return;
  }

  const { scrollToViewedMatch } = useScrollToViewedMatch();
  await scrollToViewedMatch();
});

const isDark = useDark();
const { isSmallScreen, isMediumScreen, isLargeScreen } = useScreenSizes();
</script>
<template>
  <LazyInfinityScroll v-if="isLargeScreen">
    <div
      class="sticky z-[60] top-0 bg-white dark:bg-[#241E34] rounded-b-xl overflow-clip"
    >
      <HeaderLinks />
    </div>
    <div class="max-w-[1680px] mx-auto px-3">
      <div class="w-full pt-4 flex justify-between">
        <div class="bottom-0">
          <TheSidebar />
        </div>
        <div class="mx-4 max-w-[800px] 2xl:max-w-[1000px]">
          <div
            class="flex-col mx-auto rounded-t-md border shadow overflow-clip dark:border-dark-purple-18"
          >
            <div :class="['bg-white dark:bg-[#241E34]']">
              <TheBanner />
            </div>
            <div class="bg-white dark:bg-dark-purple-20">
              <div
                class="sticky z-[2] top-[5rem] bg-white dark:bg-[#393444] py-1 border-y border-b dark:border-black"
              >
                <div class="px-2">
                  <SecondaryNav />
                </div>
              </div>
              <div class="pb-2 px-2">
                <HotSection />
              </div>
              <div
                class="sticky z-[2] top-[9.36rem] bg-white dark:bg-[#2E283E] pb-2"
              >
                <SportsTabSection />
                <div class="flex justify-between px-1">
                  <HighlitsTab /><LeaguesButton />
                  <CalendarDropdown />
                </div>
                <div class="px-1">
                  <MarketSection />
                </div>
              </div>
              <InfiniteScroll />
            </div>
          </div>
          <SEOMarkupContent />
        </div>
        <div class="flex sticky">
          <SportsBetslipPanel />
        </div>
      </div>
    </div>
    <div ref="gameSection"></div>
    <Footer />
  </LazyInfinityScroll>
  <LazyInfinityScroll v-else-if="isMediumScreen">
    <HeaderLinks />
    <div
      class="w-full max-w-9xl flex mx-auto justify-between px-6 pt-4 space-x-4"
    >
      <div class="">
        <TheSidebar />
      </div>
      <div class="max-w-[1000px] flex-col">
        <div
          :class="[
            'bg-white dark:bg-[#241E34]',
            isDark ? 'dark-border' : 'custom-border',
          ]"
          class="max-w-5xl flex-col mx-auto rounded-t-lg overflow-clip"
        >
          <MainCategories class="p-2 mb-2 bg-dark-purple-21" />
          <DarkBorderDivider />
          <div :class="['bg-white dark:bg-[#241E34]']">
            <TheBanner />
          </div>
          <DarkBorderDivider />
          <DarkBorderDivider />
          <div class="bg-white dark:bg-dark-purple-20">
            <div
              class="sticky z-[2] top-20 bg-white dark:bg-dark-purple-20 pb-2 rounded-b-md border-y border-b dark:border-black"
            >
              <div class="border-b dark:border-black">
                <SecondaryNav />
              </div>
              <div>
                <div class="flex justify-between px-3">
                  <HighlitsTab /><LeaguesButton />
                  <CalendarDropdown />
                </div>
                <MarketSection />
              </div>
            </div>
            <div class="">
              <InfiniteScroll />
            </div>
          </div>
        </div>
      </div>
    </div>
    <MobileFooter />
    <Footer />
  </LazyInfinityScroll>
  <div v-else-if="isSmallScreen" class="block">
    <MobileTest />
  </div>
</template>
