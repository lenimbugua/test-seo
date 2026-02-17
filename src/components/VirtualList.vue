<script setup>
import AnimatePulse from "./AnimatePulse.vue";
import TheMatch from "./TheMatch.vue";
import { useStoreSwitch } from "../composables/useStoreSwitch";
import DarkBorderDivider from "./DarkBorderDivider.vue";
import { useVirtualList, useInfiniteScroll } from "@vueuse/core";
import { useSportsQueryParamsStore } from "@/stores/sports-query-params";
import { storeToRefs } from "pinia";
const { switchStore } = useStoreSwitch();

const props = defineProps({
  store: { type: String, default: "matches" },
});

const currentStore = switchStore(props.store);

const { competitions, pending, competitionIsPending, chunkArray } = storeToRefs(
  currentStore()
);

const { competition } = storeToRefs(useSportsQueryParamsStore());
const { chunkArrayData } = currentStore();

function competitionIsLoading(competitionId) {
  return competitionIsPending.value && competition.value === competitionId;
}

const { list, containerProps, wrapperProps } = useVirtualList(chunkArray, {
  itemHeight: 96,
});

useInfiniteScroll(
  containerProps.ref,
  () => {
    chunkArrayData();
  },
  {
    distance: 5,
  }
);

function isOpened(index) {
  const competition = competitions.value[index];
  if (!competition) {
    return false;
  }

  if (competition["isOpened"]) {
    return competition.isOpened;
  }

  const matches = competition?.matches;

  if (!matches) {
    return false;
  }

  return matches.length > 0;
}
</script>
<template>
  <AnimatePulse v-if="pending" :rows="10" />
  <div class="h-[60rem]" v-bind="containerProps">
    <div v-bind="wrapperProps">
      <div v-if="competitions">
        <div
          v-for="(competition1, index) in list"
          :key="competition1.data.cbinomen"
        >
          <EventCategory
            :index
            :competition-name="competition1.data.competitionName"
            :country-name="competition1.data.countryName"
            :competition-id="competition1.data.competitionId"
            :is-opened="true"
            :match-count="competition1.data.matchCount"
            :store="currentStore"
          />
          <DarkBorderDivider v-if="!isOpened(index)" />

          <AnimatePulse
            v-if="competitionIsLoading(competition1.data.competitionId)"
            :rows="1"
          />
          <div v-else>
            <TheMatch :matches="competitions[index].matches" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
