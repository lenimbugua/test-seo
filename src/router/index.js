import { useHead } from "@unhead/vue";
import { storeToRefs } from "pinia";

import { createRouter, createWebHistory } from "vue-router";

import { useModalTypes } from "../composables/useModalTypes.js";
import { useOrganizationSchema } from "../composables/useOrganizationSchema.js";
import { useLoginStore } from "../stores/login.js";
import { useModalStore } from "../stores/modal.js";
import { useUtmStore } from "../stores/utm.js";

import ForgotPassword from "../components/ForgotPassword.vue";
import VerifyAccount from "../components/VerifyAccount.vue";
import InstantIndex from "../components/instant/InstantIndex.vue";
import InstantLive from "../components/instant/InstantLive.vue";
import ProfileIndex from "../components/profile/ProfileIndex.vue";
import BetDetails from "../views/BetDetails.vue";
import CasinoGame from "../views/CasinoGame.vue";
import ChangePassword from "../views/ChangePassword.vue";
import CountryView from "../views/CountryView.vue";
import CrashIndex from "../views/CrashIndex.vue";
// import CrashIndex2 from "../views/CrashIndex2.vue";
import DepositFunds from "../views/DepositFunds.vue";
import JoinAffiliate from "../views/JoinAffiliate.vue";
import LeaguesView from "../views/LeaguesView.vue";
import LoginView from "../views/LoginView.vue";
import PrivacyPolicy from "../views/PrivacyPolicy.vue";
import ResetPassword from "../views/ResetPassword.vue";
import ResponsibleGambling from "../views/ResponsibleGambling.vue";
import SortDeposit from "../views/SortDeposit.vue";
import TermsAndConditions from "../views/TermsAndConditions.vue";
import TheAuth from "../views/TheAuth.vue";
import TheAviator from "../views/TheAviator.vue";
import TheBets from "../views/TheBets.vue";
import TheCasino from "../views/TheCasino.vue";
import FreeBet from "../views/TheFreebet.vue";
import TheLanding from "../views/TheLanding.vue";
// import TheLive from "../views/TheLive.vue";
import TheNewGames from "../views/TheNewGames.vue";
import ThePromotions from "../views/ThePromotions.vue";
import TheSignup from "../views/TheRegister.vue";
// import TheSports from "../views/TheSports.vue";
import VirtualsIndex from "../views/VirtualsIndex.vue";
// import VirtualsIndex2 from "../views/VirtualsIndex2.vue";
import WithSibarAndBetslip from "../views/WithSibarAndBetslip.vue";
import WithdrawFunds from "../views/WithdrawFunds.vue";

import ShareAnIdea from "../components/ShareAnIdea.vue";
import BookedBets from "../views/BookedBets.vue";
import HakiLeague from "../views/HakiLeague.vue";
import KironLiteIndex from "../views/KironLiteIndex.vue";
import PromotionDetails from "../views/PromotionDetails.vue";
// import PromotionDetails from "@/components/promos/PromotionDetails.vue";
import BetPlacedSuccessfully from "../views/BetPlacedSuccessfully.vue";
import MatchDetails from "../views/MatchDetails.vue";
import NewLive from "../views/NewLive3.vue";
// import CasinoGames from "../views/CasinoGames.vue";
import AllGames from "../components/AllGames.vue";
import CasinoLayout from "../views/CasinoLayout.vue";
import CrashGames from "../views/CrashGames.vue";
import SelfExclusion from "../views/SelfExclusion.vue";
import SportView from "../views/SportView.vue";

// import NewLeague from "../views/NewLeague.vue";
import CasinoHome from "../views/CasinoHome.vue";
import LeaderBoard from "../views/LeaderBoard.vue";
import NotFound from "../views/NotFound.vue";
import WelcomePromotions from "../views/welcome/WelcomePromotions.vue";
// import LeaderBoard2 from "../views/LeaderBoard2.vue";
// import TheVirtual from "../views/TheVirtual.vue";
export const routes = [
  {
    path: "/",
    name: "home",
    component: TheLanding,
    meta: {
      title: "Best online sports betting in Kenya– Hakibets",
      description:
        "Experience the best online sports betting and casino games with Hakibets. Fast payouts, live odds, and instant deposits.",
      requiresAuth: false,
    },
  },
  //   {
  //     path: "/home",
  //     name: "home-page",
  //     component: HomePage,
  //     meta: {
  //       title: "Hakibets Kenya | Official Sports Betting & Casino Platform",
  //       description:
  //         "Bet on football, basketball, and casino games at Hakibets Kenya. Instant M-Pesa payments, great odds, and fun live betting.",
  //       requiresAuth: false,
  //     },
  //   },
  {
    path: "/leagues",
    name: "leagues",
    component: LeaguesView,
    meta: {
      title: "Football Leagues & Fixtures | Hakibets Sportsbook",
      description:
        "Browse upcoming football leagues and fixtures. Bet pre-match or live on your favorite teams at Hakibets Kenya.",
      requiresAuth: false,
    },
  },
  {
    path: "/sports/live/:sport",
    name: "live",
    component: NewLive,
    meta: {
      title: "Live Betting – Real-Time Odds & Matches | Hakibets",
      description:
        "Follow live games and place in-play bets with dynamic odds. Experience real-time sports betting excitement on Hakibets.",
      requiresAuth: false,
    },
  },
  //   {
  //     path: "/new-live",
  //     name: "live-two",
  //     component: NewLive,
  //     meta: {
  //       title: "Live Betting – Real-Time Odds & Matches | Hakibets",
  //       description:
  //         "Follow live games and place in-play bets with dynamic odds. Experience real-time sports betting excitement on Hakibets.",
  //       requiresAuth: false,
  //     },
  //   },
  {
    path: "/sports/:sport",
    name: "sports",
    component: SportView,
    meta: {
      title: "Bet on :sport – Live Odds & Results | Hakibets Kenya",
      description:
        "Bet live and pre-match on :sport events with top odds and instant payouts. Hakibets delivers Kenya’s best sports betting experience.",
      requiresAuth: false,
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfileIndex,
    meta: {
      title: "My Profile – Account, Bets & Settings | Hakibets",
      description:
        "Manage your Hakibets account, update details, track bets, and control preferences securely from your profile.",
      requiresAuth: true,
    },
  },
  {
    path: "/promotions",
    name: "promotions",
    component: ThePromotions,
    meta: {
      title: "Hakibets Promotions – Free Bets, Cashbacks & Bonuses",
      description:
        "Discover exciting Hakibets offers including free bets, cashback, and deposit bonuses. Claim rewards every week.",
      requiresAuth: false,
    },
  },
  {
    path: "/promotion-details/:name",
    name: "promotion-details",
    component: PromotionDetails,
    meta: {
      title: "Promotion Details – Exclusive Offers | Hakibets",
      description:
        "View full details of Hakibets promotions and learn how to qualify for bonuses, free bets, and jackpots.",
      requiresAuth: false,
    },
  },
  {
    path: "/aviator",
    name: "aviator",
    component: TheAviator,
    meta: {
      title: "Play Aviator – Crash Game with Real Winnings | Hakibets",
      description:
        "Soar high with the Aviator crash game! Cash out before the plane flies away and win real money instantly.",
      requiresAuth: false,
    },
  },
  {
    path: "/",
    component: TheAuth,
    children: [
      {
        path: "signup",
        name: "signup",
        component: TheSignup,
        meta: {
          title: "Register on Hakibets – Create Account & Start Betting",
          description:
            "Sign up with Hakibets and enjoy Kenya’s leading sports betting and casino experience. Quick, secure registration.",
          requiresAuth: false,
        },
      },
      {
        path: "login",
        name: "login",
        component: LoginView,
        meta: {
          title: "Login to Hakibets | Access Your Account",
          description:
            "Log in to your Hakibets account to continue betting, view your balance, and enjoy personalized promotions.",
          requiresAuth: false,
        },
      },
      {
        path: "forgot-password",
        name: "forgot-password",
        component: ForgotPassword,
        meta: {
          title: "Forgot Password | Hakibets Account Recovery",
          description:
            "Reset your Hakibets password easily and regain secure access to your betting account in minutes.",
          requiresAuth: false,
        },
      },
      {
        path: "reset-password",
        name: "reset-password",
        component: ResetPassword,
        meta: {
          title: "Reset Password | Hakibets Secure Login",
          description:
            "Create a new password and restore your Hakibets access quickly with our secure reset process.",
          requiresAuth: false,
        },
      },
      {
        path: "change-password",
        name: "change-password",
        component: ChangePassword,
        meta: {
          title: "Change Password | Hakibets Security Settings",
          description:
            "Update your password for better account security. Protect your funds and data on Hakibets Kenya.",
          requiresAuth: false,
        },
      },
      {
        path: "verify-account",
        name: "verify-account",
        component: VerifyAccount,
        meta: {
          title: "Verify Account | Hakibets Kenya",
          description:
            "Complete your Hakibets verification to enable withdrawals, bonuses, and secure transactions.",
          requiresAuth: false,
        },
      },
    ],
  },
  {
    path: "/sports/soccer/countries",
    name: "countries",
    component: LeaguesView,
    meta: {
      title: "All Sports Countries | Hakibets",
      description:
        "Explore betting markets by country. Bet on leagues and matches across Kenya, Europe, and worldwide.",
      requiresAuth: false,
    },
  },
  {
    path: "/",
    component: WithSibarAndBetslip,
    children: [
      {
        path: "/sports/:sport/:country/:league",
        name: "country",
        component: CountryView,
        meta: {
          title: ":country Sports Betting – Leagues & Fixtures | Hakibets",
          description:
            "Bet on :country leagues and matches with top odds and live stats only on Hakibets.",
          requiresAuth: false,
        },
      },
      {
        path: "my-bets",
        name: "my-bets",
        component: TheBets,
        meta: {
          title: "My Bets | Hakibets History & Results",
          description:
            "Track your bet history, view results, and manage open wagers securely on Hakibets Kenya.",
          requiresAuth: true,
        },
      },
      {
        path: "bet-details",
        name: "bet-details",
        component: BetDetails,
        meta: {
          title: "Bet Details | Hakibets Slip Info",
          description:
            "View full bet slip details, odds, and results instantly from your Hakibets account.",
          requiresAuth: true,
        },
      },
      {
        path: "/sports/:sport/:country/:league/:matchSlug(.*)-:id",
        name: "match-details",
        component: MatchDetails,
        meta: {
          title: "Match Details – Live Stats & Betting Markets | Hakibets",
          description:
            "Get in-depth stats, lineups, and odds for live matches. Bet instantly and follow your team on Hakibets.",
          requiresAuth: false,
        },
      },
      {
        path: "/leaderboard",
        name: "leaderboard",
        component: LeaderBoard,
        meta: {
          title: "Leaderboard | Top Bettors & Rankings | Hakibets",
          description:
            "See the top bettors and rankings on Hakibets. Compete with other players and climb the leaderboard.",
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: "/join-affiliate",
    name: "join-affiliate",
    component: JoinAffiliate,
    meta: {
      title: "Affiliate Program | Earn with Hakibets",
      description:
        "Join the Hakibets Affiliate Program and earn commission promoting Kenya’s leading sports betting platform.",
      requiresAuth: true,
    },
  },
  {
    path: "/deposit",
    name: "deposit",
    component: DepositFunds,
    meta: {
      title: "Deposit Funds | Instant M-Pesa Payments | Hakibets",
      description:
        "Deposit instantly via M-Pesa and start betting today. Secure, fast, and reliable deposits at Hakibets.",
      requiresAuth: true,
    },
  },
  {
    path: "/sort-deposit",
    name: "sort-deposit",
    component: SortDeposit,
    meta: {
      title: "Sort Deposit | Hakibets Payment Help",
      description:
        "Resolve deposit delays and confirm your transaction manually with our fast deposit sorting tool.",
      requiresAuth: false,
    },
  },
  {
    path: "/withdraw",
    name: "withdraw",
    component: WithdrawFunds,
    meta: {
      title: "Withdraw Winnings | Instant M-Pesa Cashouts | Hakibets",
      description:
        "Withdraw your Hakibets winnings instantly to M-Pesa. Quick, secure, and hassle-free payouts anytime.",
      requiresAuth: true,
    },
  },

  {
    path: "/casino-home",
    name: "casino-home",
    component: CasinoHome,
    meta: {
      title: "Casino | Play 500+ Games Online | Hakibets",
      description:
        "Explore the best online casino games on Hakibets. Slots, live casino, crash games, table games & more from top providers. Play now and win big!",
      requiresAuth: false,
    },
  },
  {
    path: "/",
    component: CrashIndex,
    children: [
      {
        path: "crash",
        name: "crash",
        component: CrashGames,
        meta: {
          title: "Crash Game | Multiply Your Winnings | Hakibets",
          description:
            "Bet, watch the multiplier rise, and cash out before it crashes! The ultimate thrill game on Hakibets.",
          requiresAuth: false,
        },
      },
      {
        path: "casino",
        name: "casino",
        component: AllGames,
        meta: {
          title: "Online Casino | Play Top Casino Games on Hakibets",
          description:
            "Play the best online casino games on Hakibets. Explore slots, live casino, and top-rated games with fast payouts and seamless gameplay.",
          requiresAuth: false,
        },
      },
    ],
  },

  {
    path: "/casino",
    component: CasinoLayout,
    children: [
      {
        path: "popular-games",
        name: "popular-games",
        component: TheCasino,
        meta: {
          title: "Popular Casino Games | Slots, Roulette & Aviator | Hakibets",
          description:
            "Play trending casino games like Aviator, slots, and roulette. Win big instantly on Hakibets Casino.",
          requiresAuth: false,
        },
      },
      {
        path: "new-games",
        name: "new-games",
        component: TheNewGames,
        meta: {
          title: "New Casino Games | Latest Releases on Hakibets",
          description:
            "Try the newest online casino games on Hakibets. Discover fun titles, exciting gameplay, and real winnings.",
          requiresAuth: false,
        },
      },
    ],
  },
  //   {
  //     path: "/popular",
  //     name: "casino",
  //     component: TheCasino,
  //     meta: {
  //       title: "Popular Casino Games | Slots, Roulette & Aviator | Hakibets",
  //       description:
  //         "Play trending casino games like Aviator, slots, and roulette. Win big instantly on Hakibets Casino.",
  //       requiresAuth: false,
  //     },
  //   },
  //   {
  //     path: "/new-games",
  //     name: "new-games",
  //     component: TheNewGames,
  //     meta: {
  //       title: "New Casino Games | Latest Releases on Hakibets",
  //       description:
  //         "Try the newest online casino games on Hakibets. Discover fun titles, exciting gameplay, and real winnings.",
  //       requiresAuth: false,
  //     },
  //   },
  {
    path: "/crash/:name",
    name: "play-crash-games",
    component: CasinoGame,
    meta: {
      title: `Play :name | Hakibets Crash Game`,
      description:
        "Enjoy :name with smooth gameplay, fair odds, and real cash prizes at Hakibets Kenya Crash Games.",
      requiresAuth: false,
    },
  },
  {
    path: "/virtual-games/:name",
    name: "play-virtuals-games",
    component: CasinoGame,
    meta: {
      title: "Play :name | Hakibets Virtual Game",
      description:
        "Enjoy :name with smooth gameplay, fair odds, and real cash prizes at Hakibets Kenya Virtual Games.",
      requiresAuth: false,
    },
  },
  {
    path: "/casino/:name",
    name: "play-casino-games",
    component: CasinoGame,
    meta: {
      title: "Play :name | Hakibets Casino Game",
      description:
        "Enjoy :name with smooth gameplay, fair odds, and real cash prizes at Hakibets Kenya Casino Games.",
      requiresAuth: false,
    },
  },
  // {
  //   path: "/share-happiness",
  //   name: "share-happiness",
  //   component: ShareZaKrisii,
  //   meta: {
  //     title: "Christmass Cheer: Holiday Bonus | Hakibets Casino Games",
  //     description:
  //       "Claim your special Christmas Bonus! Join the Festive Cheer promotion for smooth gameplay, extra prizes, Mbuzi, and real cash giveaways at Hakibets Kenya Casino Games this season.",
  //     requiresAuth: true,
  //   },
  // },

  {
    path: "/virtual-games",
    name: "virtuals",
    component: VirtualsIndex,
    meta: {
      title: "Virtual Sports | 24/7 Matches & Results | Hakibets",
      description:
        "Bet on nonstop virtual football, racing, and more. Fast results and instant wins 24/7 on Hakibets.",
      requiresAuth: false,
    },
  },
  {
    path: "/virtual-games/haki-league",
    name: "haki-league",
    component: KironLiteIndex,
    meta: {
      title: "Haki League | Virtual Football Betting | Hakibets",
      description:
        "Play Haki League virtual football and enjoy realistic matches, live stats, and instant payouts.",
      requiresAuth: true,
    },
  },
  {
    path: "/virtual-games/haki-turbo",
    name: "haki-turbo",
    component: KironLiteIndex,
    meta: {
      title: "Haki Turbo | Fast Virtual Betting | Hakibets",
      description:
        "Experience Haki Turbo – fast, exciting virtual betting rounds with quick results on Hakibets Kenya.",
      requiresAuth: true,
    },
  },
  {
    path: "/virtual-games/haki-virtual-jackpot",
    name: "haki-virtual-jackpot",
    component: KironLiteIndex,
    meta: {
      title: "Haki Virtual Jackpot | Bet & Win Big | Hakibets",
      description:
        "Join Haki Virtual Jackpot and stand a chance to win massive rewards. Fast results, endless fun!",
      requiresAuth: true,
    },
  },
  {
    path: "/instant",
    name: "instant",
    component: InstantIndex,
    meta: {
      title: "Instant Games | Quick Wins & Fun Play | Hakibets",
      description:
        "Play instant win games and enjoy fast payouts. Quick entertainment and real rewards on Hakibets.",
      requiresAuth: false,
    },
  },
  {
    path: "/freebet",
    name: "freebet",
    component: FreeBet,
    meta: {
      title: "Free Bet Bonus | Claim Your Free Bets | Hakibets",
      description:
        "Register or deposit to claim your free bets on Hakibets. Bet risk-free and keep what you win!",
      requiresAuth: false,
    },
  },
  {
    path: "/terms-and-conditions",
    name: "terms-and-conditions",
    component: TermsAndConditions,
    meta: {
      title: "Terms & Conditions | Hakibets Kenya",
      description:
        "Read Hakibets’ terms and conditions to understand our rules, fair play policy, and legal requirements.",
      requiresAuth: false,
    },
  },
  {
    path: "/responsible-gambling",
    name: "responsible-gambling",
    component: ResponsibleGambling,
    meta: {
      title: "Responsible Gambling | Stay Safe with Hakibets",
      description:
        "Hakibets promotes safe gaming. Access tools and support to gamble responsibly and stay in control.",
      requiresAuth: false,
    },
  },
  {
    path: "/privacy-policy",
    name: "privacy-policy",
    component: PrivacyPolicy,
    meta: {
      title: "Privacy Policy | Data Protection | Hakibets",
      description:
        "Learn how Hakibets protects your data under Kenya’s Data Protection Act and ensures secure transactions.",
      requiresAuth: false,
    },
  },
  {
    path: "/instant/live",
    name: "instant-live",
    component: InstantLive,
    meta: {
      title: "Instant Live Games | Real-Time Play | Hakibets",
      description:
        "Play live instant games and compete for quick wins in real time. Exciting gameplay available 24/7.",
      requiresAuth: false,
    },
  },
  {
    path: "/share-bets/:code?",
    name: "share-bets",
    component: BookedBets,
    meta: {
      title: "Share Bets | Bet Slip Code | Hakibets",
      description:
        "Share your Hakibets bet slip using a unique code. Let friends view or play the same selections easily.",
      requiresAuth: false,
    },
  },
  {
    path: "/profile/exclude",
    name: "self-exclusion",
    component: SelfExclusion,
    meta: {
      title: "Self Exclusion | Take a Break from Betting | Hakibets",
      description:
        "Pause your betting activity securely with Hakibets’ self-exclusion tool. Play responsibly anytime.",
      requiresAuth: true,
    },
  },
  {
    path: "/virtual-league",
    name: "virtual-league",
    component: HakiLeague,
    meta: {
      title: "Virtual League | Bet on Simulated Matches | Hakibets",
      description:
        "Enjoy nonstop virtual football leagues and tournaments with instant results and fast payouts.",
      requiresAuth: true,
    },
  },
  //   {
  //     path: "/new-league",
  //     name: "laki-league",
  //     component: NewLeague,
  //     meta: {
  //       title: "Virtual League | Bet on Simulated Matches | Hakibets",
  //       description:
  //         "Enjoy nonstop virtual football leagues and tournaments with instant results and fast payouts.",
  //       requiresAuth: true,
  //     },
  //   },
  {
    path: "/bet-placed",
    name: "bet-placed",
    component: BetPlacedSuccessfully,
    meta: {
      title: "Bet Placed successfully |  Bet Slip | Hakibets",
      description:
        "Your bet has been placed successfully. Share your bet with friends and track your progress.",
      requiresAuth: true,
    },
  },
  {
    path: "/welcome-promotions",
    name: "welcome-promotions",
    component: WelcomePromotions,
    meta: {
      title: "Welcome Promotions | New Player Bonuses | Hakibets",
      description:
        "New to Hakibets? Claim your welcome bonuses and start betting with free cash and boosted odds.",
      requiresAuth: false,
    },
  },
  {
    path: "/share-feedback",
    name: "share-feedback",
    component: ShareAnIdea,
    meta: {
      title: "Share Feedback | Suggest Features | Hakibets",
      description:
        "We value your input! Share ideas and feedback to help us improve your Hakibets experience.",
      requiresAuth: false,
    },
  },
  //   {
  //     path: "/bonus",
  //     name: "bonus",
  //     component: BonusView,
  //     meta: {
  //       title: "Share Feedback | Suggest Features | Hakibets",
  //       description:
  //         "We value your input! Share ideas and feedback to help us improve your Hakibets experience.",
  //       requiresAuth: false,
  //     },
  //   },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: NotFound,
    meta: {
      title: "Page Not Found | Hakibets",
      description: "The page you are looking for does not exist.",
      robots: "noindex,nofollow",
      requiresAuth: false,
    },
  },
];

const sportMetaMap = {
  soccer: {
    title: "Football betting | Bet on football or soccer online – Hakibets",
    description:
      "Bet on football matches from top leagues including EPL, La Liga, and Serie A. Get live odds and instant cashouts on Hakibets.",
  },
  basketball: {
    title: "Basketball betting | Bet on NBA and more – Hakibets",
    description:
      "Bet live on NBA, EuroLeague, and more with Hakibets. Enjoy competitive odds, fast payouts, and secure betting.",
  },
  tennis: {
    title: "Tennis betting | Bet on tennis tournaments – Hakibets",
    description:
      "Place bets on ATP, WTA, and Grand Slam matches. Hakibets gives you instant payouts and live tennis betting options.",
  },
  cricket: {
    title: "Cricket betting | Bet on T20 and IPL matches – Hakibets",
    description:
      "Bet on cricket tournaments including IPL, ODI, and T20 World Cup. Hakibets gives you top odds and instant payouts.",
  },
  rugby: {
    title: "Rugby betting | Bet on rugby matches – Hakibets",
    description:
      "Bet on rugby union and rugby league matches worldwide. Enjoy competitive odds, live betting, and fast payouts.",
  },
  iceHockey: {
    title: "Ice Hockey betting | Bet on NHL and more – Hakibets",
    description:
      "Bet on NHL and global ice hockey leagues with live odds, real-time action, and instant cashouts.",
  },
  tableTennis: {
    title: "Table Tennis betting | Bet on live matches – Hakibets",
    description:
      "Bet on ITTF and international table tennis events. Live odds, fast markets, and optimized betting experience.",
  },
  handball: {
    title: "Handball betting | Bet on top leagues – Hakibets",
    description:
      "Explore handball betting markets from European and international leagues with competitive odds and fast payouts.",
  },
  volleyball: {
    title: "Volleyball betting | Bet on global leagues – Hakibets",
    description:
      "Bet on volleyball leagues worldwide including international tournaments. Live betting and fast withdrawals.",
  },
  americanFootball: {
    title: "American Football betting | Bet on NFL and more – Hakibets",
    description:
      "Bet on NFL, College Football, and more with live odds, prop bets, and fast payouts.",
  },
  boxing: {
    title: "Boxing betting | Bet on major fights – Hakibets",
    description:
      "Bet on world boxing matches including title fights and major events. Live odds and instant payouts.",
  },
  eSoccer: {
    title: "eSoccer betting | Bet on virtual soccer – Hakibets",
    description:
      "Bet on eSoccer and virtual football matches 24/7 with fast odds and instant results.",
  },
  aussieRules: {
    title: "Aussie Rules betting | Bet on AFL matches – Hakibets",
    description:
      "Bet on AFL and Australian Rules Football with competitive odds and live betting options.",
  },
  futsal: {
    title: "Futsal betting | Bet on futsal leagues – Hakibets",
    description:
      "Bet on international futsal leagues with real-time odds and fast payouts.",
  },
  golf: {
    title: "Golf betting | Bet on PGA and global tours – Hakibets",
    description:
      "Bet on PGA Tour, LPGA, and global golf tournaments with top odds and live betting markets.",
  },
  hockey: {
    title: "Field Hockey betting | Bet on major matches – Hakibets",
    description:
      "Bet on field hockey matches and international tournaments with competitive odds.",
  },
  horseRacing: {
    title: "Horse Racing betting | Bet on races worldwide – Hakibets",
    description:
      "Bet on global horse racing events with instant payouts and live odds across all major tracks.",
  },
  snooker: {
    title: "Snooker betting | Bet on snooker tournaments – Hakibets",
    description:
      "Bet on major snooker tournaments including World Snooker Championship and ranking events.",
  },
  motorSport: {
    title: "Motor Sport betting | Bet on F1 and racing events – Hakibets",
    description:
      "Bet on Formula 1, MotoGP, NASCAR, and more with competitive odds and live race betting.",
  },
  badminton: {
    title: "Badminton betting | Bet on BWF tournaments – Hakibets",
    description:
      "Bet on badminton matches including BWF tours and international tournaments with fast markets.",
  },
  baseball: {
    title: "Baseball betting | Bet on MLB and global leagues – Hakibets",
    description:
      "Bet on MLB and international baseball leagues with live action and instant payouts.",
  },
  cycling: {
    title: "Cycling betting | Bet on major tours – Hakibets",
    description:
      "Bet on cycling tours including Tour de France, Giro d’Italia, and Vuelta with real-time odds.",
  },
  darts: {
    title: "Darts betting | Bet on PDC events – Hakibets",
    description:
      "Bet on major darts tournaments including PDC World Championship with competitive odds.",
  },
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 1️⃣ When user navigates back/forward using browser buttons
    if (savedPosition) {
      return savedPosition;
    }

    // // 2️⃣ When coming from match-details → return to previous scroll position
    // if (from.name === "match-details") {
    //   return false; // keep current scroll position (no jump)
    // }

    // 3️⃣ Default: scroll to top
    return { top: 0 };
  },
});

let lastRoute = null;

router.beforeEach((to, from, next) => {
  lastRoute = from;

  const { getUtm, getBtag, getReferralCode } = useUtmStore();
  const { isAuthenticated } = storeToRefs(useLoginStore());
  const { setAfterLoginAction } = useLoginStore();

  getUtm(to);
  getBtag(to);
  getReferralCode(to);
  function goToRoute() {
    router.push({ name: to.name });
  }
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  //   if (requiresAuth && !isAuthenticated.value) next("/login");
  if (requiresAuth && !isAuthenticated.value) {
    setAfterLoginAction(goToRoute);
    const { openModal } = useModalStore();
    const { login } = useModalTypes();
    openModal(login);
  } else next();
});

router.afterEach((to) => {
  const defaultTitle = "Hakibets - Sports Betting & Casino Kenya";
  const defaultDesc =
    "Bet on football, live games, and casino with Hakibets Kenya. Fast payouts, bonuses, and real-time odds.";
  const baseUrl = "https://hakibets.com";

  const stripQuery = (p) => p.split("?")[0].replace(/\/{2,}/g, "/");
  const removeTrailingSlash = (p) =>
    p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p;
  const normalizePathForCanonical = (p) =>
    removeTrailingSlash(stripQuery(p)).toLowerCase();
  const absolute = (path) =>
    path.startsWith("http")
      ? path
      : `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;

  const isParamPage = () => {
    const q = to.fullPath.split("?")[1] || "";
    return /\butm_|^page=|[?&]sort=|[?&]session=/.test("?" + q);
  };

  // dynamic meta
  let title = to.meta.title || defaultTitle;
  let description = to.meta.description || defaultDesc;

  // Replace :sport param from sportMetaMap for sports/live routes
  if ((to.name === "sports" || to.name === "live") && to.params?.sport) {
    const sportKey = String(to.params.sport).toLowerCase();
    if (sportMetaMap[sportKey]) {
      title = sportMetaMap[sportKey].title;
      description = sportMetaMap[sportKey].description;
    }
  }

  // Replace dynamic route params (:name, :country) in meta title/description
  if (to.params) {
    const formatParam = (val) =>
      String(val).replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

    if (to.params.name) {
      const displayName = formatParam(to.params.name);
      title = title.replace(/:name/g, displayName);
      description = description.replace(/:name/g, displayName);
    }
    if (to.params.country) {
      const displayCountry = formatParam(to.params.country);
      title = title.replace(/:country/g, displayCountry);
      description = description.replace(/:country/g, displayCountry);
    }
    if (to.params.sport && !sportMetaMap[String(to.params.sport).toLowerCase()]) {
      const displaySport = formatParam(to.params.sport);
      title = title.replace(/:sport/g, displaySport);
      description = description.replace(/:sport/g, displaySport);
    }
  }

  const canonicalPath = normalizePathForCanonical(to.path || "/");
  const canonical = absolute(canonicalPath);
  const robots = isParamPage()
    ? "noindex,follow"
    : to.meta.robots || "index,follow";

  const ogImage = "https://imagedelivery.net/ZY5OwFLlTE2ePHl_IE20jg/96a0d1ed-e4ef-45a0-6bd4-4a6d00bd7300/public";

  // JSON-LD schema
  const { combinedSchemas } = useOrganizationSchema();
  const schema = combinedSchemas(to, baseUrl);

  useHead({
    title,
    htmlAttrs: { lang: "en" },
    meta: [
      { name: "description", content: description },
      { name: "robots", content: robots },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: canonical },
      { property: "og:type", content: "website" },
      { property: "og:image", content: ogImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:site_name", content: "HakiBets" },
      { property: "og:locale", content: "en_KE" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
    ],
    link: [{ rel: "canonical", href: canonical }],
    script: [
      {
        type: "application/ld+json",
        children: JSON.stringify(schema),
      },
    ],
  });
});

export function useLastRoute() {
  return lastRoute;
}

export default router;
