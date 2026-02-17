<script setup>
import { useModalTypes } from "@/composables/useModalTypes";
import { useLoginStore } from "@/stores/login.js";
import { useModalStore } from "@/stores/modal";
import { toRefs } from "vue";
import { useRouter } from "vue-router";
import { useSecondaryNavGames } from "../composables/useSecondaryNavGames";
const { sportsIconsModal } = useModalTypes();
const { openModal } = useModalStore();

const router = useRouter();
const { games, launchGame } = useSecondaryNavGames();
function loginBeforeLaunching(router, game) {
  const { isAuthenticated } = toRefs(useLoginStore());
  const { gameId } = game;
  if (parseInt(gameId) === 2184 && !isAuthenticated.value) {
    const { setAfterLoginAction } = useLoginStore();
    const { openLoginModal } = useLoginStore();
    setAfterLoginAction(() => launchGame(router, game));
    openLoginModal();
    return;
  }
  launchGame(router, game);
}
</script>
<template>
  <!-- <div
      class="bg-gray-300 dark:bg-[#504B5D] absolute z-[990] h-full left-0 flex md:hidden items-end text-end px-0.5 shadow-lg rounded-l-md border border-r-0 dark:border-dark-purple-23"
      @click="goToHot"
    >
      <MoreTab name="Hot" />
    </div> -->
  <div
    class="relative scrollbar-hide items-center flex justify-between whitespace-nowrap no-scrollbar overflow-x-auto overflow-y-visible overflow-hidden"
  >
    <div
      class="flex items-center sticky left-0 bg-white dark:bg-[#393444] z-50 border-r dark:border-white/15"
    >
      <GameLinkIconLayout
        v-for="game in games.slice(0, 2)"
        :key="game.gameName"
        :icon="game.imgUrl"
        :name="game.gameName"
        :is-new="game.new"
        @click="loginBeforeLaunching(router, game)"
      />
    </div>
    <div class="flex items-center justify-between ml-3">
      <GameLinkIconLayout
        v-for="game in games.slice(2)"
        :key="game.gameName"
        :icon="game.imgUrl"
        :name="game.gameName"
        :is-new="game.new"
        @click="loginBeforeLaunching(router, game)"
      />
    </div>
    <SportsGamesLink />
    <div
      class="sticky -right-1.5 bg-white dark:bg-[#393444]"
      @click="openModal(sportsIconsModal)"
    >
      <MoreTab />
    </div>
  </div>
</template>
