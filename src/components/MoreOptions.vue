<script setup>
import { useRouter } from "vue-router";
import { useMainCategories } from "../composables/useMainCategories";
import { useLiveMatchesStore } from "../stores/live-matches";
import { useSportsQueryParamsStore } from "@/stores/sports-query-params";
import { useDefaultSport } from "@/composables/useDefaultSport";

const { initDefaultSport } = useDefaultSport();

const { setResource, resetToDefaults } = useSportsQueryParamsStore();

const { getLiveMatches, emptyLiveMatches } = useLiveMatchesStore();

const router = useRouter();
const casinoCategoryMap = {
  crash: "crash",
  virtuals: "virtuals",
  "popular-games": "top",
};

async function goToLink(params) {
  if (params == "live") {
    emptyLiveMatches();
    resetToDefaults();
    setResource("live");
    getLiveMatches();
    router.push({ name: "live" });
    return;
  }
  if (params == "sport") {
    router.push({ name: "home", params: { sport: "soccer" } });
    initDefaultSport();
    return;
  }
  if (casinoCategoryMap[params]) {
    router.push({ name: "casino-home", query: { category: casinoCategoryMap[params] } });
    return;
  }
  router.push({ name: params });
}

const { moreOptions } = useMainCategories();
</script>

<template>
  <div
    class="flex space-x-2 py-6 px-3 items-center w-full justify-between max-w-md overflow-x-scroll scrollbar-hide"
  >
    <div
      v-for="category in moreOptions"
      :key="category.name"
      :class="[category.bg]"
      class="cursor-pointer rounded-md shadow relative px-1.5"
      @click="goToLink(category.path)"
    >
      <MainCategoryIcons :icon="category.name" />
    </div>
  </div>
</template>
