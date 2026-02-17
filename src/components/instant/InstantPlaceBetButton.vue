<script setup>
import { useInstantBetslipStore } from "@/stores/instant-betslip.js";
import { useLoginStore } from "@/stores/login.js";
import { useRouter } from "vue-router";
import { useModalStore } from "@/stores/modal";
import { useModalTypes } from "@/composables/useModalTypes";
import { storeToRefs } from "pinia";

const { instantBetslip } = useModalTypes();

const { closeModal, openModal } = useModalStore();

const { token } = storeToRefs(useLoginStore());
const router = useRouter();
const { placeBet } = useInstantBetslipStore();
const { possibleWin, pending, betslip, stake } = storeToRefs(
  useInstantBetslipStore()
);

async function bet() {
  if (betslip.value.length === 0) {
    openModal(instantBetslip);
    return;
  }
  if (!stake.value) {
    return;
  }
  if (!token.value) {
    router.push({ name: "login" });
    closeModal();
    return;
  }
  placeBet();
}
</script>
<template>
  <button
    v-if="betslip.length > 0"
    type="submit"
    class="bg-[#009260] w-full py-2 text-center"
    @click="bet()"
  >
    <TheButtonSpin v-if="pending" />

    <div v-else>
      <div class="text-sm text-white">To win Kshs. {{ possibleWin }}</div>
      <div class="font-bold text-white uppercase">Place Bet</div>
    </div>
  </button>
</template>
