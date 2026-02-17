<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  id: { type: String, default: "" }, // Cloudflare image ID
  alt: { type: String, default: "" },
  width: { type: Number, default: 400 },
  height: { type: Number, default: null },
  ratio: { type: String, default: "" },
  fallback: { type: String, default: "/images/placeholder.png" },
  accountHash: { type: String, default: "ZY5OwFLlTE2ePHl_IE20jg" },
  variant: { type: String, default: "public" },
  quality: { type: Number, default: 85 },
  blurQuality: { type: Number, default: 20 },
  class: { type: String, default: "block w-full h-auto" },
});

const hasError = ref(false);
const loaded = ref(false);

const baseUrl = computed(() =>
  props.id
    ? `https://imagedelivery.net/${props.accountHash}/${props.id}/${props.variant}`
    : ""
);

// Full-resolution image
const src = computed(() =>
  hasError.value || !props.id
    ? props.fallback
    : `${baseUrl.value}=w=${props.width},q=${props.quality},format=auto`
);

// Retina-ready srcset
const srcset = computed(() => {
  if (hasError.value || !props.id) return "";
  const widths = [props.width, props.width * 2];
  return widths
    .map((w) => `${baseUrl.value}=w=${w},q=${props.quality},format=auto ${w}w`)
    .join(", ");
});

// Tiny blurred version for placeholder
const blurSrc = computed(() =>
  hasError.value || !props.id
    ? props.fallback
    : `${baseUrl.value}=w=40,q=${props.blurQuality},blur=50,format=auto`
);

const sizes = computed(
  () => `(max-width: ${props.width}px) 100vw, ${props.width}px`
);

const ratioStyle = computed(() => {
  if (!props.ratio) return null;
  const [w, h] = props.ratio.split("/").map(Number);
  const padding = (h / w) * 100;
  return {
    position: "relative",
    paddingBottom: `${padding}%`,
    overflow: "hidden",
  };
});

function handleError() {
  hasError.value = true;
}

function handleLoad() {
  loaded.value = true;
}
</script>

<template>
  <!-- Aspect-ratio version -->
  <div
    v-if="ratio"
    :style="ratioStyle"
    class="relative overflow-hidden bg-neutral-100 dark:bg-[#241E34]"
  >
    <!-- Blurred placeholder -->
    <img
      :src="blurSrc"
      :alt="alt"
      :class="[
        'absolute inset-0 w-full h-full object-cover blur-xl scale-105 transition-opacity duration-700 ease-out',
        'dark:brightness-[0.6] brightness-[1.1]',
        { 'opacity-0': loaded },
      ]"
      loading="lazy"
      decoding="async"
    />

    <!-- Final sharp image -->
    <img
      :src="src"
      :srcset="srcset"
      :sizes="sizes"
      :alt="alt"
      :width="width"
      :height="height"
      :class="[
        'absolute inset-0 w-full h-full object-cover blur-xl scale-105 transition-opacity duration-700 ease-out',
        'dark:brightness-[0.6] brightness-[1.1]',
        { 'opacity-0': loaded },
      ]"
      loading="lazy"
      decoding="async"
      @load="handleLoad"
      @error="handleError"
    />
  </div>

  <!-- Non-ratio version -->
  <div v-else class="relative overflow-hidden bg-neutral-100 dark:bg-[#241E34]">
    <img
      :src="blurSrc"
      :alt="alt"
      :class="[
        'absolute inset-0 w-full h-full object-cover blur-xl scale-105 transition-opacity duration-700 ease-out',
        'dark:brightness-[0.6] brightness-[1.1]',
        { 'opacity-0': loaded },
      ]"
      loading="lazy"
      decoding="async"
    />

    <img
      :src="src"
      :srcset="srcset"
      :sizes="sizes"
      :alt="alt"
      :width="width"
      :height="height"
      :class="[
        'transition-opacity duration-700 ease-out',
        'block w-full h-auto',
        loaded ? 'opacity-100' : 'opacity-0',
      ]"
      loading="lazy"
      decoding="async"
      @load="handleLoad"
      @error="handleError"
    />
  </div>
</template>

<style scoped>
img {
  transition: opacity 0.4s ease;
}
</style>
