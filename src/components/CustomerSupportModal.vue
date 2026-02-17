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

const { customerSupportModal } = useModalTypes();

const { showModal, modalType } = storeToRefs(useModalStore());

const showDialog = computed(() => {
  return modalType.value === customerSupportModal && showModal.value;
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
              <DialogPanel
                class="w-full max-w-md transform rounded-2xl bg-white dark:bg-dark-purple-19 text-left align-middle shadow-xl transition-all"
              >
                <div
                  class="flex w-full justify-between bg-white dark:bg-dark-purple-19 border-b border-gray-300 dark:border-gray-900 rounded-t-lg overflow-clip"
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
                    <div class="flex items-center space-x-0.5">Contact Us Now</div>
                  </DialogTitle>
                  <button ref="closeButtonRef" class="p-2 py-1 outline-none">
                    <XMarkIcon
                      class="w-5 h-5 dark:text-slate-300 text-gray-700 stroke-width-2 cursor-pointer"
                      @click="closeModal"
                    />
                  </button>
                </div>
                <div
                  class="bg-white dark:bg-[#251F32] overflow-hidden shadow-2xl w-full font-sans"
                >
                  <!-- Header with gradient background -->
                  <div
                    class="flex justify-center dark:bg-gradient-to-br from-[#241E34] to-[#3a2f4a] p-6 relative overflow-hidden"
                  >
                    <div
                      class="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-radial from-[#58CC03]/10 via-transparent to-transparent pointer-events-none"
                    ></div>

                    <div class="flex items-center gap-4 relative z-10">
                      <div
                        class="bg-[#FFB002]/20 rounded-2xl p-3 backdrop-blur-sm"
                      >
                        <svg
                          class="w-8 h-8 text-[#FFB002]"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 1.95.56 3.78 1.53 5.31L2 22l4.69-1.53C8.22 21.44 10.05 22 12 22c5.52 0 10-4.48 10-10z"
                            fill="currentColor"
                          />
                          <path
                            d="M8 12h8M8 8h8M8 16h5"
                            stroke="#241E34"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          />
                        </svg>
                      </div>
                      <div class="flex-1">
                        <h2
                          class="text-gray-950 dark:text-white text-xl font-bold tracking-tight mb-1"
                        >
                          Customer Support
                        </h2>
                        <p class="text-gray-600 dark:text-white/80 text-sm">
                          We're here to help you 24/7
                        </p>
                      </div>
                    </div>
                  </div>

                  <!-- Contact Options -->
                  <div class="p-6 space-y-4">
                    <!-- Primary Contact -->
                    <div
                      class="flex items-center gap-4 p-5 bg-gradient-to-r from-[#58CC03] to-[#4db002] text-white rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#58CC03]/30 relative overflow-hidden group"
                      @click="callNumber('+254711082816')"
                    >
                      <div
                        class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"
                      ></div>

                      <div class="bg-white/20 rounded-xl p-2.5 relative z-10">
                        <svg
                          class="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>

                      <div class="flex-1 min-w-0 relative z-10">
                        <div
                          class="text-xs font-semibold uppercase tracking-wider opacity-90 mb-0.5"
                        >
                          Primary Support Line
                        </div>
                        <div class="text-base font-bold tracking-tight mb-1">
                          +254 711 082 816
                        </div>
                        <div
                          class="flex items-center gap-1.5 text-xs font-medium"
                        >
                          <span
                            class="w-1.5 h-1.5 bg-red-500 rounded-full animate animate-ping"
                          ></span>
                          Available Now
                        </div>
                      </div>

                      <div
                        class="bg-white/20 rounded-lg p-2 transition-transform group-hover:scale-110 relative z-10"
                      >
                        <svg
                          class="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7 17L17 7M17 7H7M17 7V17"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    </div>

                    <!-- Secondary Contact -->
                    <div
                      class="flex items-center gap-4 p-5 bg-gray-50 text-[#241E34] rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 hover:shadow-lg border-2 border-transparent hover:border-[#FFB002]/30 relative overflow-hidden group"
                      @click="callNumber('+254205000832')"
                    >
                      <div
                        class="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFB002]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"
                      ></div>

                      <div
                        class="bg-[#58CC03]/10 rounded-xl p-2.5 relative z-10"
                      >
                        <svg
                          class="w-5 h-5 text-[#58CC03]"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>

                      <div class="flex-1 min-w-0 relative z-10">
                        <div
                          class="text-xs font-semibold uppercase tracking-wider text-[#241E34]/70 mb-0.5"
                        >
                          Alternative Line
                        </div>
                        <div class="text-base font-bold tracking-tight mb-1">
                          +254 205 000 832
                        </div>
                        <div
                          class="flex items-center text-[#241E34]/70 gap-1.5 text-xs font-medium"
                        >
                          <span
                            class="w-1.5 h-1.5 bg-green-500 rounded-full animate animate-ping"
                          ></span>
                          Available Now
                        </div>
                      </div>

                      <div
                        class="bg-[#58CC03]/10 rounded-lg p-2 transition-transform group-hover:scale-110 relative z-10"
                      >
                        <svg
                          class="w-4 h-4 text-[#58CC03]"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7 17L17 7M17 7H7M17 7V17"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <!-- Footer -->
                  <div class="bg-black/15 px-6 py-4 border-t border-white/5">
                    <div
                      class="flex items-center justify-center gap-2 text-xs text-gray-500 font-medium"
                    >
                      <svg
                        class="w-3.5 h-3.5 text-[#FFB002]"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="2"
                        />
                        <path
                          d="M12 16v-4M12 8h.01"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      Average response time: Under 30 seconds
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
<style scoped>
.bg-gradient-radial {
  background: radial-gradient(circle, var(--tw-gradient-stops));
}
</style>
