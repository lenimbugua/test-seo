<script setup>
import { useScreenSizes } from "../composables/useScreenSizes";
const { isSmallScreen, isMediumScreen, isLargeScreen } = useScreenSizes();

import SportsBetslipPanel from "../components/SportsBetslipPanel.vue";
import TheSidebar from "../components/TheSidebar.vue";
</script>

<template>
  <div
    v-if="isLargeScreen"
    class="h-dvh overflow-scroll bg-white dark:bg-dark-purple-20"
  >
    <div
      class="sticky z-[60] top-0 bg-white dark:bg-[#241E34] border-b dark:shadow-xl dark:border-dark-purple-23 rounded-b-xl overflow-clip"
    >
      <HeaderLinks />
    </div>
    <div class="w-full max-w-[1680px] mx-auto px-3 pt-4">
      <div class="w-full flex justify-between">
        <div class="">
          <TheSidebar />
        </div>
        <div class="w-full max-w-[800px] lg:max-w-1000 mx-6">
          <RouterView />
        </div>
        <div class="flex sticky">
          <SportsBetslipPanel />
        </div>
      </div>
    </div>
    <Footer />
    <MobileFooter />
  </div>
  <div v-else-if="isMediumScreen">
    <HeaderLinks />
    <div class="w-full max-w-[1680px] mx-auto px-4 pt-4">
      <div class="w-full flex justify-between space-x-4">
        <div class="w-1/3">
          <TheSidebar />
        </div>
        <div class="w-2/3 flex-col flex-grow">
          <RouterView />
        </div>
      </div>
    </div>
    <Footer />
    <MobileFooter />
  </div>
  <div
    v-else-if="isSmallScreen"
    class="h-dvh w-full overflow-scroll dark:border-dark-purple-23"
  >
    <div
      class="sticky z-[60] top-0 bg-white dark:bg-[#241E34] border-b dark:shadow-xl dark:border-dark-purple-23 rounded-b-xl overflow-clip"
    >
      <HeaderLinks />
    </div>
    <div class="w-full flex-grow">
      <RouterView />
    </div>
    <Footer />
    <MobileFooter />
  </div>
</template>
