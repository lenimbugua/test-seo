export const useGoTogooglePlay = () => {
  function goToGooglePlay() {
    const googlePlayUrl =
      "https://play.google.com/store/apps/details?id=com.hakibets&hl=en";
    window.open(googlePlayUrl, "_blank");
  }
  return {
    goToGooglePlay,
  };
};
