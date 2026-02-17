<script setup>
// import { useCasinoStore } from "../stores/casino";
// import { storeToRefs } from "pinia";

import { useCrash } from "../composables/useCrash";

const {categories} = useCrash();

</script>
<template>
  <div>
    <CasinoCategories :categories />
    <!-- <div>
      <div class="p-1 text-gray-950 dark:text-white">Categories</div>
      <CasinoCategories :categories="casinoCategories" />
    </div> -->
  </div>
</template>
