<script setup>
import { watch, ref, nextTick, computed } from "vue";

const defaultCategories = [
  { id: "all", name: "All" },
  { id: "top", name: "Top Games" },
  { id: "crash", name: "Crash" },
  { id: "slots", name: "Slots" },
  { id: "live", name: "Live Casino" },
  { id: "table", name: "Table Games" },
  { id: "virtuals", name: "Virtuals" },
];

const props = defineProps({
  activeCategory: { type: String, default: "all" },
  categories: { type: Array, default: () => null },
});

const emit = defineEmits(["select"]);

const pillRefs = ref([]);

const categoryList = computed(() => props.categories || defaultCategories);

function scrollActivePillIntoView() {
  const idx = categoryList.value.findIndex((c) => c.id === props.activeCategory);
  if (idx >= 0 && pillRefs.value[idx]) {
    pillRefs.value[idx].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }
}

watch(() => props.activeCategory, () => {
  nextTick(scrollActivePillIntoView);
}, { immediate: true });

function selectCategory(id) {
  emit("select", id);
}
</script>

<template>
  <div class="flex gap-2 overflow-x-auto scrollbar-hide py-1">
    <button
      v-for="(cat, i) in categoryList"
      :key="cat.id"
      :ref="(el) => { pillRefs[i] = el }"
      :class="[
        'px-4 py-1.5 text-xs font-semibold whitespace-nowrap rounded-full transition-all duration-200 border',
        activeCategory === cat.id
          ? 'bg-[#2CB14A] text-white border-[#2CB14A]'
          : 'bg-transparent text-gray-500 dark:text-[#8888aa] border-gray-300 dark:border-[#2a2a4a] hover:border-gray-400 dark:hover:border-[#444466] hover:text-gray-900 dark:hover:text-white',
      ]"
      @click="selectCategory(cat.id)"
    >
      {{ cat.name }}
    </button>
  </div>
</template>
