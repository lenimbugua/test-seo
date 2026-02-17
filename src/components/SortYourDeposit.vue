<script setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";

import { useLoginStore } from "@/stores/login";

import { useToast } from "@/composables/useToast";
import { useDepositStore } from "../stores/deposit.js";

const { fireSuccessToast, fireErrorToast } = useToast();

const { jisort } = useDepositStore();
const { pending, statusMessage, responseOK } = storeToRefs(useDepositStore());

const { openLoginModal } = useLoginStore();
const { isAuthenticated } = storeToRefs(useLoginStore());

const inputMessage = ref("");
const extractedCode = ref("");

const handlePaste = async () => {
  // Extract the code using a regular expression
  const strippedText = inputMessage.value.replace(/\s+/g, ""); // Remove all spaces
  extractedCode.value = strippedText.slice(0, 10); // Get the first 10 characters

  // Update the inputMessage with the extracted code only
  inputMessage.value = extractedCode.value;
};
async function sortDeposit() {
  await jisort(extractedCode.value);

  if (responseOK.value) {
    fireSuccessToast(statusMessage.value);
  } else {
    fireErrorToast(statusMessage.value);
  }
}
</script>
<template>
  <div
    class="space-y-1 px-3 border dark:border-white/10 rounded-md p-2 bg-gray-100 dark:bg-black/15"
  >
    <div class="font-bold text-xl text-[#20682D] dark:text-green-500">
      Sort your Deposit
    </div>

    <form class="space-y-1" @submit.prevent="sortDeposit">
      <label for="code" class="font-bold text-sm dark:text-slate-300"
        >Transaction Message</label
      >
      <div
        class="flex mb-2 font-bold items-center rounded-md overflow-clip border shadow-md dark:border-white/20"
      >
        <input
          id="message"
          v-model="inputMessage"
          type="text"
          class="py-2 px-2 flex flex-grow bg-white dark:bg-[#393444] text-black dark:text-white ring-0 outline-none"
          placeholder="e.g SL354VKM9J..."
          name="code"
          required
          @input="handlePaste"
        />
      </div>
      <p class="text-xs text-gray-600 dark:text-slate-400">
        Paste your transaction message to sort your missing deposit
      </p>
      <div class="py-1">
        <div class="mt-1">
          <button
            v-if="!isAuthenticated"
            NotAuthenicated
            class="w-full bg-[#009260] text-white p-2 rounded-md"
            type="button"
            @click="openLoginModal"
          >
            Login to Sort
          </button>
          <button
            v-else
            class="w-full bg-[#20682D] text-white p-2 rounded-md"
            type="submit"
          >
            <TheButtonSpin v-if="pending" />
            <span v-else> Continue</span>
          </button>
        </div>
      </div>
    </form>

    <div class="dark:text-slate-400 text-gray-600 text-lg">
      <p class="text-xs">
        You can fix any deposit that you made but no record exist. In this
        situation, you might still have received an SMS from M-Pesa informing
        you that this transaction was successful.
      </p>
    </div>
  </div>
</template>
