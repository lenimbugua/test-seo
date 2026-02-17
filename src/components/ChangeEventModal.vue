<script setup>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";

import { useModalTypes } from "@/composables/useModalTypes";
import { useModalStore } from "@/stores/modal";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import ChangeEvent from "./ChangeEvent.vue";

const { ChangeEventModal } = useModalTypes();

const { showModal, modalType } = storeToRefs(useModalStore());
const { closeModal } = useModalStore();
const closeButtonRef = ref(null); // Element to initially focus

const showBetslip = computed(() => {
  return modalType.value === ChangeEventModal && showModal.value;
});
</script>

<template>
  <TransitionRoot appear :show="showBetslip" as="template">
    <Dialog
      as="div"
      class="relative z-[100]"
      :initial-focus="closeButtonRef"
      @close="closeModal"
    >
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
      <div class="fixed z-50 bottom-0 right-0 left-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center text-center">
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
              class="w-full max-w-4xl bg-secondary-900 transform overflow-hidden rounded-t-lg text-left align-middle shadow-xl transition-all border-t-2 dark:border-dark-purple-22"
            >
              <div
                class="flex w-full justify-between bg-white dark:bg-dark-purple-19 border-b border-gray-300 dark:border-gray-900"
              >
                <div class="p-2 py-1">
                  <XMarkIcon
                    class="w-5 h-5 dark:text-slate-300 text-gray-700 stroke-width-2 cursor-pointer"
                    @click="closeModal"
                  />
                </div>
                <DialogTitle
                  class="flex text-gray-500 flex-grow items-center justify-center px-1 text-left uppercase text-sm font-bold border-x-2 border-gray-300 dark:border-gray-900"
                >
                  Change Event
                </DialogTitle>
                <button ref="closeButtonRef" class="p-2 py-1 outline-none">
                  <XMarkIcon
                    class="w-5 h-5 dark:text-slate-300 text-gray-700 stroke-width-2 cursor-pointer"
                    @click="closeModal"
                  />
                </button>
              </div>
              <div
                class="max-h-[calc(100vh-20rem)] min-h-[37rem] overflow-scroll w-full bg-gray-100 dark:bg-[#251F32] px-2 py-1.5"
              >
                <ChangeEvent />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
