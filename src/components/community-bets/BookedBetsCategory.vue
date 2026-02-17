<script setup>
import { useBookedBetsStore } from "@/stores/booked-bets";
import { storeToRefs } from "pinia";
import "swiper/css";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import EmptyState from "../EmptyState.vue";

const modules = [Autoplay, Navigation];

const { bethub, pending } = storeToRefs(useBookedBetsStore());
</script>
<template>
  <div
    v-if="bethub && bethub.length"
    class="grid grid-cols-1 md:grid-cols-2 gap-4"
  >
    <div
      v-for="hub in bethub"
      :key="hub.id"
      class="p-4 mb-4 border dark:border-white/5 rounded-md shadow-md"
    >
      <div class="flex space-x-2 mb-2">
        <div class="relative h-24 w-64">
          <img
            class="absolute inset-0 h-full w-full rounded-md overflow-clip"
            :src="`${hub.icon}`"
          />
        </div>
        <div class="flex flex-col">
          <div class="text-2xl font-black tracking-wide dark:text-slate-300">
            {{ hub.categoryName }}
          </div>
          <div class="font-semibold dark:text-slate-400">
            {{ hub.categoryDesc }}
          </div>
        </div>
      </div>
      <swiper
        :space-between="30"
        :centered-slides="true"
        :navigation="false"
        :modules="modules"
        class="mySwiper"
      >
        <swiper-slide v-for="bet in hub.bets" :key="bet.shareBet">
          <SelectionsCard :booking-code="bet.shareBet" :selections="bet.slip" />
        </swiper-slide>
        <CategoryPagination />
      </swiper>
    </div>
  </div>
  <div v-else-if="pending"></div>
  <EmptyState v-else />
</template>
