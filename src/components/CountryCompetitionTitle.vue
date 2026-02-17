<script setup>
import { toRefs } from "vue";
import { useModalTypes } from "@/composables/useModalTypes";
import { useModalStore } from "@/stores/modal";
import { ChevronRightIcon } from "@heroicons/vue/24/outline";
import { useCountriesStore } from "../stores/countries";
import { useMatchesStore } from "../stores/matches";

const { matchDetailIsLive } = toRefs(useMatchesStore());

const { selectCountry, setSelectedCompetition, selectSport } =
  useCountriesStore();

const { ChangeEventModal } = useModalTypes();
const { openModal } = useModalStore();

const props = defineProps({
  country: {
    type: String,
    required: true,
  },

  competition: {
    type: String,
    required: true,
  },
  sportId: {
    type: String,
    required: true,
  },
});

const changeEvent = (country, competition) => {
  selectCountry(country);
  selectSport(props.sportId);
  setSelectedCompetition(competition);
  openModal(ChangeEventModal);
};
</script>
<template>
  <div
    class="flex text-gray-600  px-4 text-xs justify-between items-center"
  >
    <div class="flex items-center gap-2">
      <!-- <div class="font-bold capitalize">back</div> -->
      <div class="font-black capitalize text-green-800 dark:text-green-500">
        {{ competition }}
      </div>
    </div>
    <div
      v-if="!matchDetailIsLive"
      class="shadow-2xl flex items-center cursor-pointer bg-green-500 rounded-full px-2 p-1.5 text-[#1B1627]"
      @click="changeEvent(country, competition)"
    >
      <span class="text-md font-semibold">Change Event</span>
      <ChevronRightIcon class="h- 5 w-5" />
    </div>
  </div>
</template>
