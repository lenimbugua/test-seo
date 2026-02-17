<script setup>
import { useLoginStore } from "@/stores/login";
import { useModalStore } from "@/stores/modal";
import { Bars4Icon } from "@heroicons/vue/20/solid";
import { storeToRefs } from "pinia";
import MobileFooter from "../MobileFooter.vue";
import NotAuthenicated from "../NotAuthenicated.vue";
import DepositWithdrawLinks from "./DepositWithdrawLinks.vue";

import { useModalTypes } from "@/composables/useModalTypes";

const { drawer } = useModalTypes();

const { openModal } = useModalStore();

const { isAuthenticated } = storeToRefs(useLoginStore());
</script>
<template>
  <div class="flex flex-col min-h-dvh">
    <div
      class="py-2 px-3 sm:px-8 bg-white dark:bg-dark-purple-20 border-b dark:border-dark-purple-18"
    >
      <div class="max-w-[1100px] mx-auto flex text-white justify-between h-10">
        <div class="flex justify-between items-center space-x-1">
          <div class="flex justify-between items-center space-x-1">
            <Bars4Icon
              class="text-gray-950 dark:text-white fill-current h-6 w-6"
              @click="openModal(drawer)"
            />
            <TheLogo />
          </div>
        </div>
        <div class="flex justify-between items-center space-x-3">
          <div class="flex items-center"><ThemeSwitch /></div>
          <!-- <div class="flex items-center"><Cog6ToothIcon class="w-6 h-6" /></div>
            <div class="flex items-center"><BellAlertIcon class="w-6 h-6" /></div> -->
        </div>
      </div>
    </div>
    <div
      v-if="!isAuthenticated"
      class="w-full justify-center items-center sm:pt-4 flex flex-grow"
    >
      <NotAuthenicated />
    </div>
    <div
      v-else
      class="w-full sm:pt-4 flex flex-grow md:space-x-4 max-w-[1100px] mx-auto sm:rounded-lg border-0 overflow-hidden"
    >
      <div class="hidden md:flex flex-shrink">
        <SitePromotions />
      </div>
      <div
        class="flex flex-grow flex-col w-full space-y-1.5 border-[#f3f4f6] rounded-md sm:border dark:border-[#393444]"
      >
        <UserInfo />
        <div class="px-3">
          <TheAccount />
        </div>
        <DepositWithdrawLinks />
        <ProfileLinks />
      </div>
    </div>
    <Footer />
    <MobileFooter />
  </div>
</template>
