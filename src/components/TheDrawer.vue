<script setup>
// import { useGoTogooglePlay } from "@/composables/useGoTogooglePlay";
import { useModalTypes } from "@/composables/useModalTypes";
import { useModalStore } from "@/stores/modal";
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { storeToRefs } from "pinia";
import { useTopLeaguesStore } from "../stores/top-leagues";

import { computed } from "vue";
import { useRouter } from "vue-router";

import { useLiveMatchesStore } from "../stores/live-matches";

import { useSportsQueryParamsStore } from "@/stores/sports-query-params";

import { useCountry } from "../composables/useCountry";

import { useDefaultSport } from "@/composables/useDefaultSport";
import { UserPlusIcon } from "@heroicons/vue/20/solid";
import { SparklesIcon } from "@heroicons/vue/24/solid";
import { useDark } from "@vueuse/core";
import { useDownloadApp } from "../composables/useDownloadApp";
import TheLogo from "./TheLogo.vue";
import ThemeSwitcher from "./ThemeSwitcher.vue";

const { downloadApp } = useDownloadApp();

// const { goToGooglePlay } = useGoTogooglePlay();

const isDark = useDark();

const { initDefaultSport } = useDefaultSport();

const { setResource, resetToDefaults } = useSportsQueryParamsStore();

const { getLiveMatches, emptyLiveMatches } = useLiveMatchesStore();

const router = useRouter();

const { fetchTopLeagues } = useTopLeaguesStore();
fetchTopLeagues();

const { topLeagues } = storeToRefs(useTopLeaguesStore());

const { drawer } = useModalTypes();

const { showModal, modalType } = storeToRefs(useModalStore());

const { closeModal } = useModalStore();

const showDrawer = computed(() => {
  return modalType.value === drawer && showModal.value;
});

const casinoCategoryMap = {
  crash: "all",
  virtuals: "virtuals",
  "popular-games": "top",
};

const goToLink = async (routeName) => {
  await closeModal();
  if (routeName) {
    if (casinoCategoryMap[routeName]) {
      router.push({ name: "casino-home", query: { category: casinoCategoryMap[routeName] } });
      return;
    }
    router.push({ name: routeName });
  }
};

function goToLive() {
  closeModal();
  emptyLiveMatches();
  resetToDefaults();
  setResource("live");
  getLiveMatches();
  router.push({ name: "live", params: { sport: "soccer" } });
}

const goToSports = () => {
  initDefaultSport(true);
  closeModal();
  router.push({ name: "sports", params: { sport: "soccer" } });
};

const goHome = () => {
  closeModal();
  initDefaultSport();
  router.push({ name: "home" });
};

function fetchGame(competition) {
  closeModal();
  const { goToCountry } = useCountry();
  goToCountry(competition, router);
}
</script>

<template>
  <div class="bg-white scrollbar-hide">
    <!-- Mobile menu -->
    <TransitionRoot as="template" :show="showDrawer">
      <Dialog
        as="div"
        class="relative lg:hidden"
        style="z-index: 80"
        @close="closeModal"
      >
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div class="fixed inset-0 flex z-50">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel
              class="relative max-w-xs w-full bg-white dark:bg-[#251F32] px-6 flex flex-col overflow-y-auto"
            >
              <div class="px-4 pt-10 pb-2 flex items-center justify-between">
                <div
                  type="button"
                  class="-m-2 p-2 rounded-md inline-flex cursor-pointer items-center text-white outline-none"
                  @click="goHome()"
                >
                  <span class="sr-only">Hakibets Logo</span>
                  <TheLogo />
                </div>
                <div class="cursor-pointer" @click="closeModal">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="15"
                    class="fill-current text-gray-950 dark:text-white"
                    viewBox="0 0 11 15"
                  >
                    <text
                      id="X"
                      transform="translate(0 12)"
                      font-size="15"
                      font-family="Helvetica-Bold, Helvetica"
                      font-weight="700"
                    >
                      <tspan x="0" y="0">X</tspan>
                    </text>
                  </svg>
                </div>
              </div>

              <div
                class="block px-6 border-b border-gray-400 dark:border-white pb-4 space-y-2.5 pt-4 w-full"
              >
                <!-- sports -->
                <div class="flex cursor-pointer space-x-4" @click="goToSports">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="45.536"
                    height="27.342"
                    class="fill-current h-7 w-7 text-gray-950 dark:text-white"
                    viewBox="0 0 45.536 27.342"
                  >
                    <g
                      id="Icon_material-round-sports"
                      data-name="Icon material-round-sports"
                      transform="translate(-3 -9)"
                    >
                      <path
                        id="Path_88"
                        data-name="Path 88"
                        d="M46.259,9H24.015a14.579,14.579,0,0,0-9.927,3.939A5.709,5.709,0,1,0,10.081,20.2a11.132,11.132,0,0,0-.228,1.776A13.66,13.66,0,1,0,37.015,20.7a2.252,2.252,0,0,1,2.254-2.573h6.284c1.981-.023,2.983-1.047,2.983-2.3V11.277A2.283,2.283,0,0,0,46.259,9ZM8.692,15.83A1.138,1.138,0,1,1,9.83,14.692,1.127,1.127,0,0,1,8.692,15.83Zm14.8,13.661a6.83,6.83,0,1,1,6.83-6.83A6.821,6.821,0,0,1,23.491,29.491Z"
                        transform="translate(0)"
                      />
                      <path
                        id="Path_89"
                        data-name="Path 89"
                        d="M22.607,19.554A4.554,4.554,0,1,1,18.054,15,4.554,4.554,0,0,1,22.607,19.554Z"
                        transform="translate(5.437 3.107)"
                      />
                    </g>
                  </svg>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="fill-current w-16 text-gray-950 dark:text-white"
                    viewBox="0 0 86 28"
                  >
                    <text
                      id="Sports"
                      transform="translate(43 22)"
                      font-size="28"
                      font-family="Helvetica"
                      letter-spacing="0.022em"
                    >
                      <tspan x="-42.002" y="0">Sports</tspan>
                    </text>
                  </svg>
                </div>
                <!-- live -->
                <div
                  class="flex cursor-pointer space-x-4"
                  @click="
                    closeModal();
                    goToLive();
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="38.439"
                    height="27.742"
                    class="fill-current h-7 w-7 stroke-gray-950 dark:stroke-white"
                    viewBox="0 0 38.439 27.742"
                  >
                    <g
                      id="Icon_ion-tv-outline"
                      data-name="Icon ion-tv-outline"
                      transform="translate(-1.75 -6.25)"
                    >
                      <path
                        id="Path_82"
                        data-name="Path 82"
                        d="M4.936,6.75H37a2.686,2.686,0,0,1,2.686,2.686V26.795A2.686,2.686,0,0,1,37,29.481H4.936A2.686,2.686,0,0,1,2.25,26.795V9.436A2.686,2.686,0,0,1,4.936,6.75Z"
                        transform="translate(0 0)"
                        fill="none"
                        stroke-linejoin="round"
                        stroke-width="1"
                      />
                      <path
                        id="Path_83"
                        data-name="Path 83"
                        d="M9,29.25H30.394"
                        transform="translate(1.273 4.242)"
                        stroke-linecap="round"
                        stroke-miterlimit="10"
                        stroke-width="1"
                      />
                    </g>
                  </svg>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="54"
                    height="28"
                    class="fill-current w-12 text-gray-950 dark:text-white"
                    viewBox="0 0 54 28"
                  >
                    <text
                      id="Live"
                      transform="translate(27 22)"
                      font-size="28"
                      font-family="Helvetica"
                      letter-spacing="0.022em"
                    >
                      <tspan x="-26.607" y="0">Live</tspan>
                    </text>
                  </svg>
                </div>
                <!-- crash -->
                <div
                  class="flex cursor-pointer space-x-4"
                  @click="goToLink('crash')"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="text-black dark:text-white fill-current h-7 w-7"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M461.5 31.85c-5 1.2-10.4 3.4-16.4 6.4c-12 6-26.7 15.3-42.1 26.1c-26.7 18.7-55.5 41.75-75 59.95l39.8 19.9l19.9 39.8c18.2-19.5 41.2-48.3 59.9-75c10.8-15.35 20.1-30.05 26.2-42.15c3-6 5.2-11.3 6.3-16.3c1.2-5 1.9-10.9-2.9-15.7c-4.8-4.56-10-4.25-15.7-3m-14.8 33.4c4.9 4.71 5.6 12.1 3.8 18.7s-6.1 13.3-12.9 20.15l-42.2 42.2l-29.6-29.7L408 74.45c6.8-6.8 13.5-11.06 20.1-12.9c6.1-1.71 14.3-.44 18.6 3.7M183.2 109.5l-21.3 21.2l45.6 5v-26.2zm129.9 25.2l-43.5 21.8l-153 200.1l13.7 13.8l97.5-97.5l11.3 11.3c-32.5 32.5-65 65.1-97.5 97.6l13.8 13.6l200.1-153l21.8-43.5l-21.4-42.8zm-256.59.4l7.4 22.2l120.99 83.5l64.5-84.3zm38.1 62.8l-13.1 13.2l24.39 24.3l17.6-17.5zm260.89 64.7l-84.3 64.5l83.5 121l22.2 7.3zm-190.9 4.8l-110.99 9.1l-22.6 22.6l82.39 35.4zm212.1 41.2l4.6 41.5l17.1-17.2v-24.3zm-132.1 38.8l-67 51.2l35.3 82.4l22.6-22.6zm-138.7 21.2l-13.09 13.1l37.49 37.4l13.1-13zm188.2 19.9l-17.5 17.6l24.3 24.3l13.2-13.1z"
                    ></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="92"
                    height="28"
                    class="fill-current w-16 text-gray-950 dark:text-white"
                    viewBox="0 0 92 28"
                  >
                    <text
                      id="Aviator"
                      transform="translate(46 22)"
                      font-size="28"
                      font-family="Helvetica"
                      letter-spacing="0.022em"
                    >
                      <tspan x="-45.174" y="0">Crash</tspan>
                    </text>
                  </svg>
                </div>
                <!-- Virtuals -->
                <div
                  class="flex cursor-pointer space-x-4"
                  @click="goToLink('virtuals')"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22.147"
                    height="27.549"
                    class="fill-current h-7 w-7 text-gray-950 dark:text-white"
                    viewBox="0 0 22.147 27.549"
                  >
                    <g
                      id="Icon_core-screen-smartphone"
                      data-name="Icon core-screen-smartphone"
                      transform="translate(-7.313 -1.125)"
                    >
                      <path
                        id="Path_84"
                        data-name="Path 84"
                        d="M7.313,2.962V26.837a2.091,2.091,0,0,0,2.271,1.837h17.6a2.091,2.091,0,0,0,2.271-1.837V2.962a2.091,2.091,0,0,0-2.271-1.837H9.584A2.091,2.091,0,0,0,7.313,2.962ZM27.189,26.837H9.584V2.962h17.6Z"
                        transform="translate(0 0)"
                      />
                      <path
                        id="Path_85"
                        data-name="Path 85"
                        d="M15.188,5.625H22V7.462H15.188Zm2.271,17.907H19.73v1.837H17.459Z"
                        transform="translate(0.075 -0.827)"
                      />
                    </g>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="98"
                    height="28"
                    class="fill-current w-16 text-gray-950 dark:text-white"
                    viewBox="0 0 98 28"
                  >
                    <text
                      id="Virtuals"
                      transform="translate(49 22)"
                      font-size="28"
                      font-family="Helvetica"
                      letter-spacing="0.022em"
                    >
                      <tspan x="-48.593" y="0">Virtuals</tspan>
                    </text>
                  </svg>
                </div>
                <!-- End virtuals -->

                <!-- Casino -->
                <div
                  class="flex cursor-pointer space-x-4"
                  @click="goToLink('popular-games')"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26.339"
                    height="26.339"
                    class="fill-current h-7 w-7 text-gray-950 dark:text-white"
                    viewBox="0 0 26.339 26.339"
                  >
                    <g
                      id="Icon_core-casino"
                      data-name="Icon core-casino"
                      transform="translate(-1.125 -1.125)"
                    >
                      <path
                        id="Path_86"
                        data-name="Path 86"
                        d="M27.422,14.931,24.669,2.5a1.758,1.758,0,0,0-2.094-1.335L10.146,3.92A1.756,1.756,0,0,0,8.811,6.014l1.153,5.207H2.881a1.758,1.758,0,0,0-1.756,1.756V25.708a1.758,1.758,0,0,0,1.756,1.756H15.611a1.758,1.758,0,0,0,1.756-1.756V18.956l8.72-1.932a1.758,1.758,0,0,0,1.335-2.094ZM15.611,25.708H2.881V12.978h7.473l1.211,5.466a1.753,1.753,0,0,0,2.094,1.335l1.953-.433v6.363Zm10.1-10.4L13.279,18.064,10.526,5.634,22.955,2.881,25.709,15.31Z"
                        transform="translate(0 0)"
                      />
                      <path
                        id="Path_87"
                        data-name="Path 87"
                        d="M5.625,16.245H7.82V18.44H5.625Zm0,7.024H7.82v2.195H5.625Zm7.024,0h2.195v2.195H12.649ZM9.137,19.757h2.195v2.195H9.137Zm4.47-11.273L15.75,8.01l.474,2.143-2.143.474Zm8.378,5.335,2.143-.475.475,2.143-2.143.475ZM17.8,11.15l2.143-.475.475,2.143-2.143.475Z"
                        transform="translate(-0.988 -1.512)"
                      />
                    </g>
                  </svg>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="fill-current w-20 text-gray-950 dark:text-white"
                    viewBox="0 0 100 24"
                  >
                    <text
                      id="Casino"
                      transform="translate(46 22)"
                      font-size="28"
                      font-family="Helvetica"
                      letter-spacing="0.022em"
                    >
                      <tspan x="-45.119" y="0">Popular</tspan>
                    </text>
                  </svg>
                </div>
                <!-- End casino -->
                <!-- New Games -->
                <div
                  class="flex cursor-pointer space-x-4"
                  @click="goToLink('new-games')"
                >
                  <SparklesIcon
                    class="h-8 w-8 dark:text-slate-300 text-gray-600"
                  />

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="fill-current w-20 text-gray-950 dark:text-white"
                    viewBox="0 0 100 24"
                  >
                    <text
                      id="Casino"
                      transform="translate(46 22)"
                      font-size="28"
                      font-family="Helvetica"
                      letter-spacing="0.022em"
                    >
                      <tspan x="-45.119" y="0">New</tspan>
                    </text>
                  </svg>
                </div>
                <!-- End casino -->
                <!-- Promotions -->
                <div
                  class="flex cursor-pointer space-x-4"
                  @click="goToLink('promotions')"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-7 w-7 dark:text-slate-300 text-gray-600"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      color="currentColor"
                    >
                      <path
                        d="M14.926 2.911L8.274 6.105a2.43 2.43 0 0 1-1.617.182a8 8 0 0 0-.695-.14C4.137 5.94 3 7.384 3 9.045v.912c0 1.66 1.137 3.105 2.962 2.896a7 7 0 0 0 .695-.139a2.43 2.43 0 0 1 1.617.183l6.652 3.193c1.527.733 2.291 1.1 3.142.814c.852-.286 1.144-.899 1.728-2.125a12.17 12.17 0 0 0 0-10.556c-.584-1.226-.876-1.84-1.728-2.125c-.851-.286-1.615.08-3.142.814"
                      ></path>
                      <path
                        d="M11.458 20.77L9.967 22c-3.362-2.666-2.951-3.937-2.951-9H8.15c.46 2.86 1.545 4.216 3.043 5.197c.922.604 1.112 1.876.265 2.574M7.5 12.5v-6"
                      ></path>
                    </g>
                  </svg>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="fill-current w-24 text-gray-950 dark:text-white"
                    viewBox="0 0 130 24"
                  >
                    <text
                      id="Casino"
                      transform="translate(46 22)"
                      font-size="28"
                      font-family="Helvetica"
                      letter-spacing="0.022em"
                    >
                      <tspan x="-45.119" y="0">Promos</tspan>
                    </text>
                  </svg>
                </div>
                <div
                  class="flex cursor-pointer space-x-4"
                  @click="goToLink('join-affiliate')"
                >
                  <UserPlusIcon
                    class="h-7 w-7 dark:text-slate-300 text-gray-600"
                  />

                  <div class="relative">
                    <span
                      class="absolute -right-4 -top-2 p-0.5 px-1 rounded-lg border-red-600 bg-[#EF4444] text-[0.6rem] font-bold leading-none text-white"
                      >HOT</span
                    >
                    <span
                      class="font-semibold tracking-wider text-lg dark:text-white"
                      >Join Affiliate</span
                    >
                  </div>
                </div>
              </div>

              <div
                class="py-4 space-y-3 px-3 border-b border-gray-400 dark:border-white"
              >
                <h5 class="font-bold text-xl dark:text-white">Top Leagues</h5>

                <div
                  v-for="league in topLeagues"
                  :key="league"
                  class="dark:text-white flex items-center justify-between"
                  @click="fetchGame(league)"
                >
                  <div class="text-black dark:text-white">
                    {{ league.competitionName }}
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="5"
                    height="8"
                    class="fill-current text-gray-950 dark:text-white"
                    viewBox="0 0 5 8"
                  >
                    <g
                      id="Polygon_39"
                      data-name="Polygon 39"
                      transform="translate(5) rotate(90)"
                    >
                      <path
                        d="M 6.959689617156982 4.5 L 1.04030978679657 4.5 L 3.999999761581421 0.8003875017166138 L 6.959689617156982 4.5 Z"
                        stroke="none"
                      />
                      <path
                        d="M 3.999999761581421 1.600787401199341 L 2.080629825592041 4 L 5.919369697570801 4 L 3.999999761581421 1.600787401199341 M 3.999999761581421 0 L 8 5 L -4.76837158203125e-07 5 L 3.999999761581421 0 Z"
                        stroke="none"
                      />
                    </g>
                  </svg>
                </div>
              </div>

              <div
                id="downloadAPP"
                class="cursor-pointer pt-4 pb-6 flex items-center space-x-2 space-y-3 px-3 border-b border-gray-400 dark:border-white"
                @click="downloadApp()"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22.147"
                  height="27.549"
                  class="fill-current h-7 w-7 text-gray-950 dark:text-white"
                  viewBox="0 0 22.147 27.549"
                >
                  <g
                    id="Icon_core-screen-smartphone"
                    data-name="Icon core-screen-smartphone"
                    transform="translate(-7.313 -1.125)"
                  >
                    <path
                      id="Path_84"
                      data-name="Path 84"
                      d="M7.313,2.962V26.837a2.091,2.091,0,0,0,2.271,1.837h17.6a2.091,2.091,0,0,0,2.271-1.837V2.962a2.091,2.091,0,0,0-2.271-1.837H9.584A2.091,2.091,0,0,0,7.313,2.962ZM27.189,26.837H9.584V2.962h17.6Z"
                      transform="translate(0 0)"
                    />
                    <path
                      id="Path_85"
                      data-name="Path 85"
                      d="M15.188,5.625H22V7.462H15.188Zm2.271,17.907H19.73v1.837H17.459Z"
                      transform="translate(0.075 -0.827)"
                    />
                  </g>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="114"
                  height="16"
                  class="fill-current text-black dark:text-white"
                  viewBox="0 0 114 16"
                >
                  <text
                    id="Download_APP"
                    data-name="Download APP"
                    transform="translate(0 12)"
                    font-size="16"
                    font-family="Helvetica-Bold, Helvetica"
                    font-weight="700"
                  >
                    <tspan x="0" y="0">Download APP</tspan>
                  </text>
                </svg>
              </div>
              <div
                class="pt-4 pb-6 flex-col items-center space-x-2 space-y-3 px-3 border-b border-gray-400 dark:border-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="114"
                  height="16"
                  class="fill-current text-black dark:text-white"
                  viewBox="0 0 114 16"
                >
                  <text
                    id="Download_APP"
                    data-name="Download APP"
                    transform="translate(0 12)"
                    font-size="16"
                    font-family="Helvetica-Bold, Helvetica"
                    font-weight="700"
                  >
                    <tspan x="0" y="0">Change Theme</tspan>
                  </text>
                </svg>
                <div class="flex items-center py-2 pt-4 space-x-2">
                  <ThemeSwitcher />
                  <div>
                    <span v-if="isDark" class="text-white">Dark</span>
                    <span v-else>Light</span>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>
