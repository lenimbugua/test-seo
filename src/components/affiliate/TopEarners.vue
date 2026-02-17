<script setup>
import formatStuff from "@/utilities/format-stuff";
import { storeToRefs } from "pinia";
import { useAffiliateStore } from "../../stores/affiliate";

const { formattedNumber } = formatStuff();
const { earnings } = storeToRefs(useAffiliateStore());

const getRankColor = (rank) => {
  let rankColor = "";
  switch (rank) {
    case 1:
      rankColor = "text-amber-500";
      break;
    case 2:
      rankColor = "text-slate-400 dark:text-[#EDEDED]";
      break;
    case 3:
      rankColor = "text-amber-700";
      break;
    case 4:
      rankColor = "text-blue-400";
      break;
    case 5:
      rankColor = "text-red-500";
      break;

    default:
      rankColor = "bg-amber-500";
      break;
  }

  return rankColor;
};
</script>
<template>
  <div
    class="p-2 h-32 md:h-48 rounded-md bg-gray-50 dark:bg-[#504B5C] relative overflow-hidden"
  >
    <!-- Dense Confetti Background -->
    <div class="absolute inset-0 opacity-20 dark:opacity-30 overflow-hidden">
      <!-- 30 confetti pieces with varied colors, sizes and rotations -->
      <div
        v-for="i in 300"
        :key="i"
        class="absolute rounded-sm"
        :class="[
          'bg-' +
            [
              'red-400',
              'lime-400',
              'rose-400',
              'sky-400',
              '[#56CB05]',
              '[#45A704]',
              '[#67E106]',
              'amber-500',
              'yellow-400',
              '[#504B5C]',
              '[#3D3848]',
              '[#625D6D]',
              'purple-400',
              'emerald-300',
            ][Math.floor(Math.random() * 10)],
        ]"
        :style="{
          top: Math.random() * 100 + '%',
          left: Math.random() * 100 + '%',
          transform: 'rotate(' + Math.random() * 360 + 'deg)',
          width: Math.random() * 10 + 1 + 'px',
          height: Math.random() * 10 + 1 + 'px',
          opacity: 1,
        }"
      ></div>
    </div>

    <div class="relative z-10 h-full flex flex-col">
      <div class="flex justify-center mx-auto items-center space-x-2">
        <div class="text-[#FEAF04] font-bold text-lg md:text-3xl rounded-md">
          Top Earners
        </div>
      </div>
      <div class="flex justify-between max-w-md mx-auto space-x-2 items-end">
        <div
          v-for="topEarner in earnings?.topEarners"
          :key="topEarner?.position"
          class="flex flex-col justify-center text-center bg-gradient-to-b from-white via-gray-100 to-[#56CB05] dark:from-[#504B5C] dark:via-black/10 dark:to-[#56CB05] px-2 rounded-t-full hover:scale-105 transition-transform duration-200"
        >
          <div class="rounded-full py-1.5 md:py-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              :class="getRankColor(topEarner.position)"
              class="text-amber-500 h-12 w-12 md:h-20 md:w-20"
              viewBox="0 0 576 512"
            >
              <path
                fill="currentColor"
                d="M400 0H176c-26.5 0-48.1 21.8-47.1 48.2c.2 5.3.4 10.6.7 15.8H24C10.7 64 0 74.7 0 88c0 92.6 33.5 157 78.5 200.7c44.3 43.1 98.3 64.8 138.1 75.8c23.4 6.5 39.4 26 39.4 45.6c0 20.9-17 37.9-37.9 37.9H192c-17.7 0-32 14.3-32 32s14.3 32 32 32h192c17.7 0 32-14.3 32-32s-14.3-32-32-32h-26.1c-20.9 0-37.9-17-37.9-37.9c0-19.6 15.9-39.2 39.4-45.6c39.9-11 93.9-32.7 138.2-75.8C542.5 245 576 180.6 576 88c0-13.3-10.7-24-24-24H446.4c.3-5.2.5-10.4.7-15.8C448.1 21.8 426.5 0 400 0M48.9 112h84.4c9.1 90.1 29.2 150.3 51.9 190.6c-24.9-11-50.8-26.5-73.2-48.3c-32-31.1-58-76-63-142.3zm415.2 142.3c-22.4 21.8-48.3 37.3-73.2 48.3c22.7-40.3 42.8-100.5 51.9-190.6h84.4c-5.1 66.3-31.1 111.2-63 142.3z"
              />
            </svg>
          </div>
          <div class="text-center text-gray-600 dark:text-white pb-2 font-black text-xs">
            {{ formattedNumber(topEarner?.amount) }}
          </div>
        </div>
        <!-- <div
          class="block text-center bg-gradient-to-b from-gray-50 via-gray-100 to-[#56CB05] dark:from-[#504B5C] dark:via-black/10 dark:to-[#56CB05] px-2 rounded-t-full hover:scale-105 transition-transform duration-200"
        >
          <div class="relative rounded-full aspect-[3/5]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="text-slate-400 dark:text-[#EDEDED] h-12 w-12"
              viewBox="0 0 576 512"
            >
              <path
                fill="currentColor"
                d="M400 0H176c-26.5 0-48.1 21.8-47.1 48.2c.2 5.3.4 10.6.7 15.8H24C10.7 64 0 74.7 0 88c0 92.6 33.5 157 78.5 200.7c44.3 43.1 98.3 64.8 138.1 75.8c23.4 6.5 39.4 26 39.4 45.6c0 20.9-17 37.9-37.9 37.9H192c-17.7 0-32 14.3-32 32s14.3 32 32 32h192c17.7 0 32-14.3 32-32s-14.3-32-32-32h-26.1c-20.9 0-37.9-17-37.9-37.9c0-19.6 15.9-39.2 39.4-45.6c39.9-11 93.9-32.7 138.2-75.8C542.5 245 576 180.6 576 88c0-13.3-10.7-24-24-24H446.4c.3-5.2.5-10.4.7-15.8C448.1 21.8 426.5 0 400 0M48.9 112h84.4c9.1 90.1 29.2 150.3 51.9 190.6c-24.9-11-50.8-26.5-73.2-48.3c-32-31.1-58-76-63-142.3zm415.2 142.3c-22.4 21.8-48.3 37.3-73.2 48.3c22.7-40.3 42.8-100.5 51.9-190.6h84.4c-5.1 66.3-31.1 111.2-63 142.3z"
              />
            </svg>
          </div>
          <div class="text-gray-950 dark:text-white pb-2 font-black text-xs">
            2.55M
          </div>
        </div>
        <div
          class="block text-center bg-gradient-to-b from-gray-50 via-gray-100 to-[#56CB05] dark:from-[#504B5C] dark:via-black/10 dark:to-[#56CB05] px-2 rounded-t-full hover:scale-105 transition-transform duration-200"
        >
          <div class="relative rounded-full aspect-[3/5]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="text-amber-700 h-12 w-12"
              viewBox="0 0 576 512"
            >
              <path
                fill="currentColor"
                d="M400 0H176c-26.5 0-48.1 21.8-47.1 48.2c.2 5.3.4 10.6.7 15.8H24C10.7 64 0 74.7 0 88c0 92.6 33.5 157 78.5 200.7c44.3 43.1 98.3 64.8 138.1 75.8c23.4 6.5 39.4 26 39.4 45.6c0 20.9-17 37.9-37.9 37.9H192c-17.7 0-32 14.3-32 32s14.3 32 32 32h192c17.7 0 32-14.3 32-32s-14.3-32-32-32h-26.1c-20.9 0-37.9-17-37.9-37.9c0-19.6 15.9-39.2 39.4-45.6c39.9-11 93.9-32.7 138.2-75.8C542.5 245 576 180.6 576 88c0-13.3-10.7-24-24-24H446.4c.3-5.2.5-10.4.7-15.8C448.1 21.8 426.5 0 400 0M48.9 112h84.4c9.1 90.1 29.2 150.3 51.9 190.6c-24.9-11-50.8-26.5-73.2-48.3c-32-31.1-58-76-63-142.3zm415.2 142.3c-22.4 21.8-48.3 37.3-73.2 48.3c22.7-40.3 42.8-100.5 51.9-190.6h84.4c-5.1 66.3-31.1 111.2-63 142.3z"
              />
            </svg>
          </div>
          <div class="text-gray-950 dark:text-white pb-2 font-black text-xs">
            2.23M
          </div>
        </div>
        <div
          class="block text-center bg-gradient-to-b from-gray-50 via-gray-100 to-[#56CB05] dark:from-[#504B5C] dark:via-black/10 dark:to-[#56CB05] px-2 rounded-t-full hover:scale-105 transition-transform duration-200"
        >
          <div class="relative rounded-full aspect-[3/5]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="text-blue-400 h-12 w-12"
              viewBox="0 0 576 512"
            >
              <path
                fill="currentColor"
                d="M400 0H176c-26.5 0-48.1 21.8-47.1 48.2c.2 5.3.4 10.6.7 15.8H24C10.7 64 0 74.7 0 88c0 92.6 33.5 157 78.5 200.7c44.3 43.1 98.3 64.8 138.1 75.8c23.4 6.5 39.4 26 39.4 45.6c0 20.9-17 37.9-37.9 37.9H192c-17.7 0-32 14.3-32 32s14.3 32 32 32h192c17.7 0 32-14.3 32-32s-14.3-32-32-32h-26.1c-20.9 0-37.9-17-37.9-37.9c0-19.6 15.9-39.2 39.4-45.6c39.9-11 93.9-32.7 138.2-75.8C542.5 245 576 180.6 576 88c0-13.3-10.7-24-24-24H446.4c.3-5.2.5-10.4.7-15.8C448.1 21.8 426.5 0 400 0M48.9 112h84.4c9.1 90.1 29.2 150.3 51.9 190.6c-24.9-11-50.8-26.5-73.2-48.3c-32-31.1-58-76-63-142.3zm415.2 142.3c-22.4 21.8-48.3 37.3-73.2 48.3c22.7-40.3 42.8-100.5 51.9-190.6h84.4c-5.1 66.3-31.1 111.2-63 142.3z"
              />
            </svg>
          </div>
          <div class="text-gray-950 dark:text-white pb-2 font-black text-xs">
            2.03M
          </div>
        </div>
        <div
          class="block text-center bg-gradient-to-b from-gray-50 via-gray-100 to-[#56CB05] dark:from-[#504B5C] dark:via-black/10 dark:to-[#56CB05] px-2 rounded-t-full hover:scale-105 transition-transform duration-200"
        >
          <div class="relative rounded-full aspect-[3/5]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="text-red-500 h-12 w-12"
              viewBox="0 0 576 512"
            >
              <path
                fill="currentColor"
                d="M400 0H176c-26.5 0-48.1 21.8-47.1 48.2c.2 5.3.4 10.6.7 15.8H24C10.7 64 0 74.7 0 88c0 92.6 33.5 157 78.5 200.7c44.3 43.1 98.3 64.8 138.1 75.8c23.4 6.5 39.4 26 39.4 45.6c0 20.9-17 37.9-37.9 37.9H192c-17.7 0-32 14.3-32 32s14.3 32 32 32h192c17.7 0 32-14.3 32-32s-14.3-32-32-32h-26.1c-20.9 0-37.9-17-37.9-37.9c0-19.6 15.9-39.2 39.4-45.6c39.9-11 93.9-32.7 138.2-75.8C542.5 245 576 180.6 576 88c0-13.3-10.7-24-24-24H446.4c.3-5.2.5-10.4.7-15.8C448.1 21.8 426.5 0 400 0M48.9 112h84.4c9.1 90.1 29.2 150.3 51.9 190.6c-24.9-11-50.8-26.5-73.2-48.3c-32-31.1-58-76-63-142.3zm415.2 142.3c-22.4 21.8-48.3 37.3-73.2 48.3c22.7-40.3 42.8-100.5 51.9-190.6h84.4c-5.1 66.3-31.1 111.2-63 142.3z"
              />
            </svg>
          </div>
          <div class="text-gray-950 dark:text-white pb-2 font-black text-xs">
            1.7M
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>
