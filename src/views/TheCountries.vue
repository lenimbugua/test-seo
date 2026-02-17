<template>
  <div class="matches-scroll-container border shadow dark:border-dark-purple-17 rounded-md">
    <div
      class="flex items-center justify-between space-x-2 py-1.5 dark:text-gray-50"
    >
      <div class="flex items-center space-x-2">
        <ChevronLeftIcon
          class="w-7 h-7 cursor-pointer"
          @click="$router.go(-1)"
        />
        <div>Back</div>
      </div>
      <div class="font-bold">A to Z Countries</div>
      <div class="font-bold"></div>
    </div>
    <LeagueCard />

  </div>
</template>
