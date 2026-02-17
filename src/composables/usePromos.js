export function usePromos() {
  const aviatorPromo = "aviator";
  const hakiLeaguePromo = "hakiLeague";
  const cashbackPromo = "cashback";
  const bethubPromo = "bethub";

  const multibetBoostPromo = "multibet-boost";
  const twoUpPromo = "two-up";
  const oneCutPromo = "one-cut";
  const dailyAviatorCashback = "daily-aviator-cashback";
  const aviatorWelcomeBonus = "aviator-welcome-bonus";
  const aviatorKaribuBonus = "aviator-karibu-bonus";
  const jengaBetsPromo = "jenga-bets";
  const tanoSupuuPromo = "tano-supuu";
  const sambazaZaKrisiiPromo = "sambaza-za-krisii";
  const leaderboardPromo = "leaderboard";

  const promos = [
    {
      id: 278394453425,
      routeName: "leaderboard",
      name: leaderboardPromo,
      title: "HAKIBETS WEEKLY LEADERBOARD",
      img: "0db90944-69ba-4d23-4716-d0bffa24d600",
      samary: `Climb the ranks and claim your share of KES 300,000 every week!`,
    },
    // {
    //   id: 278394453,
    //   routeName: "share-happiness",
    //   name: sambazaZaKrisiiPromo,
    //   title: "🎄 Sambaza za Krisi na Mabeste Ushinde Mbuzi! 🐐",
    //   img: "4dd40723-b3c3-48f5-dcde-d7243ed59300",
    //   samary: `We are giving away three Mbuzis worth KES 5,000 every single day.`,
    // },
    {
      id: 211336345453,
      name: tanoSupuuPromo,
      routeName: "home",
      title:
        "Bet 5 days in a row and earn your KSh 50 streak bonus every Monday.",
      img: "74e65c06-3e34-4943-f7a6-8def03fab100",
      samary: `Place 1 qualifying bet daily, keep the streak alive, get rewarded.`,
    },
    {
      id: 211336345,
      name: aviatorKaribuBonus,
      routeName: "aviator",
      title: "Hakibets Aviator Karibu Bonus.",
      img: "835600b7-ff8e-45b8-cc75-f3dd32ee2900",
      samary: `Register today and get up to 50 FREE Aviator Bets!
  ✅ Create an account
  ✅ Make your first deposit
  ✅ Enjoy free Hakibets Aviator Bets Instantly
  `,
    },

    {
      id: 2113384545646656,
      name: aviatorWelcomeBonus,
      routeName: "aviator",
      title: "✈️ Aviator Welcome Bonus!",
      img: "e0147c0c-4e14-43af-9c08-8e5659bf8500",
      samary: `Welcome to Hakibets! We're excited to offer new players an incredible opportunity to explore one of our most popular games with minimal risk and maximum potential rewards.
Exclusive New Player Benefit: Earn up to 25 free bets worth KES 10 each on Aviator during your first 5 days after registration - that's a total value of KES 250 in free gameplay!
`,
    },
    {
      id: 17700113,
      name: cashbackPromo,
      routeName: "deposit",
      title: "DEPOSIT BONUS",
      img: "f1ec90b7-bf7b-48eb-9cd2-36405d95f900",
      samary: `Hakibets provides a daily bonus to customers for their first deposit(s) of the day. This bonus
effectively refunds either the full or partial transaction charges, rewarding customers for their
deposits. `,
    },
    {
      id: 21133634545,
      name: jengaBetsPromo,
      routeName: "home",
      title: "Hakibets Jenga Bet.",
      img: "a3e5eafe-1f48-4f11-4539-b70c41ecf400",
      samary: `Hakibets Jenga Bet lets you create your own customized football bet just the way you like it! Choose from the most popular football markets and combine them into a single bet — with your odds automatically calculated as you go.`,
    },
    {
      id: 2,
      name: aviatorPromo,
      routeName: "aviator",
      title: "HAKIBETS AVIATOR FREE RAINS",
      img: "96a0d1ed-e4ef-45a0-6bd4-4a6d00bd7300",
      samary: `Hakibets Aviator Rains Promotion offers Aviator players a daily opportunity to win over KSH
200,000 in free bets.`,
    },
    {
      id: 211336,
      name: multibetBoostPromo,
      routeName: "home",
      title: "Multibet Boost - Supercharge Your Wins!",
      img: "5fb7ded4-8e15-4b1e-7f84-f38e0df7a300",
      samary: `Maximize Your Winning Potential with Hakibets' exclusive Multibet Boost! 
        Combine multiple selections and watch your winnings grow with our tiered boost system that rewards bigger combinations with even bigger returns.`,
    },
    {
      id: 21133845456,
      name: twoUpPromo,
      routeName: "home",
      title: " 2UP – Get Paid in Full When Your Team Goes 2 Goals Up",
      img: "97040f9e-7f81-42e8-f335-b38e4081a100",
      samary: `Experience football betting without the heartbreak of late comebacks! With Hakibets 2UP, when your team takes a 2-goal lead, we pay out in full instantly – no waiting, no reduced odds.`,
    },
    {
      id: 2113384545646,
      name: oneCutPromo,
      routeName: "home",
      title: "🏆Miss One, Still Win Cash Back!",
      img: "037c9fa0-baec-46d1-9baa-f1f716edf800",
      samary: `Experience smarter betting with Hakibets One Cut! Even the best bettors can have one selection let them down. That’s why we created the ultimate safety net – when your multibet falls short by just one game, you still win real cash back.`,
    },
    {
      id: 2113384545646656,
      name: dailyAviatorCashback,
      routeName: "aviator",
      title: "✈️ Daily Aviator Cashback - Surprise Rewards for Loyal Players!",
      img: "889ee2e9-050c-46f3-606e-3046bcf07600",
      samary: `Experience Aviator like never before with Hakibets Daily Cashback! Every day, our system randomly rewards loyal Aviator players with surprise cash back on their losses. The more you play, the better your chances of being selected for our exclusive daily rewards program.`,
    },
    {
      id: 211333,
      name: bethubPromo,
      routeName: "share-bets",
      title: "Share & Win Together!",
      img: "7ed97c5e-43e7-4c1b-0bd5-f61fad5d1300",
      samary: `Boost Your Bets with Shared Luck! Load, Bet, Celebrate – Faster Than Ever!
      Unlock Bigger Wins – Team up and multiply your chances with Shared Luck!
      Instant Thrills – Load, place your bet, and enjoy lightning-fast results!
      More Bets, More Fun – Join forces and watch your rewards grow together!`,
    },
    {
      id: 0,
      name: hakiLeaguePromo,
      routeName: "haki-league",
      title: "HakiLeague Freebets",
      img: "a69a95ad-2a8f-4be4-e4a5-27af78765100",
      samary: `HakiLeague Freebets is an exciting opportunity for sports enthusiasts to enjoy risk-free betting on
their favorite games. This promotion allows participants to place bets without using their own
money, giving them a chance to win big without any financial risk.`,
    },
  ];

  const welcomePromos = [
    {
      id: 211336345,
      name: aviatorKaribuBonus,
      routeName: "aviator",
      title: "Hakibets Aviator Karibu Bonus.",
      img: "/promos/aviator-karibu-promo.png",
      bg: "bg-gradient-to-r from-green-700 to-yellow-700",
      samary: `Register today and get up to 50 FREE Aviator Bets!
✅ Create an account
✅ Make your first deposit
✅ Enjoy free Hakibets Aviator Bets Instantly!
`,
    },
    {
      id: 2113384545646656,
      name: aviatorWelcomeBonus,
      routeName: "aviator",
      title: "Aviator Welcome Bonus!",
      img: "/promos/freebets-prom.png",
      bg: "bg-gradient-to-r from-red-700 to-green-800",
      samary: `Earn up to 25 free bets worth KES 10 each on Aviator during your first 5 days after registration!`,
    },
    {
      id: 17700113,
      name: cashbackPromo,
      routeName: "deposit",
      title: "DEPOSIT BONUS",
      img: "/promos/cashback_deposit.png",
      bg: "bg-gradient-to-r from-green-700 to-purple-800",
      samary: `Hakibets provides a daily bonus to customers for their first deposit(s) of the day.`,
    },
    {
      id: 0,
      name: hakiLeaguePromo,
      routeName: "haki-league",
      title: "HakiLeague Freebets",
      img: "/promos/hakiligipromo.png",
      bg: "bg-gradient-to-l from-green-700 to-purple-800",
      samary: `This promotion allows participants to place bets without using their own
money.`,
    },
    {
      id: 2113384545646656,
      name: dailyAviatorCashback,
      routeName: "aviator",
      title: "Daily Aviator Cashback - Surprise Rewards for Loyal Players!",
      bg: "bg-gradient-to-r from-rose-700 to-emerald-800",
      img: "/promos/cashback-prom.png",
      samary: `Every day, our system randomly rewards loyal Aviator players with surprise cash back on their losses. The more you play, the better your chances of being selected for our exclusive daily rewards program.`,
    },
    {
      id: 2,
      name: aviatorPromo,
      routeName: "aviator",
      title: "HAKIBETS AVIATOR FREE RAINS",
      img: "/promos/aviator_rain.png",
      bg: "bg-gradient-to-l from-sky-700 to-purple-800",
      samary: `Hakibets Aviator Rains Promotion offers Aviator players a daily opportunity to win over KSH
200,000 in free bets.`,
    },
    {
      id: 211336,
      name: multibetBoostPromo,
      routeName: "home",
      title: "Multibet Boost - Supercharge Your Wins!",
      img: "/promos/multiboost-prom.png",
      bg: "bg-gradient-to-r from-cyan-700 to-red-800",
      samary: `Maximize Your Winning Potential with Hakibets' exclusive Multibet Boost! 
        Combine multiple selections and watch your winnings grow with our tiered boost system that rewards bigger combinations with even bigger returns.`,
    },
    {
      id: 21133845456,
      name: twoUpPromo,
      routeName: "home",
      title: " 2UP – Get Paid in Full When Your Team Goes 2 Goals Up",
      img: "/promos/two-up-prom.png",
      bg: "bg-gradient-to-r from-fuchsia-700 to-pink-800",
      samary: `Experience football betting without the heartbreak of late comebacks! With Hakibets 2UP, when your team takes a 2-goal lead, we pay out in full instantly – no waiting, no reduced odds.`,
    },
    {
      id: 2113384545646,
      name: oneCutPromo,
      routeName: "home",
      title: "🏆Miss One, Still Win Cash Back!",
      img: "/promos/onecut-prom.png",
      bg: "bg-gradient-to-r from-amber-700 to-blue-800",
      samary: `Experience smarter betting with Hakibets One Cut! Even the best bettors can have one selection let them down. That’s why we created the ultimate safety net – when your multibet falls short by just one game, you still win real cash back.`,
    },

    {
      id: 211333,
      name: bethubPromo,
      routeName: "share-bets",
      title: "Share & Win Together!",
      img: "/promos/bethub-promo.png",
      bg: "bg-gradient-to-r from-yellow-700 to-teal-800",
      samary: `Boost Your Bets with Shared Luck! Load, Bet, Celebrate – Faster Than Ever!
      Unlock Bigger Wins – Team up and multiply your chances with Shared Luck!
      Instant Thrills – Load, place your bet, and enjoy lightning-fast results!
      More Bets, More Fun – Join forces and watch your rewards grow together!`,
    },
  ];

  return {
    aviatorPromo,
    hakiLeaguePromo,
    multibetBoostPromo,
    dailyAviatorCashback,
    aviatorWelcomeBonus,
    aviatorKaribuBonus,
    cashbackPromo,
    twoUpPromo,
    bethubPromo,
    oneCutPromo,
    promos,
    welcomePromos,
    jengaBetsPromo,
    tanoSupuuPromo,
    sambazaZaKrisiiPromo,
    leaderboardPromo,
  };
}
