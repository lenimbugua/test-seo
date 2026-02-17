<script setup>
import { storeToRefs } from "pinia";
import { useCountriesStore } from "../stores/countries";
import { useMatches2Store } from "../stores/matches2";

const { getMatches } = useMatches2Store();
const { pending } = storeToRefs(useMatches2Store());
const { selectedCountry } = storeToRefs(useCountriesStore());

getMatches();
</script>
<template>
  <div
    class="border rounded-md dark:border-dark-purple-17 overflow-clip shadow"
  >
    <div class="bg-white dark:bg-dark-purple-20">
      <div class="bg-white dark:bg-[#393444] py-1 border-b dark:border-black">
        <div class="px-2">
          <SecondaryNav />
        </div>
      </div>
      <div class="bg-gray-300">
        <div class="px-3 font-bold text-lg dark:bg-[#2F293E] dark:text-white">
          Home / Soccer /{{ selectedCountry }}
        </div>
      </div>
      <div class="flex justify-between pr-3">
        <HighlitsTab /><LeaguesButton />
        <CalendarDropdown />
      </div>
      <MarketSection />
      <AnimatePulse v-if="pending" :rows="10" />
      <div class="">
        <InfiniteScroll />
      </div>
    </div>
  </div>
</template>
