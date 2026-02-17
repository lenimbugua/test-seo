<script setup>
import { useBetslipLogin } from "@/composables/useBetslipLogin";
import { useModalTypes } from "@/composables/useModalTypes";
import { useModalStore } from "@/stores/modal";
import { ShareIcon } from "@heroicons/vue/24/solid";
import { storeToRefs } from "pinia";
import { useLoginStore } from "../stores/login.js";
import { useShareBetStore } from "../stores/sharebet.js";
import { useBetslipStore } from "../stores/sports-betslip.js";

const { openLogin } = useBetslipLogin();

const { showNoBetError } = useBetslipStore();
const { betslip } = storeToRefs(useBetslipStore());
const { shareBetslip } = useShareBetStore();
const { pending } = storeToRefs(useShareBetStore());
const { shareBet } = useModalTypes();
const { openModal } = useModalStore();

const { isAuthenticated } = storeToRefs(useLoginStore());

async function shareYourBet() {
  if (!betslip.value.length) {
    showNoBetError();
    return;
  }
  if (!isAuthenticated.value) {
    openLogin();
    return;
  }
  await shareBetslip(betslip.value);
  openModal(shareBet);
}
</script>
<template>
  <div
    class="bg-[#0F8F21]/80 flex justify-center items-center px-2 cursor-pointer rounded-md text-green-50 uppercase tracking-wide font-extrabold text-sm rounded-0 shadow"
    @click="shareYourBet"
  >
    <TheButtonSpin v-if="pending" />
    <ShareIcon v-else class="h-6 w-6 text-green-50" />
  </div>
</template>
