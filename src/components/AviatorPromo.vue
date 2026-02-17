<template>
  <div
    class="bg-white dark:bg-[#241E34] text-[#241E34] dark:text-white min-h-dvh py-10 px-6 md:px-16"
  >
    <!-- Hero Section -->
    <section class="text-center mb-12">
      <div
        class="inline-block px-4 py-2 bg-[#FEAF04] text-white font-bold rounded-full shadow-lg mb-4"
      >
        ✈️ Hakibets Daily Aviator Cashback
      </div>
      <h1 class="text-3xl md:text-5xl font-extrabold mb-4">
        Surprise Rewards for Loyal Players!
      </h1>
      <p
        class="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
      >
        Experience Aviator like never before! Every day, loyal players are
        randomly rewarded with real cashback on losses.
        <span class="font-semibold text-[#1C7928]"
          >The more you play, the higher your chances!</span
        >
      </p>
    </section>

    <!-- Promise -->
    <section class="bg-[#1C7928] text-white rounded-2xl p-8 shadow-xl mb-12">
      <h2 class="text-2xl font-bold mb-4">🎯 The Promise</h2>
      <p class="text-lg">
        Dedicated Aviator players deserve recognition. Our random cashback
        system ensures loyalty is rewarded with
        <span class="font-semibold text-[#FEAF04]">real cash returns</span> — no
        strings attached.
      </p>
    </section>

    <!-- How It Works -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-6">
        ⚡ How Daily Aviator Cashback Works
      </h2>
      <div class="grid md:grid-cols-2 gap-6">
        <div class="p-6 rounded-xl shadow-lg bg-gray-50 dark:bg-gray-800">
          <h3 class="text-xl font-semibold mb-2">Daily Selection Cycle</h3>
          <ul class="space-y-2 text-gray-700 dark:text-gray-300">
            <li>⏰ 11:59 PM: System calculates eligible net losses</li>
            <li>🎲 Random selection algorithm picks winners</li>
            <li>💸 Cashback credit 9.00AM daily!</li>
            <li>📲 SMS & App notification sent immediately</li>
          </ul>
        </div>
        <div class="p-6 rounded-xl shadow-lg bg-gray-50 dark:bg-gray-800">
          <h3 class="text-xl font-semibold mb-2">Eligibility</h3>
          <ul class="space-y-2 text-gray-700 dark:text-gray-300">
            <li>🎮 Played Aviator within last 48 hours</li>
            <li>💰 Net losses of KES 200+ in last 24 hours</li>
            <li>✅ Verified active account</li>
            <li>🔟 Minimum 10 Aviator rounds</li>
            <li>📈 More play = higher chance of selection</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Cashback Examples -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-6">💰 Cashback Structure</h2>
      <div class="grid md:grid-cols-3 gap-6">
        <div
          class="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border-t-4 border-[#1C7928]"
        >
          <h3 class="text-lg font-bold text-[#1C7928] mb-2">Bronze</h3>
          <p>Stakes: KES 5,000<br />Net Loss: KES 1,000</p>
          <p class="mt-2 font-semibold">15% Cashback → KES 150</p>
        </div>
        <div
          class="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border-t-4 border-[#FEAF04]"
        >
          <h3 class="text-lg font-bold text-[#FEAF04] mb-2">Gold</h3>
          <p>Stakes: KES 20,000<br />Net Loss: KES 5,000</p>
          <p class="mt-2 font-semibold">25% Cashback → KES 1,250</p>
        </div>
        <div
          class="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border-t-4 border-red-500"
        >
          <h3 class="text-lg font-bold text-red-500 mb-2">Diamond</h3>
          <p>Stakes: KES 40,000<br />Net Loss: KES 15,000</p>
          <p class="mt-2 font-semibold">30% Cashback → KES 4,500</p>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-6">
        🌟 Why Hakibets Cashback Stands Out
      </h2>
      <div class="grid md:grid-cols-2 gap-6">
        <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <ul class="space-y-2">
            <li>✅ <strong>Real Cash Rewards</strong> — withdraw instantly</li>
            <li>
              ✅ <strong>Fair Random System</strong> — transparent & weighted
            </li>
            <li>
              ✅ <strong>Loyalty Recognition</strong> — better odds for
              consistent play
            </li>
            <li>✅ <strong>Hassle-Free</strong> — no opt-in needed</li>
          </ul>
        </div>
        <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h3 class="text-lg font-semibold mb-2">🎊 Exclusive Bonuses</h3>
          <ul class="space-y-2">
            <li>🔥 Weekend 1.5x cashback</li>
            <li>🎁 Month-end double cashback</li>
            <li>🎄 Holiday triple cashback</li>
            <li>🏆 Diamond VIP: guaranteed weekly selection</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section
      class="text-center bg-[#1C7928] text-white p-10 rounded-2xl shadow-xl"
    >
      <h2 class="text-3xl font-bold mb-4">
        🎉 Start Your Daily Cashback Journey
      </h2>
      <p class="mb-6 text-lg">
        Join thousands of Aviator players enjoying daily surprise cash rewards.
        <span class="font-semibold"
          >Play smart, stay loyal, and get rewarded!</span
        >
      </p>
      <RouterLink
        :to="{ name: 'aviator' }"
        class="px-6 py-3 bg-[#FEAF04] text-[#241E34] font-bold rounded-xl shadow-md hover:bg-yellow-400 transition"
      >
        🚀 Play Aviator Now
      </RouterLink>
      <p class="text-sm mt-4 text-gray-200">
        18+ | Terms & Conditions Apply | Please Play Responsibly
      </p>
    </section>
  </div>
</template>
