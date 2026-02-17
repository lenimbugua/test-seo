<script setup>
import AuthTopBar from "./AuthTopBar.vue";
</script>
<template>
  <div class="h-dvh flex flex-col">
    <div>
      <div class="flex sm:hidden">
        <AuthTopBar />
      </div>
      <div class="hidden sm:block">
        <HeaderLinks class="hidden md:block" />
      </div>
    </div>
    <div class="bg-white dark:bg-[#241E34] flex-grow w-full max-w-[1680px] mx-auto px-3">
      <RouterView />
    </div>
    <Footer />
  </div>
</template>
