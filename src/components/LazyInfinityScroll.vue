<script setup>
import { useInfiniteScroll } from "@vueuse/core";
import { ref, toRefs } from "vue";
import { useMatches2Store } from "../stores/matches2";
import { useSportsQueryParamsStore } from "../stores/sports-query-params";
const { getMatches } = useMatches2Store();
const { layout } = toRefs(useSportsQueryParamsStore());

const listEl = ref(null);

useInfiniteScroll(
  listEl,
  async () => {
    if (layout.value === "grid") return;
    await getMatches();
    const scrollContainer = listEl.value; // Get the actual DOM element

    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  },
  {
    distance: 600,
  }
);
</script>
<template>
  <Lazy
    ref="listEl"
    class="matches-scroll-container h-dvh w-full overflow-scroll dark:border-dark-purple-23 scrollbar-hide"
  >
    <slot />
  </Lazy>
</template>
