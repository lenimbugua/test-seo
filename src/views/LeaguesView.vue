<script setup>
import { useDark } from "@vueuse/core";
import DarkBorderDivider from "../components/DarkBorderDivider.vue";
import SportsBetslip from "../components/SportsBetslipPanel.vue";
import { useScreenSizes } from "../composables/useScreenSizes";

import LeagueCard from "../components/LeagueCard.vue";
import MainCategories from "../components/MainCategories.vue";
import SecondaryNav from "../components/SecondaryNav.vue";

const isDark = useDark();
const { isSmallScreen, isMediumScreen, isLargeScreen } = useScreenSizes();
</script>
<template>
  <div
    v-if="isLargeScreen"
    class="matches-scroll-container h-dvh overflow-scroll scrollbar-hide"
  >
    <div
      class="sticky z-[60] top-0 bg-white dark:bg-[#241E34] rounded-b-xl overflow-clip"
    >
      <HeaderLinks />
    </div>
    <div class="w-full max-w-[1680px] mx-auto px-4 pt-4">
      <div class="w-full flex justify-between space-x-4">
        <div class="w-1/6">
          <TheSidebar />
        </div>
        <div class="mx-auto max-w-[780px] 2xl:max-w-[1000px]">
          <div
            class="flex-col mx-auto rounded-t-md border shadow overflow-clip dark:border-dark-purple-18"
          >
            <div
              class="sticky z-[2] top-[5rem] bg-white dark:bg-[#393444] py-1 border-b dark:border-black"
            >
              <div class="px-2">
                <SecondaryNav />
              </div>
            </div>
            <!-- <div :class="['bg-white dark:bg-[#241E34]']">
              <TheBanner />
            </div> -->
            <LeagueCard />
          </div>
        </div>
        <div class="flex flex-shrink sticky">
          <SportsBetslip />
        </div>
      </div>
    </div>
    <Footer />
  </div>
  <div v-else-if="isMediumScreen" class="matches-scroll-container">
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
            <TheBanner />
          </div>
        </div>

        <div class="w-1/4 flex flex-shrink sticky">
          <SportsBetslip />
        </div>
      </div>
    </div>
    <Footer />
    <MobileFooter />
  </div>

  <div
    v-else-if="isSmallScreen"
    class="matches-scroll-container block h-dvh overflow-y-auto"
  >
    <TheDepositBar />
    <div
      class="sticky z-[60] top-0 bg-white dark:bg-[#241E34] rounded-b-xl overflow-clip"
    >
      <HeaderLinks />
    </div>
    <div :class="['bg-[#241E34]']" class="md:pt-3">
      <RowPaddingXWrapper
        class="py-3 bg-white dark:bg-[#2F293E] dark:border-t border-dark-purple-23"
      >
        <MainCategories />
      </RowPaddingXWrapper>

      <!-- <div :class="['bg-white dark:bg-[#241E34]']">
        <TheBanner />
      </div> -->
      <LeagueCard />
    </div>
    <Footer />
    <MobileFooter />
  </div>
</template>
