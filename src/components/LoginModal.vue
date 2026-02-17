<script setup>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { storeToRefs } from "pinia";
import { computed, onBeforeUnmount, ref } from "vue";

import { useModalStore } from "@/stores/modal";
import { XMarkIcon } from "@heroicons/vue/24/solid";

import { useModalTypes } from "@/composables/useModalTypes";

const closeButtonRef = ref(null);

const { login } = useModalTypes();

const { showModal, modalType, afterCloseFunction } = storeToRefs(
  useModalStore()
);

const showDialog = computed(() => {
  return modalType.value === login && showModal.value;
});

const { closeModal, setAfterCloseFunction } = useModalStore();

function close() {
  if (afterCloseFunction.value) {
    afterCloseFunction.value();
  }
  closeModal();
}
onBeforeUnmount(() => {
  setAfterCloseFunction(null);
});
</script>
<template>
  <TransitionRoot appear :show="showDialog" as="template">
    <Dialog
      as="div"
      class="relative z-[999]"
      :initial-focus="closeButtonRef"
      @close="close"
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
        <div class="fixed inset-0 bg-black/75" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="z-[100] flex min-h-full items-center justify-center p-4 text-center"
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
              class="w-full max-w-md transform rounded-2xl bg-white dark:bg-dark-purple-19 p-6 text-left align-middle shadow-xl transition-all"
            >
              <div>
                <button
                  ref="closeButtonRef"
                  class="absolute top-4 right-4 p-0.5 rounded-full border border-gray-950 dark:border-slate-300"
                  @click="close"
                >
                  <XMarkIcon class="text-gray-900 dark:text-white w-5 h-5" />
                </button>
                <DialogTitle
                  as="h3"
                  class="w-full flex justify-center text-lg font-medium leading-6 text-green-500"
                >
                  Login To Continue
                </DialogTitle>
                <TheLogin />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
