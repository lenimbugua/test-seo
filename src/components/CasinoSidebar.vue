<script setup>
import { usePopular } from "../composables/usePopular";

const { categories } = usePopular();
</script>
<template>
  <div>
    <!-- <CasinoCategories :categories="initialCategories" /> -->
    <div>
      <div class="p-1 text-gray-950 dark:text-white">Categories</div>
      <CasinoCategories :categories="categories" />
    </div>
    <!-- <div>
      <div class="p-1 text-gray-950 dark:text-white">Providers</div>
      <CasinoProviderCategories />
    </div> -->
  </div>
</template>
