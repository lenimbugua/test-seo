<script setup>
import { CheckCircleIcon } from "@heroicons/vue/24/solid";
</script>
<template>
  <div v-if="responseOK">
    <CheckCircleIcon class="w-10 h-10 mx-auto text-green-500" />
    <DialogTitle
      as="h3"
      class="w-full flex justify-center text-lg font-medium leading-6 text-green-500"
    >
      Bet saved successfully
    </DialogTitle>
    <div class="mt-2">
      <p class="text-sm text-center text-gray-500">
        Your bet has been successfully submitted. .
      </p>
    </div>
  </div>
</template>
