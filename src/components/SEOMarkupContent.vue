<script setup>
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/vue/20/solid";
import { ref } from "vue";

const isHidden = ref(true);
</script>
<template>
  <article
    class="prose text-sm max-w-full p-1 mx-auto dark:text-slate-500 items-center"
  >
    <div class="border dark:border-dark-purple-19 rounded-lg p-2">
      <h1
        :class="['dark:text-slate-400']"
        class="text-sm md:text-xl cursor-pointer flex justify-between w-full leading-tight mb-0"
        @click="isHidden = !isHidden"
      >
        <span>About Soccer Betting</span>
        <ChevronDownIcon v-if="!isHidden" class="fill-current h-6 w-6 sm:w-8" />
        <ChevronRightIcon v-else class="fill-current h-6 w-6 sm:w-8" />
      </h1>
      <div v-show="!isHidden">
        <!-- Hero Section -->
        <section class="bg-[#241E34] text-white py-10 text-center">
          <h1 class="text-4xl font-bold mb-4">Sports Betting at Hakibets</h1>
          <p class="text-lg leading-relaxed max-w-3xl mx-auto">
            Join our community of soccer betting fans with Hakibets. Register
            and deposit money in your wallet to bet on your favourite football
            teams.
          </p>
        </section>

        <!-- Main Content -->
        <div class="max-w-4xl mx-auto py-10 px-5 space-y-10">
          <!-- Global Football Section -->
          <section>
            <h2 class="text-2xl font-semibold text-indigo-700 mb-3">
              Global Soccer Betting
            </h2>
            <p class="text-base leading-relaxed">
              Whether you call it soccer or football, the lovely game draws
              crowds and punters from around the globe. Now you can join in the
              spirit of Hakibets football from home by placing an online bet on
              almost any professional football league worldwide.
            </p>
            <p class="mt-3">
              Follow us for great soccer betting tips, the latest football news,
              and predictions. Our expert information could make you the next
              millionaire in Kenya through online sports betting!
            </p>
          </section>

          <!-- English Premier League Section -->
          <section>
            <h2 class="text-2xl font-semibold text-indigo-700 mb-3">
              Place English Premier League Soccer Bets
            </h2>
            <p class="text-base leading-relaxed">
              There is a lot of English Premier League action on Hakibets,
              guaranteeing many betting markets. Many Kenyan punters are English
              Premier League fans, as shown by Kenya’s love for Arsenal and
              Manchester United.
            </p>
            <p class="mt-3">
              Customers can select from Arsenal, Manchester City, Chelsea, and
              Liverpool. With English Premier League action year-round,
              customers have many opportunities to win.
            </p>
          </section>

          <!-- Local Teams Section -->
          <section>
            <h2 class="text-2xl font-semibold text-indigo-700 mb-3">
              Keep it Real with Local Team Support
            </h2>
            <p class="text-base leading-relaxed">
              Hakibets proudly supports Kenyan football. We feature local teams
              in our sports markets, allowing you to bet on the Kenyan Premier
              League. From AFC Leopards in the Western region to Gor Mahia in
              the Nyanza region, fans have impressive odds for their favourite
              teams.
            </p>
          </section>

          <!-- Call to Action Section -->
          <section class="bg-indigo-50 border border-indigo-200 rounded-lg p-5">
            <h2 class="text-xl font-bold text-[#241E34] mb-4">
              Open a Hakibets Soccer Betting Account and Strike a Goal
            </h2>
            <p class="text-base leading-relaxed">
              Register for a betting account with Hakibets to enjoy higher odds
              and massive wins. Our secure portal ensures safe transactions,
              including instant deposits and withdrawals.
            </p>
          </section>

          <!-- How to Register Section -->
          <section>
            <h2 class="text-2xl font-semibold text-indigo-700 mb-3">
              How to Register for Soccer Betting with Hakibets
            </h2>
            <ol class="list-decimal list-inside space-y-3">
              <li>You must be at least 18 years old to register.</li>
              <li>
                Visit
                <a
                  href="https://www.hakibets.com"
                  class="text-blue-600 underline"
                  >www.hakibets.com</a
                >
                on your PC or phone.
              </li>
              <li>
                Click the <span class="font-bold">Join</span> icon at the top
                right of the website.
              </li>
              <li>
                Enter your phone number and a secure password containing
                uppercase, lowercase, and symbols.
              </li>
              <li>Verify your account with the OTP code sent to your phone.</li>
              <li>
                Accept Hakibets' terms and conditions to activate your account.
              </li>
            </ol>
            <p class="mt-3">
              Once registered, you can deposit funds and start placing bets on
              your favourite teams.
            </p>
          </section>
        </div>
      </div>
    </div>
  </article>
</template>
