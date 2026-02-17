<script setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRegisterStore } from "../stores/register";
const { msisdn } = storeToRefs(useRegisterStore());
const { updateMsisdn } = useRegisterStore();
const mobile = ref(msisdn);
</script>

<template>
  <label
    for="msisdn"
    class="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-400"
    >Mobile Phone</label
  >
  <input
    id="msisdn"
    v-model="mobile"
    autocomplete="tel"
    type="tel"
    class="mt-2 appearance-none text-slate-900 dark:text-gray-400 bg-white dark:bg-[#141019] rounded-md block w-full px-3 h-12 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-1 focus:ring-[#36C31F] ring-1 ring-dark-purple-18"
    placeholder="07XXXXXXXX"
    required
    @input="updateMsisdn(mobile)"
  />
</template>
