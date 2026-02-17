<script setup>
import { useFormatDates } from "@/composables/useFormatDates";
// import { useHead } from "@unhead/vue";
import { storeToRefs } from "pinia";
import { onBeforeUnmount } from "vue";
import FreebetButton from "../components/freebet/FreebetButton.vue";
import FreebetSignup from "../components/freebet/FreebetSignup.vue";
import FreebetContent from "../components/FreebetContent.vue";
import { useFreebetStore } from "../stores/freebet";
import AuthTopBar from "./AuthTopBar.vue";

// const title =
//   "HakiBets: Welcome to the World of Free Bets! Deposit Bonus, Aviator rains, Earn upto 300k weekly on affiliate and more";

// const description = `Exclusive Welcome Bonus!
// New Hakibets users can claim a share of KES 10,000,000. with bonuses up to KES 1,000.
// Enjoy a premium gaming experience with multiple high-quality crash games.
// Register today and start winning.`;

// // Inside setup()
// useHead({
//   title: title,
//   meta: [
//     { property: "og:title", content: title },
//     {
//       property: "og:description",
//       content: description,
//     },
//     // {
//     //   property: "og:image",
//     //   content: "https://yourdomain.com/path-to-your-image.jpg",
//     // },
//     // { property: "og:url", content: "https://yourdomain.com/affiliate-link" },
//     // { property: "og:type", content: "website" },

//     // Twitter Card (optional)
//     { name: "twitter:card", content: title },
//     { name: "twitter:title", content: title },
//     {
//       name: "twitter:description",
//       content: description,
//     },
//     // {
//     //   name: "twitter:image",
//     //   content: "https://yourdomain.com/path-to-your-image.jpg",
//     // },
//   ],
// });

const { humanFriendlyDate } = useFormatDates();
const { fetchFreebet, clearFreebet } = useFreebetStore();
const { freebet, stake, possibleWin, pending } = storeToRefs(useFreebetStore());
const formCustomId = (parent_match_id, sub_type_id, outcome_name, index) => {
  return `${parent_match_id}${sub_type_id}${outcome_name}${index}`;
};

fetchFreebet();

onBeforeUnmount(() => {
  clearFreebet();
});
</script>

<template>
  <div
    class="bg-white dark:bg-[#241E34] relative w-full overflow-y-scroll sm:px-0"
  >
    <AuthTopBar />
    <!-- Content -->

    <div class="flex space-x-2 justify-center px-2 md:px-0 py-2 mb-3">
      <div class="max-w-2xl flex">
        <div class="text-green-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-gift h-6 w-6 sm:h-8 sm:w-8 md:w-12 md:h-12"
          >
            <rect x="3" y="8" width="18" height="4" rx="1"></rect>
            <path d="M12 8v13"></path>
            <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"></path>
            <path
              d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"
            ></path>
          </svg>
        </div>
        <div>
          <div class="flex space-x-2">
            <h1
              class="w-full text-center flex space-x-2 text-sm sm:text-md md:text-xl items-center text-gray-600 dark:text-gray-300 font-bold"
            >
              <span>Congratulations you have a </span>
              <span class="text-green-500">Free Bet!</span>
            </h1>
          </div>
          <span
            class="text-sm sm:text-md md:text-xl font-bold text-[#56CB05] w-full text-center"
            >Register now</span
          >
          <span
            class="text-sm sm:text-md md:text-xl text-gray-600 dark:text-gray-300"
          >
            to claim this and more bonuses.</span
          >
        </div>
      </div>
    </div>
    <div class="w-full flex justify-center">
      <div
        class="w-full max-w-2xl rounded-lg border-2 border-white/5 p-2 shadow-2xl bg-gray-200 dark:bg-black/20"
      >
        <div class="max-w-lg mx-auto">
          <div
            v-if="freebet"
            class="flex py-2 justify-between items-center space-x-3 mt-3 text-slate-600 dark:text-slate-300"
          >
            <div class="w-24">{{ freebet.homeTeam }}</div>
            <div class="flex justify-center">
              <div>
                <div class="text-center">vs</div>
                <div class="text-xs">
                  {{ humanFriendlyDate(freebet.startTime) }}
                </div>
              </div>
            </div>
            <div class="w-24">{{ freebet.awayTeam }}</div>
          </div>
          <AnimatePulse v-if="pending" :rows="1" />
          <div v-if="freebet" class="w-full mx-auto">
            <div class="flex justify-center w-full space-x-3">
              <FreebetButton
                v-for="outcome in freebet.markets[0].matchOutcomes"
                :key="outcome.id"
                :outcome="outcome"
                :season-id="freebet.homeTeam"
                :home-team="freebet.homeTeam"
                :sport-id="freebet.sportId"
                :custom-id="
                  formCustomId(
                    freebet.parentMatchId,
                    outcome.marketId,
                    outcome.outcomeName,
                    outcome.outcomeId
                  )
                "
                :away-team="freebet.awayTeam"
                :start-time="freebet.startTime"
                :competition-id="freebet.competitionId"
                :sub-type-id="parseInt(outcome.marketId)"
                :competition-name="freebet.competitionName"
                :country-name="freebet.countryName"
                :sport-name="freebet.sportName"
                :parent-match-id="freebet.parentMatchId"
              />
            </div>
          </div>
          <div
            class="bg-white dark:bg-purple-900/20 p-2 rounded text-center justify-center mt-6 flex space-x-4 shadow"
          >
            <div class="space-x-1">
              <span class="text-gray-600 dark:text-gray-400">Stake </span>
              <span class="font-bold text-green-600">{{ stake }} KES</span>
            </div>
            <div class="space-x-2">
              <span class="text-gray-600 font-bold">PAYOUT</span
              ><span class="font-bold text-green-600"
                >{{ possibleWin }} KES</span
              >
            </div>
          </div>
        </div>
        <div class="py-6">
          <FreebetSignup />
        </div>
      </div>
    </div>
    <FreebetContent />
    <!-- <div class="bg-[#250D37]">
      <div class="p-3 pb-4 text-left max-w-2xl mx-auto text-slate-300">
        <p>
          Are you ready to elevate your betting experience? Hakibets, one of
          Kenya’s leading betting platforms, offers an incredible opportunity
          for both new and existing users to enjoy free bets. This guide will
          walk you through how to take advantage of these offers and enhance
          your gaming experience.
        </p>
        <h3 class="text-xl font-bold py-2">What are Free Bets?</h3>
        Free bets are promotional offers that allow you to place a bet without
        risking your own money. If your bet wins, you get to keep the winnings,
        but if it loses, you won’t lose anything from your own pocket. It’s a
        fantastic way to explore different betting options and strategies
        without any financial risk.
        <h3 class="text-xl font-bold py-2">
          How to Claim Free Bets on Hakibets
        </h3>
        <div class="space-y-3">
          <p>
            <span class="font-bold">1.</span> Sign Up: If you’re new to
            Hakibets, the first step is to create an account. Visit the Hakibets
            website or download the app, fill in your details, and complete the
            registration process.
          </p>
          <p>
            <span class="font-bold">2.</span> Verify Your Account: After signing
            up, you may need to verify your account through an email or SMS
            confirmation. This step ensures the security of your account.
          </p>
          <p>
            <span class="font-bold">3.</span> Make Your First Deposit: To
            qualify for free bet offers, you often need to make an initial
            deposit. Check the current promotions to see the minimum deposit
            required.
          </p>
          <p>
            <span class="font-bold">4.</span> Check for Promotions: Hakibets
            regularly offers free bet promotions. Look for banners or
            notifications about current offers. You can also check the
            promotions page on the website or app.
          </p>
          <p>
            <span class="font-bold">5.</span> Place Your Bets: Once you have
            claimed your free bet, you can start placing bets on your favourite
            sports or events. Make sure to read the terms and conditions
            associated with the free bets to understand any limitations.
          </p>
        </div>
        <h3 class="text-xl font-bold py-2">Tips for Using Free Bets</h3>
        <div class="space-y-3">
          <p>
            <span class="font-bold">-</span> Explore Different Markets: Use your
            free bets to try out different sports or betting markets that you
            may not usually bet on.
          </p>
          <p>
            <span class="font-bold">-</span> Stay Informed: Follow sports news
            and updates to make informed decisions on your bets.
          </p>
          <p>
            <span class="font-bold">-</span> Bet Responsibly: Always remember to
            bet within your means. Free bets are a fun way to engage with
            sports, but it’s important to gamble responsibly.
          </p>
        </div>
        <h3 class="text-xl font-bold py-2">Why Choose Hakibets?</h3>
        <div class="space-y-3">
          <p>
            Hakibets stands out in the Kenyan betting market for several
            reasons:
          </p>
          <p>
            <span class="font-bold">- </span>User-Friendly Interface: The
            platform is designed for easy navigation, making it simple for both
            beginners and experienced bettors to place their bets.
          </p>
          <p>
            <span class="font-bold">- </span>Wide Range of Sports: Hakibets
            offers a variety of sports to bet on, including football,
            basketball, rugby, and more.
          </p>
          <p>
            <span class="font-bold">- </span>Secure Transactions: Your safety is
            a priority. Hakibets ensures secure payment methods for deposits and
            withdrawals.
          </p>
          <p class="pt-3">
            Free bets are an excellent way to enhance your betting experience on
            Hakibets. By following the steps outlined above, you can easily
            claim and use your free bets to explore new betting opportunities.
            Remember to check the promotions regularly to make the most of what
            Hakibets has to offer. Happy betting!
          </p>
        </div>
      </div>
    </div> -->
  </div>

  <MobileFooter />
  <Footer />
</template>
