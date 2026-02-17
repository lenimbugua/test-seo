<script setup>
import { useInstantStore } from "@/stores/instant";
import { storeToRefs } from "pinia";

const { selectedMarket } = storeToRefs(useInstantStore());


</script>
<template>
  <div class="w-full flex px-4 py-2 bg-[#504B5C] items-center">
    <div class="flex justify-between text-white w-full">
        <div class="w-1/2 flex items-center">Matches</div>
        <div class="w-1/2 flex justify-center items-end">
            {{ selectedMarket.market_name }}
        </div>

    </div>
  </div>
</template>
