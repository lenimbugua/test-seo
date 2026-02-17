<script setup>
import { Switch } from "@headlessui/vue";
import MoonStarsIcon from "./MoonStarsIcon.vue";
import { SunIcon } from "@heroicons/vue/20/solid";

import { useThemeSwitch } from "../composables/useThemeSwitch";

const { isDark, changeTheme } = useThemeSwitch();
</script>
<template>
  <Switch
    v-model="isDark"
    :class="isDark ? 'bg-white/15' : 'bg-black/30'"
    class="relative flex items-center justify-between w-16 h-8 p-1 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ring-2 ring-black/40 dark:ring-white/25"
    @click="changeTheme()"
  >
    <SunIcon v-if="isDark" class="h-5 w-5 text-amber-50" />

    <span class="sr-only">Toggle dark mode</span>
    <span
      aria-hidden="true"
      :class="
        isDark
          ? 'translate-x-1.5 bg-amber-300'
          : 'translate-x-[-0.2rem] bg-amber-500'
      "
      class="pointer-events-none inline-flex justify-center items-center w-7 h-7 p-1.5 transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out"
    >
      <SunIcon v-if="!isDark" class="h-5 w-5 text-white dark:text-amber-100" />
      <MoonStarsIcon v-else class="h-5 w-5 text-amber-500" />
    </span>
    <MoonStarsIcon
      v-if="!isDark"
      class="h-5 w-5 text-amber-300 dark:text-amber-500"
    />
  </Switch>
</template>
