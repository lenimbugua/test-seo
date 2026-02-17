<script setup>
import { usePoll } from "@/composables/usePoll";
import { useLoginStore } from "@/stores/login";
import { storeToRefs } from "pinia";
import { onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useDepositStore } from "../stores/deposit.js";
import DepositInput from "./DepositInput.vue";

const router = useRouter();

const { isAuthenticated } = storeToRefs(useLoginStore());

const { performDeposit } = useDepositStore();

const { pollingInterval } = usePoll();

function makeDeposit() {
  performDeposit(router);
}

// Ensure the interval is cleared when the component is unmounted
onUnmounted(() => {
  if (pollingInterval) {
    clearInterval(pollingInterval);
  }
});
</script>
<template>
  <NotAuthenicated v-if="!isAuthenticated" />

  <div v-else class="">
    <form
      class="space-y-2 px-3 border border-gray-300 dark:border-white/10 shadow-lg rounded-lg p-3 bg-gray-100 dark:bg-black/15"
      @submit.prevent="makeDeposit"
    >
      <slot>
        <DepositAmounts />
        <DepositInput />
        <MakeDepositButton />
      </slot>
    </form>
  </div>
</template>
