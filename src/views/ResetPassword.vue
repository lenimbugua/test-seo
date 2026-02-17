<script setup lang="ts">
import NewPassword from "../components/NewPassword.vue";
</script>

<template>
  <div
    :class="['text-gray-900 dark:text-gray-400']"
    class="max-w-lg mx-auto py-4"
  >
    <h3
      :class="['text-gray-900 dark:text-gray-400']"
      class="font-extrabold text-black dark:text-white w-full text-center my-10 text-xl"
    >
      Reset Password
    </h3>
    <NewPassword />
    <h6>
      I have an account?
      <RouterLink class="text-[#36C31F]" :to="{ name: 'login' }"
        >Login</RouterLink
      >
    </h6>
  </div>
</template>
