<script setup>
import { useInstantStore } from "@/stores/instant";
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
const { halfTime, count } = storeToRefs(useInstantStore());

const isPastHalfTime = ref(false);

defineProps({
  halfTimeScore: {
    type: String,
    required: true,
  },
});

function isHalfTimeOrPast(newCount) {
  return newCount >= halfTime.value;
}
watch(count, ({ newCount }) => {
  isPastHalfTime.value = isHalfTimeOrPast(newCount);
});
</script>

<template>
  <div
    v-if="isPastHalfTime"
    class="flex w-full justify-center items-center space-x-1.5"
  >
    <div class="text-xs font-bold dark:text-gray-400">
      HT:{{ halfTimeScore }}
    </div>
  </div>
</template>
