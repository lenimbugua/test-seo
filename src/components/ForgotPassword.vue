<script setup>
import { onBeforeUnmount } from "vue";
import { useRegisterStore } from "../stores/register";
import { useRouter } from "vue-router";
import MobileInput from "./MobileInput.vue";
import { storeToRefs } from "pinia";

const router = useRouter();
const { pending, error, responseOK, msisdn } = storeToRefs(useRegisterStore());

const { forgotPassword, resetError } = useRegisterStore();

onBeforeUnmount(() => {
  resetError();
});

async function requestOtp() {
  const body = {
    msisdn: msisdn.value,
  };

  await forgotPassword(body);
  if (responseOK.value) {
    router.push({ name: "reset-password" });
  }
}
</script>
<template>
  <div
    :class="['text-gray-900 dark:text-gray-400']"
    class="max-w-lg mx-auto py-4"
  >
    <h3
      :class="['text-gray-900 dark:text-gray-400']"
      class="font-extrabold w-full text-center my-10 text-xl"
    >
      Forgot Password
    </h3>
    <h5 class="text-[#36C31F] w-full text-center pb-5">
      Enter your Phone Number to Reset Password
    </h5>
    <form class="space-y-6 max-w-sm mx-auto" @submit.prevent="requestOtp">
      <div class="mb-6 px-0">
        <MobileInput />
      </div>

      <div class="px-0">
        <div v-if="error" class="text-red-500 capitalize-first text-sm py-1.5">
          {{ error }}
        </div>
        <button
          type="submit"
          class="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 text-lime-50 bg-[#1C7928] hover:text-sky-50/80 hover:bg-[#1C7928]/80 w-full"
        >
          <TheButtonSpin v-if="pending" />
          <span v-else>Send OTP</span>
        </button>
      </div>

      <h6>
        I do not have an account?
        <RouterLink class="text-[#36C31F]" :to="{ name: 'signup' }"
          >Register</RouterLink
        >
      </h6>
      <h6>
        I have an account?
        <RouterLink class="text-[#36C31F]" :to="{ name: 'login' }"
          >Login</RouterLink
        >
      </h6>
    </form>
  </div>
</template>
