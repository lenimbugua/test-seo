<script setup>
import { useModalTypes } from "@/composables/useModalTypes";
import { useModalStore } from "@/stores/modal";
import { computed } from "vue";

import "swiper/css";

import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";

import { useLoadCode } from "@/composables/useLoadCode";

import { useBetslip } from "@/composables/useBetslip";

import { useShareBetStore } from "@/stores/sharebet.js";

const { setBookingCode } = useShareBetStore();

const modules = [Autoplay, Navigation, Pagination];

const props = defineProps({
  selections: {
    type: Array,
    required: true,
  },
  bookingCode: {
    type: String,
    required: true,
  },
});
const { shareBet } = useModalTypes();
const { openModal } = useModalStore();

function chunkArray(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

const { calculateTotalOdds } = useBetslip();

const totalOdds = calculateTotalOdds(props.selections);
const chunkSize = 2;
const chunkedItems = computed(() => chunkArray(props.selections, chunkSize));

const {
  loadCode,
  setIntention,
  loadSlipIsPending,
  //   viewSlipIsPending,
  isToLoadCode,
  setBookingCode: setBookingCodeComposable,
  //   isToViewCode,
} = useLoadCode();

function addToBetslip() {
  setIntention(isToLoadCode);
  setBookingCodeComposable(props.bookingCode);

  setBookingCode(props.bookingCode);
  loadCode();
}

// function previewCode() {
//   setIntention(isToViewCode);
//   setBookingCode(props.bookingCode);
//   setBookingCodeComposable(props.bookingCode);
//   loadCode();
// }

function openShare() {
  setBookingCode(props.bookingCode);
  openModal(shareBet);
}
</script>
<template>
  <div class="space-y-4">
    <div class="bg-gray-200 dark:bg-white/10 rounded-lg px-4">
      <div class="flex justify-between items-center py-2">
        <div class="flex items-center space-x-1">
          <div
            class="bg-[#56CB05] font-bold rounded-full flex items-center justify-center p-0.5 text-xs h-5 w-5"
          >
            {{ selections.length }}
          </div>
          <div class="text-xs dark:text-white">Selections</div>
        </div>
        <div class="flex items-center space-x-1">
          <div class="text-xs dark:text-white">Odds</div>
          <div class="text-[#56CB05] text-md font-bold">
            {{ totalOdds }}
          </div>
        </div>
      </div>
      <swiper
        :space-between="30"
        :centered-slides="true"
        :navigation="true"
        :pagination="{ clickable: true }"
        :modules="modules"
        class="mySwiper"
      >
        <SwiperSlide v-for="(pair, index) in chunkedItems" :key="index">
          <div
            class="bg-white cursor-pointer dark:bg-black/30 rounded-lg p-2 pb-4 space-y-2 relative"
            @click="addToBetslip"
          >
            <BookedSelection
              v-for="(item, index2) in pair"
              :key="index2"
              :selection="item"
              :index="index * chunkSize + index2"
            />
          </div>
        </SwiperSlide>
      </swiper>
      <div class="flex justify-between items-center py-2">
        <div
          class="flex cursor-pointer items-center space-x-1"
          @click="openShare"
        >
          <div
            class="border text-[#56CB05] hover:bg-[#56CB05] hover:text-gray-950 cursor-pointer border-[#56CB05] font-bold rounded-lg flex items-center justify-center p-2 text-xs"
          >
            <span class=""
              ><svg
                data-v-7e89f62c=""
                width="14px"
                height="14px"
                viewBox="0 0 49 49"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                class="svg-icon-base"
              >
                <g clip-path="url(#clip0_3462_45824)">
                  <path
                    d="M34.2097 32.7733C32.6909 32.7733 31.3297 33.3756 30.2902 34.32L16.0297 25.9867C16.1309 25.5244 16.2097 25.0622 16.2097 24.58C16.2097 24.0978 16.1309 23.6356 16.0297 23.1756L30.1305 14.9222C31.2105 15.9267 32.6302 16.5489 34.2097 16.5489C37.5329 16.5489 40.2104 13.8556 40.2104 10.5222C40.2104 7.18889 37.5307 4.5 34.2097 4.5C30.8909 4.5 28.2112 7.18889 28.2112 10.5222C28.2112 11.0067 28.2899 11.4689 28.3912 11.9289L14.2904 20.1822C13.2104 19.1778 11.7907 18.5556 10.2112 18.5556C6.88795 18.5556 4.21045 21.2467 4.21045 24.58C4.21045 27.9133 6.8902 30.6044 10.2112 30.6044C11.7907 30.6044 13.2104 29.9822 14.2904 28.9778L28.5307 37.3333C28.4294 37.7533 28.3709 38.1956 28.3709 38.6356C28.3709 41.8689 30.9899 44.5 34.2097 44.5C37.4294 44.5 40.0507 41.8689 40.0507 38.6356C40.0507 35.4044 37.4294 32.7733 34.2097 32.7733V32.7733Z"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_3462_45824">
                    <rect
                      width="48"
                      height="48"
                      fill="currentColor"
                      transform="translate(0.108887 0.5)"
                    ></rect>
                  </clipPath>
                </defs></svg
            ></span>
            <div class="tracking-wider uppercase">Share</div>
          </div>
        </div>
        <div class="flex items-center space-x-1">
          <div
            class="bg-[#1C7928] text-gray-950 cursor-pointer border-[#1C7928] font-bold rounded-lg flex items-center justify-center p-2 text-xs"
          >
            <button class="tracking-wider text-white" @click="addToBetslip">
              <TheButtonSpin v-if="loadSlipIsPending" />
              <div v-else class="flex items-center">
                <span
                  ><svg
                    data-v-3f3822ee=""
                    width="12px"
                    height="12px"
                    viewBox="0 0 49 49"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="svg-icon-base text-white"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9.55352 21.5362C7.89513 21.5416 6.55516 22.8905 6.56062 24.5489C6.56608 26.2072 7.9149 27.5472 9.57329 27.5418L21.9977 27.5009L21.9977 39.455C21.9977 41.1134 23.3421 42.4578 25.0005 42.4578C26.6589 42.4578 28.0033 41.1134 28.0033 39.455L28.0033 27.4811L40.2261 27.4409C41.8845 27.4354 43.2245 26.0866 43.219 24.4282C43.2136 22.7698 41.8648 21.4298 40.2064 21.4353L28.0033 21.4755L28.0033 9.42694C28.0033 7.76854 26.6589 6.42414 25.0005 6.42414C23.3421 6.42414 21.9977 7.76855 21.9977 9.42695L21.9977 21.4952L9.55352 21.5362Z"
                      fill="currentColor"
                    ></path></svg
                ></span>
                <span>ADD</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.swiper-pagination {
  z-index: 999 !important;
}
</style>
