<script setup>
import { useInstantStore } from "@/stores/instant";
import { storeToRefs } from "pinia";
// import { useQueryParametersStore } from "../stores/query-parameters";
import InstantButton from "./InstantButton.vue";

// const { competitionId } = storeToRefs(useQueryParametersStore());
const competitionId = 1;

const store = useInstantStore();
const { matches, pending } = storeToRefs(store);

const checkForOutcomes = (match, index) => {
  if (!match) {
    return false;
  } else if (
    !match?.markets ||
    !match?.markets[index] ||
    !match?.markets[index]?.outcomes
  )
    return false;
  else return true;
};

const formCustomId = (
  outcome,
  match_id,
  homeTeam,
  awayTeam,
  competitionId,
  index
) => {
  return `${match_id}${homeTeam}${awayTeam}${competitionId}${index}`;
};
</script>

<template>
  <AnimatePulse v-if="pending" :rows="10" />

  <div v-else>
    <div
      v-if="matches && matches.length > 0"
      :class="['text-black', 'dark:text-white']"
      class="flex-col h-full py-3 overflow-y-scroll leading-none w-full text-sm font-medium"
    >
      <div
        v-for="match in matches"
        :key="`${match.awayteam}${match.hometeam}`"
        class="w-full px-4 py-2 border-b dark:border-dark-purple-18"
      >
        <div class="flex w-full justify-between">
          <div class="flex-col items-center justify-between">
            <div class="flex items-center">
              <ClubLogo
                :team-name="match.home_team"
                :is-home-team="true"
                :competition-id
                class="h-4 w-4"
              />
              <span class="text-sm font-bold capitalize">{{
                match.home_team
              }}</span>
            </div>
            <!-- <span class="px-3">V</span> -->
            <div class="flex items-center">
              <ClubLogo
                :team-name="match.home_team"
                :is-home-team="true"
                :competition-id
                class="h-4 w-4"
              />
              <span class="text-xs font-bold capitalize">{{
                match.away_team
              }}</span>
              <ClubLogo
                :team-name="match.away_team"
                :is-home-team="false"
                :competition-id
                class="h-4 w-4"
              />
            </div>
          </div>
          <div class="flex justify-end">
            <div
              v-if="checkForOutcomes(match, 0)"
              class="flex w-full space-x-1"
            >
              <InstantButton
                v-for="(outcome, index) in match.markets[0].outcomes"
                :key="outcome.outcome_id"
                :outcome="outcome"
                :home-team="match.home_team"
                :away-team="match.away_team"
                :e-block-id="match.eBlockId"
                :competition-id="match.competition_id"
                :match-id="match.match_id"
                :market-id="match.markets[0].market_id"
                :market-name="match.markets[0].market_name"
                :custom-id="
                  formCustomId(
                    outcome,
                    match.match_id,
                    match.home_team,
                    match.away_team,
                    match.competition_id,
                    index
                  )
                "
              />
            </div>
            <!-- <div
                    v-if="checkForOutcomes(match, 1)"
                    class="hidden lg:flex space-x-1"
                  >
                    <InstantButton
                      v-for="(outcome, index) in match.markets[1].outcomes"
                      :key="outcome.sub_type_id"
                      :outcome="outcome"
                      :home-team="match.home_team"
                      :away-team="match.away_team"
                      :competition-id="match.competition_id"
                      :parent-match-id="match.parent_match_id"
                      :sub-type-id="match.markets[1].sub_type_id"
                      :odd-type="match.markets[1].odd_type"
                      :start-time="match.start_time"
                      :season-id="match.season_id"
                      :custom-id="
                        formCustomId(
                          match.parent_match_id,
                          match.markets[1].sub_type_id,
                          outcome.outcome_name,
                          index
                        )
                      "
                    />
                  </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
