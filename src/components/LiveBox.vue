<script setup>
import { computed } from "vue";
const props = defineProps({
  statusDesc: { type: String, required: true },
  matchState: { type: String, required: true },
  isLive: { type: Boolean, required: true },
  status: { type: Number, required: true },
});

const isEnded = computed(() => props.status !== 1 && props.isLive == 0);
</script>
<template>
  <div class="border dark:border-white/10 rounded-md overflow-clip w-12">
    <div v-if="!isEnded">
      <div class="text-xs bg-amber-600 text-black p-2 py-0.5 text-center">
        Live
      </div>
      <div class="text-xs px-0.5 text-center">{{ statusDesc }}'</div>
      <div class="text-xs px-0.5 text-center font-light">{{ matchState }}</div>
    </div>
    <div v-else>
      <!-- <div class="text-xs bg-amber-600 text-black p-2 py-0.5 text-center">
        Settled
      </div> -->
      <div
        class="text-xs px-0.5 text-center py-1 text-gray-700 dark:text-gray-300"
      >
        Match Ended
      </div>
    </div>
  </div>
</template>
