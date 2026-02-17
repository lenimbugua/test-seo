<script setup>
import { useDefaultSport } from "@/composables/useDefaultSport";
import { useMatches2Store } from "@/stores/matches2";
import { useSportsQueryParamsStore } from "@/stores/sports-query-params";
import formatStuff from "@/utilities/format-stuff";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/vue";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useTopLeaguesStore } from "../stores/top-leagues";

const { slugify } = formatStuff();

const { setResource, setCompetition } = useSportsQueryParamsStore();
const { initDefaultSport } = useDefaultSport();

const router = useRouter();

const { getMatches } = useMatches2Store();

const { topLeagues } = storeToRefs(useTopLeaguesStore());

const categories = ref(["Top Leagues"]);
function fetchGame(competition) {
  initDefaultSport();
  setCompetition(competition.competitionId);
  setResource("");
  getMatches();
  router.push({
    name: "country",
    params: {
      sport: "soccer",
      country: slugify(competition.countryName),
      league: slugify(competition.competitionName),
    },
  });
  //   router.push({ name: "country", params: { country: countryName } });
}
</script>
<template>
  <div
    :class="['bg-white dark:bg-[#221C31]']"
    class="rounded-md overflow-hidden border dark:border-white/5"
  >
    <TabGroup>
      <TabList class="flex justify-start rounded-t-md dark:bg-[#1b1627]">
        <Tab
          v-for="category in categories"
          :key="category"
          v-slot="{ selected }"
          as="template"
        >
          <div
            :class="[
              'w-full cursor-pointer py-2 px-4 text-md  font-semibold flex items-center  gap-1.5',
              'focus:outline-none',
              selected
                ? 'dark:bg-[#1b1627] bg-gray-200 text-gray-950 dark:text-gray-200 shadow'
                : 'dark:text-gray-400/80 text-gray-950/80 hover:bg-white/[0.12]',
            ]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 26 26"
              class="text-green-600 h-4 w-4"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M13 25c6.627 0 12-5.373 12-12S19.627 1 13 1 1 6.373 1 13s5.373 12 12 12"
              />
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M14.632 8.768h-3.264c-.504 0-.968.272-1.224.704l-1.632 2.824c-.256.44-.256.976 0 1.408l1.632 2.824c.256.44.72.704 1.224.704h3.264c.504 0 .968-.272 1.224-.704l1.632-2.824c.256-.44.256-.976 0-1.408l-1.632-2.824a1.41 1.41 0 0 0-1.224-.704M11.424 3.12 9.392 6.648h-4.08M20.688 6.648h-4.08L14.576 3.12M14.576 22.88l2.032-3.528h4.08M5.312 19.352h4.08l2.032 3.528M3.744 16.528l1.624-2.824c.248-.44.248-.976 0-1.408L3.744 9.472M22.256 16.528l-1.624-2.824a1.43 1.43 0 0 1 0-1.408l1.624-2.824"
              />
            </svg>
            {{ category }}
          </div>
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <div class="flex flex-col p-2 space-y-2 font-medium">
            <div
              v-for="league in topLeagues"
              :key="league"
              class="cursor-pointer"
              @click="fetchGame(league)"
            >
              <div
                :class="['text-gray-800 dark:text-slate-300']"
                class="flex text-xs justify-between items-center"
              >
                {{ league.competitionName }}
                <ArrowRightSolid class="h-5 w-5" />
              </div>
            </div>
          </div>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>
