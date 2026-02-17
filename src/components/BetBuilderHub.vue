<template>
  <div
    class="max-w-md mx-auto bg-white dark:bg-[#241E34] rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
  >
    <!-- Header -->
    <div
      class="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700"
    >
      <img
        src="https://via.placeholder.com/32"
        alt="Competition Logo"
        class="w-8 h-8 rounded-full object-cover"
      />
      <h2 class="text-sm font-semibold text-gray-800 dark:text-gray-100">
        Premier League
      </h2>
    </div>

    <!-- Odds -->
    <div class="p-4 text-center">
      <div
        class="inline-block bg-[#1C7929] text-white font-bold px-4 py-2 rounded-lg shadow"
      >
        3.25 Odds
      </div>
    </div>

    <!-- Timeline / Selections -->
    <div class="relative px-6 pb-6">
      <!-- vertical line -->
      <div
        class="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-600"
      ></div>

      <ul class="space-y-5">
        <li class="relative pl-6">
          <span
            class="absolute -left-1 top-1.5 w-3 h-3 bg-[#1C7929] rounded-full"
          ></span>
          <p class="text-sm text-gray-700 dark:text-gray-200">
            Man City to Win
          </p>
        </li>
        <li class="relative pl-6">
          <span
            class="absolute -left-1 top-1.5 w-3 h-3 bg-[#FF7C2A] rounded-full"
          ></span>
          <p class="text-sm text-gray-700 dark:text-gray-200">Over 2.5 Goals</p>
        </li>
        <li class="relative pl-6">
          <span
            class="absolute -left-1 top-1.5 w-3 h-3 bg-[#1C79C0] rounded-full"
          ></span>
          <p class="text-sm text-gray-700 dark:text-gray-200">
            Both Teams to Score
          </p>
        </li>
      </ul>
    </div>

    <!-- Footer -->
    <div
      class="flex justify-between items-center p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1d172c]"
    >
      <button
        class="flex items-center gap-1 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[#1C7929] transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 12v.01M12 4v.01M20 12v.01M12 20v.01M7.5 7.5l9 9M16.5 7.5l-9 9"
          />
        </svg>
        Share
      </button>

      <button
        class="bg-[#1C7929] text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-[#166020] transition"
      >
        Add to Betslip
      </button>
    </div>
  </div>
</template>
