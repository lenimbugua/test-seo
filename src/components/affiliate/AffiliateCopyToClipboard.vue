<script setup>
import { useAffiliateStore } from "../../stores/affiliate";

import { ClipboardDocumentIcon } from "@heroicons/vue/20/solid";
import { useClipboard } from "@vueuse/core";
import { storeToRefs } from "pinia";
const { affiliateUrl } = storeToRefs(useAffiliateStore());

const { copy, copied } = useClipboard({ affiliateUrl });
</script>

<template>
  <div
    class="bg-white dark:bg-[#504B5C] w-full border border-gray-300 dark:border-white/20 rounded-md p-4 mt-3"
  >
    <div class="max-w-xl justify-center md:justify-start">
      <div class="text-3xl font-bold text-amber-500 text-center md:text-left">
        Its Easy
      </div>
      <p class="text-sm dark:text-gray-400 pb-1">
        Just click the link below to copy it and share it with your friends and
        network!
      </p>
      <button
        class="w-full border dark:border-dark-purple-19 rounded-md bg-gray-300 dark:bg-[#241E34] dark:text-gray-50 text-gray-900"
        @click="copy(affiliateUrl)"
      >
        <div
          class="flex text-xs divide-x dark:divide-dark-purple-19 items-center justify-between"
        >
          <div class="whitespace-nowrap overflow-x-scroll scrollbar-hide px-2">
            {{ affiliateUrl }}
          </div>
          <div class="py-3 px-2 flex items-center space-x-2">
            <ClipboardDocumentIcon class="w-5 h-5 text-green-500" />
            <span v-if="copied" class="text-green-500">Copied!</span>
            <span v-else>copy</span>
          </div>
        </div>
      </button>
    </div>
  </div>
</template>
