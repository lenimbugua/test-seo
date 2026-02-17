<script setup>
import "swiper/css";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import { onMounted, ref } from "vue";
// import MyEarnings from "./MyEarnings.vue";
import TopEarners from "./TopEarners.vue";

const modules = [Autoplay, EffectFade, Pagination, Navigation];
const progress = ref(0);

const onAutoplayTimeLeft = (swiper, time, progressRatio) => {
  progress.value = 1 - progressRatio;
};

const autoplayDelay = 10000; // ms
// const loader = ref(null);
const loaderStyle = ref({
  width: "0%",
  transition: "none",
});

// const slideRefs = ref([]);

const startLoader = () => {
  // Reset instantly
  loaderStyle.value = {
    width: "0%",
    transition: "none",
  };

  // Trigger animation after a tick
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      loaderStyle.value = {
        width: "100%",
        transition: `width ${autoplayDelay}ms linear`,
      };
    });
  });
};

// Run once on mount
onMounted(() => {
  startLoader();
});
</script>

<template>
  <div class="w-full overflow-hidden sm:px-0 mb-4">
    <div
      class="relative w-full h-32 md:h-48 rounded-md shadow-md border border-gray-300 dark:border-white/25 overflow-clip"
    >
      <swiper
        :space-between="30"
        :centered-slides="true"
        :autoplay="{
          delay: autoplayDelay,
          disableOnInteraction: false,
        }"
        :navigation="false"
        :modules="modules"
        class="mySwiper"
        @slide-change="startLoader"
        @autoplay-time-left="onAutoplayTimeLeft"
      >
        <swiper-slide>
          <AffiliateCall></AffiliateCall>
        </swiper-slide>
        <swiper-slide>
          <TopEarners></TopEarners>
        </swiper-slide>
        <!-- <swiper-slide>
          <TopEarnersGemini></TopEarnersGemini>
        </swiper-slide>
        <swiper-slide>
          <TopEarners></TopEarners>
        </swiper-slide>
        <swiper-slide>
          <TopEarners></TopEarners>
        </swiper-slide> -->
        <!-- <swiper-slide>
          <MyEarnings></MyEarnings>
        </swiper-slide> -->
      </swiper>
      <!-- Bottom progress loader -->
      <div class="absolute z-50 bottom-0 w-full">
        <div class="h-0.5 bg-white dark:bg-white/10">
          <div
            ref="loader"
            class="h-full bg-[#56CB05]"
            :style="loaderStyle"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loader {
  background: linear-gradient(#009260 0 0) 0/0% no-repeat #ddd;
  animation: l1 8s infinite linear;
}
@keyframes l1 {
  100% {
    background-size: 100%;
  }
}
</style>
