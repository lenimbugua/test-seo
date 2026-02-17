<script setup>
import { useModalTypes } from "@/composables/useModalTypes";
import { useModalStore } from "@/stores/modal";
import { useShareBetStore } from "@/stores/sharebet";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { ShareIcon } from "@heroicons/vue/20/solid";
import { ClipboardDocumentIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import { useClipboard } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";

const { bookingCode, betslipLength, pending } = storeToRefs(useShareBetStore());
const { loadBetslip } = useShareBetStore();
const { copy, copied } = useClipboard({ source: bookingCode.value });

const { bookedBetPreview, shareBet, betslip } = useModalTypes();

const { showModal, modalType } = storeToRefs(useModalStore());
const { closeModal, openModal } = useModalStore();
const closeButtonRef = ref(null); // Element to initially focus

const showBookedBetsPreview = computed(() => {
  return modalType.value === bookedBetPreview && showModal.value;
});

async function shareYourBet() {
  openModal(shareBet);
}
function loadSlip() {
  loadBetslip();
  closeModal(shareBet);
  openModal(betslip);
}
</script>

<template>
  <TransitionRoot appear :show="showBookedBetsPreview" as="template">
    <Dialog
      as="div"
      class="relative z-[70]"
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
        <div class="fixed inset-0 bg-black/70" />
      </TransitionChild>
      <div class="fixed z-[99] bottom-0 right-0 left-0 overflow-y-auto">
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
              class="w-full max-w-lg bg-secondary-900 transform overflow-hidden rounded-lg text-left align-middle shadow-xl transition-all"
            >
              <div
                class="flex w-full justify-between bg-white dark:bg-dark-purple-19 border-b-2 border-gray-300 dark:border-gray-900"
              >
                <div class="p-2 py-1">
                  <XMarkIcon
                    class="w-5 h-5 dark:text-slate-300 text-gray-700 stroke-width-2 cursor-pointer"
                    @click="closeModal"
                  />
                </div>
                <DialogTitle
                  class="flex text-gray-600 dark:text-slate-400 flex-grow items-center justify-center px-1 text-left uppercase text-sm font-bold border-x-2 border-gray-300 dark:border-gray-900"
                >
                  Shared Betslip
                </DialogTitle>
                <button ref="closeButtonRef" class="p-2 py-1 outline-none">
                  <XMarkIcon
                    class="w-5 h-5 dark:text-slate-300 text-gray-700 stroke-width-2 cursor-pointer"
                    @click="closeModal"
                  />
                </button>
              </div>
              <div
                class="h-[calc(100vh-200px)] flex flex-col bg-gray-100 dark:bg-[#241E34] overflow-y-scroll scrollbar-hide"
              >
                <div
                  :class="['bg-neutral-50 dark:bg-dark-purple-23']"
                  class="border-y dark:border-none w-full dark:border-dark-purple-20 flex justify-between items-center py-1 px-2 sticky top-0 z-10"
                >
                  <div class="flex justify-between items-center space-x-2">
                    <div
                      :class="['bg-green-500', ' text-white dark:text-black']"
                      class="text-xs rounded-full h-6 w-6 font-extrabold flex justify-center items-center"
                    >
                      {{ betslipLength }}
                    </div>
                    <span class="text-xs font-bold dark:text-slate-400"
                      >Selections</span
                    >
                  </div>
                  <div
                    class="cursor-pointer flex justify-between items-center space-x-2"
                    @click="copy(bookingCode)"
                  >
                    <span
                      v-if="!copied"
                      class="text-xs font-bold dark:text-slate-400"
                      >Copy code</span
                    >

                    <div
                      class="cursor-pointer flex items-center text-xs font-black text-[#56CB05] p-1 bg-gray-300 dark:bg-white/10 rounded-md"
                    >
                      <div v-if="!copied" class="space-x-1 flex items-center">
                        <span>{{ bookingCode }}</span>
                        <ClipboardDocumentIcon
                          class="w-4 h-4 mr-0.5 stroke-width-4"
                        />
                      </div>
                      <div v-else>Copied !</div>
                    </div>
                  </div>
                </div>
                <div
                  class="bg-white max-h-90 overflow-y-scroll flex-grow dark:bg-black/30 rounded-lg py-2 space-y-2"
                >
                  <TheButtonSpin v-if="pending" />
                  <BookedBetDetails v-else />
                </div>
                <ExampleBet />
              </div>
              <div
                class="p-2 px-6 flex bg-white dark:bg-[#191525] space-x-2 sticky bottom-0 shadow-md w-full"
              >
                <button
                  class="flex rounded-md flex-shrink bg-[#1C7928] hover:bg-[#1C7928]/90 text-gray-50 uppercase tracking-wide font-extrabold text-sm justify-center items-center rounded-0 shadow p-2"
                  @click="shareYourBet"
                >
                  <ShareIcon class="h-7 w-8" />
                </button>
                <button
                  class="flex rounded-md flex-grow bg-[#1C7928] hover:bg-[#1C7928]/90 text-gray-50 uppercase tracking-wide font-extrabold text-sm justify-center items-center rounded-0 shadow px-2"
                  @click="loadSlip"
                >
                  Load
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
