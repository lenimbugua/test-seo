<script setup>
import { useModalTypes } from "@/composables/useModalTypes";

import { useModalStore } from "@/stores/modal";

const { openModal } = useModalStore();

const { socialIconsModal } = useModalTypes();
</script>
<template>
  <div
    class="max-w-xl fixed bottom-20 md:bottom-0 left-1/2 transform -translate-x-1/2"
  >
    <div class="mx-auto py-3">
      <button
        class="bg-[#56CB05] font-bold text-lg rounded-3xl shadow-3xl p-3 whitespace-nowrap"
        @click="openModal(socialIconsModal)"
      >
        Share With Friends
      </button>
    </div>
  </div>
</template>
