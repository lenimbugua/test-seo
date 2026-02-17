<script setup>
import LazyInfinityScroll from "../components/LazyInfinityScroll.vue";
import { useMatches2Store } from "../stores/matches2";
import { useSportsQueryParamsStore } from "../stores/sports-query-params";
import { storeToRefs } from "pinia";
import SportsBetslipPanel from "./SportsBetslipPanel.vue";

const { matches, pending } = storeToRefs(useMatches2Store());
const { page } = storeToRefs(useSportsQueryParamsStore());
</script>
<template>
  <LazyInfinityScroll>
    <HeaderLinks />
    <div class="w-full max-w-[1680px] mx-auto px-4 pt-4">
      <div class="w-full flex justify-between space-x-4">
        <div class="w-1/6 sticky bottom-0">
          <TheSidebar />
        </div>
        <div class="w-6/12 flex-col flex-grow">
          <div
            class="max-w-5xl flex-col mx-auto rounded-t-md border shadow overflow-clip dark:border-dark-purple-18"
          >
            <div :class="['bg-white dark:bg-[#241E34]']">
              <TheBanner />
            </div>
            <div class="bg-white dark:bg-dark-purple-20">
              <div
                class="sticky z-[2] top-20 bg-white dark:bg-dark-purple-20 pb-2 rounded-b-md border-y border-b dark:border-black"
              >
                <div class="border-b dark:border-black">
                  <SecondaryNav />
                </div>
                <div class="flex justify-between px-3">
                  <LeaguesButton /><HighlitsTab /> <CalendarDropdown />
                </div>
                <MarketSection />
              </div>

              <AnimatePulse v-if="pending && page == 0" :rows="10" />
              <div v-for="match in matches" :key="match.parentMatchId">
                <MatchTwo :match="match" />
              </div>
              <AnimatePulse v-if="pending" class="z-[1]" :rows="8" />

              
            </div>
          </div>
        </div>
        <div class="w-1/4 flex flex-shrink sticky">
          <SportsBetslipPanel />
        </div>
      </div>
    </div>
    <Footer />
  </LazyInfinityScroll>
</template>
