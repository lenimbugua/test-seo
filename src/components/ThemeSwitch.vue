<script setup>
import { useThemeSwitch } from "../composables/useThemeSwitch";
const { isDark, changeTheme } = useThemeSwitch();
</script>
<template>
  <div
    class="flex cursor-pointer bg-black/5 dark:bg-white/20 p-2 border dark:border-0 rounded-md"
    @click="changeTheme()"
  >
    <!-- Moon Star Icon -->
    <svg
      v-if="!isDark"
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5 text-amber-600 fill-current"
      viewBox="0 0 24 24"
    >
      <path
        d="m17.75 4.09l-2.53 1.94l.91 3.06l-2.63-1.81l-2.63 1.81l.91-3.06l-2.53-1.94L12.44 4l1.06-3l1.06 3zm3.5 6.91l-1.64 1.25l.59 1.98l-1.7-1.17l-1.7 1.17l.59-1.98L15.75 11l2.06-.05L18.5 9l.69 1.95zm-2.28 4.95c.83-.08 1.72 1.1 1.19 1.85c-.32.45-.66.87-1.08 1.27C15.17 23 8.84 23 4.94 19.07c-3.91-3.9-3.91-10.24 0-14.14c.4-.4.82-.76 1.27-1.08c.75-.53 1.93.36 1.85 1.19c-.27 2.86.69 5.83 2.89 8.02a9.96 9.96 0 0 0 8.02 2.89m-1.64 2.02a12.08 12.08 0 0 1-7.8-3.47c-2.17-2.19-3.33-5-3.49-7.82c-2.81 3.14-2.7 7.96.31 10.98c3.02 3.01 7.84 3.12 10.98.31"
      ></path>
    </svg>

    <!-- Sun Icon -->
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5 text-[#FEAF04] fill-current"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M11 5V1h2v4zm6.65 2.75l-1.375-1.375l2.8-2.875l1.4 1.425zM19 13v-2h4v2zm-8 10v-4h2v4zM6.35 7.7L3.5 4.925l1.425-1.4L7.75 6.35zm12.7 12.8l-2.775-2.875l1.35-1.35l2.85 2.75zM1 13v-2h4v2zm3.925 7.5l-1.4-1.425l2.8-2.8l.725.675l.725.7zM12 18q-2.5 0-4.25-1.75T6 12t1.75-4.25T12 6t4.25 1.75T18 12t-1.75 4.25T12 18"
      ></path>
    </svg>
  </div>
</template>
