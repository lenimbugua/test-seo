<template>
  <RouterLink :to="{ name: 'freebet' }" class="">
    <div
      class="flex space-x-2 bg-[#241E34]/80 dark:bg-lime-900/30 justify-center px-2 sm:px-0 py-2 rounded-md dark:border border-[#56CB05]"
    >
      <div class="max-w-2xl flex">
        <div class="text-yellow-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-gift h-6 w-6 md:w-12 md:h-12 text-yellow-300"
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
              class="w-full text-center flex space-x-2 text-md md:text-xl items-center text-white font-bold"
            >
              <span class="text-sm sm:text-md md:text-xl"
                >Congratulations you have a</span
              >
              <span class="text-sm sm:text-md md:text-xl text-yellow-300">Free Bet!</span>
            </h1>
          </div>
          <span
            class="text-sm sm:text-md md:text-xl font-bold text-[#56CB05] w-full text-center"
            >Click here to claim now!</span
          >
        </div>
      </div>
    </div>
  </RouterLink>
</template>
