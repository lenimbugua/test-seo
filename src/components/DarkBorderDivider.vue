<script setup>
import { useDark } from "@vueuse/core";
const props = defineProps({
  borderSize: {
    type: String,
    default: "2px",
  },
});

const isDark = useDark();

function borderCss() {
  const darkBorder = `border-bottom: ${props.borderSize} solid #09070d`;
  const lightBorder = `border-bottom: ${props.borderSize} solid #F3F4F6`;
  return isDark.value ? darkBorder : lightBorder;
}
</script>
<template>
  <div class="w-full border-b" :style="borderCss()"></div>
</template>
