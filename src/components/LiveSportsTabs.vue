<script setup>
import { useScrollToSelected } from "@/composables/useScrollToSelectedSport";
import formatStuff from "@/utilities/format-stuff";
import { Tab, TabGroup, TabList } from "@headlessui/vue";
import { toRefs } from "vue";
import { useRouter } from "vue-router";
import { useLiveMatchesStore } from "../stores/live-matches";
import { useLiveSportsNavigationStore } from "../stores/live-sports-navigation";
import { useNewLiveStore } from "../stores/new-live";

const router = useRouter();

const { slugify } = formatStuff();

const { sports } = toRefs(useLiveMatchesStore());

const { selectedSportId } = toRefs(useLiveSportsNavigationStore());
const { setSelectedSportId } = useLiveSportsNavigationStore();
const { elementRefs: sportRefs } = useScrollToSelected(selectedSportId);

const { setSport, setSelectedSport, getLiveMatches, resetSortBy } =
  useNewLiveStore();

const getMatches = async (sport) => {
  setSelectedSportId(sport.sportId);
  setSelectedSport(sport);
  setSport(sport.sportId);
  resetSortBy();

  const sportName = slugify(sport.sportName);
  router.push({ name: "live", params: { sport: sportName } });
  await getLiveMatches();
};
const isSelected = (id) => {
  return selectedSportId.value == id;
};
</script>
<template>
  <div
    class="flex items-center border dark:border-white/10 w-full overflow-scroll scrollbar-hide rounded-xl shadow dark:shadow-2xl"
  >
    <div class="flex items-center">
      <div
        class="italic p-1 font-bold text-lg pr-2 text-red-500 sticky left-0 border-r dark:border-white/10 bg-white dark:bg-[#241E34]"
      >
        Live
      </div>
      <TabGroup>
        <TabList class="flex justify-between">
          <Tab
            v-for="sport in sports"
            :key="sport.sportName"
            as="template"
            @click="getMatches(sport)"
          >
            <div
              :ref="(el) => (sportRefs[sport.sportId] = el)"
              :class="[
                'cursor-pointer rounded-md  flex flex-col items-center px-2 text-sm whitespace-nowrap capitalize text-center font-medium',
                ' focus:outline-none',
                isSelected(sport.sportId)
                  ? 'text-[#56CB05] font-semibold'
                  : 'dark:text-gray-100/90 text-gray-800',
              ]"
            >
              {{ sport.sportName }}
              <div
                class="w-2/3"
                :class="[
                  isSelected(sport.sportId)
                    ? 'border-b-2 border-[#56CB05]'
                    : '',
                ]"
              ></div>
            </div>
          </Tab>
        </TabList>
      </TabGroup>
    </div>
  </div>
</template>
