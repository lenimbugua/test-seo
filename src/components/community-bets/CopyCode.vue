<script setup>
import { useShareBetStore } from "@/stores/sharebet.js";
import { ClipboardDocumentIcon } from "@heroicons/vue/20/solid";
import { useClipboard } from "@vueuse/core";
import { storeToRefs } from "pinia";

const { bookingCode } = storeToRefs(useShareBetStore());

const { copy, copied } = useClipboard({ source: bookingCode.value });

async function copyCode() {
  await copy(bookingCode.value);
}
</script>
<template>
  <div
    class="cursor-pointer rounded-md shadow flex justify-between p-4 bg-gray-200 dark:bg-white/10"
    @click="copyCode"
  >
    <span class="text-slate-400 font-medium">Copy Booking Code</span>
    <div v-if="!copied" class="flex items-center space-x-2">
      <span class="dark:text-slate-200 font-bold">{{ bookingCode }}</span>
      <ClipboardDocumentIcon class="w-5 h-5 text-green-500" />
    </div>

    <span v-if="copied" class="text-[#56CB05] font-bold">Copied!</span>
  </div>
</template>
