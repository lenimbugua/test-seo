<script setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
} from "@headlessui/vue";
import { useDark } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { useModalStore } from "@/stores/modal";

const isDark = useDark();

const { showModal } = storeToRefs(useModalStore());
const { closeModal } = useModalStore();
</script>
<template>
  <TransitionRoot appear :show="showModal" as="template">
    <Dialog
      as="div"
      class="relative z-50"
      style="z-index: 1000"
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
        <div class="flex items-center justify-center py-16 text-center">
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
              class="w-full max-w-lg transform overflow-hidden rounded-2xl text-left align-middle shadow-xl transition-all"
              :class="isDark ? 'bg-[#241E34]' : 'bg-white'"
            >
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                @click="closeModal()"
              >
                <span class="text"><slot name="title"></slot></span>
                <i class="bi bi-x-lg"></i>
              </button>
              <slot></slot>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
