<script setup>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

import { ExclamationCircleIcon, XMarkIcon } from "@heroicons/vue/24/solid";

import { storeToRefs } from "pinia";
import { computed } from "vue";

import { useModalStore } from "@/stores/modal";

import { useModalTypes } from "@/composables/useModalTypes";

import { useDepositStore } from "@/stores/deposit";
import { useProfileStore } from "@/stores/profile";
import { useRouter } from "vue-router";

const router = useRouter();

const { balance } = storeToRefs(useProfileStore());
const { deposit } = storeToRefs(useDepositStore());
const { resetDeposit, performDeposit } = useDepositStore();

const { insufficientBalance } = useModalTypes();

const { showModal, modalType } = storeToRefs(useModalStore());

const showDialog = computed(() => {
  return modalType.value === insufficientBalance && showModal.value;
});
const { closeModal } = useModalStore();

function closeThisModal() {
  resetDeposit();
  closeModal();
}
</script>
<template>
  <TransitionRoot appear :show="showDialog" as="template">
    <Dialog
      as="div"
      style="z-index: 1000"
      class="relative z-50"
      @close="closeThisModal"
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
              class="w-full max-w-md transform rounded-2xl bg-white dark:bg-dark-purple-19 p-6 text-left align-middle shadow-xl transition-all"
            >
              <div>
                <div class="w-full flex justify-center">
                  <div
                    style="z-index: 999999"
                    class="p-1 absolute -top-10 bg-[#56CB05]/20 rounded-full"
                  >
                    <ExclamationCircleIcon
                      style="z-index: 100"
                      class="w-16 h-16 mx-auto text-red-500"
                    />
                  </div>
                </div>
                <div
                  class="absolute top-2 right-2 p-0.5 rounded-full border border-gray-950 dark:border-slate-400"
                  @click="closeThisModal"
                >
                  <XMarkIcon
                    class="text-gray-900 dark:text-slate-400 w-5 h-5"
                  />
                </div>
                <DialogTitle
                  as="h3"
                  class="w-full flex justify-center text-lg font-bold leading-6 text-gray-600 dark:text-slate-400 mt-3 mb-1.5"
                >
                  Insufficient Balance
                </DialogTitle>
              </div>
              <div class="w-full dark:bg-dark-purple-20 p-3 dark:text-gray-50">
                <div class="flex w-full">
                  <div
                    class="w-1/2 flex-col justify-center items-center space-y-50"
                  >
                    <div
                      class="w-full text-xs text-gray-600 dark:text-slate-400 flex justify-center items-center"
                    >
                      Available balance (KES)
                    </div>
                    <div
                      class="w-full flex justify-center items-center text-md sm:text-2xl"
                    >
                      <div>{{ balance }}</div>
                    </div>
                  </div>
                  <div
                    class="w-1/2 flex-col border-l dark:border-dark-purple-18 justify-center items-center"
                  >
                    <div
                      class="w-full text-xs flex justify-center text-gray-600 dark:text-slate-400 items-center"
                    >
                      Deposit needed (KES)
                    </div>
                    <div
                      class="w-full flex justify-center items-center text-md sm:text-2xl"
                    >
                      <div>{{ deposit }}</div>
                    </div>
                  </div>
                </div>
              </div>
              <DialogTitle
                as="h5"
                class="w-full flex justify-center text-lg font-bold leading-6 mt-3 mb-1.5"
              >
                <h5 class="font-bold text-gray-600 dark:text-slate-400">
                  Top up below to place your bets
                </h5>
              </DialogTitle>

              <div class="">
                <form
                  class="space-y-4 px-3 border border-gray-300 dark:border-white/10 shadow-lg rounded-lg p-3 bg-gray-100 dark:bg-black/15 max-w-4xl"
                  @submit.prevent="performDeposit(router)"
                >
                  <DepositInput />
                  <MakeDepositButton />
                </form>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
