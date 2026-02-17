export function useKiron() {
  const hakiLeagueRouteName = "haki-league";
  const hakiTurboRouteName = "haki-turbo";
  const hakiJackpotRouteName = "haki-virtual-jackpot";

  const hakiLeagueGameId = import.meta.env.VITE_HAKI_LEAGUE_GAME_ID;
  const hakiTurboGameId = import.meta.env.VITE_HAKI_TURBO_GAME_ID;
  const hakiJackpotGameId = import.meta.env.VITE_KIRON_JACKPOT_GAME_ID;

  return {
    hakiLeagueRouteName,
    hakiTurboRouteName,
    hakiJackpotRouteName,
    hakiLeagueGameId,
    hakiTurboGameId,
    hakiJackpotGameId,
  };
}
