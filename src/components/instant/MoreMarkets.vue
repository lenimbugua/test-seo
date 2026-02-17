<script setup>
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";
import { useInstantStore } from "@/stores/instant";
import { computed } from "vue";
import { storeToRefs } from "pinia";

const { markets } = storeToRefs(useInstantStore());

const restOfTheMarkets = computed(() => {
  return markets.value.slice(2);
});

const selectedMarket = restOfTheMarkets.value[0];

const { fetchInstantMatches, setSelectedMarket } = useInstantStore();

async function fetchMatches(market) {
  setSelectedMarket(market);
  const url = `&market_id=${market.market_id}&skip=1`;
  await fetchInstantMatches(url);
}
</script>
<template>
  <div class="">
    <Listbox v-model="selectedMarket">
      <div class="mt-1">
        <ListboxButton
          class="relative w-full cursor-default rounded-lg pl-3 pr-4 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
        >
          <span class="block text-xs truncate text-black dark:text-white">{{
            selectedMarket.market_name
          }}</span>
          <span
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-0.5"
          >
            <ChevronUpDownIcon
              class="h-4 w-4 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute right-0 sm:right-52 max-w-sm mt-1 scrollbar-hide max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-for="market in restOfTheMarkets"
              v-slot="{ active, selected }"
              :key="market.market_id"
              :value="market"
              as="template"
              @click="fetchMatches(market)"
            >
              <li
                :class="[
                  active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                  'relative cursor-default select-none py-2 pl-10 pr-4',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]"
                  >{{ market.market_name }}</span
                >
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>
