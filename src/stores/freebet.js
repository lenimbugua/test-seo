import { defineStore } from "pinia";
import API from "../services/API";
import { FREEBET_AMOUNT } from "../composables/useDefinedConstants";

export const useFreebetStore = defineStore("freebet-store", {
  state: () => ({
    stake: FREEBET_AMOUNT,
    possibleWin: 0,
    totalOdds: 0,
    betslip: null,
    freebet: null,
    pending: false,
    responseOK: false,
    error: null,
    freeBetPayload: null,
  }),

  actions: {
    async fetchFreebet() {
      try {
        this.pending = true;

        this.error = null;
        this.responseOK = false;
        this.freebet = null;

        const response = await API().get("/sportsbook/api/v1/free-bet");
        this.pending = false;

        this.error = null;
        this.responseOK = true;
        this.freebet = response?.data?.data?.freeBet;
      } catch (err) {
        this.responseOK = false;
        this.error = err?.response?.data?.statusMessage;
        this.pending = false;
      }
    },

    calculatePossibleWin() {
      const stake = this.stake;
      let totalWin = stake * this.totalOdds - stake;
      if (totalWin < 0) {
        totalWin = 0;
      }

      const possibleWin = Math.round((totalWin + Number.EPSILON) * 100) / 100;
      this.possibleWin = possibleWin;
    },

    addAnItemToBetslip(payload) {
      //   const { addToCartDataLayer, removeFromCartDataLayer } =
      //   useBetslipDataLayer();

      if (payload.clickIsToSelectOutcome) {
        this.betslip = payload;
        this.freeBetPayload = {
          betAmount: this.stake,
          possibleWin: this.possibleWin,
          src: "bet",
          sportsbook: "sportsbook",
          profileSid: "",
          view: "home",
          userAgent: "",
          resource: "bet",
          totalOdds: parseFloat(payload.oddValue),
          slip: {
            live: payload.live,
            homeTeam: payload.homeTeam,
            awayTeam: payload.awayTeam,
            oddType: payload.oddType,
            startTime: payload.startTime,
            oddValue: payload.oddValue,
            outcomeId: payload.outcomeId,
            subTypeId: payload.subTypeId,
            specifiers: payload.specifiers,
            status: payload.status,
            sportId: payload.sportId,
            prevOddValue: payload.prevOddValue,
            outcomeName: payload.outcomeName,
            competitionId: payload.competitionId,
            parentMatchId: payload.parentMatchId,
            timestamp: payload.timestamp,
          },
        };

        this.totalOdds = parseFloat(payload.oddValue);

        // addToCartDataLayer(payload, betslip.length - 1);
      } else {
        this.betslip = null;
        this.payload = null;
        this.totalOdds = 0;
      }
      this.calculatePossibleWin();
    },

    clearFreebet() {
      this.betslip = null;
      this.freeBetPayload = null;
      this.totalOdds = 0;
    },
  },
});
