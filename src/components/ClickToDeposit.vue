<script setup>
import { useModalStore } from "@/stores/modal";

import { useModalTypes } from "@/composables/useModalTypes";
import { storeToRefs } from "pinia";
import { useLoginStore } from "../stores/login";

const { setAfterLoginAction } = useLoginStore();
const { isAuthenticated } = storeToRefs(useLoginStore());

const { deposit, login } = useModalTypes();

const { openModal } = useModalStore();

function openCasinoModal() {
  if (!isAuthenticated.value) {
    setAfterLoginAction(openModal(deposit));
    openModal(login);
    return;
  }
  openModal(deposit);
}
</script>
<template>
  <div
    class="flex justify-center items-center bg-gradient-to-t from-[#0F8F21]/80 to-[#56CB05]/70 text-white capitalize h-full cursor-pointer p-2 py-1"
    @click="openCasinoModal"
  >
    click to Deposit
  </div>
</template>
