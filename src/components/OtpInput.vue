<script setup>
import { onBeforeUnmount } from "vue";
import { useRegisterStore } from "../stores/register";
import ResendOTP from "./ResendOTP.vue";
import { ref } from "vue";
const { updateOtp } = useRegisterStore();
const otp = ref(null);


onBeforeUnmount(() => {
  updateOtp(null);
});
</script>

<template>
  <div class="flex justify-between items-center">
    <label
      for="msisdn"
      class="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-400"
      >Enter OTP</label
    >
    <ResendOTP />
  </div>
  <input
    id="otp"
    v-model="otp"
    type="number"
    class="mt-2 appearance-none text-slate-900 dark:text-gray-400 bg-white dark:bg-[#141019] rounded-md block w-full px-3 h-12 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-1 focus:ring-[#36C31F] ring-1 ring-dark-purple-18"
    placeholder="eg. 5193"
    required
    @input="updateOtp(otp)"
  />
</template>
