<script setup>
import { storeToRefs } from "pinia";
import { onBeforeUnmount, ref } from "vue";
import { useRouter } from "vue-router";
import { useRegisterStore } from "../stores/register";
import MobileInput from "./MobileInput.vue";
import OtpInput from "./OtpInput.vue";
const router = useRouter();

const {
  error,
  responseOK,
  pending,
  otp,
  msisdn,
  password,
  confirmPassword,
  showPasswordDoNotMatch,
  passwordMatch,
} = storeToRefs(useRegisterStore());
const { resetPassword, resetError, updateConfirmPassword, updatePassword } =
  useRegisterStore();
const mobile = ref(msisdn.value);

async function reset() {
  if (!passwordMatch.value) {
    return;
  }
  const body = {
    msisdn: mobile.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
    otp: otp.value,
  };
  await resetPassword(body);
  if (responseOK.value) {
    router.push({ name: "login" });
  }
}

onBeforeUnmount(() => {
  resetError();
});
</script>
<template>
  <form class="space-y-6 max-w-sm mx-auto" @submit.prevent="reset">
    <div class="w-full mx-auto flex justify-center">
      <div class="w-full">
        <MobileInput />
      </div>
    </div>

    <div class="pb-3">
      <OtpInput />
    </div>
    <div class="mb-6">
      <PasswordInput
        :id="'password'"
        :update-function="updatePassword"
        :label="'Password'"
      />
    </div>
    <div v-if="showPasswordDoNotMatch" class="text-red-500 text-xs">
      Password and password confirmation do not match
    </div>
    <div class="mb-6">
      <PasswordInput
        :id="'confirmPassword'"
        :update-function="updateConfirmPassword"
        :label="'Confirm Password'"
      />
    </div>
    <div v-if="error" class="text-red-500 text-sm py-1.5">{{ error }}</div>
    <div class="px-0">
      <button
        type="submit"
        class="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 text-lime-50 bg-[#1C7928] hover:text-sky-50/80 hover:bg-[#1C7928]/80 w-full"
      >
        <TheButtonSpin v-if="pending" />
        <span v-else>Submit</span>
      </button>
    </div>
  </form>
</template>
