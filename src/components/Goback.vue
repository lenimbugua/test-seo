<template>
  <div class="flex items-center space-x-2">
    <ChevronLeftIcon
      class="w-7 h-7 cursor-pointer text-black dark:text-white"
      @click="$router.go(-1)"
    />
    <div class="text-black dark:text-white">Back</div>
  </div>
</template>
