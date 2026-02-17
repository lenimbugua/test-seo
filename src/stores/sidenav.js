import { defineStore } from "pinia";

export const useSidenavStore = defineStore("sidenav-store", {
  state: () => ({
    showSidenav: false,
  }),

  actions: {
    openSidenav() {
      this.showSidenav = true;
    },
    closeSidenav() {
      this.showSidenav = false;
    },
  },
});
