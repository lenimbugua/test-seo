<template>
  <nav
    data-v-cbbe0ee5=""
    class="fixed bottom-0 w-full bg-gradient-to-t from-green-800 to-green-600 dark:bg-gray-800 px-2 py-2 flex justify-between items-center z-50"
  >
    <a
      aria-current="page"
      href="/m"
      class="router-link-active router-link-exact-active flex flex-col items-center w-1/5 cursor-pointer text-white"
      ><i class="fi text-lg fi-rr-home"></i><span class="text-xs">Home</span></a
    ><a
      href="/m/sports"
      class="flex flex-col items-center w-1/5 cursor-pointer text-gray-300"
      ><i class="el-icon mb-1" style="font-size: 20px"
        ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
          <path
            fill="currentColor"
            d="M512 960a448 448 0 1 1 0-896 448 448 0 0 1 0 896m0-64a384 384 0 1 0 0-768 384 384 0 0 0 0 768"
          ></path>
          <path
            fill="currentColor"
            d="M186.816 268.288c16-16.384 31.616-31.744 46.976-46.08 17.472 30.656 39.808 58.112 65.984 81.28l-32.512 56.448a385.984 385.984 0 0 1-80.448-91.648zm653.696-5.312a385.92 385.92 0 0 1-83.776 96.96l-32.512-56.384a322.923 322.923 0 0 0 68.48-85.76c15.552 14.08 31.488 29.12 47.808 45.184zM465.984 445.248l11.136-63.104a323.584 323.584 0 0 0 69.76 0l11.136 63.104a387.968 387.968 0 0 1-92.032 0m-62.72-12.8A381.824 381.824 0 0 1 320 396.544l32-55.424a319.885 319.885 0 0 0 62.464 27.712l-11.2 63.488zm300.8-35.84a381.824 381.824 0 0 1-83.328 35.84l-11.2-63.552A319.885 319.885 0 0 0 672 341.184l32 55.424zm-520.768 364.8a385.92 385.92 0 0 1 83.968-97.28l32.512 56.32c-26.88 23.936-49.856 52.352-67.52 84.032-16-13.44-32.32-27.712-48.96-43.072zm657.536.128a1442.759 1442.759 0 0 1-49.024 43.072 321.408 321.408 0 0 0-67.584-84.16l32.512-56.32c33.216 27.456 61.696 60.352 84.096 97.408zM465.92 578.752a387.968 387.968 0 0 1 92.032 0l-11.136 63.104a323.584 323.584 0 0 0-69.76 0zm-62.72 12.8 11.2 63.552a319.885 319.885 0 0 0-62.464 27.712L320 627.392a381.824 381.824 0 0 1 83.264-35.84zm300.8 35.84-32 55.424a318.272 318.272 0 0 0-62.528-27.712l11.2-63.488c29.44 8.64 57.28 20.736 83.264 35.776z"
          ></path></svg></i
      ><span class="text-xs">Sports</span></a
    ><button
      class="flex flex-col items-center w-1/5 h-full cursor-pointer relative"
    >
      <div
        class="bg-yellow-400 absolute -top-6 text-gray-800 rounded-full w-9 h-9 flex items-center justify-center mb-1 font-bold"
      >
        <span>1</span>
      </div>
      <span class="text-xs mt-6 text-gray-300">Betslip</span>
    </button>
    <div class="el-overlay is-drawer" style="z-index: 2007; display: none">
      <div
        aria-modal="true"
        aria-label="Betslip"
        aria-describedby="el-id-1024-11"
        class="el-drawer btt"
        role="dialog"
        style="height: auto"
      >
        <span class="el-drawer__sr-focus" tabindex="-1"></span
        ><!--v-if--><!--v-if--><!--v-if--><!--v-if-->
      </div>
    </div>
    <a
      href="/m/casino"
      class="flex flex-col items-center w-1/5 cursor-pointer text-gray-300"
      ><i class="fi text-lg fi-rr-playing-cards"></i
      ><span class="text-xs">Casino</span></a
    ><a
      href="/m/mybets"
      class="flex flex-col items-center w-1/5 cursor-pointer text-gray-300"
      ><i class="fi text-lg fi-rs-member-list"></i
      ><span class="text-xs">My Bets</span></a
    >
  </nav>
</template>
