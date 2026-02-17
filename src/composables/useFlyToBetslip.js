/**
 * Fly-to-betslip animation.
 * Creates a small green dot that arcs from the clicked odds button
 * to the betslip icon (mobile footer or desktop sidebar).
 */
export function useFlyToBetslip() {
  function triggerFlyAnimation(event) {
    const source = event?.currentTarget;
    if (!source) return;

    const target = document.querySelector('[data-fly-target="betslip"]');
    if (!target) return;

    const sourceRect = source.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    const startX = sourceRect.left + sourceRect.width / 2;
    const startY = sourceRect.top + sourceRect.height / 2;
    const endX = targetRect.left + targetRect.width / 2;
    const endY = targetRect.top + targetRect.height / 2;

    const dot = document.createElement("div");
    dot.style.cssText = `
      position: fixed;
      left: ${startX - 6}px;
      top: ${startY - 6}px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #22c55e;
      box-shadow: 0 0 8px rgba(34, 197, 94, 0.6);
      z-index: 9999;
      pointer-events: none;
    `;
    document.body.appendChild(dot);

    const dx = endX - startX;
    const dy = endY - startY;

    dot.animate(
      [
        { transform: "translate(0, 0) scale(1)", opacity: 1 },
        {
          transform: `translate(${dx * 0.5}px, ${dy * 0.5 - 40}px) scale(0.7)`,
          opacity: 1,
          offset: 0.5,
        },
        {
          transform: `translate(${dx}px, ${dy}px) scale(0.3)`,
          opacity: 0,
        },
      ],
      { duration: 500, easing: "ease-in", fill: "forwards" }
    ).onfinish = () => {
      dot.remove();

      // Bounce the betslip target on arrival
      target.animate(
        [
          { transform: "scale(1)" },
          { transform: "scale(1.2)", offset: 0.4 },
          { transform: "scale(0.95)", offset: 0.7 },
          { transform: "scale(1)" },
        ],
        { duration: 350, easing: "ease-out" }
      );
    };
  }

  return { triggerFlyAnimation };
}
