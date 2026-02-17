<script setup>
import InstantPlaceBetButton from "./InstantPlaceBetButton.vue";
import InstantStake from "./InstantStake.vue";
import { useModalStore } from "@/stores/modal";
import { useInstantBetslipStore } from "@/stores/instant-betslip.js";

import { storeToRefs } from "pinia";

const { betslip } = storeToRefs(useInstantBetslipStore());

const { showModal } = storeToRefs(useModalStore());
</script>

<template>
  <form class="w-full" @submit.prevent>
    <NextRound v-if="!betslip.length" class="sticky top-20" />

    <div class="w-full flex justify-between items-center">
      <div class="w-1/2"><InstantBottomBetslip /></div>
      <div class="w-1/2">
        <NextRound v-if="!showModal && betslip.length" />
        <InstantStake />
      </div>
    </div>
    <InstantPlaceBetButton />
  </form>
</template>
