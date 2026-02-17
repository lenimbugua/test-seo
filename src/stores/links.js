import { defineStore } from "pinia";

const links = [
  {
    path: "sports",
    name: "Sports",
    icon: "sport",
    iconCss: "h-5 w-5 text-[#56CB05] fill-current",
    css: "bg-[#56CB05]/15 text-[#56CB05]",
  },
  {
    path: "live",
    name: "Live",
    icon: "live",
    iconCss: "h-5 w-5 text-[#56CB05] fill-current",
  },
  {
    path: "aviator",
    name: "Aviator",
    icon: "aviator",
    iconCss: "h-5 w-5 text-[#56CB05] fill-current",
  },
  {
    path: "crash",
    name: "Crash",
    icon: "crash",
    iconCss: "h-5 w-5 text-[#56CB05] fill-current",
  },
  {
    path: "virtuals",
    name: "Virtuals",
    icon: "virtual",
    iconCss: "h-5 w-5 text-[#56CB05] fill-current",
  },
  //   {
  //     path: "share-bets",
  //     name: "Haki Buzz",
  //     icon: "buzz",
  //     iconCss: "h-5 w-5 text-[#56CB05] fill-current",
  //   },
  {
    path: "popular-games",
    name: "Popular",
    icon: "casino",
    iconCss: "h-5 w-5 text-[#56CB05] fill-current",
  },
  {
    path: "leaderboard",
    name: "Leaderboard",
    icon: "trophy",
    iconCss: "h-5 w-5 text-[#56CB05] fill-current",
    badge: "HOT",
  },
  {
    path: "countries",
    name: "Countries",
    icon: "flag",
    iconCss: "h-5 w-5 text-[#56CB05] fill-current",
  },
  {
    path: "promotions",
    name: "Promos",
    icon: "promotion",
    iconCss: "h-5 w-5 text-[#56CB05] fill-current",
  },
];

export const useLinksStore = defineStore("links-store", {
  state: () => ({
    links: links,
    selectedLink: links[0].path,
  }),

  actions: {
    isSelected(path) {
      this.selectedLink === path;
    },

    selectLink(params) {
      this.selectedLink = params;
    },
  },
});
