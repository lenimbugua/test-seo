<script setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

import { useModalStore } from "@/stores/modal";
// import { CheckCircleIcon } from "@heroicons/vue/24/solid";
import { useInstantStore } from "@/stores/instant";

import { useModalTypes } from "@/composables/useModalTypes";

import { computed } from "vue";
import { storeToRefs } from "pinia";

const { instantBetWonModal } = useModalTypes();

const { won } = storeToRefs(useInstantStore());

const { showModal, modalType } = storeToRefs(useModalStore());

const showDialog = computed(() => {
  return modalType.value === instantBetWonModal && showModal.value;
});
const { closeModal } = useModalStore();
</script>
<template>
  <TransitionRoot appear :show="showDialog" as="template">
    <Dialog as="div" class="relative z-50" @close="closeModal">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
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
              class="w-full relative max-w-52 transform rounded-2xl bg-white dark:bg-dark-purple-19 text-left align-middle shadow-xl transition-all"
            >
              <img src="/win.webp" class="mx-auto h-52" alt="win" />
              <div>
                <DialogTitle
                  as="h3"
                  class="w-full flex justify-center text-lg font-medium leading-6 text-green-500"
                >
                  KES. {{ won }}
                </DialogTitle>
                <div class="mt-2">
                  <p class="text-sm text-center text-gray-500">
                    Congratulations! You Won
                  </p>
                </div>
              </div>

              <div class="mt-4 flex justify-center w-full">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-dark-purple-2 px-4 py-2 text-sm font-medium text-dark-purple-22 hover:bg-dark-purple-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="closeModal"
                >
                  ok
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
