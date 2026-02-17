<script setup>
import { ref } from "vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import DepositForm from "./DepositForm.vue";
import TermsAndConditions from "./TermsAndConditions.vue";
import RedeemPoints from "./RedeemPoints.vue";

const categories = ref([
  "Deposit & Play",
  "Terms & Conditions",
  "Redeem Points",
]);
</script>

<template>
  <div class="w-full px-2 sm:px-0">
    <TabGroup>
      <TabList class="flex space-x-3 rounded-xl bg-[#241E34] p-1">
        <Tab
          v-for="category in categories"
          :key="category"
          v-slot="{ selected }"
          as="template"
        >
          <div
            :class="[
              'w-full cursor-pointer text-gray-950 rounded-md pt-2.5 text-lg flex justify-center items-end font-medium',
              ' focus:outline-none',
              selected ? 'bg-[#5BC431]  text-md shadow' : ' bg-white',
            ]"
          >
            {{ category }}
          </div>
        </Tab>
      </TabList>

      <TabPanels class="">
        <TabPanel>
          <DepositForm />
        </TabPanel>
        <TabPanel>
          <TermsAndConditions />
        </TabPanel>
        <TabPanel>
          <RedeemPoints />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>
