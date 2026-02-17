<script setup>
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/outline";
import { useSwiper } from "swiper/vue";
import { computed } from "vue";

const swiper = useSwiper();

const totalPages = computed(() => swiper?.value?.slides?.length || 0);

const itsLastPage = computed(() => {
  return swiper.value.isEnd;
});
const itsFirstPage = computed(() => {
  return swiper.value.isBeginning;
});
</script>
<template>
  <div class="flex justify-between pt-4">
    <button
      :disabled="itsFirstPage"
      :class="{ 'opacity-50 cursor-not-allowed': itsFirstPage }"
      class="text-[#56CB05] flex items-center"
      @click="swiper.slidePrev()"
    >
      <ChevronLeftIcon class="h-5 w-5" /> <span class="font-medium">Prev</span>
    </button>

    <div class="dark:text-gray-300">
      {{ swiper.realIndex + 1 }}/{{ totalPages }}
    </div>

    <button
      :disabled="itsLastPage"
      :class="{ 'opacity-50 cursor-not-allowed': itsLastPage }"
      class="text-[#56CB05] flex items-center"
      @click="swiper.slideNext()"
    >
      <span class="font-medium">Next</span> <ChevronRightIcon class="h-5 w-5" />
    </button>
  </div>
</template>
