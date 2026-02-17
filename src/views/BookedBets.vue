<script setup>
import BookedBetsTab from "@/components/community-bets/BookedBetsTab.vue";
import { useModalTypes } from "@/composables/useModalTypes";
import { useBookedBetsStore } from "@/stores/booked-bets.js";
import { useModalStore } from "@/stores/modal";
import { useShareBetStore } from "@/stores/sharebet.js";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

const { loadSharedBetslip, loadBetslip } = useShareBetStore();
const { fetchBethub } = useBookedBetsStore();
const { pending } = storeToRefs(useBookedBetsStore());
const { responseOK } = storeToRefs(useShareBetStore());

// const { bookedBetPreview } = useModalTypes();
const { betslip } = useModalTypes();

const { openModal } = useModalStore();

const route = useRoute();
const code = route.params.code;

async function openBetslipModal() {
  if (code) {
    await loadSharedBetslip(code);
    if (!responseOK.value) {
      return;
    }
    openModal(betslip);
    loadBetslip();
  }
}
openBetslipModal();

fetchBethub();
</script>
<template>
  <HeaderLinks />
  <div v-if="pending" class="p-3 space-y-4 max-w-4xl mx-auto">
    <BetsLoader />
  </div>

  <div
    v-else
    class="dark:bg-[#241E34] p-4 sm:px-12 rounded-2xl shadow-lg border-b dark:border-black/50"
  >
    <div class="max-w-4xl mx-auto text-center">
      <!-- Headline -->
      <h1 class="text-4xl sm:text-5xl font-extrabold dark:text-white mb-4">
        <span class="text-[#FEAF04]">Share</span> & Win Together!
      </h1>

      <!-- Tagline -->
      <p class="text-lg sm:text-xl dark:text-gray-200">
        Boost Your Bets with Shared Luck!
      </p>
      <!-- Tagline -->
      <p class="text-lg sm:text-xl dark:text-gray-200">
        Load, Bet, Celebrate –
        <span class="font-semibold text-[#56CB05]">Faster Than Ever!</span>
      </p>

      <!-- CTA Button -->
      <!-- <button
        class="bg-[#FEAF04] hover:bg-[#e69f03] text-[#241E34] font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg"
      >
        Explore Shared Bets
      </button> -->

      <!-- Decorative Elements (Optional) -->
      <!-- <div class="mt-10 flex justify-center space-x-4">
        <div class="w-3 h-3 rounded-full bg-[#FEAF04]"></div>
        <div class="w-3 h-3 rounded-full bg-[#1C7928]"></div>
        <div class="w-3 h-3 rounded-full bg-[#FEAF04]"></div>
      </div> -->
    </div>
  </div>
  <div class="p-3 space-y-4 max-w-4xl mx-auto">
    <BookedBetsTab />
  </div>
  <MobileFooter />
  <Footer />
</template>
