<script setup>
import { Tab, TabGroup, TabList } from "@headlessui/vue";
import { useRoute, useRouter } from "vue-router";
import ThemeSwitch from "./ThemeSwitch.vue";

import { useLinksStore } from "../stores/links";
import { useLoginStore } from "../stores/login";
import DepositButton from "./DepositButton.vue";
import HeaderProfile from "./HeaderProfile.vue";

import { useModalStore } from "@/stores/modal";

import { useModalTypes } from "@/composables/useModalTypes";
import SearchIcon from "./SearchIcon.vue";

import { storeToRefs } from "pinia";
import NavLinksIcons from "./NavLinksIcons.vue";

import { useDefaultSport } from "@/composables/useDefaultSport";

import { useMixpanel } from "@/composables/useMixpanel";

const mixpanel = useMixpanel();

function trackSportClick() {
  mixpanel.track("Sport Link Clicked", {
    link: "sport",
    time: new Date().toISOString(),
  });
}

const { initDefaultSport } = useDefaultSport();

const { token } = storeToRefs(useLoginStore());

const { drawer } = useModalTypes();

const { openModal } = useModalStore();

const router = useRouter();

const { links } = storeToRefs(useLinksStore());

const goToSports = () => {
  initDefaultSport(true);
  router.push({ name: "sports", params: { sport: "soccer" } });
};

const casinoCategoryMap = {
  crash: "all",
  virtuals: "virtuals",
  "popular-games": "top",
};

function goToLink(path) {
  if (path == "sports") {
    trackSportClick();
    goToSports();
    return;
  }
  if (path == "aviator") {
    router.push({ name: "aviator" });
    return;
  }
  if (path == "live") {
    router.push({ name: "live", params: { sport: "soccer" } });
    return;
  }
  if (casinoCategoryMap[path]) {
    router.push({
      name: "casino-home",
      query: { category: casinoCategoryMap[path] },
    });
    return;
  }
  router.push({ name: path });
}

function isSelected(name) {
  const route = useRoute();
  if (name == "sports") {
    if (route.name === "home") {
      return true;
    }
  }
  if (casinoCategoryMap[name] && route.name === "casino-home") {
    return route.query.category === casinoCategoryMap[name];
  }
  return route.name === name;
}
</script>
<template>
  <div
    style="z-index: 60"
    class="sticky z-[60] top-0 bg-white dark:bg-[#241E34] border-b dark:shadow-xl dark:border-dark-purple-23 rounded-b-xl overflow-clip"
  >
    <div
      class="hidden max-w-[1680px] px-3 mx-auto lg:flex h-16 md:h-20 w-full sm:h-full justify-between items-center sm:pt-4 sm:pb-3"
    >
      <div class="sm:flex justify-between items-center sm:space-x-4">
        <TheLogo />
        <TabGroup>
          <TabList class="flex gap-3 items-center">
            <Tab v-for="link in links" :key="link.name" as="template">
              <div
                role="link"
                :class="[
                  'capitalize rounded-md text-md  p-2 dark:text-slate-400 cursor-pointer flex items-center relative',
                  'focus:outline-none',

                  isSelected(link.path)
                    ? 'font-bold bg-[#56CB05]/25'
                    : 'font-medium',
                ]"
                @click="goToLink(link.path)"
              >
                <NavLinksIcons
                  v-if="link.icon"
                  :icon="link.icon"
                  :icon-css="link.iconCss"
                />
                {{ link.name }}
                <span
                  v-if="link.badge"
                  class="hot-badge absolute -top-1.5 -right-2 px-1 py-0.5 rounded text-[8px] font-black leading-none text-white bg-red-500"
                >
                  {{ link.badge }}
                </span>
              </div>
            </Tab>
          </TabList>
        </TabGroup>
      </div>
      <div class="flex justify-between space-x-3 md:space-x-5 items-center">
        <div class="flex flex-col">
          <SearchIcon />
          <span class="dark:text-white text-gray-950 leading-none">Search</span>
        </div>
        <div v-if="!token" class="flex space-x-3 items-center">
          <RouterLink
            :to="{ name: 'login' }"
            :class="['dark:text-white text-gray-950']"
            class="flex items-center justify-center bg-black/20 dark:bg-white/5 text-sm md:text-md rounded-md font-semibold md:font-extrabold py-0.5 md:py-1.5 px-1.5 sm:px-3 h-10"
          >
            Login
          </RouterLink>
          <RouterLink
            :to="{ name: 'signup' }"
            :class="['text-amber-50']"
            class="flex items-center justify-center bg-[#0F8F21]/80 text-sm md:text-md rounded-md whitespace-nowrap font-semibold md:font-extrabold md:py-1 px-1.5 sm:px-3 h-10"
          >
            Join
          </RouterLink>
        </div>
        <DepositButton v-if="token" />
        <HeaderProfile v-if="token" />

        <ThemeSwitch />
      </div>
    </div>

    <div class="flex px-3 lg:hidden justify-between items-center py-2">
      <div class="flex justify-between items-center space-x-1">
        <div class="flex justify-between items-center space-x-1">
          <button @click="openModal(drawer)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              data-slot="icon"
              class="text-gray-950 dark:text-white fill-current h-6 w-6"
            >
              <path
                fill-rule="evenodd"
                d="M2 3.75A.75.75 0 0 1 2.75 3h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 3.75Zm0 4.167a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Zm0 4.166a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Zm0 4.167a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <!-- <Bars4Icon
            class="text-gray-950 dark:text-white fill-current h-6 w-6"
            @click="openModal(drawer)"
          /> -->
          <TheLogo />
        </div>
      </div>
      <div class="flex flex-col items-center justify-center">
        <SearchIcon />
        <!-- <span class="text-white leading-none text-xs mt-0.5">Search</span> -->
      </div>
      <div class="flex space-x-1 items-center">
        <div v-if="!token" class="flex space-x-1 items-center">
          <RouterLink
            :to="{ name: 'login' }"
            :class="['dark:text-white text-gray-950']"
            class="flex items-center justify-center bg-black/20 dark:bg-white/20 uppercase text-sm rounded-md font-semibold md:font-extrabold px-3 py-1.5"
          >
            Login
          </RouterLink>
          <RouterLink
            :to="{ name: 'signup' }"
            :class="['text-green-50']"
            class="flex items-center justify-center bg-[#0F8F21]/80 dark:bg-[#56CB05]/70 uppercase tracking-wider text-sm rounded-md whitespace-nowrap font-semibold md:font-extrabold md:py-1 px-5 py-1.5"
          >
            Join
          </RouterLink>
        </div>
        <HeaderProfile v-if="token" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.hot-badge {
  animation: badge-glow 1.5s ease-in-out infinite;
}

@keyframes badge-glow {
  0%,
  100% {
    box-shadow: 0 0 4px rgba(239, 68, 68, 0.6), 0 0 8px rgba(239, 68, 68, 0.4);
  }
  50% {
    box-shadow: 0 0 8px rgba(239, 68, 68, 0.9), 0 0 16px rgba(239, 68, 68, 0.6),
      0 0 24px rgba(239, 68, 68, 0.3);
  }
}
</style>
