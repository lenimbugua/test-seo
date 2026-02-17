<script setup>
import { useInstantStore } from "@/stores/instant";

const { fetchInstantMatches, setCompetitionIsLoading, resetSelectedMarket } =
  useInstantStore();

async function fetchMatches() {
  setCompetitionIsLoading(true);
  resetSelectedMarket();
  const url = "&market_id=Match_Result&skip=0";
  await fetchInstantMatches(url);
  setCompetitionIsLoading(false);
}

fetchMatches();
</script>

<template>
  <HeaderLinks />
  <div
    class="max-w-5xl mx-auto shadow border dark:border-dark-purple-18 mt-4 rounded-md scrollbar-hide"
  >
    <InstantCompetitions />

    <ViewSwitcher />
  </div>
  <MobileFooter />
  <Footer />
</template>
