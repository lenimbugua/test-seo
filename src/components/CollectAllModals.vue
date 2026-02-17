<script setup>
import BookedBetPreviewModal from "@/components/community-bets/BookedBetPreviewModal.vue";
import ShareBetModal from "@/components/community-bets/ShareBetModal.vue";
import { useModalTypes } from "@/composables/useModalTypes";
import { useModalStore } from "@/stores/modal";
import { storeToRefs } from "pinia";
import BetslipModal from "./BetslipModal.vue";
import CalendarModal from "./CalendarModal.vue";
import CashoutModal from "./cashout/CashoutModal.vue";
import ChangeEventModal from "./ChangeEventModal.vue";
import CustomerSupportModal from "./CustomerSupportModal.vue";
import GeniusGameTrackerModal from "./GeniusGameTrackerModal.vue";
import InsufficientBalanceModal from "./InsufficientBalanceModal.vue";
import LoaderModal from "./LoaderModal.vue";
import LoginModal from "./LoginModal.vue";
import MultibetBoostModal from "./MultibetBoostModal.vue";
import OneCutModal from "./OneCutModal.vue";
import TwoUpModal from "./TwoUpModal.vue";
import InviteFriendModal from "../views/festive/InviteFriendModal.vue";
// import DepositPop from "./DepositPop.vue";
const { modalType } = storeToRefs(useModalStore());
const { getModalTitle, betslip, instantBetslip } = useModalTypes();
</script>
<template>
  <!-- sport betslip -->
  <BetslipModal class="z-[999] max-h-32 max-w-28 h-full bottom-32 absolute">
    <template #title>
      {{ getModalTitle(modalType) }}
    </template>
    <div class="max-h-[85vh] overflow-y-scroll scrollbar-hide">
      <SportsBetslip v-if="modalType === betslip" />
      <InstantBetslip v-if="modalType === instantBetslip" />
    </div>
  </BetslipModal>
  <!-- End sport betslip -->

  <TheDrawer />
  <BetPlaceStatusDialogue />
  <InstantWinDialogue />
  <SearchModal />
  <CalendarModal />
  <LoginModal />
  <CasinoUnauthModal />
  <DepositModal />
  <ChatModal />

  <ShareBetModal />

  <!-- book bet preview modal -->
  <BookedBetPreviewModal
    class="z-50 max-h-32 max-w-28 h-full bottom-32 absolute"
  >
  </BookedBetPreviewModal>
  <!-- End sbook bet preview modal -->

  <!-- Cancel bet modal -->
  <ConfirmModal>
    <CancelBet />
  </ConfirmModal>
  <!-- End Cancel bet modal -->

  <!-- Insufficient balance modal -->
  <InsufficientBalanceModal> </InsufficientBalanceModal>
  <!-- End Insufficient balance modal -->

  <!-- Notification modal -->
  <!-- <NotificationModal>
   <DepositPop/>
  </NotificationModal> -->
  <!-- End Notification modal -->

  <CashoutModal />
  <RoadBlockModal />
  <LoaderModal />
  <SportsIconsModal />
  <ChangeEventModal />
  <SocialconsModal />
  <CustomerSupportModal />
  <GeniusGameTrackerModal />

  <OneCutModal class="z-[999] max-h-32 max-w-28 h-full bottom-32 absolute">
  </OneCutModal>
  <!-- <OneCutModal /> -->
  <TwoUpModal
    class="z-[999] max-h-32 max-w-28 h-full bottom-32 absolute"
  ></TwoUpModal>

  <MultibetBoostModal
    class="z-[999] max-h-32 max-w-28 h-full bottom-32 absolute"
  ></MultibetBoostModal>
  <InviteFriendModal/>
</template>
