<template>
  <div class="min-h-dvh bg-[#241E34] text-white">
    <!-- Header -->
    <header
      class="container mx-auto px-4 py-6 flex justify-between items-center"
    >
      <div class="text-2xl font-bold">BetWinner</div>
      <nav class="hidden md:flex space-x-6">
        <a href="#" class="hover:text-purple-400 transition-colors">Sports</a>
        <a href="#" class="hover:text-purple-400 transition-colors">Casino</a>
        <a href="#" class="hover:text-purple-400 transition-colors"
          >Live Betting</a
        >
        <a href="#" class="hover:text-purple-400 transition-colors"
          >Promotions</a
        >
      </nav>
      <button
        class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
      >
        Sign Up
      </button>
    </header>

    <!-- Hero Section -->
    <section
      class="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center"
    >
      <div class="md:w-1/2 mb-10 md:mb-0">
        <h1 class="text-5xl font-bold mb-6 leading-tight">
          Bet Smarter, <span class="text-purple-400">Win Bigger</span>
        </h1>
        <p class="text-xl mb-8 text-gray-300">
          Join the ultimate betting experience. Get started with a 100% bonus on
          your first deposit!
        </p>
        <button
          class="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-3 rounded-full flex items-center"
        >
          Start Betting Now <ArrowRight class="ml-2" />
        </button>
      </div>
      <div class="md:w-1/2">
        <!-- <img
          src="/placeholder.svg?height=400&width=600"
          alt="Betting excitement"
          class="rounded-lg shadow-2xl"
        /> -->
      </div>
    </section>

    <!-- Features Section -->
    <section class="bg-[#2D2847] py-20">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold mb-12 text-center">
          Why Choose BetWinner?
        </h2>
        <div class="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon="Trophy"
            title="Best Odds"
            description="We offer the most competitive odds in the market, maximizing your potential winnings."
            icon-class="text-yellow-400"
          />
          <FeatureCard
            icon="DollarSign"
            title="Instant Payouts"
            description="Withdraw your winnings instantly. No delays, no hassle."
            icon-class="text-green-400"
          />
          <FeatureCard
            icon="Users"
            title="24/7 Support"
            description="Our dedicated support team is always ready to assist you, anytime, anywhere."
            icon-class="text-blue-400"
          />
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="container mx-auto px-4 py-20 text-center">
      <h2 class="text-4xl font-bold mb-6">Ready to Start Winning?</h2>
      <p class="text-xl mb-8 text-gray-300">
        Join thousands of winners and start your betting journey today!
      </p>
      <button
        class="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-3 rounded-full"
      >
        Create Your Account
      </button>
    </section>

    <!-- Footer -->
    <footer class="bg-[#1A1525] py-10">
      <div class="container mx-auto px-4 text-center text-gray-400">
        <p>&copy; 2023 BetWinner. All rights reserved.</p>
        <p class="mt-2">Please gamble responsibly. 18+</p>
      </div>
    </footer>
  </div>
</template>

<!-- <script>
import { Trophy, DollarSign, Users, ArrowRight } from "lucide-vue-next";

export default {
  name: "BettingLandingPage",
  components: {
   
    ArrowRight,
    FeatureCard: {
      props: ["icon", "title", "description", "iconClass"],
      template: `
          <div class="bg-[#241E34] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <component :is="icon" :class="['w-12 h-12', iconClass]" class="mb-4" />
            <h3 class="text-2xl font-semibold mb-2">{{ title }}</h3>
            <p class="text-gray-300">{{ description }}</p>
          </div>
        `,
    },
  },
};
</script> -->

<style scoped>
/* Add additional styling if necessary */
</style>
