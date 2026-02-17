import { ref } from "vue";
// import formatStuff from "../utilities/format-stuff";
import {
  casinoGamesRouteName,
  crashGamesRouteName,
  useCasino,
  virtualGamesRouteName,
} from "./useCasino";
import { useKiron } from "./useKiron";
export function useSecondaryNavGames() {
  //   const { formCloudflareImage } = formatStuff();
  const aviatorRoute = "aviator";
  const bethubRoute = "share-bets";
  const aviatrixId = import.meta.env.VITE_AVIATRIX_GAME_ID;
  const jetXId = import.meta.env.VITE_JETX_GAME_ID;
  const aviatorId = import.meta.env.VITE_AVIATOR_GAME_ID;

  const { hakiLeagueRouteName } = useKiron();

  const useRouterLauncher = "useRouterLauncher";
  const useCasinoLauncher = "useCasinoLauncher";

  //   const redBaronImg = formCloudflareImage(
  //     "b98514fc-63f7-4b54-5b60-c8017cade500"
  //   );

  const { launchCasino } = useCasino();
  function routeToGame(router, routeName) {
    router.push({ name: routeName });
  }

  function launchGame(router, params) {
    const { gameName, gameId, launcher, routeName, route } = params;
    switch (launcher) {
      case useRouterLauncher:
        routeToGame(router, route);
        break;
      case useCasinoLauncher:
        launchCasino(gameId, gameName, routeName);
        break;
      default:
        break;
    }
  }

  const games = ref([
    {
      gameId: aviatorId,
      gameName: "aviator",
      imgUrl: "/aviator3.png",
      launcher: useCasinoLauncher,
      routeName: crashGamesRouteName,
      route: aviatorRoute,

      new: false,
      hot: false,
    },
    {
      gameName: "Haki League",
      imgUrl: "/haki-league.png",
      launcher: useRouterLauncher,
      routeName: virtualGamesRouteName,
      route: hakiLeagueRouteName,
      new: true,
      hot: false,
    },
    {
      gameId: aviatrixId,
      gameName: "AviatriX",
      imgUrl: "/aviatrix1.webp",
      routeName: crashGamesRouteName,
      launcher: useCasinoLauncher,
      route: "",
      new: false,
      hot: false,
    },
    {
      gameId: jetXId,
      gameName: "JetX",
      imgUrl: "/jetx.webp",
      routeName: crashGamesRouteName,
      launcher: useCasinoLauncher,
      route: "",
      new: false,
      hot: false,
    },
    // {
    //   gameId: 2184,
    //   gameName: "Red Baron",
    //   providerName: "Evolution",
    //   routeName: crashGamesRouteName,
    //   launcher: useCasinoLauncher,
    //   route: "",
    //   imgUrl: "https://bshots.zubxoq92d.click/thumbnail/redbaron.png",
    //   imgFullUrl: "https://bshots.zubxoq92d.click/thumbnail/redbaron.png",
    //   new: true,
    //   hot: false,
    // },

    {
      gameId: 310,
      gameName: "Fire Strike 2",
      providerName: "Pragmatic Play",
      routeName: casinoGamesRouteName,
      launcher: useCasinoLauncher,
      route: "",
      imgUrl: "https://agstatic.com/games/pragmaticplay/fire_strike_2.jpg",
      new: true,
      hot: false,
    },

    // {
    //   gameId: 1029,
    //   gameName: "Aztec Gems",
    //   providerName: "Pragmatic Play",
    //   routeName: casinoGamesRouteName,
    //   launcher: useCasinoLauncher,
    //   route: "",
    //   imgUrl: "https://agstatic.com/games/pragmaticplay/vs5aztecgems.jpg",
    //   new: true,
    //   hot: false,
    // },
    // {
    //   gameId: 2184,
    //   gameName: "Red Baron",
    //   imgUrl: redBaronImg,
    //   launcher: useCasinoLauncher,
    //   route: "",
    //   new: true,
    //   hot: false,
    // },

    // {
    //   gameName: "Haki Turbo",
    //   imgUrl: "/haki-turbo.png",
    //   launcher: useRouterLauncher,
    //   route: hakiTurboRouteName,
    //   new: true,
    //   hot: false,
    // },
    {
      gameName: "Bet Hub",
      imgUrl: "/bethub1.png",
      launcher: useRouterLauncher,
      route: bethubRoute,
      new: true,
      hot: false,
    },
    {
      gameId: 552,
      gameName: "Football X",
      providerName: "SmartSoft",
      imgUrl: "https://agstatic.com/games/smartsoft/football_x.jpg",
      imgFullUrl: "https://agstatic.com/games/smartsoft/football_x.jpg",
      launcher: useCasinoLauncher,
      routeName: casinoGamesRouteName,
      live: false,
      hot: false,
    },
  ]);

  return {
    games,
    launchGame,
  };
}
