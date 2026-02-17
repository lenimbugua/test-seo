<script setup>
import InfiniteScroll from "../components/InfiniteScroll.vue";
import LazyInfinityScroll from "../components/LazyInfinityScroll.vue";
import TopLeagues from "../components/TopLeagues.vue";
// import HakiLeaguePromoStrip from "../components/promo-strip/HakiLeaguePromoStrip.vue";
</script>
<template>
  <LazyInfinityScroll>
    <div class="">
      <div
        class="sticky top-0 z-[60] bg-white dark:bg-[#241E34] border-b dark:shadow-xl dark:border-dark-purple-23 rounded-b-xl overflow-clip"
      >
        <TheDepositBar />
        <HeaderLinks />
      </div>
      <div class="px-2">
        <div class="py-1">
          <MainCategories />
        </div>
        <div :class="['bg-white dark:bg-[#241E34] rounded-lg overflow-clip']">
          <TheBanner />
        </div>
        <div
          class="sticky z-[2] top-[5rem] bg-white dark:bg-[#393444] rounded-b-md my-2 p-2 rounded-lg border dark:border-black/40 shadow"
        >
          <SecondaryNav />
        </div>
        <!-- <ChristmassStrip /> -->
        <PromoStrip />
        <div
          class="my-2 p-2 bg-white border border-gray-300 dark:border-black/50 dark:bg-[#393444] rounded-lg shadow"
        >
          <!-- <BetBuilderTabSection /> -->
          <HotSection />
        </div>
        <TopLeagues />
        <div
          class="shadow-md dark:shadow-lg my-2 rounded-t-lg overflow-clip dark:bg-[#251F32] bg-white"
        >
          <div
            class="sticky z-[2] top-[9.7rem] pb-2 shadow-sm dark:shadow-lg rounded-t-lg border dark:border-black/40 dark:bg-[#251F32] bg-white"
          >
            <SportsTabSection />
            <div class="flex justify-between px-1 py-1.5">
              <HighlitsTab /><LeaguesButton />
              <CalendarDropdown />
            </div>
            <div class="px-1">
              <MarketSection />
            </div>
          </div>
          <div class="border-x dark:border-black/40">
            <InfiniteScroll />
          </div>
        </div>
      </div>
    </div>
    <SEOMarkupContent />
    <Footer />
    <MobileFooter />
  </LazyInfinityScroll>
</template>
