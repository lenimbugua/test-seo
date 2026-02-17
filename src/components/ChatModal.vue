<script setup>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";

import { storeToRefs } from "pinia";
import { useModalStore } from "@/stores/modal";
import { useModalTypes } from "@/composables/useModalTypes";
import { computed, ref } from "vue";

const { chat } = useModalTypes();

const { showModal, modalType } = storeToRefs(useModalStore());
const { closeModal } = useModalStore();
const closeButtonRef = ref(null); // Element to initially focus

const showBetslip = computed(() => {
  return modalType.value === chat && showModal.value;
});
</script>
<template>
  <TransitionRoot appear :show="showBetslip" as="template">
    <Dialog
      as="div"
      class="relative z-[200]"
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
      <div class="fixed z-[200] bottom-0 right-0 left-0 overflow-y-auto">
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
              class="w-full max-w-4xl bg-secondary-900 transform overflow-hidden rounded-lg text-left align-middle shadow-xl transition-all"
            >
              <div
                class="flex w-full justify-between bg-dark-purple-19 border-b-2 border-gray-900"
              >
                <div class="p-2 py-1">
                  <XMarkIcon
                    class="w-5 h-5 text-dark-purple-5 stroke-width-2 cursor-pointer"
                    @click="closeModal"
                  />
                </div>
                <DialogTitle
                  class="flex text-dark-purple-5 flex-grow items-center justify-center px-1 text-left uppercase text-sm font-bold border-x-2 border-gray-900"
                >
                  <slot name="title" />
                </DialogTitle>
                <button ref="closeButtonRef" class="p-2 py-1 outline-none">
                  <XMarkIcon
                    class="w-5 h-5 text-dark-purple-5 stroke-width-2 cursor-pointer"
                    @click="closeModal"
                  />
                </button>
              </div>
              <div class="bg-white h-[40rem]">
                <iframe
                  frameborder="0"
                  allowfullscreen=""
                  webkitallowfullscreen=""
                  mozallowfullscreen=""
                  class="w-full h-full z-[999]"
                  src="https://tawk.to/chat/67386bf82480f5b4f59eef63/1icq6bhh5"
                ></iframe>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
