<script setup>
import { toRefs } from "vue";
import { useRegister } from "../composables/useRegister";
import { useUtmStore } from "../stores/utm";
import FreebetLink from "./FreebetLink.vue";
import MobileInput from "./MobileInput.vue";
import PasswordInput from "./PasswordInput.vue";

const { referralCode } = toRefs(useUtmStore());
const { updateReferralCode } = useUtmStore();
const {
  error,
  submit,
  pending,
  resetError,
  onBeforeUnmount,
  updatePassword,
  termsAndConditions,
  updateConfirmPassword,
  showPasswordDoNotMatch,
} = useRegister();

onBeforeUnmount(() => {
  resetError();
});
</script>
<template>
  <div class="max-w-lg mx-auto">
    <!-- <SetupWizard :step="1" /> -->
    <div class="py-10">
      <div class="mb-4">
        <FreebetLink />
      </div>
      <h3 class="font-extrabold text-xl text-gray-900 dark:text-gray-400">
        Create Your Hakibets Account
      </h3>
      <form class="max-w-lg mx-auto py-4" @submit.prevent="submit">
        <div class="mb-6 px-0">
          <div class="mb-6">
            <MobileInput />
          </div>
        </div>
        <div class="mb-6">
          <PasswordInput
            :id="'password'"
            :show-validation-errors="true"
            :update-function="updatePassword"
            :label="'Password'"
          />
        </div>
        <div class="mb-6">
          <PasswordInput
            :id="'confirmPassword'"
            :update-function="updateConfirmPassword"
            :label="'Confirm Password'"
          />
          <div v-if="showPasswordDoNotMatch" class="text-red-500 text-xs mt-0.5">
            Password and password confirmation do not match
          </div>
        </div>
        <label
          for="msisdn"
          class="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-400"
          >Enter Referral Code (Optional)</label
        >
        <input
          id="referralCode"
          v-model="referralCode"
          type="text"
          class="mt-2 appearance-none text-slate-900 dark:text-gray-400 bg-white dark:bg-[#141019] rounded-md block w-full px-3 h-12 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-1 focus:ring-[#36C31F] ring-1 ring-dark-purple-18"
          placeholder="XXXXXX"
          @input="updateReferralCode(referralCode)"
        />
        <label class="flex items-top gap-2 mb-2"
          ><input
            v-model="termsAndConditions"
            required
            type="checkbox"
            class="mt-1 h-10 w-10r"
          />
          <span class="text-xs leading-normal text-gray-700 dark:text-gray-400"
            >By clicking Register you confirm to have read in detail, understood
            and agreed to the,
            <RouterLink
              :to="{ name: 'terms-and-conditions' }"
              target="_blank"
              class="text-[#36C31F]"
              >Terms and Conditions</RouterLink
            >
            the
            <RouterLink
              target="_blank"
              :to="{ name: 'privacy-policy' }"
              class="text-[#36C31F]"
            >
              Privacy Policy,
            </RouterLink>
            and also that you are over 18 years of age.
          </span></label
        >
        <div v-if="error" class="text-red-500 text-sm py-1.5">{{ error }}</div>
        <div class="px-0">
          <button
            class="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 text-lime-50 bg-[#1C7928] hover:text-lime-50/80 hover:bg-[#1C7928]/80 w-full"
          >
            <TheButtonSpin v-if="pending" />
            <span v-else>Sign Up</span>
          </button>
        </div>
        <h6 class="text-gray-900 dark:text-gray-400 py-2">
          I Already have an account
          <RouterLink class="text-[#36C31F]" :to="{ name: 'login' }"
            >Login</RouterLink
          >
        </h6>
      </form>
    </div>
  </div>
</template>
