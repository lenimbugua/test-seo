<script setup>
// import { useGoTogooglePlay } from "@/composables/useGoTogooglePlay";
import { useDark } from "@vueuse/core";

// const { goToGooglePlay } = useGoTogooglePlay();

const isDark = useDark();
</script>
<template>
  <div
    :class="[isDark ? 'dark-border' : 'custom-border']"
    class="rounded-t-lg overflow-clip w-[16rem]"
  >
    <div
      :class="['dark:text-dark-purple-3 text-gray-950']"
      class="flex items-center justify-center text-lg py-1.5 font-extrabold bg-[#1b1627] bg-black/5"
    >
      Promotions
    </div>
    <!-- <div
      :class="['bg-white dark:bg-white/5']"
      class="cursor-pointer flex justify-center items-center p-8"
      @click="goToGooglePlay()"
    >
      <div
        :class="['text-dark-purple-23 dark:text-dark-purple-3']"
        class="flex flex-col space-y-2"
      >
        <div class="text-lg font-bold">Hakibets App</div>
        <button
          class="bg-[#56CB05] p-2 shadow text-xl rounded-md font-black"
          :class="['text-dark-purple-23']"
        >
          Install
        </button>
      </div>
    </div> -->
    <!-- <div
      :class="['text-dark-purple-23']"
      class="flex justify-center items-center p-8 dark:bg-[#36C31F] bg-[#36C31F]/20"
    >
      <div class="flex flex-col space-y-2">
        <h4 class="font-bold">Join Affiliate</h4>
        <small>Earn upto KES. 50,000 every week</small>
        <RouterLink
          :class="['text-dark-purple-3']"
          class="bg-[#09070d] p-2 shadow-md rounded-md font-extrabold flex justify-center items-center text-xl"
          :to="{ name: 'join-affiliate' }"
          >Join now</RouterLink
        >
      </div>
    </div> -->
    <div :class="['bg-white']" class="flex justify-center items-center p-8">
      <div class="flex flex-col space-y-2">
        <h4 class="font-bold text-[#09070d]">FREE 2GB Bundles</h4>
        <small class="text-[#09070d]">Deposit on hakibets and WIN!</small>
        <RouterLink
          :to="{ name: 'deposit' }"
          class="p-2 bg-[#09070d] block shadow text-xl rounded-md font-black"
          :class="['text-dark-purple-3']"
        >
          Deposit here
        </RouterLink>
      </div>
    </div>
  </div>
</template>
