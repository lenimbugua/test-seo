<script setup>
import { useOneCut } from "../composables/useOneCut";
import formatStuff from "../utilities/format-stuff";
import OneCutIcon from "./OneCutIcon.vue";
const { formattedNumber } = formatStuff();
const { buildLegsMessage, oneCutAmout, isOneCutQualified, oneCutRatio } =
  useOneCut();
</script>

<template>
  <div class="flex text-xs items-center justify-between">
    <div class="flex items-center font-bold text-amber-500">
      <div>1 Cut Win</div>
      <OneCutIcon />
      <div>{{ oneCutRatio() }}</div>
    </div>
    <div class="text-amber-500">{{ buildLegsMessage() }}</div>
    <div v-if="isOneCutQualified()" class="flex items-center space-x-1">
      <div :class="['dark:text-gray-100 text-gray-800']" class="font-black">
        {{ formattedNumber(oneCutAmout()) }}
      </div>
      <span class="text-xs dark:text-slate-400">KES</span>
    </div>
  </div>
</template>
