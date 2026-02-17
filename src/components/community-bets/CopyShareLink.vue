<script setup>
import { useShareToSocials } from "@/composables/useShareToSocials";
import { useClipboard } from "@vueuse/core";

const props = defineProps({
  shareUrl: {
    type: String,
    required: true,
  }
});

const { link } = useShareToSocials();

const { copy, copied } = useClipboard({ source: props.shareUrl });

async function copyShareLink() {
  await copy(props.shareUrl);
}
</script>
<template>
  <div class="cursor-pointer flex flex-col items-center" @click="copyShareLink">
    <SocialsIcons :icon="link" />
    <span v-if="!copied" class="dark:text-slate-400 text-xs capitalize mt-2"
      >Copy {{ link }}</span
    >
    <span v-if="copied" class="text-[#56CB05] text-xs font-bold mt-2"
      >Link Copied!</span
    >
  </div>
</template>
