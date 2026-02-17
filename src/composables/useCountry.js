import { useDefaultSport } from "@/composables/useDefaultSport";
import { useCountriesStore } from "@/stores/countries";
import { useMatches2Store } from "@/stores/matches2";
import { useSportsQueryParamsStore } from "@/stores/sports-query-params";
import formatStuff from "@/utilities/format-stuff";

const { slugify } = formatStuff();
export function useCountry() {
  const { setCountry } = useSportsQueryParamsStore();

  function openCountry(country) {
    setCountry(country);
  }

  function goToCountry(competition, router) {
    const { setResource, setCompetition } = useSportsQueryParamsStore();
    const { getMatches } = useMatches2Store();
    const { initDefaultSport } = useDefaultSport();
    const { selectCountry } = useCountriesStore();

    initDefaultSport();
    selectCountry(competition.competitionName);
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
    // router.push({ name: "country", params: { country: competitionName } });
  }

  return {
    goToCountry,
    openCountry,
  };
}
