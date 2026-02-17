<script setup>
import { useRouter } from "vue-router";
import { useLoginStore } from "../stores/login";
import { useRegisterStore } from "../stores/register";
import { useModalStore } from "@/stores/modal";
import MobileInput from "./MobileInput.vue";
import { onBeforeUnmount } from "vue";
import { storeToRefs } from "pinia";
import { useProfileStore } from "../stores/profile";

import { useGoogleDataLayers } from "../composables/useGoogleDataLayers";

const { pushDataLayerToGoogle } = useGoogleDataLayers();
const { getProfileInfo } = useProfileStore();

const { closeModal } = useModalStore();
const { login, resetError, setAfterLoginAction } = useLoginStore();
const { error, pending, responseOK, afterLoginAction, profileSid } =
  storeToRefs(useLoginStore());
const { msisdn, password } = storeToRefs(useRegisterStore());
const { updatePassword } = useRegisterStore();

const router = useRouter();
function goHome() {
  router.push({ name: "home" });
}
async function authenticate() {
  const body = {
    username: msisdn.value,
    password: password.value,
  };

  await login(body, router);

  if (responseOK.value) {
    getProfileInfo();
    closeModal();
    successfulLoginData();
  } else {
    unsuccessfulLoginData();
  }

  if (router.currentRoute.value.name === "login") {
    if (responseOK.value) {
      goHome();
    }
  } else if (afterLoginAction.value) {
    if (responseOK.value) {
      await afterLoginAction.value();
      setAfterLoginAction(null);
    }
  }
}
onBeforeUnmount(() => {
  resetError();
});

function successfulLoginData() {
  // Initialize the data layer if it doesn't exist
  window.dataLayer = window.dataLayer || [];

  const loginMethod = "msisdn";

  // Push the login event data to the data layer
  pushDataLayerToGoogle({
    event: "login",
    method: loginMethod, // Replace with your method (e.g., Google, Facebook, etc.)
    msisdn: msisdn.value,
    user_id: profileSid.value, // Replace with the dynamic user ID after successful login
  });
}

function unsuccessfulLoginData() {
  pushDataLayerToGoogle({
    event: "login_failed",
    error_message: error.value, //add the error/reason for failure
  });
}
</script>
<template>
  <div
    :class="['text-gray-900 dark:text-gray-400']"
    class="max-w-lg mx-auto py-4"
  >
    <form class="space-y-6 max-w-sm mx-auto" @submit.prevent="authenticate">
      <div class="mb-6">
        <MobileInput />
      </div>
      <div class="mb-6">
        <PasswordInput
          :id="'password'"
          :update-function="updatePassword"
          :label="'Password'"
        />
      </div>
      <div :class="['text-gray-900 dark:text-gray-400']">
        <div class="">
          <div class="flex w-full justify-between">
            <div class="flex items-center space-x-1">
              <input
                id="accept-Terms-and-Conditions"
                class="h-4 w-4"
                type="checkbox"
              />
              <label for="accept-Terms-and-Conditions"
                >Keep me logged in
              </label>
            </div>
            <div class="text-[#36C31F]">
              <RouterLink :to="{ name: 'forgot-password' }" @click="closeModal"
                >Forgot password?</RouterLink
              >
            </div>
          </div>
        </div>
      </div>
      <div v-if="error" class="text-red-500 text-sm py-1.5">{{ error }}</div>
      <div class="px-0">
        <button
          id="login-button"
          class="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 text-sky-50 bg-[#1C7928] hover:text-lime-50 hover:bg-[#1C7928]/80 w-full"
        >
          <TheButtonSpin v-if="pending" />
          <span v-else>Login</span>
        </button>
      </div>
      <h6>
        I don't have an account?
        <RouterLink
          class="text-[#36C31F]"
          :to="{ name: 'signup' }"
          @click="closeModal"
          >Sign Up</RouterLink
        >
      </h6>
    </form>
  </div>
</template>
