import { defineStore } from "pinia";
import API, { cmsBaseURL } from "../services/API";

export const useBannersStore = defineStore("banners-store", {
  state: () => ({
    pending: false,
    banners: [],
    errors: null,
  }),

  actions: {
    async fetchBanners() {
      try {
        this.error = null;
        this.responseOK = false;
        this.pending = true;
        const response = await API(cmsBaseURL).get("/site/banners/list");
        this.banners = response.data;
        this.responseOK = true;
      } catch (err) {
        console.log(err);
        this.responseOK = false;
      } finally {
        this.pending = false;
      }
    },
  },
  persist: true,
});
