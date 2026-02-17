<template>
  <div class="w-full max-w-2xl mx-auto mb-6">
    <TabGroup>
      <TabList
        class="bg-[#0f0b15] p-1 rounded-xl border border-gray-700/50 shadow-lg flex gap-1 md:gap-2 relative z-10"
      >
        <Tab v-slot="{ selected }" as="template">
          <button
            :class="[
              'flex-1 flex items-center justify-center gap-1.5 md:gap-2 py-2 rounded-lg text-[10px] md:text-xs font-black uppercase tracking-wider transition-all duration-300 outline-none overflow-hidden whitespace-nowrap',
              selected
                ? 'bg-[#FFB002] text-[#241E34] shadow-[0_0_10px_rgba(255,176,2,0.4)] ring-1 ring-[#FFB002]/50'
                : 'text-gray-400 hover:text-white hover:bg-white/5',
            ]"
          >
            <span
              class="text-sm md:text-base relative z-10"
              :class="{ 'animate-bounce': selected }"
              >💰</span
            >
            <span class="relative z-10">My Rewards</span>
          </button>
        </Tab>

        <Tab v-slot="{ selected }" as="template">
          <button
            :class="[
              'flex-1 flex items-center justify-center gap-1.5 md:gap-2 py-2 rounded-lg text-[10px] md:text-xs font-black uppercase tracking-wider transition-all duration-300 outline-none overflow-hidden whitespace-nowrap',
              selected
                ? 'bg-[#1C7929] text-white shadow-[0_0_10px_rgba(28,121,41,0.5)] ring-1 ring-[#1C7929]/50'
                : 'text-gray-400 hover:text-white hover:bg-white/5',
            ]"
          >
            <span
              class="text-sm md:text-base relative z-10"
              :class="{ 'animate-pulse': selected }"
              >🎁</span
            >
            <span class="relative z-10">Friend Rewards</span>
          </button>
        </Tab>

        <Tab v-slot="{ selected }" as="template">
          <button
            :class="[
              'flex-1 flex items-center justify-center gap-1.5 md:gap-2 py-2 rounded-lg text-[10px] md:text-xs font-black uppercase tracking-wider transition-all duration-300 outline-none overflow-hidden whitespace-nowrap',
              selected
                ? 'bg-gradient-to-r from-[#FFB002] to-[#D99502] text-[#241E34] shadow-[0_0_15px_rgba(255,176,2,0.3)] ring-1 ring-white/50'
                : 'text-gray-400 hover:text-white hover:bg-white/5',
            ]"
          >
            <span
              class="text-sm md:text-base relative z-10"
              :class="{ 'animate-spin-slow': selected }"
              >🏆</span
            >
            <span class="relative z-10">Prizes</span>
          </button>
        </Tab>
      </TabList>

      <TabPanels class="mt-4">
        <TabPanel class="outline-none">
          <FestiveRewards />
          <!-- <div
            class="bg-[#241E34]/90 backdrop-blur-md border border-[#FFB002]/30 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in-up"
          >
            <div>
              <h3 class="text-[#FFB002] font-bold text-sm uppercase mb-1">
                Total Earned
              </h3>
              <div class="flex items-baseline gap-2">
                <span class="text-2xl font-black text-white tracking-tight"
                  >KES 2,400</span
                >
                <span class="text-[10px] text-gray-400">from 12 users</span>
              </div>
            </div>
            <button
              class="w-full md:w-auto bg-[#FFB002] text-[#241E34] text-xs font-bold px-4 py-2 rounded-lg hover:bg-white transition-colors"
            >
              Withdraw
            </button>
          </div> -->
        </TabPanel>

        <TabPanel class="outline-none">
          <div
            class="bg-[#241E34]/90 backdrop-blur-md border border-[#1C7929]/30 rounded-2xl p-4 animate-fade-in-up"
          >
            <div class="flex justify-between items-center mb-3">
              <h3 class="text-[#1C7929] font-bold text-sm uppercase">
                5 Free Aviator Bets
              </h3>
              <span
                class="text-[10px] bg-[#1C7929]/20 text-[#1C7929] px-2 py-0.5 rounded border border-[#1C7929]/30"
                >3 Pending</span
              >
            </div>
            <div
              class="flex items-center justify-between bg-[#15101E] p-2 rounded-lg border border-gray-700/50"
            >
              <div class="flex items-center gap-2">
                <div
                  class="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-[10px] text-gray-400"
                >
                  ?
                </div>
                <div class="text-xs text-gray-300 font-mono">0722***891</div>
              </div>
              <button
                class="text-[10px] text-[#1C7929] font-bold hover:underline"
              >
                Nudge 🔔
              </button>
            </div>
          </div>
        </TabPanel>

        <TabPanel class="outline-none">
          <div
            class="bg-gradient-to-r from-[#241E34] to-[#15101E] border border-white/10 rounded-2xl p-4 flex items-center justify-between animate-fade-in-up relative overflow-hidden"
          >
            <div
              class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"
            ></div>

            <div class="relative z-10">
              <h3 class="text-white font-bold text-sm uppercase italic">
                Nduthi Draw
              </h3>
              <p class="text-[10px] text-gray-400">Draw Date: Friday 28th</p>
            </div>

            <div
              class="relative z-10 flex flex-col items-center bg-[#15101E]/50 border border-[#FFB002]/50 px-3 py-1 rounded-lg"
            >
              <span class="text-[10px] text-[#FFB002] uppercase font-bold"
                >Entries</span
              >
              <span class="text-xl font-black text-white">05</span>
            </div>
          </div>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>

<script setup>
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/vue";
import FestiveRewards from "./FestiveRewards.vue";
</script>

<style scoped>
.animate-fade-in-up {
  animation: fade-in-up 0.3s ease-out forwards;
}
@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(5px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-spin-slow {
  animation: spin 3s linear infinite;
}
</style>
