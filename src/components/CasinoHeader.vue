<script setup>
// import { useModalStore } from "@/stores/modal";

// import { useModalTypes } from "@/composables/useModalTypes";
// import { storeToRefs } from "pinia";
// import { useLoginStore } from "../stores/login";
import ClickToDeposit from "./ClickToDeposit.vue";

// const { setAfterLoginAction } = useLoginStore();
// const { isAuthenticated } = storeToRefs(useLoginStore());

// const { deposit, login } = useModalTypes();

// const { openModal } = useModalStore();

// function openCasinoModal() {
//   if (!isAuthenticated.value) {
//     setAfterLoginAction(openModal(deposit));
//     openModal(login);
//     return;
//   }
//   openModal(deposit);
// }
</script>
<template>
  <div class="bg-gradient-to-t from-[#0F8F21]/80 to-[#56CB05]/70">
    <div
      class=" bg-gradient-to-t from-[#0F8F21]/80 to-[#56CB05]/70 flex items-center justify-between max-w-[1680px] mx-auto h-10"
    >
      <div
        class="flex items-center bg-black/50 h-full cursor-pointer px-2 md:px-4"
        @click="$router.go(-1)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6 text-white"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
      </div>
      <div
        class="flex flex-grow justify-center text-white capitalize items-center h-full cursor-pointer px-2"
        @click="openCasinoModal"
      >
        <ClickToDeposit class="w-full" />
      </div>
      <RouterLink
        :to="{ name: 'home' }"
        class="flex items-center bg-black/50 h-full cursor-pointer px-2 md:px-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6 text-white"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      </RouterLink>
    </div>
  </div>
</template>
