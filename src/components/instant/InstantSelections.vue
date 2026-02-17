<script setup>
import { useInstantStore } from "@/stores/instant";
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";

const { count, endedTime } = storeToRefs(useInstantStore());

const bgColor = ref(
  "bg-gray-200 text-gray-950 dark:bg-dark-purple-19 dark:text-gray-400"
);

const props = defineProps({
  selection: {
    type: Object,
    required: true,
  },
});
function getBgColor() {
  switch (props.selection.status) {
    case "1":
      return "bg-dark-purple-18";
    case "2":
      return "bg-red-400 text-red-700 dark:text-red-400";
    case "3":
      return "bg-red-500/20 text-red-700 dark:text-red-400";
    case "4":
      return "bg-red-500/20 text-red-700 dark:text-red-400";
    case "5":
      return "bg-[#56CB05]/20 text-[#56CB05]";
  }
}
watch(count, ({ newCount }) => {
  if (newCount >= endedTime.value) {
    bgColor.value = getBgColor();
  }
  //   scores.value = filterLessThanOrEqual(newCount);
});
</script>
<template>
  <div :class="bgColor" class="flex justify-center w-full text-xs p-0.5 px-2">
    Pick: {{ selection.outcome_name }} {{ selection.sub_type_id }}({{
      selection.odd_value
    }})
  </div>
</template>
