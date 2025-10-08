// src/store/task.js
import { defineStore } from "pinia";
import axios from "@/plugins/axios";
import { BASE_API } from "@/utils/api-config";
import { toast } from 'vue3-toastify';


export const useQuestionStore = defineStore("question", {
  state: () => ({
    questions: []
  }),
  actions: {
    async fetchQuestion() {
      try {
        const response = await axios.get(`${BASE_API}/question`);
        this.questions = response.data.questions;
      } catch (error) {
        toast.error('Request error: ' + error.message);
      }
    }
  },
  getters: {
    getQuestions: (state) => state.questions
  },
});
