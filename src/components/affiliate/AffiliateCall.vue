<script setup lang="ts">
import { BoltIcon } from "@heroicons/vue/24/solid";
</script>

<template>
  <div class="relative h-32 md:h-48 bg-white dark:bg-[#504B5C] backdrop-blur">
    <!-- Dense Confetti Background -->
    <div class="absolute inset-0 opacity-20 dark:opacity-20 overflow-hidden">
      <!-- 30 confetti pieces with varied colors, sizes and rotations -->
      <div
        v-for="i in 100"
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
    <section
      class="text-[#FEAF04] font-bold rounded-lg transition-all duration-300 p-2"
    >
      <div class="text-center mx-auto">
        <h1
          class="md:text-4xl leading-0 text-md flex space-x-2 justify-center font-extrabold text-white leading-tight"
        >
          <div class="text-gray-500 dark:text-slate-200">
            Make Money <span class="text-[#FEAF04]">Weekly!</span>
          </div>
          <div class="text-gray-500 dark:text-slate-200">
            Up to
            <span class="text-[#56CB05] font-black">KES 300,000</span>
          </div>
        </h1>

        <div
          class="py-2 md:py-4 flex justify-center items-center space-x-6 opacity-90"
        >
          <div class="text-white flex items-center">
            <BoltIcon class="w-6 h-6 md:h-8 md:w-8 mr-2 text-amber-500" />
            <span class="text-gray-500 dark:text-slate-200 text-sm"
              >Instant Payouts</span
            >
          </div>
          <div class="text-white flex items-center">
            <svg
              class="w-6 h-6 md:h-8 md:w-8 mr-2 text-[#56CB05]"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"
              ></path>
            </svg>
            <span class="text-gray-500 dark:text-slate-200 text-sm"
              >50K+ Members</span
            >
          </div>
        </div>

        <p class="md:text-xl text-gray-500 dark:text-slate-200 mx-auto text-xs">
          Earn up to KES 200 for every referred user and receive a percentage of
          all their future earnings!
        </p>
      </div>
    </section>
  </div>
</template>
