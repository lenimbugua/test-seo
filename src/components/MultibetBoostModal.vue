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
import { computed } from "vue";

import { useModalStore } from "@/stores/modal";

import { useModalTypes } from "@/composables/useModalTypes";
import MultibetBoostPromo from "./MultibetBoostPromo.vue";
import EarlyWinIcon from "./EarlyWinIcon.vue";
import EarlyPayoutBadge from "./EarlyPayoutBadge.vue";
import TwoUpIcon from "./TwoUpIcon.vue";

const { multibetBoostModal } = useModalTypes();

const { showModal, modalType } = storeToRefs(useModalStore());

const showDialog = computed(() => {
  return modalType.value === multibetBoostModal && showModal.value;
});
const { closeModal } = useModalStore();
</script>
<template>
  <TransitionRoot appear :show="showDialog" as="template">
    <Dialog
      as="div"
      style="z-index: 1000"
      class="relative z-50"
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
        <div class="fixed inset-0 bg-black/75" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="z-50 flex min-h-full items-center justify-center p-4 text-center"
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
              class="w-full max-w-md transform rounded-2xl bg-white dark:bg-dark-purple-19 text-left align-middle shadow-xl transition-all"
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
                  <div class="flex text-md font-bold text-amber-300">
                    <EarlyWinIcon />
                    <EarlyPayoutBadge />
                    <TwoUpIcon />
                  </div>
                </DialogTitle>
                <button ref="closeButtonRef" class="p-2 py-1 outline-none">
                  <XMarkIcon
                    class="w-5 h-5 dark:text-slate-300 text-gray-700 stroke-width-2 cursor-pointer"
                    @click="closeModal"
                  />
                </button>
              </div>
              <div class="max-h-[85vh] overflow-y-scroll scrollbar-hide">
                <MultibetBoostPromo />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
