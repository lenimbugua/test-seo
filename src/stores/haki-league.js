import { defineStore, storeToRefs } from "pinia";
import { useScreenSizes } from "../composables/useScreenSizes";
import API, { virtualBaseURL } from "../services/API";
import { useCasinoStore } from "./casino";
import { useLoginStore } from "./login";

export const useHakiLeagueStore = defineStore("haki-league-store", {
  state: () => ({
    pending: false,
    responseOK: false,
    launchUrl: null,
  }),

  actions: {
    async getLaunchDetail() {
      const { isMediumScreen, isLargeScreen } = useScreenSizes();

      const isMobile = isMediumScreen.value || isLargeScreen.value ? "0" : "1";

      const { profileSid } = storeToRefs(useLoginStore());
      const profileId = profileSid.value ? profileSid.value : "";

      const { isDemo } = storeToRefs(useCasinoStore());

      const demo = isDemo.value;

      try {
        this.pending = true;
        this.responseOK = false;
        const response = await API(virtualBaseURL).get(
          `api/v1/virtuals/launch?profileSid=${profileId}&isMobile=${isMobile}&isDemo=${demo}`
        );
        this.launchUrl = response.data.launchUrl;
        this.pending = false;
        this.responseOK = true;
      } catch (error) {
        this.pending = false;
      }
    },
  },
});
