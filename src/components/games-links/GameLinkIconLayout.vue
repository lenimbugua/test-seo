<script setup>
defineProps({
  icon: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  isNew: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
  <div
    class="text-slate-500 hover:text-muted-foreground cursor-pointer overflow-clip"
  >
    <div class="">
      <div
        class="w-10 h-10 flex flex-col items-center rounded-[0.375rem] shadow bg-white/5 hover:bg-white/10 overflow-clip"
      >
        <div class="relative flex items-center rounded-full h-full w-full">
          <img
            :src="icon"
            class="inset-0 h-full w-full absolute object-cover rounded-lg"
            alt="haki-league"
            width="40"
            height="40"
            loading="lazy"
            decoding="async"
          />
          <span v-if="isNew" class="block absolute right-0 top-0 p-0.5 px-1 rounded-bl-lg border-red-600 bg-[#EF4444] text-[0.4rem] font-bold leading-none text-white">NEW</span>
        </div>
      </div>
      <div
        class="text-xs font-medium mt-1 w-14 text-ellipsis whitespace-nowrap overflow-hidden text-slate-700 dark:text-slate-300"
      >
        {{ name }}
      </div>
    </div>
  </div>
</template>
