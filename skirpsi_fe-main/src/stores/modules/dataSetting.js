// src/store/dataSetting.js
import { defineStore } from "pinia";
import axios from "@/plugins/axios";
import { BASE_API } from "@/utils/api-config";
import { toast } from 'vue3-toastify';

export const useDataSettingStore = defineStore("dataSetting", {
  state: () => ({
    settings: []
  }),
  actions: {
    async fetchSettingById() {
      try {
        const response = await axios.get(`${BASE_API}settings/1`);
        this.settings = response.data.setting;
      } catch (error) {
        toast.error('Request error: ' + error.message);
      }
    },
    async update_setting(data) {
      console.log('data setting', data);
      try {
        const response = await axios.put(`${BASE_API}settings/1`, data);
        toast.success(response.data.message);
      } catch (error) {
        toast.error('Request error: ' + error.message);
      }
    }
  },
  getters: {
    getSettings: (state) => state.settings
  },
});
