<script setup>
import { storeToRefs } from "pinia";
import { computed } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
} from "@headlessui/vue";

import { useModalStore } from "@/stores/modal";

import { useModalTypes } from "@/composables/useModalTypes";

const { showModal, modalType } = storeToRefs(useModalStore());

const { openModal, closeModal, setAfterCloseFunction } = useModalStore();

const { login, casinoUnauthModal } = useModalTypes();

const isOpen = computed(() => {
  return modalType.value === casinoUnauthModal && showModal.value;
});
function close() {
  setAfterCloseFunction(null);
  closeModal();
}
</script>
<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/50" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="flex  items-center w-full h-[75vh] max-w-2xl transform overflow-hidden rounded-2xl bg-white/75 p-12 text-left shadow-xl transition-all"
            >
              <div class="w-full flex space-x-4">
                <button
                  type="button"
                  class="inline-flex w-1/2 justify-center rounded-md border border-transparent bg-green-600 font-bold uppercase px-4 py-2 text-sm  text-green-950 hover:bg-green-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                  @click="openModal(login)"
                >
                  Login
                </button>
                <button
                  type="button"
                  class="inline-flex w-1/2 justify-center rounded-md border border-transparent bg-gray-900 px-4 py-2 text-sm font-medium text-green-600 hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                  @click="close"
                >
                  Free Play
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
