<template>
  <div
    class="w-full h-full max-w-[1680px] mx-auto overflow-scroll pt-3 animate-pulse px-3"
  >
    <div class="flex">
      <div class="w-64 pr-3">
        <div
          class="w-full h-8 animate-pulse dark:bg-black/50 bg-black/50 rounded-md"
        ></div>
        <div v-for="i in 18" :key="i" class="w-full block my-0.5 rounded-md">
          <div class="flex space-x-2 w-full">
            <div
              class="w-5 h-5 animate-pulse dark:bg-black/30 bg-black/20 my-0.5"
            ></div>
            <div
              class="w-2/3 h-5 animate-pulse dark:bg-black/30 bg-black/20 my-0.5 rounded-md"
            ></div>
          </div>
          <div class="flex">
            <div
              class="w-5 h-5 animate-pulse dark:bg-black/30 bg-black/20 my-0.5"
            ></div>
            <div
              class="w-full h-5 animate-pulse dark:bg-black/30 bg-black/20 my-0.5 rounde-r-md"
            ></div>
          </div>
        </div>
      </div>
      <div class="w-full">
        <!-- <SecondaryNav /> -->

        <div class="rounded-lg overflow-clip">
          <div
            class="w-full h-52 animate-pulse dark:bg-black/50 bg-black/50"
          ></div>
        </div>

        <div
          class="w-full h-10 animate-pulse dark:bg-black/30 bg-black/30 my-1 rounded-md"
        ></div>
        <CasinoGridLoader />
      </div>
    </div>
  </div>
</template>
