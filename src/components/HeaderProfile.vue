<script setup>
import { useRouter } from "vue-router";
import { UserCircleIcon } from "@heroicons/vue/20/solid";
import { useProfileStore } from "@/stores/profile";
import { useLoginStore } from "@/stores/login";
import { storeToRefs } from "pinia";

const router = useRouter();
const { msisdn, token } = storeToRefs(useLoginStore());

const { balance } = storeToRefs(useProfileStore());

const { getProfileInfo } = useProfileStore();

const shouldOpenLoginModal = false;
getProfileInfo(shouldOpenLoginModal);
function goToProfile() {
    
  if (!token.value && !msisdn.value) {
    router.push({ name: "login" });
    return;
  }
  router.push({ name: "profile" });
}
</script>
<template>
  <div v-if="balance" @click="goToProfile">
    <div
      :class="['dark:text-slate-300']"
      class="hidden md:flex rounded-md justify-between items-center space-x-3 cursor-pointer shadow border dark:border-0 bg-white/5 p-2"
    >
      <div class="flex-col border-r pr-3">
        <div class="flex-inline text-xs justify-center items-end">Balance</div>
        <div
          class="flex-inline text-sm justify-center items-end font-extrabold"
        >
          {{ balance }}
        </div>
      </div>

      <div>
        <UserCircleIcon
          class="text-slate-600 dark:text-slate-400 w-9 h-9 fill-current"
        />
      </div>
    </div>
    <div class="md:hidden mr-2 flex justify-center items-center">
      <div class="flex-col text-gray-200">
        <div class="flex text-sm justify-center">
          <UserCircleIcon class="text-gray-600 dark:text-slate-200 w-6 h-6" />
        </div>
        <div
          class="flex text-xs text-gray-950 dark:text-slate-200 whitespace-nowrap justify-center text-center"
        >
          {{ balance }}
        </div>
      </div>
    </div>
  </div>
</template>
