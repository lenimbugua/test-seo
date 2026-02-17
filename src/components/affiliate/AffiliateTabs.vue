<script setup>
import {  TabGroup,  TabPanel, TabPanels } from "@headlessui/vue";
// import { ArrowTrendingUpIcon } from "@heroicons/vue/24/solid";
// import AffiliateEarnings from "./AffiliateEarnings.vue";
import AffiliatePayments from "./AffiliatePayments.vue";
// import AffiliateReferrals from "./AffiliateReferrals.vue";
</script>
<template>
  <div
    class="bg-white p-3 border border-gray-300 dark:bg-[#504B5C] dark:border-white/20 rounded-md"
  >
    <div class="flex justify-center md:justify-start md:space-x-5 items-center">
      <!-- <ArrowTrendingUpIcon class="text-[#FDAE06] w-6 h-6" /> -->
      <h3 class="text-3xl font-bold text-amber-500 pt-3 text-center">
        My Revenue
      </h3>
    </div>
    <TabGroup>
      <TabPanels class="pt-5">
        <!-- <TabPanel>
          <AffiliateEarnings />
        </TabPanel> -->
        <TabPanel>
          <AffiliatePayments />
        </TabPanel>
        <!-- <TabPanel>
          <AffiliateReferrals />
        </TabPanel> -->
      </TabPanels>
    </TabGroup>
  </div>
</template>
