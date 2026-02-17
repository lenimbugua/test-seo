<script setup>
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";
import { useFormatDates } from "../composables/useFormatDates";

// import { useMatchesStore } from "../stores/matches";
import { useMatches2Store } from "../stores/matches2";
import { useSportsQueryParamsStore } from "../stores/sports-query-params";

import { useModalStore } from "@/stores/modal";

import { useModalTypes } from "@/composables/useModalTypes";
import { ref } from "vue";

const { calendar } = useModalTypes();

const { openModal } = useModalStore();

// const { fetchDayMatches } = useMatchesStore();
const { getMatches, emptyMatches, setCalendarIsPending } = useMatches2Store();
const { setDay, setResource } = useSportsQueryParamsStore();

const { generateNextFourDays } = useFormatDates();

const nextFourDays = generateNextFourDays();

const selectedDay = ref(nextFourDays[0]);

const isCalendar = ref(false);

function openCalendar() {
  isCalendar.value = true;
  openModal(calendar);
}
async function fetchMatchesByDate(date) {
  isCalendar.value = false;
  emptyMatches();
  setResource("");
  setDay(date);
  setCalendarIsPending(true);
  await getMatches();
  setCalendarIsPending(false);
}
</script>

<template>
  <div class="w-[3.4rem] flex items-center">
    <div
      class="w-full border rounded-md dark:border-dark-purple-16 dark:bg-white/5"
    >
      <Listbox v-model="selectedDay">
        <div class="w-full relative">
          <ListboxButton
            class="relative w-full pl-1 flex items-center justify-between space-x-2 cursor-default rounded-md text-center focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
          >
            <svg
              v-if="isCalendar"
              viewBox="0 0 448 512"
              class="fill-current dark:text-white text-black"
              height="18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M148 288h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12Zm108-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12Zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12Zm-96 96v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12Zm-96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12Zm192 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12Zm96-260v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48Zm-48 346V160H48v298c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6Z"
              ></path>
            </svg>
            <span
              v-else
              class="block py-1 dark:text-white text-gray-900 capitalize text-xs truncate"
              >{{ selectedDay.day }}</span
            >
            <span
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center"
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
              class="absolute mt-1 -right-1.5 max-h-60 w-28 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
            >
              <ListboxOption
                v-for="day in nextFourDays"
                v-slot="{ active, selected }"
                :key="day.date"
                :value="day"
                as="template"
                @click="fetchMatchesByDate(day.date)"
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
                      'block uppercase truncate',
                    ]"
                    >{{ day.day }}</span
                  >
                  <span
                    v-if="selected"
                    class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                  >
                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                  </span>
                </li>
              </ListboxOption>
              <div class="px-1 py-1">
                <div class="flex" @click="openCalendar()">
                  <button
                    :class="[
                      'group space-x-1  flex w-full text-gray-900 items-center justify-center rounded-md px-2 py-2 text-sm',
                    ]"
                  >
                    <svg
                      viewBox="0 0 448 512"
                      class="fill-current"
                      height="18"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M148 288h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12Zm108-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12Zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12Zm-96 96v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12Zm-96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12Zm192 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12Zm96-260v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48Zm-48 346V160H48v298c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6Z"
                      ></path>
                    </svg>
                    <div class="uppercase text-sm whitespace-nowrap">
                      Pick Date
                    </div>
                  </button>
                </div>
              </div>
            </ListboxOptions>
          </transition>
        </div>
      </Listbox>
    </div>
  </div>
</template>
