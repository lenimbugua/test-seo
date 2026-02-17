<script setup>
import { storeToRefs } from "pinia";
import { useInstantStore } from "@/stores/instant";
// import { useQueryParametersStore } from "../stores/query-parameters";

// const { competitionId } = storeToRefs(useQueryParametersStore());

const competitionId = 1;

const store = useInstantStore();
const { matches } = storeToRefs(store);

const formCustomId = (parent_match_id, sub_type_id, outcome_name, index) => {
  return `${parent_match_id}${sub_type_id}${outcome_name}${index}`;
};

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
</script>

<template>
  <div
    v-for="match in matches"
    :key="`${match.start_time}${match.end_time}${match.home_team}${match.away_team}`"
    class="w-full"
  >
    <RowColorWrapper>
      <div class="w-full flex-col justify-center items-center">
        <div
          :class="['text-primary-600', 'dark:text-primary-300/80']"
          class="flex justify-center items-center space-x-3 mb-2 text-sm flex-wrap w-full"
        >
          <div class="flex space-x-1 items-center">
            <ClubLogo
              :team-name="match.home_team"
              :is-home-team="true"
              :competition-id
              class="h-4 w-4"
            />
            <!-- <imga
              :src="formClubLogo(`${match.home_team}`, true, competitionId)"
              :alt="match.home_team"
              class="h-4 w-4"
            /> -->
            <span class="text-sm">{{ match.home_team }}</span>
          </div>
          <div class="">-</div>
          <div class="flex space-x-1 items-center">
            <ClubLogo
              :team-name="match.away_team"
              :is-home-team="false"
              :competition-id
              class="h-4 w-4"
            />
            <span class="text-sm">{{ match.away_team }}</span>
          </div>
        </div>
        <div
          v-if="checkForOutcomes(match, 0)"
          class="flex space-x-1 justify-center flex-wrap"
        >
          <InstantButton
            v-for="(outcome, index) in match.markets[0].outcomes"
            :key="outcome.sub_type_id"
            :outcome="outcome"
            :home-team="match.home_team"
            :away-team="match.away_team"
            :competition-id="match.competition_id"
            :parent-match-id="match.parent_match_id"
            :sub-type-id="match.markets[0].sub_type_id"
            :odd-type="match.markets[0].odd_type"
            :start-time="match.start_time"
            :season-id="match.season_id"
            :custom-id="
              formCustomId(
                match.parent_match_id,
                match.markets[0].sub_type_id,
                outcome.outcome_name,
                index
              )
            "
          />
        </div>
        <div
          v-if="checkForOutcomes(match, 1)"
          class="flex space-x-1 justify-center flex-wrap"
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
        </div>
      </div>
    </RowColorWrapper>
  </div>
</template>
