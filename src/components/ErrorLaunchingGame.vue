<script setup>
import { ExclamationCircleIcon } from "@heroicons/vue/24/outline";
</script>
<template>
  <div
    v-if="!responseOK"
    class="h-[90vh] w-screen max-w-[1680px] flex justify-center items-center"
  >
    <div class="px-4 space-y-4 flex flex-col justify-center mx-auto">
      <ExclamationCircleIcon class="w-20 h-20 flex mx-auto text-red-500" />
      <div
        class="w-full flex justify-center text-3xl text-red-500 font-bold text-center"
      >
        <h1>There was an error launching the game</h1>
      </div>
      <div class="w-full flex justify-center space-x-2">
        <button class="bg-white px-4 py-2 rounded-md" @click="$router.go(-1)">
          Go back
        </button>
        <button
          class="bg-green-500 text-white px-4 py-2 rounded-md"
          @click="initGame"
        >
          Try again
        </button>
      </div>
    </div>
  </div>
</template>
