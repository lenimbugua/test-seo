<script setup>
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/vue";

import LeaderBoards from "./LeaderBoards.vue";
import MyStats from "./MyStats.vue";
import AffiliateFAQs from "./AffiliateFAQs.vue";

</script>

<template>
  <TabGroup>
    <TabList
      class="flex gap-1 p-1 bg-white dark:bg-[#15101E]/80 backdrop-blur-md rounded-xl border border-gray-300 dark:border-gray-700/50 dark:shadow-xl relative z-10"
    >
      <Tab v-slot="{ selected }" as="template">
        <button
          :class="[
            'relative flex-1 flex items-center justify-center p-1 py-1.5 rounded-md transition-all duration-300 outline-none group overflow-hidden whitespace-nowrap',
            selected
              ? 'bg-gradient-to-br from-[#FFB002] to-yellow-600 text-[#241E34] shadow-[0_0_10px_rgba(255,176,2,0.5)] ring-1 ring-white/20'
              : 'bg-gray-300 dark:bg-[#241E34]/50 text-gray-600 dark:text-gray-400 dark:hover:text-white/80 hover:bg-gray-200 dark:hover:bg-white/10 border border-transparent',
          ]"
        >
          <span class="text-sm" :class="{ 'animate-pulse': selected }">📈</span>
          <span class="font-bold text-sm text-center">My Stats</span>
        </button>
      </Tab>

      <Tab v-slot="{ selected }" as="template">
        <button
          :class="[
            'relative flex-1 flex  items-center justify-center px-1 rounded-lg transition-all duration-300 outline-none group overflow-hidden whitespace-nowrap',
            selected
              ? 'bg-gradient-to-br from-purple-600 to-pink-500 text-white shadow-[0_0_10px_rgba(168,85,247,0.5)] ring-1 ring-white/20'
              : 'bg-gray-300 dark:bg-[#241E34]/50 text-gray-600 dark:text-gray-400 dark:hover:text-white/80 hover:bg-gray-200 dark:hover:bg-white/10 border border-transparent',
          ]"
        >
          <span class="text-md" :class="{ 'animate-tada': selected }">
            🏅
          </span>
          <span class="font-bold text-sm text-center">Leader board</span>
        </button>
      </Tab>
      <Tab v-slot="{ selected }" as="template">
        <button
          :class="[
            'relative flex-1 flex  items-center justify-center px-1 rounded-lg transition-all duration-300 outline-none group overflow-hidden whitespace-nowrap',
            selected
              ? 'bg-gradient-to-br from-sky-600 to-fuchsia-500 text-white shadow-[0_0_10px_rgba(168,85,247,0.5)] ring-1 ring-white/20'
              : 'bg-gray-300 dark:bg-[#241E34]/50 text-gray-600 dark:text-gray-400 dark:hover:text-white/80 hover:bg-gray-200 dark:hover:bg-white/10 border border-transparent',
          ]"
        >
          <span class="text-md" :class="{ 'animate-tada': selected }">
            💡
          </span>
          <span class="font-bold text-sm text-center">FAQ's</span>
        </button>
      </Tab>
    </TabList>

    <div class="overflow-y-auto scrollbar-hide max-h-[calc(100vh-4rem)]">
      <TabPanels>
        <TabPanel class="w-full py-4"> <MyStats /> </TabPanel>
        <!-- <TabPanel class="w-full py-4"> <InviteFriends /> </TabPanel>
        <TabPanel class="w-full py-4"> <RewardsTab /> </TabPanel> -->
        <TabPanel class="w-full py-2">
          <LeaderBoards />
        </TabPanel>
        <TabPanel class="w-full py-2">
          <AffiliateFAQs />
        </TabPanel>
      </TabPanels>
    </div>
  </TabGroup>
</template>

<style scoped>
/* Add the necessary custom animation definition for the shimmer effect */
@keyframes shimmer {
  0% {
    transform: translateX(-150%) skewX(-12deg);
  }
  100% {
    transform: translateX(150%) skewX(-12deg);
  }
}
.animate-\[shimmer\_2s\_infinite\] {
  animation: shimmer 2s infinite;
}
/* Ensure the body or wrapper background matches the dark theme */
/* You might need to add scrollbar-hide via a plugin or specific CSS */
</style>
