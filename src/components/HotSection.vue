<script setup>
import { useLoginStore } from "@/stores/login.js";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/vue";
import { toRefs } from "vue";
import { useRouter } from "vue-router";
import { casinoGamesRouteName, useCasino } from "../composables/useCasino";
import BoostedMatch from "../views/BoostedMatch.vue";

const router = useRouter();
const { setAfterLoginAction } = useLoginStore();

const { isAuthenticated } = toRefs(useLoginStore());

const { launchCasino } = useCasino();

const tabs = ["Bet Builder", "Live", "Affiliate", "Top Games"];

function afterLoginAction() {
  launchCasino("1950", "evolution", casinoGamesRouteName);
}

function launchTopGames(tab) {
  console.log(tab);

  if (tab === "Affiliate") {
    console.log(tab);
    router.push({ name: "join-affiliate" });
    return;
  }
  if (tab !== "Top Games") {
    return;
  }
  if (!isAuthenticated.value) {
    const { openLoginModal } = useLoginStore();
    setAfterLoginAction(afterLoginAction);
    openLoginModal();
    return;
  }

  afterLoginAction();
}
</script>
<template>
  <TabGroup>
    <TabList class="flex p-1 overflow-x-scroll scrollbar-hide">
      <h2
        data-v-93afc5f8=""
        class="dark:text-slate-300 font-bold text-lg border-r border-slate-300 dark:border-slate-500 pr-4"
      >
        Hot
      </h2>
      <Tab v-for="tab in tabs" :key="tab" v-slot="{ selected }" as="template">
        <div
          :class="[
            'cursor-pointer py-1.5  px-2 md:px-4 text-xs whitespace-nowrap text-center font-medium relative',
            ' focus:outline-none',
            selected
              ? 'dark:text-[#35c31f] text-green-800 font-semibold'
              : 'dark:text-gray-100/90 text-gray-800',
          ]"
          @click="launchTopGames(tab)"
        >
          <span
            v-if="tab === 'Top Games' || tab === 'Affiliate'"
            class="block absolute right-0 top-0 p-0.5 px-1 rounded-md border-red-600 bg-[#EF4444] text-[0.4rem] font-bold leading-none text-white"
            >NEW</span
          >

          {{ tab }}
        </div>
      </Tab>
    </TabList>
    <TabPanels>
      <TabPanel>
        <BetBuilderTabSection />
      </TabPanel>
      <TabPanel>
        <BoostedMatch />
      </TabPanel>
    </TabPanels>
  </TabGroup>
</template>
