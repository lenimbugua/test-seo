export function useSportsIcons() {
  const sportIcons = {
    allsports: "🌍",
    soccer: "⚽",
    basketball: "🏀",
    tennis: "🎾",
    cricket: "🏏",
    rugby: "🏉",
    iceHockey: "🏒",
    tableTennis: "🏓",
    handball: "🤾",
    americanFootball: "🏈",
    boxing: "🥊",
    volleyball: "🏐",
    waterpolo: "🤽",
    esports: "🎮",
    futsal: "⚽",
    aussieRules: "🏉",
    golf: "⛳",
    hockey: "🏑",
    badminton: "🏸",
  };

  function toCamelCase(str = "") {
    if (!str) {
        return ""
    }
    return str
      .replace(/[^a-zA-Z0-9]+/g, " ")
      .trim()
      .toLowerCase()
      .split(" ")
      .map((word, i) =>
        i === 0 ? word : word[0].toUpperCase() + word.slice(1)
      )
      .join("");
  }

  function getSportsIcon(sport) {
    // console.log(sport);
    // console.log(toCamelCase(sport));
    return sportIcons[toCamelCase(sport)];
  }

  return {
    getSportsIcon,
    sportIcons,
  };
}
