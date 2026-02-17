<script setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useRegisterStore } from "../stores/register";
import { useSelfExclusionStore } from "../stores/self-exclusion";

const router = useRouter();

const { excludeFromBetting } = useSelfExclusionStore();
const { msisdn } = storeToRefs(useRegisterStore());
const { pending, responseOK } = storeToRefs(useSelfExclusionStore());
const mobile = ref(msisdn);
const idNumber = ref("");
const surName = ref("");
const otherNames = ref("");
const reason = ref("");
async function selfExclusion() {
  const body = {
    msisdn: mobile.value,
    surName: surName.value,
    otherNames: otherNames.value,
    idNo: idNumber.value,
    reason: reason.value,
  };

  await excludeFromBetting(body);

  if (responseOK.value) {
    router.push({ name: "home" });
  }
}
</script>
<template>
  <form class="mt-6" @submit.prevent="selfExclusion">
    <div class="mb-6">
      <label
        for="msisdn"
        class="block text-sm font-semibold text-gray-900 dark:text-gray-400"
        >Mobile Phone</label
      >
      <input
        id="msisdn"
        v-model="mobile"
        autocomplete="tel"
        type="tel"
        class="mt-2 cursor-not-allowed appearance-none text-slate-900 dark:text-gray-400 bg-white dark:bg-[#141019] rounded-md block w-full px-3 h-12 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-1 focus:ring-[#36C31F] ring-1 ring-dark-purple-18"
        required
        disabled
      />
    </div>
    <div class="mb-6">
      <label
        for="idNumber"
        class="block text-sm font-semibold text-gray-900 dark:text-gray-400"
        >Id number</label
      >
      <input
        id="idNumber"
        v-model="idNumber"
        autocomplete="number"
        type="number"
        class="mt-2 appearance-none text-slate-900 dark:text-gray-400 bg-white dark:bg-[#141019] rounded-md block w-full px-3 h-12 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-1 focus:ring-[#36C31F] ring-1 ring-dark-purple-18"
        placeholder="eg. 31354904"
        required
      />
    </div>
    <div class="mb-6">
      <label
        for="surName"
        class="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-400"
        >First Name</label
      >
      <input
        id="surName"
        v-model="surName"
        autocomplete="tel"
        type="text"
        class="mt-2 appearance-none text-slate-900 dark:text-gray-400 bg-white dark:bg-[#141019] rounded-md block w-full px-3 h-12 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-1 focus:ring-[#36C31F] ring-1 ring-dark-purple-18"
        placeholder="eg. James"
        required
      />
    </div>
    <div class="mb-6">
      <label
        for="otherNames"
        class="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-400"
        >Other Names</label
      >
      <input
        id="otherNames"
        v-model="otherNames"
        autocomplete="text"
        type="text"
        class="mt-2 appearance-none text-slate-900 dark:text-gray-400 bg-white dark:bg-[#141019] rounded-md block w-full px-3 h-12 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-1 focus:ring-[#36C31F] ring-1 ring-dark-purple-18"
        placeholder="eg. Doe"
        required
      />
    </div>
    <div class="mb-6">
      <label
        for="reason"
        class="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-400"
        >Self Exclusion Reason</label
      >
      <textarea
        id="reason"
        v-model="reason"
        rows="3"
        :maxlength="10"
        autocomplete="text"
        class="mt-2 appearance-none text-slate-900 dark:text-gray-400 bg-white dark:bg-[#141019] rounded-md block w-full px-3 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-1 focus:ring-[#36C31F] ring-1 ring-dark-purple-18"
        placeholder="Reason"
        required
      ></textarea>
    </div>

    <div class="px-0">
      <button
        id="login-button"
        class="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 text-red-50 bg-red-600 hover:text-red-50 hover:bg-red-600/80 w-full"
      >
        <TheButtonSpin v-if="pending" />
        <span v-else>Exclude Myself</span>
      </button>
    </div>
  </form>
</template>
