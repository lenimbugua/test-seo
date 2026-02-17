<script setup>
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/vue";
import { ChevronLeftIcon } from "@heroicons/vue/24/solid";
import { ref } from "vue";
import DepositBonus from "../components/DepositBonusTable.vue";
import MpesaPaybillDeposit from "../components/MpesaPaybillDeposit.vue";
const categories = ref(["Deposit", "Paybill", "Jisort", "Bonuses", "Terms"]);
</script>

<template>
  <div class="flex md:h-dvh flex-col w-full">
    <HeaderLinks />
    <div class="max-w-[1680px] mx-auto md:flex-grow w-full">
      <div class="flex items-center dark:text-white py-2">
        <ChevronLeftIcon
          class="h-7 w-7 cursor-pointer"
          @click="$router.go(-1)"
        />
        <div class="font-bold text-xl">Deposit</div>
      </div>
      <TabGroup>
        <TabList
          class="flex w-full border-b dark:border-dark-purple-19 space-x-6 px-3"
        >
          <Tab
            v-for="category in categories"
            :key="category"
            v-slot="{ selected }"
            as="template"
          >
            <div
              :class="[
                'cursor-pointer py-3  text-sm dark:text-gray-100/90 text-gray-800 text-center font-medium',
                ' focus:outline-none',
                selected ? 'border-b-2 border-[#56CB05]  font-semibold' : '',
              ]"
            >
              {{ category }}
            </div>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel
            class="w-full p-2 block space-y-3 md:space-y-0 sm:flex md:px-4 gap-4 lg:flex"
          >
            <DepositForm class="sm:w-1/2" />
            <MpesaPaybillDeposit class="sm:w-1/2" />
            <SortYourDeposit class="sm:hidden" />
            <!-- <div>
                <h5
                  class="font-bold text-2xl text-gray-600 dark:text-slate-50 py-2"
                >
                  Deposit Bonuses
                </h5>
                <div
                  class="border border-gray-300 dark:border-white/10 shadow-lg rounded-lg bg-gray-100 dark:bg-black/15"
                >
                  <DepositBonus />
                </div>
              </div> -->
          </TabPanel>
          <TabPanel
            class="w-full p-2 block space-y-5 sm:flex md:px-4 space-x-5 lg:flex"
          >
            <MpesaPaybillDeposit />
            <!-- <div>
                <h5
                  class="font-bold text-2xl text-gray-600 dark:text-slate-50 py-2"
                >
                  Deposit Bonuses
                </h5>
                <div
                  class="border border-gray-300 dark:border-white/10 shadow-lg rounded-lg bg-gray-100 dark:bg-black/15"
                >
                  <DepositBonus />
                </div>
              </div> -->
          </TabPanel>
          <TabPanel class="p-2 max-w-[600px]">
            <SortYourDeposit />
          </TabPanel>
          <TabPanel class="p-2">
            <DepositBonus />
          </TabPanel>
          <TabPanel class="p-2">
            <DepositBonusTerms />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>

    <MobileFooter />
    <Footer />
  </div>
</template>
