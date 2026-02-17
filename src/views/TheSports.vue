<script setup>
import { useDark } from "@vueuse/core";
import { onBeforeUnmount } from "vue";
import DarkBorderDivider from "../components/DarkBorderDivider.vue";
import SecondaryNav from "../components/SecondaryNav.vue";
import SportsBetslip from "../components/SportsBetslipPanel.vue";
import { useScreenSizes } from "../composables/useScreenSizes";
import { useSportsQueryParamsStore } from "../stores/sports-query-params";

const { resetToDefaults } = useSportsQueryParamsStore();
const isDark = useDark();
const { isSmallScreen, isMediumScreen, isLargeScreen } = useScreenSizes();

onBeforeUnmount(() => {
  resetToDefaults();
});
</script>
<template>
  <LazyInfinityScroll v-if="isLargeScreen">
    <div
      class="sticky z-[60] top-0 bg-white dark:bg-[#241E34] border-b dark:shadow-xl dark:border-dark-purple-23 rounded-b-xl overflow-clip"
    >
      <HeaderLinks />
    </div>
    <div class="max-w-[1680px] mx-auto px-3">
      <div class="w-full flex justify-between space-x-4 pt-4">
        <div class="w-1/6">
          <TheSidebar />
        </div>
        <div
          class="max-w-[780px] lg:max-w-1000 flex-col rounded-t-md border shadow overflow-clip dark:border-dark-purple-18"
        >
          <div class="bg-white dark:bg-dark-purple-20 w-full">
            <div
              class="sticky z-[2] top-[5rem] w-full bg-white dark:bg-[#393444] pb-2"
            >
              <div
                class="sticky z-[2] top-[5rem] bg-white dark:bg-[#393444] py-1 border-b dark:border-black"
              >
                <div class="px-2">
                  <SecondaryNav />
                </div>
              </div>
              <div class="bg-white dark:bg-[#241E34]">
                <!-- <SportsTabSection /> -->
              </div>
              <div>
                <div class="flex justify-between px-3">
                  <LeaguesButton /><HighlitsTab />
                  <CalendarDropdown />
                </div>
                <MarketSection />
              </div>
            </div>
            <InfiniteScroll />
          </div>
        </div>
        <div class="flex">
          <SportsBetslip />
        </div>
      </div>
    </div>
    <Footer />
  </LazyInfinityScroll>
  <LazyInfinityScroll v-else-if="isMediumScreen">
    <HeaderLinks />
    <div
      class="w-full max-w-[1680px] flex mx-auto justify-between px-6 pt-4 space-x-4"
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
          <div class="p-2">
            <SecondaryNav />
          </div>
          <div class="bg-white dark:bg-dark-purple-20">
            <div>
              <!-- <SportsTabSection /> -->
              <div class="flex justify-between px-3">
                <LeaguesButton /><HighlitsTab />
                <CalendarDropdown />
              </div>
              <MarketSection />
            </div>

            <DarkBorderDivider border-size="1px" />
            <div class="z-[1]">
              <InfiniteScroll />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    <MobileFooter />
  </LazyInfinityScroll>
  <LazyInfinityScroll
    v-else-if="isSmallScreen"
    class="block h-dvh overflow-scroll"
  >
    <TheDepositBar />
    <div
      class="sticky top-0 z-[60] bg-white dark:bg-[#241E34] border-b dark:shadow-xl dark:border-dark-purple-23 rounded-b-xl overflow-clip"
    >
      <HeaderLinks />
    </div>
    <div class="bg-white dark:bg-dark-purple-20">
      <div class="sticky z-[2] top-12 bg-white dark:bg-[#393444]">
        <div
          class="sticky z-[2] top-12 bg-white dark:bg-[#393444] rounded-b-md p-2 rounded-lg border dark:border-black/40 shadow"
        >
          <SecondaryNav />
        </div>
        <div class="bg-white dark:bg-[#241E34]">
          <!-- <SportsTabSection /> -->
        </div>
        <div>
          <div class="flex justify-between px-3">
            <LeaguesButton /><HighlitsTab />
            <CalendarDropdown />
          </div>
          <MarketSection />
        </div>

        <DarkBorderDivider border-size="1px" />
      </div>
      <div class="z-[1]">
        <InfiniteScroll />
      </div>
    </div>
    <Footer />
    <MobileFooter />
  </LazyInfinityScroll>
</template>
