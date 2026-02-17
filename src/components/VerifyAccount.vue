<script setup>
import { CheckCircleIcon } from "@heroicons/vue/24/outline";
import { storeToRefs } from "pinia";
import { onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { useGoogleDataLayers } from "../composables/useGoogleDataLayers";
import { usePropellarAds } from "../composables/usePropellarAds";
import { useLoginStore } from "../stores/login";
import { useRegisterStore } from "../stores/register";
import MobileInput from "./MobileInput.vue";

const ussdActivate = import.meta.env.VITE_USSD_ACTIVATE_ACCOUNT;

const { pushDataLayerToGoogle } = useGoogleDataLayers();

const { activateProfile, resetError } = useRegisterStore();

const { error, responseOK, pending, msisdn, otp } = storeToRefs(
  useRegisterStore()
);

const { token, profileSid } = storeToRefs(useLoginStore());

const router = useRouter();

function successfulVerifyDataLayer() {
  const signUpMethod = "msisdn";

  pushDataLayerToGoogle({
    event: "sign_up",
    sign_up_method: signUpMethod,
    user_id: profileSid.value,
  });
}

function unsuccessfulVerifyDataLayer() {
  pushDataLayerToGoogle({
    event: "sign_up_failed",
    error_message: error.value, // add the error/reason for failure
  });
}

async function submit() {
  const body = {
    otp: otp.value,
    msisdn: msisdn.value,
  };

  await activateProfile(body);
  if (responseOK.value) {
    successfulVerifyDataLayer();

    window.gtag("event", "conversion", {
      send_to: "AW-16789345990/VjbrCNvQgoIaEMat5MU-",
    });

    const { trackPropellerConversion } = usePropellarAds();
    trackPropellerConversion();

    if (token.value) {
      router.push({ name: "home" });
      return;
    }
    router.push({ name: "login" });
  } else {
    unsuccessfulVerifyDataLayer();
  }
}

onBeforeUnmount(() => {
  resetError();
});
</script>
<template>
  <form
    class="max-w-sm mx-auto flex flex-col flex-grow"
    autocomplete="off"
    @submit.prevent="submit"
  >
    <div class="py-8 pb-64">
      <div
        class="shadow bg-green-200/80 mb-8 rounded-md p-2 border border-[#56CB05]"
      >
        <div class="flex space-x-2">
          <CheckCircleIcon class="h-16 w-16 text-lime-700" />
          <div>
            <div class="text-lg font-bold text-lime-900">
              Verification Code sent
            </div>
            <div class="text-sm">
              Missed your OTP? No worries! Just dial
              <span class="text-lime-800 font-extrabold text-lg"
                >{{ ussdActivate }}
              </span>
              and get your account activated instantly!
            </div>
          </div>
        </div>
      </div>
      <div class="w-full flex justify-center">
        <h2 class="font-black text-xl text-black dark:text-white text-md">
          Activate Account
        </h2>
      </div>
      <!-- <SetupWizard :step="2" /> -->
      <div class="w-full mx-auto flex justify-center">
        <div class="w-full">
          <MobileInput />
        </div>
      </div>
      <div class="py-3">
        <OtpInput />
      </div>

      <div class="">
        <div v-if="error" class="text-red-500 capitalize-first text-sm py-1.5">
          {{ error }}
        </div>
        <button
          class="inline-flex mt-4 justify-center rounded-lg text-lg font-semibold py-4 px-4 text-sky-50 bg-[#56CB05] hover:text-lime-50 hover:bg-[#56CB05] w-full"
        >
          <TheButtonSpin v-if="pending" />
          <span v-else>Continue</span>
        </button>
      </div>
    </div>
  </form>
</template>
