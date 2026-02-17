<script setup>
import { storeToRefs } from "pinia";
import { RouterLink } from "vue-router";
import { useVirtual } from "../composables/useVirtual";
import { useCasinoStore } from "../stores/casino";

const { categories, games } = useVirtual();
const { pending } = storeToRefs(useCasinoStore());
</script>
<template>
  <TheDepositBar class="md:hidden" />
  <HeaderLinks />
  <div class="w-full h-full max-w-[1680px] sm:px-3 mx-auto overflow-scroll">
    <CasinoAnimate v-if="pending" />

    <div v-else class="flex w-full px-3 space-x-4 lg:px-0 lg:pt-3">
      <!-- <div class="hidden lg:block pr-3">
        <div class="fixed top-16 lg:top-24">
          <SidebarTabs />
        </div>
        <div class="mt-96">
          <SitePromotions />
        </div>
      </div> -->
      <div class="w-full rounded-md">
        <div class="md:hidden w-full overflow-x-scroll">
          <MainCategories class="p-2 mb-2" />
        </div>
        <div class="md:max-w-[1000px] mx-auto rounded-lg overflow-clip">
          <!-- <TheBanner /> -->
        </div>

        <div class="md:max-w-[1000px] mx-auto">
          <div
            class="w-full flex items-center justify-between h-full cursor-pointer pb-5"
          >
            <div class="cursor-pointer" @click="$router.go(-1)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="size-6 stroke-2 text-gray-900 dark:text-white"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
            </div>
            <h1 class="font-black text-3xl dark:text-gray-50 leading-none">
              VIRTUAL GAMES
            </h1>
            <div></div>
          </div>
          <!-- <h1
            class="flex justify-center sm:py-6 font-bold uppercase text-xl w-full text-center sm:text-left text-gray-950 dark:text-white my-3"
          >
            HOT 
          </h1> -->
          <!-- <div class="mb-3">
              <CasinoSearch />
            </div> -->
          <div class="flex w-full space-x-2 justify-center gap-4 mb-6">
            <RouterLink
              :to="{ name: 'haki-league' }"
              class="relative cursor-pointer bg-black flex h-36 w-1/2 sm:h-72 sm:w-72 rounded-md overflow-clip"
            >
              <img
                class="w-full h-full md:h-72 md:w-72 inset-0 absolute object-fit sm:object-cover"
                src="/haki-league.png"
              />
            </RouterLink>
            <!-- <RouterLink
              :to="{ name: 'haki-turbo' }"
              class="relative cursor-pointer bg-black flex h-36 w-1/3 sm:h-72 sm:w-72 rounded-md overflow-clip"
            >
              <img
                class="w-full h-full md:h-72 md:w-72 inset-0 absolute object-fit sm:object-cover"
                src="/haki-turbo.png"
              />
            </RouterLink> -->
            <RouterLink
              :to="{ name: 'haki-virtual-jackpot' }"
              class="relative cursor-pointer bg-black flex h-36 w-1/2 sm:h-72 sm:w-72 rounded-md overflow-clip"
            >
              <img
                class="w-full h-full md:h-72 md:w-72 inset-0 absolute object-fit sm:object-cover"
                src="/haki-jackpot.png"
              />
            </RouterLink>
          </div>
          <TheCrash :games :categories />
        </div>
      </div>
    </div>
  </div>
  <MobileFooter />
  <Footer />
</template>
