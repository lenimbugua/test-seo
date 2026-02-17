<template>
  <HeaderLinks />
  <div
    class="bonus-view bg-slate-50 dark:bg-[#1C1627] text-slate-900 dark:text-white"
  >
    <!-- ─── Fixed Mesh-Gradient Background ─── -->
    <div class=" inset-0 overflow-hidden" style="z-index: 0">
      <div class="absolute inset-0 bg-slate-50 dark:bg-[#1C1627]" />
      <!-- Green orb – top-left -->
      <div
        class="mesh-orb opacity-0 dark:opacity-100 transition-opacity duration-500"
        style="
          top: -10%;
          left: -8%;
          width: 560px;
          height: 560px;
          background: radial-gradient(
            circle,
            rgba(22, 163, 74, 0.3) 0%,
            transparent 70%
          );
          filter: blur(70px);
        "
      />
      <!-- Amber orb – bottom-right (drifting) -->
      <div
        class="mesh-orb mesh-orb--drift opacity-0 dark:opacity-100 transition-opacity duration-500"
        style="
          bottom: -14%;
          right: -6%;
          width: 500px;
          height: 500px;
          background: radial-gradient(
            circle,
            rgba(245, 158, 11, 0.2) 0%,
            transparent 70%
          );
          filter: blur(90px);
        "
      />
      <!-- Faint green orb – centre -->
      <div
        class="mesh-orb opacity-0 dark:opacity-100 transition-opacity duration-500"
        style="
          top: 42%;
          left: 38%;
          width: 360px;
          height: 360px;
          background: radial-gradient(
            circle,
            rgba(22, 163, 74, 0.15) 0%,
            transparent 70%
          );
          filter: blur(75px);
        "
      />
    </div>

    <!-- ─── Scrollable Content ─── -->
    <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-6">
      <!-- ══════════════════════════════════════════════
           HEADER — Bonus Wallet
           ══════════════════════════════════════════════ -->
      <div class="relative mb-4 group">
        <div
          class="absolute -inset-10 rounded-[4rem] pointer-events-none opacity-40 dark:opacity-70 transition-opacity duration-700 group-hover:opacity-100"
          style="
            background: radial-gradient(
              circle at 20% 50%,
              rgba(22, 163, 74, 0.35) 0%,
              rgba(245, 158, 11, 0.15) 45%,
              transparent 75%
            );
            filter: blur(60px);
          "
        ></div>

        <div
          class="relative overflow-hidden rounded-2xl bg-green-900 border border-white/20 dark:border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] transition-all duration-500"
        >
          <button
            class="ml-2 mt-1 flex items-center gap-2 text-slate-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-amber-500 transition-all duration-300 w-fit"
          >
            <div
              class="p-2 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 group-hover:translate-x-[-4px] transition-transform"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="3"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </div>
            <span class="text-[10px] uppercase tracking-[0.3em] font-black"
              >Back</span
            >
          </button>
          <div class="flex w-full justify-between pr-7 sm:justify-start">
            <div class="pointer-events-none">
              <img
                src="https://imagedelivery.net/ZY5OwFLlTE2ePHl_IE20jg/cb2c95ac-d627-4a55-492a-1c85a9158c00/public"
                alt="Bonus wallet decoration"
                class="w-52 h-48 sm:w-94 sm:h-64 object-cover object-center mix-blend-screen transition-transform duration-1000"
                style="
                  mask-image: radial-gradient(
                    ellipse at 25% 50%,
                    black 20%,
                    transparent 85%
                  );
                "
              />
            </div>
            <div
              class="relative z-20 flex flex-col justify-between min-h-[260px]"
            >
              <div
                class="flex flex-col items-end sm:items-start sm:pl-[42%] mt-6"
              >
                <div class="flex flex-col items-end sm:items-start group/text">
                  <span
                    class="text-slate-500 dark:text-green-400/80 text-xs font-black uppercase tracking-widest mb-2 flex items-center gap-2"
                  >
                    <span class="relative flex h-2 w-2">
                      <span
                        class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
                      ></span>
                      <span
                        class="relative inline-flex rounded-full h-2 w-2 bg-green-500"
                      ></span>
                    </span>
                    Total Bonus Balance
                  </span>
                  <h1
                    class="text-4xl sm:text-5xl font-black text-white dark:text-white tracking-tighter leading-none transition-transform group-hover/text:scale-[1.02]"
                  >
                    <span
                      class="text-green-600 tracking-widest dark:text-amber-500 text-lg sm:text-2xl mr-1 font-bold"
                      >KES</span
                    >210.00
                  </h1>
                </div>
                <div class="mt-8 group/badge cursor-pointer">
                  <div
                    class="-inset-1 bg-gradient-to-r from-green-600 to-amber-500 rounded-2xl blur opacity-20 group-hover/badge:opacity-50 transition duration-500"
                  ></div>
                  <div
                    class="relative flex items-center gap-4 bg-white/80 dark:bg-black/40 backdrop-blur-md border border-slate-200 dark:border-white/10 px-7 py-3 rounded-2xl"
                  >
                    <div class="relative">
                      <svg
                        class="h-5 w-5 text-green-600 dark:text-amber-500 transition-transform group-hover/badge:rotate-12"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                        <path
                          fill-rule="evenodd"
                          d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <span
                      class="whitespace-nowrap text-xs font-black tracking-[0.2em] uppercase text-slate-700 dark:text-gray-200"
                      >Bonus Wallet</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="absolute inset-0 pointer-events-none">
            <div
              class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
              style="
                background: linear-gradient(
                  45deg,
                  transparent 45%,
                  rgba(255, 255, 255, 0.1) 50%,
                  transparent 55%
                );
                background-size: 200% 200%;
                animation: shimmer 3s infinite;
              "
            ></div>
          </div>
        </div>
      </div>

      <!-- ══════════════════════════════════════════════
           TAB SWITCHER
           ══════════════════════════════════════════════ -->
      <div class="flex justify-center mb-2">
        <div
          class="flex gap-1 p-1 rounded-xl bg-slate-100 dark:bg-white/[.04] border border-slate-200 dark:border-white/[.06]"
        >
          <button
            class="px-5 py-[0.45rem] rounded-lg text-sm font-semibold tracking-[0.04em] bg-white dark:bg-white/[.08] text-green-700 dark:text-green-400 border border-green-600/30 dark:border-green-600/20 shadow-sm cursor-pointer transition-all"
          >
            Active Bonus
          </button>
          <button
            class="px-5 py-[0.45rem] rounded-lg text-sm font-semibold tracking-[0.04em] border border-transparent text-slate-500 dark:text-gray-500 hover:text-slate-700 dark:hover:text-gray-300 hover:bg-slate-100 dark:hover:bg-white/[.04] cursor-pointer transition-all"
          >
            Bonus History
          </button>
        </div>
      </div>

      <!-- green → amber divider -->
      <div
        class="h-px my-6"
        style="
          background: linear-gradient(
            90deg,
            transparent,
            rgba(22, 163, 74, 0.15) 40%,
            rgba(245, 158, 11, 0.15) 60%,
            transparent
          );
        "
      />

      <!-- ══════════════════════════════════════════════
           BONUS CARDS
           ══════════════════════════════════════════════ -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div
          v-for="i in 4"
          :key="i"
          class="bonus-card group relative overflow-hidden rounded-xl bg-white/80 dark:bg-[#251E34]/80 backdrop-blur-md border border-slate-200 dark:border-white/10 p-5 cursor-pointer shadow-md dark:shadow-lg transition-all duration-300"
        >
          <!-- top accent line -->
          <div
            class="absolute top-0 left-0 right-0 h-px"
            style="
              background: linear-gradient(
                90deg,
                transparent 10%,
                rgba(22, 163, 74, 0.3) 50%,
                transparent 90%
              );
            "
          />
          <!-- amber corner sparkle (hover) -->
          <div
            class="absolute top-2 right-2 w-10 h-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style="
              background: radial-gradient(
                circle,
                rgba(245, 158, 11, 0.22) 0%,
                transparent 70%
              );
              filter: blur(5px);
            "
          />

          <!-- ── Icon + Title row ── -->
          <div class="flex justify-between items-start mb-4 relative z-10">
            <div class="flex items-center gap-3">
              <!-- green icon badge -->
              <div
                class="w-10 h-10 rounded-lg flex items-center justify-center bg-green-50 dark:bg-green-600/[.15] border border-green-200 dark:border-green-600/[.2]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-green-600 dark:text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="1.5"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6v12M9.5 8.5c0-.83.67-1.5 2.5-1.5s2.5.67 2.5 1.5-.67 1.5-2.5 1.5-2.5.67-2.5
                       1.5.67 1.5 2.5 1.5 2.5.67 2.5 1.5-.67 1.5-2.5 1.5"
                  />
                </svg>
              </div>

              <div>
                <h3
                  class="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-gray-200"
                >
                  {{ i === 1 ? "Deposit Bonus" : "Tax Free Bonus" }}
                  <!-- amber accent chevron -->
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5 text-amber-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2.5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </h3>
                <p
                  class="text-[10px] text-slate-400 dark:text-gray-600 tracking-wider mt-0.5"
                >
                  EXP · 07/02 16:00
                </p>
              </div>
            </div>

            <!-- source label -->
            <span
              class="text-[0.6rem] tracking-[0.1em] uppercase text-green-600 bg-green-500/[.2] border border-slate-200 dark:border-white/[.05] px-2 py-0.5 rounded"
              >{{ i % 2 === 0 ? "active" : "expired" }}</span
            >
          </div>

          <!-- ── Amount + Earn CTA ── -->
          <div class="flex justify-between items-center mb-5 relative z-10">
            <div class="flex items-baseline gap-1.5">
              <span
                class="font-black text-slate-900 dark:text-white"
                style="
                  font-size: clamp(1.75rem, 5vw, 2.5rem);
                  line-height: 1;
                  letter-spacing: -0.02em;
                "
                >{{ i < 3 ? "200.00" : "10.00" }}</span
              >
              <span
                class="text-[10px] text-slate-400 dark:text-gray-600 uppercase tracking-widest"
                >KES</span
              >
            </div>

            <!-- amber "Earn It" button -->
            <button class="earn-btn">
              <span>Earn It</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </div>

          <!-- ── Eligible Games (icon tags) ── -->
          <div class="mb-5 relative z-10">
            <p
              class="text-[9px] uppercase font-bold tracking-widest text-slate-500 dark:text-gray-500 mb-2.5"
            >
              Eligible Games
            </p>
            <div class="flex flex-wrap gap-1.5">
              <!-- Poker – green hover -->
              <span
                class="inline-flex items-center gap-[0.4rem] bg-slate-50 dark:bg-white/[.045] border border-slate-200 dark:border-white/[.08] px-2.5 py-1 rounded-md text-[0.625rem] text-slate-600 dark:text-gray-400 font-medium hover:border-green-400 dark:hover:border-green-600/[.4] hover:bg-green-50 dark:hover:bg-green-600/[.06] transition-all cursor-default"
              >
                <svg
                  viewBox="0 0 24 24"
                  class="h-3 w-3 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                >
                  <circle cx="12" cy="12" r="8" />
                  <circle cx="12" cy="12" r="3" />
                  <line x1="12" y1="4" x2="12" y2="9" />
                  <line x1="12" y1="15" x2="12" y2="20" />
                  <line x1="4" y1="12" x2="9" y2="12" />
                  <line x1="15" y1="12" x2="20" y2="12" />
                </svg>
                Lucky Poker
              </span>

              <!-- Soccer – cyan hover -->
              <span
                class="inline-flex items-center gap-[0.4rem] bg-slate-50 dark:bg-white/[.045] border border-slate-200 dark:border-white/[.08] px-2.5 py-1 rounded-md text-[0.625rem] text-slate-600 dark:text-gray-400 font-medium hover:border-cyan-400 dark:hover:border-cyan-400/[.4] hover:bg-cyan-50 dark:hover:bg-cyan-400/[.06] transition-all cursor-default"
              >
                <svg
                  viewBox="0 0 24 24"
                  class="h-3 w-3 text-cyan-500 dark:text-cyan-400"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="8" />
                  <path d="M12 4.5l-1.8 2.8h3.6L12 4.5z" />
                  <path d="M6.2 10.2l2.4 1.6-.8 2.6" />
                  <path d="M17.8 10.2l-2.4 1.6.8 2.6" />
                  <path d="M8.8 18.2l1-.8h4.4l1 .8" />
                </svg>
                Lucky Soccer
              </span>

              <!-- 777 – amber hover -->
              <span
                class="inline-flex items-center gap-[0.4rem] bg-slate-50 dark:bg-white/[.045] border border-slate-200 dark:border-white/[.08] px-2.5 py-1 rounded-md text-[0.625rem] text-slate-600 dark:text-gray-400 font-medium hover:border-amber-400 dark:hover:border-amber-500/[.4] hover:bg-amber-50 dark:hover:bg-amber-500/[.06] transition-all cursor-default"
              >
                <svg
                  viewBox="0 0 24 24"
                  class="h-3 w-3 text-amber-500"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect x="3" y="4" width="18" height="16" rx="3.5" />
                  <circle
                    cx="8"
                    cy="12"
                    r="1.3"
                    fill="currentColor"
                    stroke="none"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="1.3"
                    fill="currentColor"
                    stroke="none"
                  />
                  <circle
                    cx="16"
                    cy="12"
                    r="1.3"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
                Lucky 777
              </span>

              <span
                class="text-slate-400 dark:text-gray-600 text-[10px] self-center ml-1"
                >+12</span
              >
            </div>
          </div>

          <!-- ── Wagering Progress ── -->
          <div
            class="pt-4 relative z-10 border-t border-slate-200 dark:border-white/[.06]"
          >
            <div class="flex justify-between items-center mb-2.5">
              <span
                class="text-[9px] uppercase font-bold tracking-widest text-slate-500 dark:text-gray-500"
              >
                Wagering Progress
              </span>
              <span class="text-[10px] text-slate-500 dark:text-gray-500">
                0 / {{ i % 2 === 0 ? "150" : "6,000" }}
              </span>
            </div>

            <div class="flex items-center gap-3">
              <!-- green → amber gradient progress bar -->
              <div
                class="flex-1 h-[5px] rounded-full bg-slate-200 dark:bg-white/[.06] relative"
              >
                <div
                  class="progress-fill absolute inset-y-0 left-0 rounded-full"
                  style="
                    width: 5%;
                    background: linear-gradient(90deg, #16a34a, #f59e0b);
                  "
                />
              </div>
              <!-- green wager multiplier badge -->
              <span
                class="bg-green-50 dark:bg-green-600/[.1] border border-green-200 dark:border-green-600/[.22] text-green-700 dark:text-green-400 text-[0.6rem] font-bold tracking-[0.08em] px-2 py-0.5 rounded whitespace-nowrap"
                >{{ i === 4 ? "15x" : "30x" }} Wager</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup>
// Bonus view — visual layout only; no runtime logic.
</script>

<style scoped>
/* ═══════════════════════════════════════════
   MESH ORBS – positioning helper
   ═══════════════════════════════════════════ */
.mesh-orb {
  position: absolute;
  border-radius: 50%;
}
.mesh-orb--drift {
  animation: orb-drift 20s ease-in-out infinite;
}
@keyframes orb-drift {
  0%,
  100% {
    transform: translate(0, 0);
  }
  40% {
    transform: translate(-22px, 18px);
  }
  70% {
    transform: translate(16px, -28px);
  }
}

/* ═══════════════════════════════════════════
   SHIMMER SWEEP – header card
   ═══════════════════════════════════════════ */
.shimmer-sweep {
  position: absolute;
  top: -60%;
  left: -60%;
  width: 50%;
  height: 220%;
  background: linear-gradient(
    105deg,
    transparent 0%,
    transparent 40%,
    rgba(255, 255, 255, 0.07) 50%,
    transparent 60%,
    transparent 100%
  );
  animation: shimmer-sweep 7s ease-in-out infinite;
  pointer-events: none;
  z-index: 1;
}
@keyframes shimmer-sweep {
  0% {
    left: -60%;
  }
  100% {
    left: 180%;
  }
}

/* ═══════════════════════════════════════════
   BALANCE – subtle green text-glow
   ═══════════════════════════════════════════ */
.balance-number {
  text-shadow: 0 0 24px rgba(22, 163, 74, 0.28), 0 0 55px rgba(22, 163, 74, 0.1),
    0 0 90px rgba(245, 158, 11, 0.06);
}

/* ═══════════════════════════════════════════
   GIFT FOCAL – green / amber layered glow
   ═══════════════════════════════════════════ */
.gift-focal {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.gift-glow {
  position: absolute;
  border-radius: 50%;
  width: 210px;
  height: 210px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  background: radial-gradient(
    circle,
    rgba(22, 163, 74, 0.4) 0%,
    rgba(22, 163, 74, 0.14) 38%,
    rgba(245, 158, 11, 0.06) 58%,
    transparent 72%
  );
  filter: blur(14px);
  animation: gift-pulse 4s ease-in-out infinite;
}
/* outermost amber halo – wider & softer than the green core */
.gift-glow--amber {
  background: radial-gradient(
    circle,
    rgba(245, 158, 11, 0.26) 0%,
    rgba(245, 158, 11, 0.1) 38%,
    transparent 68%
  );
  filter: blur(22px);
  width: 250px;
  height: 250px;
  animation: gift-pulse 4s ease-in-out infinite 0.35s;
}
.gift-glow--ring {
  background: transparent;
  filter: none;
  border: 1.5px solid rgba(22, 163, 74, 0.24);
  box-shadow: 0 0 20px rgba(22, 163, 74, 0.22),
    0 0 48px rgba(245, 158, 11, 0.16);
  width: 185px;
  height: 185px;
  animation: gift-ring 4s ease-in-out infinite 0.6s;
}
@keyframes gift-pulse {
  0%,
  100% {
    opacity: 0.55;
  }
  50% {
    opacity: 1;
  }
}
@keyframes gift-ring {
  0%,
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.4;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.14);
    opacity: 1;
  }
}

/* ═══════════════════════════════════════════
   BONUS CARD – hover lift + green border glow
   ═══════════════════════════════════════════ */
.bonus-card:hover {
  transform: translateY(-4px) scale(1.015);
  border-color: rgba(22, 163, 74, 0.38);
  box-shadow: 0 14px 36px rgba(0, 0, 0, 0.14), 0 0 18px rgba(22, 163, 74, 0.1);
}

/* ═══════════════════════════════════════════
   EARN BUTTON – amber gradient + hover glow
   ═══════════════════════════════════════════ */
.earn-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: #fff;
  padding: 0.5rem 1.1rem;
  border-radius: 0.7rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  border: none;
  cursor: pointer;
  box-shadow: 0 3px 10px rgba(245, 158, 11, 0.28);
  transition: transform 0.15s ease, box-shadow 0.2s ease;
}
.earn-btn:hover {
  transform: scale(1.07);
  box-shadow: 0 0 18px rgba(245, 158, 11, 0.55),
    0 4px 14px rgba(245, 158, 11, 0.3);
}
.earn-btn:active {
  transform: scale(0.96);
}

/* ═══════════════════════════════════════════
   PROGRESS FILL – green → amber glow
   ═══════════════════════════════════════════ */
.progress-fill {
  box-shadow: 0 0 6px rgba(22, 163, 74, 0.5), 0 0 14px rgba(245, 158, 11, 0.2);
}
</style>
