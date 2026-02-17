export async function checkAppVersion() {
  try {
    const res = await fetch(
      "https://laki-bets-auth-v1.api.hakibets.com/auth/api/v1/fetch/profile/session",
      {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Length": "0", // Some servers require this if the body is empty
        },
      }
    );

    const data = await res.json();

    if (data?.statusCode !== "00") return;

    const latest = data?.extra?.jsVersion;
    const current = import.meta.env.VITE_APP_VERSION;

    console.log(latest, current);

    if (!latest || !current) return;

    const local = import.meta.env.VITE_APP_VERSION;

    // If versions differ and reload not done yet
    if (latest !== local) {
      // caches?.keys?.().then((keys) => keys.forEach((k) => caches.delete(k)));

      // HARD reload
      window.location.replace(window.location.href);
    }
  } catch (e) {
    console.warn("Version check failed", e);
  }
}
