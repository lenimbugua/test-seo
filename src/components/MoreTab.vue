<script setup></script>
<template>
  <div class="text-center text-slate-500 cursor-pointer">
    <div class="flex-col justify-end items-center inline-flex">
      <div
        class="w-5 h-10 flex flex-col items-center rounded-lg shadow bg-gray-300 dark:bg-[#241E34]"
      >
        <div
          class="relative flex items-center justify-center rounded-full h-full w-full"
        >
          <SecondaryNavIcons icon="more" />
        </div>
      </div>
      <div
        class="text-xs font-medium mt-1 w-10 text-ellipsis whitespace-nowrap overflow-hidden text-slate-700 dark:text-slate-300"
      >
        more
      </div>
    </div>
  </div>
</template>
