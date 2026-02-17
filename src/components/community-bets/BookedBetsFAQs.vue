<script setup>
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/vue/24/outline";
import { ref } from "vue";
const faqs = ref([
  {
    isOpened: true,
    id: 1,
    title: "What is Bet Hub?",
    description:
      "Bet Hub is your go-to library of bet IDs (share codes), packed with the hottest picks and ready-made bets from fellow punters. It’s your shortcut to smart, winning combos!",
  },
  {
    isOpened: true,
    id: 2,
    title: "How do I use Bet Hub?",
    description:
      "Head to the Bet Hub section on the site, where you can easily browse and filter bet IDs (Share Codes) by top leagues, today's matches, or your favorite competitions. Found one you like? Just a few clicks and you're ready to place your bet!",
  },
  {
    isOpened: true,
    id: 3,
    title: "Can I trust the bet IDs in Bet Hub?",
    description:
      "Absolutely! These are genuine picks shared by fellow punters. Just keep in mind—betting involves both luck and strategy. There are no sure things, but there’s plenty of excitement!",
  },
  {
    isOpened: false,
    id: 5,
    title: "Why should I use Bet Hub?",
    description:
      "t’s fast, simple, and saves you the trouble of creating bets from scratch. Plus, you get a sneak peek at what other punters are backing – the latest trends and top picks!",
  },
  {
    isOpened: false,
    id: 8,
    title: "What can I do with my Bet ID (Share Code)?",
    description: `-Save for later – place the bet whenever it suits you.
-Share with friends – let them try your winning picks.
-Revisit your selections – no need to rebuild your betslip.`,
  },
  {
    isOpened: false,
    id: 10,
    title: "How long does my Bet ID stay valid?",
    description:
      "our Bet ID (Share Code) stays active right up until the last match in your selection starts. Once it kicks off, the code expires.",
  },
  {
    isOpened: false,
    id: 11,
    title: "Why should I use Book Bet?",
    description:
      "It’s perfect for when you’re inspired but not ready to place a bet. Save time, avoid rush decisions, and share your selections with your squad!",
  },
]);
</script>
<template>
  <div class="py-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div
      v-for="faq in faqs"
      :key="faq.id"
      class="w-full mb-2 dark:bg-white/5 rounded-md border dark:border-dark-purple-17"
      @click="faq.isOpened = !faq.isOpened"
    >
      <div
        :class="[faq.isOpened ? 'border-b dark:border-dark-purple-21' : '']"
        class="w-full flex justify-between items-center p-2 text-black dark:text-white"
      >
        <div class="text-lg">{{ faq.title }}</div>

        <div>
          <ChevronUpIcon v-if="faq.isOpened" class="h-5 w-5" />
          <ChevronDownIcon v-else class="h-5 w-5" />
        </div>
      </div>
      <div v-if="faq.isOpened" class="p-3 dark:text-slate-400">
        <p>{{ faq.description }}</p>
      </div>
    </div>
  </div>
</template>
