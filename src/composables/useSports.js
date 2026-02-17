import { useCompetionsStore } from "@/stores/competitions";
import { useSportsQueryParamsStore } from "@/stores/sports-query-params";
import formatStuff from "@/utilities/format-stuff";
import { ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useMatches2Store } from "../stores/matches2";
import { useSportsStore } from "../stores/sports";

const { slugify } = formatStuff();

const soccer = "soccer";
const basketball = "basketball";
const tennis = "tennis";
const cricket = "cricket";
const rugby = "rugby";
const iceHockey = "iceHockey";
const tableTennis = "tableTennis";
const handball = "handball";
const volleyball = "volleyball";
const americanFootball = "americanFootball";
const boxing = "boxing";
const eSoccer = "esports";
const aussieRules = "aussieRules";
const futsal = "futsal";
const golf = "golf";
const hockey = "hockey";
const horseRacing = "horseRacing";
const snooker = "snooker";
const motorSport = "motorSport";
const badminton = "badminton";
const baseball = "baseball";
const cycling = "cycling";
const darts = "darts";

const games = ref([
  {
    iconCss: "text-white",
    class: "bg-green-500",
    name: "soccer",
    icon: soccer,
    id: 10,
    link: "/",
  },
  {
    class: "bg-blue-500",
    name: "eSports",
    id: 10915624,
    icon: eSoccer,
    link: "/",
  },
  //   {
  //     iconCss: "text-white",
  //     class: "bg-indigo-500",
  //     name: "eSports",
  //     icon: esports",
  //     id: 10915624,
  //     link: "/",
  //   },
  {
    iconCss: "text-[#56CB05]",
    class: "bg-fuchsia-700",
    name: "basketball",
    icon: basketball,
    id: 4,
    link: "/",
  },
  {
    class: "bg-blue-500",
    name: "tennis",
    id: 24,
    icon: tennis,
    link: "/",
  },
  {
    class: "bg-sky-900",
    name: "cricket",
    id: 6,
    icon: cricket,
    link: "/",
  },
  {
    class: "bg-amber-500",
    name: "rugby",
    icon: rugby,
    id: 73743,
    link: "/",
  },
  {
    class: "bg-[#2EC4B6]",
    name: "Ice Hockey",
    icon: iceHockey,
    id: 15,
    link: "/",
  },
  {
    class: "bg-[#56CB05]",
    name: "Table Tennis",
    id: 269467,
    icon: tableTennis,
    link: "/",
  },
  {
    class: "bg-[#FF6B6B]",
    name: "handball",
    id: 99614,
    icon: handball,
    link: "/",
  },
  {
    class: "bg-sky-500",
    name: "volleyball",
    id: 91189,
    icon: volleyball,
    link: "/",
  },
  {
    class: "bg-[#FFA500]",
    name: "American Football",
    id: 17,
    icon: americanFootball,
    link: "/",
  },
  {
    class: "bg-red-500",
    name: "Boxing",
    id: 5,
    icon: boxing,
    link: "/",
  },
  //   {
  //     class: "bg-white dark:bg-[#16131E]",
  //     name: "Waterpolo",
  //     icon: waterpolo",
  //     link: "/",
  //   },
  {
    class: "bg-red-400",
    name: "Aussie Rules",
    icon: aussieRules,
    id: 2,
    link: "/",
  },
  {
    class: "bg-purple-500",
    name: "Futsal",
    icon: futsal,
    id: 491393,
    link: "/",
  },
  {
    class: "bg-teal-400",
    name: "Golf",
    icon: golf,
    id: 12,
    link: "/",
  },
  {
    class: "bg-amber-400",
    name: "Hockey",
    icon: hockey,
    id: 208627,
    link: "/",
  },
  {
    class: "bg-orange-700",
    name: "Horse Racing",
    icon: horseRacing,
    id: 14,
    link: "/",
  },
  {
    class: "bg-violet-400",
    name: "Snooker",
    icon: snooker,
    id: 22,
    link: "/",
  },
  {
    class: "bg-violet-400",
    name: "Motor Sport",
    icon: motorSport,
    id: 16,
    link: "/",
  },
  {
    class: "bg-sky-500",
    name: "Badminton",
    icon: badminton,
    id: 271554,
    link: "/",
  },
  {
    class: "bg-yellow-500",
    name: "Baseball",
    icon: baseball,
    id: 3,
    link: "/",
  },
  {
    class: "bg-[#56CB05]",
    name: "Cycling",
    icon: cycling,
    id: 7,
    link: "/",
  },
  {
    class: "bg-red-500",
    name: "Darts",
    icon: darts,
    id: 8,
    link: "/",
  },
]);

export function useSports() {
  const router = useRouter();
  const { setSport, resetToDefaults, setResource } =
    useSportsQueryParamsStore();
  const { layout } = toRefs(useSportsQueryParamsStore());

  const { setSelectedSport } = useSportsStore();

  const { emptyMatches, getMatches, resetSelectedMarket, setSportIsPending } =
    useMatches2Store();
  const { fetchCompetions, selectCompetitions } = useCompetionsStore();

  const fetchCompetitions = () => {
    selectCompetitions([]);
    fetchCompetions();
  };
  async function fetchMatches(sportId, name, icon, goToSports) {
    emptyMatches();
    resetSelectedMarket();
    resetToDefaults();
    setSport(sportId);
    setSelectedSport(icon);

    const slugifiedName = slugify(name);

    if (goToSports) {
      router.push({ name: "sports", params: { sport: slugifiedName } });
    }

    if (layout.value === "grid") {
      fetchCompetitions();
      return;
    }

    if (sportId !== 10) {
      setResource("upcoming");
    }
    setSportIsPending(true);
    await getMatches();
    setSportIsPending(false);
  }
  return {
    soccer,
    basketball,
    tennis,
    cricket,
    rugby,
    iceHockey,
    tableTennis,
    handball,
    volleyball,
    americanFootball,
    boxing,
    eSoccer,
    aussieRules,
    futsal,
    golf,
    hockey,
    horseRacing,
    snooker,
    motorSport,
    badminton,
    baseball,
    cycling,
    darts,

    fetchMatches,
    games,
  };
}
