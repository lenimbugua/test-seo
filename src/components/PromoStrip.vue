<script setup>
import { onBeforeUnmount, ref } from "vue";
import HakiLeaguePromoStrip from "./promo-strip/HakiLeaguePromoStrip.vue";
import JoinAffiliate from "./promo-strip/JoinAffiliate.vue";
import JoinAffiliateKES30 from "./promo-strip/JoinAffiliateKES30.vue";
import RandomWinner from "./promo-strip/RandomWinner.vue";

let intervalId = null;

let counter = ref(0);

const startInterval = async () => {
  intervalId = setInterval(() => {
    counter.value++;
    if (counter.value == 5) {
      counter.value = 0;
    }
  }, 4000);
};

onBeforeUnmount(() => {
  clearInterval(intervalId);
});

// function showDownloadApp() {
//   if (counter.value == 3) {
//     return true;
//   }
//   return false;
// }

startInterval();
</script>
<template>
  <div
    class="w-full cursor-pointer items-center space-x-1 relative bg-[url('/mission-completion@2x.png')] bg-cover bg-center h-[2rem] filter brightness-75 contrast-125 rounded-lg overflow-clip"
  >
    <Transition
      name="custom-classes"
      enter-active-class="anim-active anim-zoomIn"
    >
      <TaxFreeDeposit v-if="counter === 0" />
    </Transition>
    <Transition
      name="custom-classes"
      enter-active-class="anim-active anim-backInLeft"
    >
      <JoinAffiliateKES30 v-if="counter === 1" />
    </Transition>
    <Transition
      name="custom-classes"
      enter-active-class="anim-active anim-backInLeft"
    >
      <RandomWinner v-if="counter === 2" />
    </Transition>
    <Transition
      name="custom-classes"
      enter-active-class="anim-active anim-zoomIn"
    >
      <JoinAffiliate v-if="counter === 3" />
    </Transition>
    <div class="overflow-hidden">
      <Transition
        name="custom-classes"
        enter-active-class="anim-active anim-backInRight"
      >
        <HakiLeaguePromoStrip v-if="counter === 4" />
      </Transition>
    </div>
    <!-- <Transition
      name="custom-classes"
      enter-active-class="anim-active anim-zoomIn"
    >
      <TaxFreeDeposit v-if="counter === 4" />
    </Transition> -->
    <!-- <Transition
      name="custom-classes"
      enter-active-class="anim-active anim-zoomIn"
    >
      <DownloadAppStrip v-if="counter === 4" />
    </Transition> -->
  </div>
</template>
