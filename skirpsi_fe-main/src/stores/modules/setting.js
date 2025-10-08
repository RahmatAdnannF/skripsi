// src/store/setting.js
import { defineStore } from "pinia";

export const useSettingStore = defineStore("setting", {
  state: () => ({
    leftSidebar: true,
    rightSidebar: null,
    rail: false,
    darkMode: false,
  }),
  actions: {
    toggleLeftSidebar() {
      this.leftSidebar = !this.leftSidebar;
    },
    toggleRightSidebar(){
      this.rightSidebar = !this.rightSidebar
    },
    toggleRail() {
      this.rail = !this.rail;
      localStorage.setItem("rail", JSON.stringify(this.rail));
    },
    initializeRail() {
      const savedRail = JSON.parse(localStorage.getItem("rail"));
      if (savedRail !== null) {
        this.rail = savedRail;
      }
    },
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
      localStorage.setItem("darkMode", JSON.stringify(this.darkMode));
    },
    initializeDarkMode() {
      const savedDarkMode = JSON.parse(localStorage.getItem("darkMode"));
      if (savedDarkMode !== null) {
        this.darkMode = savedDarkMode;
      }
    },
  },
  getters: {
    getLeftSidebar: (state) => state.leftSidebar,
    getRightSidebar: (state) => state.rightSidebar,
  },
});
