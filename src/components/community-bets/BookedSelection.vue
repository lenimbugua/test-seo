<script setup>
import { useShareBetStore } from "@/stores/sharebet.js";
import BookedBetslipDetails from "./BookedBetslipDetails.vue";

const { deleteAnItemFromBetslip } = useShareBetStore();

defineProps({
  selection: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});
</script>
<template>
  <div class="cursor-pointer border-b dark:border-gray-900 pb-2">
    <BookedBetslipDetails
      :delete-an-item-from-betslip="deleteAnItemFromBetslip"
      :item="selection"
      :index="index"
    />
  </div>
</template>
