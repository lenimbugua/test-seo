import { defineStore } from "pinia";
import { useModalTypes } from "@/composables/useModalTypes";
import { useModalStore } from "@/stores/modal";
import { useProfileStore } from "@/stores/profile";
import { instantBaseURL } from "../services/API";
import { useInstantStore } from "@/stores/instant";
import { storeToRefs } from "pinia";

import API from "../services/API";
import { useLoginStore } from "./login";
export const useInstantBetslipStore = defineStore({
  id: "instant-betslip",
  state: () => ({
    stake: 50,
    betslip: [],
    totalOdds: 0,
    pending: false,
    possibleWin: 0,
    responseOK: false,
  }),

  getters: {
    betslipLength: (state) => state.betslip.length,
  },

  actions: {
    calculatePossibleWin() {
      // place odds in one array
      const oddsInBetslip = this.betslip.map((item) => {
        return Number.parseFloat(item.odd_value);
      });

      // calculate the total
      let totalOdds = 0;
      if (oddsInBetslip.length !== 0) {
        totalOdds = oddsInBetslip.reduce((accumulator, currentValue) => {
          return accumulator * currentValue;
        });
      }

      // round odds to 2 decimals
      totalOdds = Math.round((totalOdds + Number.EPSILON) * 100) / 100;

      this.totalOdds = totalOdds;
      if (this.totalOdds !== null) {
        const odds = this.totalOdds;
        const stake = this.stake;
        const totalWin = stake * odds;
        const possibleWin = Math.round((totalWin + Number.EPSILON) * 100) / 100;
        this.possibleWin = possibleWin;
      }
    },

    // betslip
    addAnItemToBetslip(payload) {
      let betslip = this.betslip;
      // Here click was to select an outcome. Add the selected outcome to betslip
      if (payload.clickIsToSelectOutcome) {
        // First, remove sibling if any from the betslip
        betslip = betslip.filter((item) => {
          return item.match_id !== payload.match_id;
        });
        // add currently selected sibling
        betslip.push(payload);
      } else {
        // Here click was to deselect an outcome.
        // Remove item from betslip.
        betslip = betslip.filter((item) => {
          return item.customId !== payload.customId;
        });
        if (!betslip.length) {
          this.showSmallBetslip = false;
          this.showBottomBetslip = false;
          this.betslip = [];
        }
      }
      // mutate the betslip
      this.betslip = betslip;
      this.calculatePossibleWin();
    },

    deleteAnItemFromBetslip(customId) {
      let betslip = this.betslip;
      betslip = betslip.filter((item) => {
        return item.customId !== customId;
      });
      // hide all betslips when betslip becomes empty by reseting back to default
      if (!betslip.length) {
        this.showSmallBetslip = false;
        this.showBottomBetslip = false;
        this.betslip = [];
      }
      // mutate the betslip
      this.betslip = betslip;
      this.calculatePossibleWin();
    },

    setStake(payload) {
      this.stake = payload;
      this.calculatePossibleWin();
    },

    clearBetslip() {
      // clear everything from betslip and reset to back default state
      this.betslip = [];
      this.showBottomBetslip = false;
      this.showSmallBetslip = false;
      this.betslip = [];
      this.calculatePossibleWin();
    },

    removeDeactivatedMatches() {
      let betslip = this.betslip;
      betslip = betslip.filter((item) => {
        return item.status == 1;
      });
      this.betslip = betslip;
      this.calculatePossibleWin();
    },

    generateStringFromBetData(betData) {
      const result = betData
        .map((bet) => {
          return `${bet.match_id}#${bet.outcome_id}`;
        })
        .join("#");

      return `#${result}#${this.stake}`;
    },

    async placeBet() {
      const { token, profileSid } = storeToRefs(useLoginStore());

      const slip = [];
      this.betslip.forEach((item) => {
        slip.push({
          bet_slip_id: "2285588",
          outcome_id: item.outcome_id,
          outcome_name: item.outcome_name,
          competition_id: item.competition_id,
          match_id: item.match_id,
          odd_value: item.odd_value,
          bet_id: "1023988",
          market_id: item.market_id,
          eBlockId: item.eBlockId,
          homeTeam: item.home_team,
          awayTeam: item.away_team,
          status: item.status,
        });
      });

      const { getProfileInfo } = useProfileStore();

      const payload1 = {
        total_games: this.betslip.length,
        bet_reference: 17439,
        total_odd: this.totalOdds,
        bet_amount: this.stake,
        bet_id: "1023988",
        ticket_id: 17439,
        possible_win: this.possibleWin,
        created_by: "MOBILESPA",
        profile_id: "1",
        attribution: "SPA",
        bet_message: this.generateStringFromBetData(slip),
        status: 1,
        slip,
      };

      try {
        this.pending = true;
        this.responseOK = false;
        const response = await API(instantBaseURL).post(
          "/sportbook/v1/bet",
          payload1,
          {
            headers: {
              Authorization: `Bearer ${token.value}`,
              "X-PROFILE-SID": profileSid.value,
            },
          }
        );
        this.pending = false;

        if (response?.data?.status === "error") {
          if (response?.data?.data) {
            this.betslip = this.mergeArrays(response.data.data);
            this.calculatePossibleWin();
            return;
          }
          if (response?.data?.message == "Exceeds maximum debit amount.") {
            this.betPlaceError = "Sorry, maximum stake is KSH.10,000";
            const { openModal } = useModalStore();

            const { betPlaceStatus } = useModalTypes();

            openModal(betPlaceStatus);
            return;
          }
          if (
            response?.data?.message == "Amount is below minimum debit amount."
          ) {
            this.betPlaceError = "Sorry, minimum stake is KSH.10";
            const { openModal } = useModalStore();

            const { betPlaceStatus } = useModalTypes();

            openModal(betPlaceStatus);
            return;
          }
          if (
            response?.data?.message ===
            "Insufficient balance. Kindly topup your account"
          ) {
            this.betPlaceError = `Sorry, you do not have sufficient balance to stake KSH.${this.stake}. Please top up your account.`;
            const { openModal } = useModalStore();

            const { betPlaceStatus } = useModalTypes();

            openModal(betPlaceStatus);
            return;
          }
          return;
        }
        this.responseOK = true;

        const { openModal } = useModalStore();

        const { betPlaceStatus } = useModalTypes();
        const { addToKickOffs } = useInstantStore();

        addToKickOffs(this.createUniqueCompetitionEBlockArray(slip));

        openModal(betPlaceStatus);
        this.clearBetslip();

        this.setBetPlaceMessage();
        await getProfileInfo();
      } catch (error) {
        this.pending = false;

        
        if (error.status == 401) {
            const { openLoginModal } = useLoginStore();
            openLoginModal(this.placeBet);
            return;
        }
        
        this.clearBetslip();
        const { openModal } = useModalStore();

        const { betPlaceStatus } = useModalTypes();

        openModal(betPlaceStatus);
      }
    },

    convertSlipData() {
      return {
        src: "verify",
        userAgent: "safari",
        slip: this.betslip.map((item) => ({
          parentMatchId: item.parentMatchId,
          oddValue: item.oddValue,
          outcomeId: item.outcomeId,
          outcomeName: item.outcomeName,
          subTypeId: item.subTypeId,
          specifiers: item.specifiers || "", // Add empty string if specifiers is not present
        })),
      };
    },

    mergeArrays(secondArray) {
      return this.betslip.map((item) => {
        const secondItem = secondArray.find(
          (s) => s.parentMatchId == item.parentMatchId
        );

        if (secondItem) {
          return {
            ...item,
            oddValue: secondItem.oddValue,
            prevOddValue: secondItem.prevOddValue,
            status: secondItem.status,
            deviation: secondItem.deviation,
          };
        }
        return item;
      });
    },

    setBetPlaceMessage() {
      this.showBetPlaceMessage = true;
      this.betMessage = "Bet placed successfully";
      setTimeout(() => {
        this.betMessage = null;
        this.showBetPlaceMessage = false;
      }, 4000);
    },

    createUniqueCompetitionEBlockArray(betData) {
      const uniqueObjects = [];
      const seenObjects = new Set();

      betData.forEach((bet) => {
        const objectKey = `${bet.competition_id}-${bet.eBlockId}`;

        if (!seenObjects.has(objectKey)) {
          uniqueObjects.push({
            competition_id: bet.competition_id,
            eBlockId: bet.eBlockId,
          });
          seenObjects.add(objectKey);
        }
      });
      return uniqueObjects;
    },
  },
  persist: true,
});
