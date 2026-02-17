import { nextTick } from "vue";
import { useMatches2Store } from "../stores/matches2";

export function useScrollToViewedMatch() {
  const matchesStore = useMatches2Store();

  const saveScrolledPosition = () => {
    const container = document.querySelector(`.matches-scroll-container`);

    const { saveScrollPosition } = useMatches2Store();

    if (container) {
      console.log(container.scrollTop);
      saveScrollPosition(container.scrollTop);
    }
  };

  async function scrollToViewedMatch() {
    await nextTick();
    await new Promise((resolve) => setTimeout(resolve, 200));

    const container = document.querySelector(".matches-scroll-container");
    if (!container) return;

    if (!matchesStore.restoreScroll) {
      container.scrollTo({
        top: 0,
        behavior: "auto", // or "smooth" if you prefer
      });
      return;
    }

    // 👉 Otherwise restore previous position
    const scrollPos = matchesStore.consumeScrollPosition();
    console.log(scrollPos);
    container.scrollTo({
      top: scrollPos,
      behavior: "smooth",
    });
  }

  return { scrollToViewedMatch, saveScrolledPosition };
}
