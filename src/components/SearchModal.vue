<script setup>
import { ref, watchEffect } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

import { storeToRefs } from "pinia";
import { useModalStore } from "@/stores/modal";
import { useModalTypes } from "@/composables/useModalTypes";
import { computed } from "vue";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/vue/24/outline";

import { useSearchStore } from "../stores/search";

import MatchesForSearch from "./MatchesForSearch.vue";


const { performSearch } = useSearchStore();

performSearch();

const { search } = useModalTypes();

const { showModal, modalType } = storeToRefs(useModalStore());
const { closeModal } = useModalStore();

const searchTerm = ref("");

const showSearch = computed(() => {
  return modalType.value === search && showModal.value;
});

const debounceTimeout = ref(null);
const debounceSearch = () => {
  clearTimeout(debounceTimeout.value);
  debounceTimeout.value = setTimeout(() => {
    if (searchTerm.value) {
      performSearch(searchTerm.value);
    }
  }, 500); // Adjust debounce delay as needed
};

watchEffect(() => {
  if (!searchTerm.value) {
    clearTimeout(debounceTimeout.value);
  }
});
</script>
<template>
  <TransitionRoot appear :show="showSearch" as="template">
    <Dialog as="div" class="relative" style="z-index: 65" @close="closeModal">
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
          class="flex min-h-[calc(100%-5rem)] sm:min-h-[calc(100%-3rem)] justify-center sm:p-4 text-center"
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
              class="w-full max-w-3xl transform overflow-hidden rounded-none sm:rounded-2xl bg-white dark:bg-[#241E34] p-0 sm:p-6 pt-8 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="sticky top-0 inset-0 text-lg font-medium leading-6 text-gray-900"
              >
                <div class="relative px-1 sm:px-0">
                  <XMarkIcon
                    class="w-5 h-5 sm:h-6 sm:w-6 absolute -top-5 right-0 dark:text-white cursor-pointer"
                    @click="closeModal"
                  />
                  <input
                    v-model="searchTerm"
                    type="search"
                    class="w-full py-2 z-50 bg-gray-200 pl-10 pr-3 mt-3 text-gray-900 rounded-md outline-none focus:ring-2 ring-gray-300"
                    placeholder="Search for matches, competitions, teams, countries..."
                    required
                    @keyup.esc="closeModal"
                    @input="debounceSearch(searchTerm)"
                  />
                  <div
                    class="absolute top-2.5 flex items-center justify-between p-3"
                  >
                    <MagnifyingGlassIcon class="w-5 h-5" />
                  </div>
                </div>
              </DialogTitle>
              <div v-if="searchTerm" class="mt-2">
                <MatchesForSearch />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
