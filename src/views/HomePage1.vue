<script setup>
// import HomePageCategories from "../components/HomePageCategories.vue";
</script>

<template>
  <div class="font-sans">
    <!-- Hero Section -->
    <section
      class="relative bg-gradient-to-b from-[#241E34] to-gray-900 text-white"
    >
      <div class="container mx-auto px-6 py-20 text-center">
        <h1 class="text-4xl md:text-6xl font-bold mb-6">
          Bet Smarter, Win Bigger!
        </h1>
        <p class="text-lg md:text-xl mb-8">
          Join Hakibets and take your betting experience to the next level.
          Enjoy competitive odds, live games, and unbeatable bonuses.
        </p>
        <a
          href="#features"
          class="bg-white text-[#241E34] px-8 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-gray-200 transition"
          >Explore Features</a
        >
      </div>
      <div
        class="absolute inset-0 bg-cover bg-center opacity-20"
        style="
          background-image: url('https://source.unsplash.com/1600x900/?soccer,betting');
        "
      ></div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-20 bg-gray-800">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
          Why Choose Hakibets?
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="text-center">
            <div
              class="flex items-center justify-center w-16 h-16 bg-[#241E34] text-white rounded-full mx-auto mb-6"
            >
              <svg
                class="w-8 h-8"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Fast and Secure</h3>
            <p class="text-gray-400">
              Experience lightning-fast transactions with top-notch security.
            </p>
          </div>

          <!-- Feature 2 -->
          <div class="text-center">
            <div
              class="flex items-center justify-center w-16 h-16 bg-[#241E34] text-white rounded-full mx-auto mb-6"
            >
              <svg
                class="w-8 h-8"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7v-3a4 4 0 00-8 0v3M5 21h14a2 2 0 002-2v-7H3v7a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Trusted by Thousands</h3>
            <p class="text-gray-400">
              Join a growing community of betting enthusiasts worldwide.
            </p>
          </div>

          <!-- Feature 3 -->
          <div class="text-center">
            <div
              class="flex items-center justify-center w-16 h-16 bg-[#241E34] text-white rounded-full mx-auto mb-6"
            >
              <svg
                class="w-8 h-8"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9.75 17L15 12l-5.25-5"
                />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Live Betting</h3>
            <p class="text-gray-400">
              Bet on live games and feel the thrill of real-time wins.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Call-to-Action Section -->
    <section class="py-20 bg-[#241E34] text-white text-center">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">Ready to Win Big?</h2>
        <p class="text-lg md:text-xl mb-8">
          Sign up now and claim your exclusive welcome bonus. The best odds are
          just a click away!
        </p>
        <a
          href="/register"
          class="bg-white text-[#241E34] px-10 py-4 rounded-lg text-lg font-semibold shadow-lg hover:bg-gray-200 transition"
          >Get Started</a
        >
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-6 bg-gray-900 text-gray-400 text-center">
      <p>&copy; 2024 Hakibets. All Rights Reserved.</p>
    </footer>
  </div>
  <!-- <div class="h-dvh overflow-y-scroll bg-dark-purple-20">
    <div class="bg-[url('/bg.png')] sm:bg-[url('/dstp.png')] bg-cover bg-center h-[50vh] sm:h-dvh">
      <div class="">
        <TransparentHeader />
      </div>

      <TagLine />
    </div>

      <HomePageCategories />
    <Footer />
  </div> -->
</template>
