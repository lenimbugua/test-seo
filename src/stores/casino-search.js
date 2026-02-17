import { defineStore } from "pinia";

export const useCasinoSearchStore = defineStore("casino-search-store", {
  state: () => ({
    games: [],
  }),

  getters: {
    searchByName: (state) =>
      state.casinosGames.filter((game) =>
        game.gameName.toLowerCase().includes(state.searchTerm.toLowerCase())
      ),
  },

  actions: {
    setGames(games) {
      this.games = games;
    },
  },
});
