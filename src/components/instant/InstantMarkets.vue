<script setup>
import { useInstantStore } from "@/stores/instant";
import { computed } from "vue";
import { storeToRefs } from "pinia";
const { markets } = storeToRefs(useInstantStore());

const firstTwoMarkets = computed(() => {
  return markets.value.slice(0, 2);
});

const { fetchInstantMatches, setSelectedMarket } = useInstantStore();

async function fetchMatches(market) {
  setSelectedMarket(market);
  const url = `&market_id=${market.market_id}&skip=1`;
  await fetchInstantMatches(url);
}
</script>
<template>
  <div
    v-if="markets.length"
    class="flex justify-between items-center space-x-2"
  >
    <div
      v-for="market in firstTwoMarkets"
      :key="market.market_name"
      @click="fetchMatches(market)"
    >
      <div class="text-gray-950 whitespace-nowrap dark:text-white text-xs">
        {{ market.market_name }}
      </div>
    </div>
  </div>
</template>
