import { defineStore } from "pinia";
import { authBaseURL } from "../services/API";
import API from "../services/API";

export const useOtpStore = defineStore("otp-store", {
  state: () => ({
    pending: false,
    responseOK: false,
    msisdn: false,
  }),

  actions: {
    async getOtp(mobile) {
      const body = {
        msisdn: mobile,
      };

      try {
        this.pending = true;
        this.responseOK = false;
        await API(authBaseURL).post("/auth/api/v1/generate/otp", body);
        this.pending = false;
        this.responseOK = true;
      } catch (error) {
        this.pending = false;
      }
    },
  },
});
