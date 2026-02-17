import { ref } from "vue";
import { useKiron } from "./useKiron";
export function useMainCategories() {
  const {
    hakiLeagueRouteName,
    // hakiTurboRouteName
  } = useKiron();
  const jetXId = import.meta.env.VITE_JETX_GAME_ID;

  const virtualId = import.meta.env.VITE_VIRTUAL_GAME_ID;
  const aviatorId = import.meta.env.VITE_AVIATOR_GAME_ID;

  const categories = ref([
    {
      name: "sport",
      path: "sport",
      bg: "bg-[#2BB24A]",
      img: "soccer.png",
    },
    { name: "live", path: "live", bg: "bg-[#DA1E25]" },
    {
      name: "crash",
      path: "crash",
      bg: "bg-gradient-to-r from-green-800 via-amber-600 to-green-700 hover:from-pink-500 hover:to-orange-500",
    },
    { name: "virtuals", path: "virtuals", bg: "bg-amber-600" },
    {
      name: "promotions",
      path: "promotions",
      bg: "bg-gradient-to-r from-[#58CC03] via-red-400 to-[#58CC03] hover:from-pink-500 hover:to-orange-500",
    },
    {
      name: "popular",
      path: "popular-games",
      bg: "bg-gradient-to-r from-fuchsia-500 via-red-400 to-[#56CB05] hover:from-pink-500 hover:to-orange-500",
    },
    {
      name: "new",
      path: "new-games",
      bg: "bg-gradient-to-r from-red-500 via-blue-400 to-[#56CB05] hover:from-pink-500 hover:to-orange-500",
    },
    {
      name: "affiliate",
      path: "join-affiliate",
      bg: "bg-gradient-to-r from-slate-50 via-violet-500 to-[#56CB05] hover:from-pink-500 hover:to-orange-500",
    },
    {
      name: "app",
      path: "app",
      bg: "bg-gradient-to-r from-pink-500 via-sky-400 to-[#56CB05] hover:from-pink-500 hover:to-orange-500",
    },
  ]);

  const moreOptions = ref([
    { name: "aviator", path: "aviator", bg: "bg-red-500" },
    { name: "soccer", path: "sport", bg: "bg-green-500" },
    {
      name: "crash",
      path: "crash",
      bg: "bg-gradient-to-r from-green-500 via-red-400 to-blue-500 hover:from-pink-500 hover:to-orange-500",
    },
    { name: "virtuals", path: "virtuals", bg: "bg-[#EDB846]" },
    // { name: "casino", path: "popular-games", bg: "bg-[#A9243B]" },
  ]);

  const sideGames = ref([
    {
      name: "aviator",
      category: "aviator",
      path: "aviator",
      img: "/aviator3.png",
      bg: "bg-red-500",
      id: aviatorId,
    },
    { name: "soccer", path: "sport", img: "/football.png", bg: "bg-green-500" },
    {
      name: "Haki League",
      category: "virtuals",
      path: hakiLeagueRouteName,
      img: "/haki-league.webp",
      bg: "bg-[#EDB846]",
      id: virtualId,
    },
    {
      name: "jetX",
      category: "casino",
      path: "popular-games",
      img: "/jetx.webp",
      bg: "bg-[#EDB846]",
      id: jetXId,
    },
    {
      name: "AviatriX",
      category: "casino",
      path: "popular-games",
      img: "/jetx.webp",
      bg: "bg-[#EDB846]",
      id: jetXId,
    },
  ]);

  return { categories, sideGames, moreOptions };
}
