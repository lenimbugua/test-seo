<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { Switch } from "@headlessui/vue";
import { useLoginStore } from "../stores/login";

import { useModalStore } from "@/stores/modal";

import { useModalTypes } from "@/composables/useModalTypes";
import { useCasinoStore } from "../stores/casino";

const { launchGame, setIsDemo } = useCasinoStore();
const { isDemo } = storeToRefs(useCasinoStore());

const { openModal, setAfterCloseFunction } = useModalStore();

const { login } = useModalTypes();

const { setAfterLoginAction } = useLoginStore();
const { isAuthenticated } = storeToRefs(useLoginStore());

const enabled = computed(() => (isDemo.value === 1 ? false : true));

function afterLoginAction() {
  setIsDemo(0);
  launchGame();
}

function afterLoginModalClose() {
  if (isAuthenticated.value) {
    return;
  }
  setIsDemo(1);
}

const toggle = async () => {
  if (isAuthenticated.value) {
    setIsDemo(enabled.value ? 1 : 0);
    await launchGame();
    return;
  }

  setAfterCloseFunction(afterLoginModalClose);
  setAfterLoginAction(afterLoginAction);
  openModal(login);
};
</script>

<template>
  <div class="flex items-center space-x-2 text-white justify-center">
    <div>Free Play</div>
    <Switch
      v-model="enabled"
      :class="enabled ? 'bg-teal-900' : 'bg-teal-700'"
      class="relative inline-flex items-center h-6 w-16 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
      @click="toggle"
    >
      <span class="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        :class="enabled ? 'translate-x-9' : 'translate-x-0'"
        class="pointer-events-none inline-block h-4 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
      />
    </Switch>
    <div>Real Play</div>
  </div>
</template>
