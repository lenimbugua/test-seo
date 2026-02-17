<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import { useRegisterStore } from "../stores/register";
import { storeToRefs } from "pinia";

const { otpPending, responseOK, countdownSeconds, resendOTP, msisdn } =
  storeToRefs(useRegisterStore());

const { resendOtp, resetError, decreaseCount, resetCount } = useRegisterStore();
let intervalId = null;

const startCountdown = () => {
  if (intervalId) {
    clearInterval(intervalId);
  }

  intervalId = setInterval(() => {
    decreaseCount();

    if (countdownSeconds.value === 0) {
      clearInterval(intervalId);
    }
  }, 1000);
};

onMounted(() => {
  resetCount();

  startCountdown();
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
  resetCount();
  resetError();
});

async function resend() {
  if (!resendOTP.value) return;
  resetError();
  if (!msisdn.value) {
    return;
  }
  await resendOtp({ msisdn: msisdn.value });
  if (responseOK.value) {
    resetCount();
    startCountdown();
  }
}
</script>
<template>
  <div class="justify-center bg-[#1C7928] rounded-full cursor-pointer px-2 py-1">
    <div class="flex items-center space-x-2">
      <div v-if="!resendOTP" class="text-lime-50 w-full text-center text-sm">
        Resend OTP in
      </div>
      <div
        :class="[resendOTP ? 'cursor-pointer' : 'cursor-not-allowed']"
        class="flex mx-auto text-lime-50 justify-center items-center rounded-md"
        @click="resend"
      >
        <span v-if="otpPending">Sending...</span>
        <span v-else-if="!resendOTP">{{ countdownSeconds }}</span>
        <span v-else>Resend</span>
      </div>
    </div>
  </div>
</template>
