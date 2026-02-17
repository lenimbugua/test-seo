<script setup>
import {
  // ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";

import { useRoute } from "vue-router";
import { useBetBuilderStore } from "../stores/betbuilder";

const route = useRoute();

function routeIsMatchDetails() {
  return route.name === "match-details";
}

defineProps({
  selections: {
    type: Array,
    required: true,
  },
});

const { deleteAnItemFromSelections } = useBetBuilderStore();
</script>
<template>
  <div class="flex flex-col bg-gray-200 dark:bg-black/30">
    <div
      class="bg-white dark:bg-[#241E34] pl-6 pr-3 py-2 h-16 overflow-y-auto overflow-visible scrollbar-hide"
    >
      <ol class="relative border-l border-gray-300 dark:border-gray-600 pl-4">
        <li
          v-for="selection in selections"
          :key="selection.customId"
          class="flex justify-between pb-[0.1rem] last:pb-0"
        >
          <div
            class="absolute w-3 h-3 bg-gray-300 dark:bg-slate-500 rounded-full mt-1 -start-1.5 border dark:border-slate-400 border-gray-500"
          ></div>
          <div
            class="flex space-x-2 items-center text-gray-950 dark:text-slate-300"
          >
            <div class="text-xs flex items-center">
              <span class="text-gray-600 dark:text-slate-300 mr-1">{{
                selection.oddType
              }}</span>
              <div
                class="h-1.5 w-1.5 rounded-full bg-gray-950 dark:bg-slate-100 mx-0.5"
              ></div>
              <span class="px-1">{{ selection.outcomeName }}</span>
              {{ selection.specifiers }}
            </div>

            <!-- <div class="text-sm">
              
            </div> -->
          </div>
          <div
            v-if="routeIsMatchDetails()"
            class="text-slate-400 rounded-md flex items-center justify-center cursor-pointer"
            @click="
              deleteAnItemFromSelections(
                selection.parentMatchId,
                selection.customId
              )
            "
          >
            <!-- <div
              class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-secondary/80 bg-gray-200 dark:bg-[#393444] text-gray-600 dark:text-slate-400 border-none"
            >
              {{ selection.oddValue }}
            </div> -->
            <XMarkIcon class="h-4 w-4" />
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>
