<script setup>
import { RouterLink } from "vue-router";
import { useDownloadApp } from "../composables/useDownloadApp";

const { downloadApp } = useDownloadApp();
</script>
<template>
  <div
    class="bg-white text-[#241E34] dark:bg-[#241E34] dark:text-white min-h-dvh py-10"
  >
    <div class="max-w-5xl mx-auto px-4 space-y-10">
      <!-- Header -->
      <div class="text-center space-y-4">
        <h1 class="text-3xl md:text-5xl font-bold">
          ⚽ Hakibets 2UP –
          <span class="text-[#FEAF04]"
            >Get Paid in Full When Your Team Goes 2 Goals Up</span
          >
        </h1>
        <p class="text-lg md:text-xl font-medium text-[#1C7928]">
          Revolutionary Early Payout – Pre-Match & Live Betting Protection
        </p>
      </div>

      <!-- Intro -->
      <div class="bg-gray-50 dark:bg-[#1E1A2D] p-6 rounded-2xl shadow">
        <p class="leading-relaxed">
          Experience football betting without the heartbreak of late comebacks!
          With
          <strong>Hakibets 2UP</strong>, when your team takes a
          <span class="text-[#FEAF04] font-bold">2-goal lead</span>, we pay out
          in full instantly – no waiting, no reduced odds.
        </p>
        <p class="mt-4 font-semibold">
          🎯 Back your team with confidence knowing that a 2-goal advantage
          means instant victory, whether pre-match or live.
        </p>
      </div>

      <!-- How It Works -->
      <section>
        <h2 class="text-2xl font-bold mb-4">How Hakibets 2UP Works</h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div
            class="bg-gray-50 dark:bg-[#1E1A2D] p-6 rounded-2xl shadow space-y-2"
          >
            <h3 class="font-semibold">⚡ Pre-Match Betting</h3>
            <ul class="list-disc list-inside space-y-1 text-sm">
              <li>
                Place your 1X2 Full Time bet on matches with the orange 2UP icon
              </li>
              <li>If your team goes 2 goals up → Instant payout</li>
              <li>Funds credited to your Hakibets account</li>
              <li>Final score doesn’t matter 🎉</li>
            </ul>
          </div>
          <div
            class="bg-gray-50 dark:bg-[#1E1A2D] p-6 rounded-2xl shadow space-y-2"
          >
            <h3 class="font-semibold">⚡ Live Betting Innovation</h3>
            <ul class="list-disc list-inside space-y-1 text-sm">
              <li>Bet live before any side reaches 2 goals ahead</li>
              <li>Same instant payout protection applies</li>
              <li>Perfect for momentum and in-play strategies</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Real Match Examples -->
      <section>
        <h2 class="text-2xl font-bold mb-4">🏆 Real Match Examples</h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-gray-50 dark:bg-[#1E1A2D] p-6 rounded-2xl shadow">
            <p><strong>Champions League Drama:</strong> Arsenal vs PSV</p>
            <ul class="list-disc list-inside text-sm mt-2">
              <li>Arsenal scores 2nd goal → ✅ Instant full payout</li>
              <li>No stress about late comebacks</li>
            </ul>
          </div>
          <div class="bg-gray-50 dark:bg-[#1E1A2D] p-6 rounded-2xl shadow">
            <p><strong>Premier League Classic:</strong> PSG vs Man City</p>
            <ul class="list-disc list-inside text-sm mt-2">
              <li>Man City 2-0 up by 53rd min → ✅ Settled as win</li>
              <li>Final score 4-2 to PSG → You still keep full payout</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Competitions -->
      <section>
        <h2 class="text-2xl font-bold mb-4">🌟 Elite Competitions Included</h2>
        <div
          class="bg-gray-50 dark:bg-[#1E1A2D] p-6 rounded-2xl shadow space-y-2 text-sm"
        >
          <p>
            <strong>European Powerhouses:</strong> EPL, La Liga, Serie A,
            Bundesliga, Ligue 1
          </p>
          <p>
            <strong>International Tournaments:</strong> UCL, Europa, Conference,
            Super Cup, Club World Cup
          </p>
          <p>
            <strong>International Football:</strong> World Cup Qualifiers,
            Nations League, CAF & CONMEBOL tournaments
          </p>
        </div>
      </section>

      <!-- Unique Advantages -->
      <section>
        <h2 class="text-2xl font-bold mb-4">
          🎯 Why Hakibets 2UP Leads the Market
        </h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-gray-50 dark:bg-[#1E1A2D] p-6 rounded-2xl shadow">
            <h3 class="font-semibold">✅ No Odds Reduction</h3>
            <p>Same odds, full payout, no penalties.</p>
          </div>
          <div class="bg-gray-50 dark:bg-[#1E1A2D] p-6 rounded-2xl shadow">
            <h3 class="font-semibold">✅ Pre-Match & Live Combined</h3>
            <p>Flexibility for every betting style.</p>
          </div>
          <div class="bg-gray-50 dark:bg-[#1E1A2D] p-6 rounded-2xl shadow">
            <h3 class="font-semibold">✅ Multibet Friendly</h3>
            <p>2UP legs settle instantly, others continue normally.</p>
          </div>
          <div class="bg-gray-50 dark:bg-[#1E1A2D] p-6 rounded-2xl shadow">
            <h3 class="font-semibold">✅ Zero Restrictions</h3>
            <p>No stake minimums, no max payouts, unlimited 2UP wins.</p>
          </div>
        </div>
      </section>

      <!-- Qualifying Scenarios -->
      <section>
        <h2 class="text-2xl font-bold mb-4">📊 2-Goal Lead Examples</h2>
        <div class="bg-gray-50 dark:bg-[#1E1A2D] p-6 rounded-2xl shadow">
          <ul class="list-disc list-inside space-y-1 text-sm">
            <li>2-0, 3-1, 4-2, 5-3 → ✅ Trigger payout</li>
            <li>Must be the <strong>first team</strong> to go 2 up</li>
            <li>Comeback leads (0-2 down then 4-2 up) ❌ No early payout</li>
          </ul>
        </div>
      </section>

      <!-- Bet Types -->
      <section>
        <h2 class="text-2xl font-bold mb-4">📋 How Different Bet Types Work</h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-gray-50 dark:bg-[#1E1A2D] p-6 rounded-2xl shadow">
            <h3 class="font-semibold">Single Bets</h3>
            <p class="text-sm">
              Team goes 2UP → ✅ Instant settlement & winnings available.
            </p>
          </div>
          <div class="bg-gray-50 dark:bg-[#1E1A2D] p-6 rounded-2xl shadow">
            <h3 class="font-semibold">Multibets</h3>
            <p class="text-sm">
              2UP leg = WIN, other legs continue. Perfect for accumulators.
            </p>
          </div>
        </div>
      </section>

      <!-- Terms -->
      <section>
        <h2 class="text-2xl font-bold mb-4">📜 Terms & Conditions</h2>
        <div
          class="bg-gray-50 dark:bg-[#1E1A2D] p-6 rounded-2xl shadow space-y-3 text-sm"
        >
          <p>
            <strong>Eligibility:</strong> Open to Hakibets Kenya customers,
            ongoing promo.
          </p>
          <p>
            <strong>Market:</strong> 1X2 Full Time only (pre-match + live before
            2-goal lead).
          </p>
          <p>
            <strong>Payout Rules:</strong> Regular time goals only, no
            penalties/extra time. First 2-goal lead counts.
          </p>
          <p>
            <strong>Exclusions:</strong> Cashouts before trigger, void matches,
            comeback leads.
          </p>
          <p>
            <strong>General:</strong> Hakibets may change/cancel promo anytime.
            Must be 18+ to bet responsibly.
          </p>
        </div>
      </section>

      <!-- Quick Start Guide -->
      <section>
        <h2 class="text-2xl font-bold mb-4">🚀 How to Use 2UP Protection</h2>
        <div class="grid md:grid-cols-2 gap-6">
          <ul
            class="bg-gray-50 dark:bg-[#1E1A2D] p-6 rounded-2xl shadow list-disc list-inside space-y-1 text-sm"
          >
            <li>Browse matches with the orange 2UP icon</li>
            <li>Bet 1X2 Full Time pre-match or live</li>
            <li>Protection automatic – no opt-in</li>
            <li>2-goal lead → ✅ Instant payout</li>
          </ul>
          <div class="bg-gray-50 dark:bg-[#1E1A2D] p-6 rounded-2xl shadow">
            <h3 class="font-semibold mb-2">💡 Strategic Tips</h3>
            <ul class="list-disc list-inside text-sm space-y-1">
              <li>Back attacking teams with strong starts</li>
              <li>Capitalize on momentum shifts in live betting</li>
              <li>Mix 2UP bets in multibets for safer accumulators</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section
        class="text-center py-10 bg-[#1C7928] text-white rounded-2xl shadow-lg"
      >
        <h2 class="text-3xl font-bold">
          🎉 Start Winning Early with Hakibets 2UP
        </h2>
        <p class="mt-2">2 goals ahead means game over – in your favor!</p>
        <div class="mt-6 flex flex-col md:flex-row justify-center gap-4">
          <RouterLink
            :to="{ name: 'home' }"
            class="bg-[#FEAF04] text-[#241E34] px-6 py-3 rounded-xl font-bold shadow hover:scale-105 transition"
          >
            Bet Now on Web
          </RouterLink>
          <button
            class="bg-white text-[#241E34] px-6 py-3 rounded-xl font-bold shadow hover:scale-105 transition"
            @click="downloadApp"
          >
            Download Mobile App
          </button>
        </div>
        <p class="mt-4">24/7 Support • Responsible Gaming</p>
      </section>
    </div>
  </div>
</template>
