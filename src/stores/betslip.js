import { defineStore } from "pinia";

export const useBetslipStore = defineStore("betslip-store", {
  state: () => ({
    showBetslip: false,
  }),

  actions: {
    openBetslip() {
      this.showBetslip = true;
    },
    closeBetslip() {
      this.showBetslip = false;
    },
  },
});
