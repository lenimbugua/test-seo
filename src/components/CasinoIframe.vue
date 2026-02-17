<template>
  <div class="relative">
    <div class="w-full relative">
      <!---->
      <div class="relative">
        <iframe
          class="w-full lg:h-[calc(100dvh-10px)] h-[calc(100dvh)] xl:h-[calc(100dvh-10px)] 2xl:h-[calc(80dvh-10px)]"
          allow="fullscreen; autoplay; encrypted-media; accelerometer; gyroscope"
          allowfullscreen
          src="https://crash-games.betika.com/v2/game-launch?game_id=spribe_aviator&amp;provider=Spribe&amp;mode=R&amp;token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9iZXRpa2EuY29tIiwiaWF0IjoxNzMwMjA4MzY3LCJuYmYiOjE3Mjc2MTYzNjcsImV4cCI6MTczMjgwMDM2NywidXNlciI6eyJpZCI6IjI2ODk2OTE1IiwibW9iaWxlIjoiMjU0NzA0MjQxMjc0IiwiYmFsYW5jZSI6IjEwMC4wMCIsImJvbnVzIjoiNS4wMCIsInBvaW50cyI6bnVsbH19.HM5nC-YXvMxo_YN3SHSfMeVyDPq2FCTJ_IpKXOAcq1Y&amp;locale=EN&amp;platform=Desktop&amp;'timestamp=1730283359078"
        ></iframe>
      </div>
    </div>

    <div
      class="sticky bottom-0 flex justify-center items-center space-y-3 bg-muted p-4"
    >
      <div class="flex items-center space-x-2">
        <label
          for="airplane-mode"
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >Free Play</label
        ><button
          id="airplane-mode"
          class="peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input dark:bg-primary"
          role="switch"
          type="button"
          aria-checked="true"
          aria-required="false"
          data-state="checked"
          value="on"
          aria-label="Free Play"
        >
          <span
            data-state="checked"
            class="pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
          ></span></button
        ><!----><label
          for="airplane-mode"
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >Real Play</label
        >
      </div>
    </div>
  </div>
</template>
