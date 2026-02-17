<script setup>
import { useModalStore } from "@/stores/modal";
import { 
    // CheckCircleIcon, 
    XMarkIcon } from "@heroicons/vue/24/solid";
const { closeModal } = useModalStore();
</script>
<template>
  <div>
    <div class="w-full p-2 flex justify-center">
      <div
        style="z-index: 999999"
        class="p-1 absolute -top-10 bg-[#56CB05]/20 rounded-full"
      >
        <CheckCircleIcon
          style="z-index: 100"
          class="w-16 h-16 mx-auto text-green-500"
        />
      </div>
    </div>
    <div
      class="absolute top-4 right-4 p-0.5 rounded-full border border-gray-950 dark:border-slate-300"
      @click="closeModal"
    >
      <XMarkIcon class="text-gray-900 dark:text-white w-5 h-5" />
    </div>
    <!-- <DialogTitle
      as="h3"
      class="w-full flex justify-center text-lg font-medium leading-6 text-green-500"
    >
      Successful !!!
    </DialogTitle>


    <div
      class="mt-2 px-2 rounded-md text-gray-600 dark:text-slate-300 text-center"
    >
      <div>Your bet has been successfully placed</div>
    </div> -->
    <!-- <div class="flex justify-center py-3">
      <button
        class="bg-white shadow p-2 text-green-500 rounded-md uppercase tracking-wider border border-green-500"
        @click="closeModal()"
      >
        ok
      </button>
    </div> -->
           <BetPlaced/>

  </div>
</template>
