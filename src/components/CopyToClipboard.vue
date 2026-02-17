<script setup>
import { useClipboard } from "@vueuse/core";
import { ClipboardDocumentIcon } from "@heroicons/vue/20/solid";
const props = defineProps({
    source: {
        type: String,
        required: true
    }
})
const { copy, copied } = useClipboard({ source: props.source });
</script>
<template>
  <button class="flex items-center space-x-2" @click="copy(source)">
    <ClipboardDocumentIcon class="w-5 h-5 text-green-500" />
    <span v-if="copied" class="text-green-500">Copied!</span>
    <span v-else>copy</span>
  </button>
</template>
