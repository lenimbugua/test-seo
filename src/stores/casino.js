import { defineStore, storeToRefs } from "pinia";
import API, { casinoBaseURL } from "../services/API";
import { useLoginStore } from "./login";

import { useScreenSizes } from "../composables/useScreenSizes";

import { useCasino } from "@/composables/useCasino";

const { initialCategories, providers, categories, getGames, meta } =
  useCasino();

export const useCasinoStore = defineStore("casino-store", {
  state: () => ({
    error: null,
    pending: false,
    categoryIsPending: false,
    responseOK: false,

    casinosGames: [],

    casinoCategories: categories,
    initialCategories: initialCategories,
    providers: providers,

    categoriesWithGames: [],
    categoriesLoading: false,

    activeCategoryGames: [],
    activeCategoryLoading: false,

    selectedCategory: null,

    launchData: null,
    gameIdToLaunch: null,

    meta: meta,
    isDemo: 0,

    searchTerm: "",
  }),

  getters: {
    searchByName: (state) =>
      state.casinosGames.filter((game) =>
        game.gameName.toLowerCase().includes(state.searchTerm.toLowerCase())
      ),
  },

  actions: {
    setSearchTerm(term) {
      this.searchTerm = term;
    },
    async getAllCasinos() {
      if (this.selectedCategory.cat_binomen) {
        this.casinosGames = getGames(this.selectedCategory.cat_binomen);
        return;
      }
      if (this.selectedCategory.p_binomen) {
        this.casinosGames = getGames(this.selectedCategory.p_binomen);
        return;
      }
    },

    async getCategories() {
      try {
        this.error = null;
        this.responseOK = false;
        const response = await API(casinoBaseURL).get(
          "/api/v1/games/categories"
        );
        this.casinoCategories = response.data.data.categories;
        this.responseOK = true;
      } catch (err) {
        console.log(err);
        this.responseOK = false;
        // this.error = err.response.data.statusMessage;
        this.pending = false;
      }
    },

    async fetchCategoriesWithGames() {
      try {
        this.categoriesLoading = true;
        const response = await API(casinoBaseURL).get(
          "/api/v1/categories/with-games"
        );
        this.categoriesWithGames = response.data.data;
      } catch (err) {
        console.log(err);
      } finally {
        this.categoriesLoading = false;
      }
    },

    async fetchGamesByCategory(id) {
      let endPoint = "/api/v1/games";
      if (id) {
        endPoint = `/api/v1/games/${id}`;
      }
      try {
        this.error = null;
        this.responseOK = false;
        const response = await API(casinoBaseURL).get(endPoint);
        this.casinosGames = response.data;
        this.responseOK = true;
      } catch (err) {
        this.responseOK = false;
        this.error = err.response.data.statusMessage;
        this.pending = false;
      }
    },

    async fetchActiveCategoryGames(categoryId) {
      try {
        this.activeCategoryLoading = true;
        this.activeCategoryGames = [];
        const response = await API(casinoBaseURL).get(
          `/api/v1/games/${categoryId}`
        );
        this.activeCategoryGames = response.data.data ?? response.data;
      } catch (err) {
        console.log(err);
        this.activeCategoryGames = [];
      } finally {
        this.activeCategoryLoading = false;
      }
    },

    async launchGame() {
      const { isMediumScreen, isLargeScreen } = useScreenSizes();
      const isMobile = isMediumScreen.value || isLargeScreen.value ? "0" : "1";
      try {
        this.error = null;
        this.responseOK = false;
        this.pending = true;
        const { profileSid } = storeToRefs(useLoginStore());
        const profileId = profileSid.value ? profileSid.value : "";
        const response = await API(casinoBaseURL).get(
          `/api/v1/games/launch?gameId=${this.gameIdToLaunch}&profileSid=${profileId}&isMobile=${isMobile}&isDemo=${this.isDemo}`
        );
        this.pending = false;
        this.launchData = response.data;
        this.responseOK = true;
      } catch (err) {
        this.responseOK = false;
        this.pending = false;
        this.error = err.response.data.statusMessage;
      }
    },

    setLaunchGameId(gameId) {
      this.gameIdToLaunch = gameId;
    },

    setSelectedCategory(category) {
      this.selectedCategory = category;
    },
    setCategoryIsPending(isPending) {
      this.categoryIsPending = isPending;
    },
    setPending(isPending) {
      this.pending = isPending;
    },
    setIsDemo(isDemo) {
      this.isDemo = isDemo;
    },
  },
  persist: {
    pick: ["launchData"],
  },
});
