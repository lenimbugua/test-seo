<script setup>
import { storeToRefs } from "pinia";
import { onBeforeUnmount } from "vue";
import { useAffiliateStore } from "../../stores/affiliate";
import MobileFooter from "../MobileFooter.vue";
import AffiliateCommission from "./AffiliateCommission.vue";
import AffiliateSwiper from "./AffiliateSwiper.vue";
import AffiliateTabs from "./AffiliateTabs.vue";
import HowToAffiliate from "./HowToAffiliate.vue";
import ShareButton from "./ShareButton.vue";
// import MyEarnings from "./MyEarnings.vue";
// import TopEarners from "./TopEarners.vue";

const { fetchAffiliateUrl, fetchAffiliateEarnings, reset } =
  useAffiliateStore();
const { pending, earnings } = storeToRefs(useAffiliateStore());
fetchAffiliateUrl();
fetchAffiliateEarnings();

onBeforeUnmount(() => {
  reset();
});
</script>

<template>
  <HeaderLinks />
  <BetsLoader v-if="pending" />
  <div
    v-else
    class="p-4 bg-gray-200 dark:bg-[#241E34] rounded-md shadow-xl max-w-[1680px] mx-auto"
  >
    <div class="flex items-center justify-center dark:text-white pt-2">
      <!-- <ChevronLeftIcon class="h-7 w-7 cursor-pointer" @click="$router.go(-1)" /> -->
      <!-- <div class="font-bold text-xl">Affiliate Program</div> -->
    </div>
    <AffiliateSwiper />
    <div v-if="earnings" class="hidden md:flex space-x-4">
      <div class="sm:max-w-xs">
        <HowToAffiliate />
        <AffiliateFAQs />
      </div>

      <div class="flex-1">
        <div
          class="border border-gray-300 bg-gray-200 rounded-md dark:bg-white/10 dark:border-white/15 p-3"
        >
          <!-- <TopEarners /> -->
          <MyEarnings />
          <AffiliateCommission />
          <AffiliateCopyToClipboard />
          <AffiliateSocials />
          <!-- <AffiliateSocials /> -->
          <div class="mt-4">
            <AffiliateTabs />
          </div>
        </div>
      </div>
    </div>
    <div v-if="earnings" class="md:hidden space-y-4 pb-4">
      <!-- <TopEarners /> -->
      <MyEarnings />
      <AffiliateCommission />
      <AffiliateCopyToClipboard />
      <AffiliateSocials />
      <AffiliateTabs />
      <HowToAffiliate />
      <AffiliateFAQs />
    </div>
  </div>
  <div class=" fixed">
    <ShareButton />
    <MobileFooter />
  </div>
  <Footer />
</template>
