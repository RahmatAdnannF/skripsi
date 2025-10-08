// src/store/task.js
import { defineStore } from "pinia";
import axios from "@/plugins/axios";
import { BASE_API } from "@/utils/api-config";
import { toast } from 'vue3-toastify';

export const useAnswerStore = defineStore("answer", {
  state: () => ({
    user_answers: [],
    detail_answers: [],
    predictedKejuruan: null,
  }),
  actions: {
    async fetchUserAnswers() {
      try {
        const response = await axios.get(`${BASE_API}users/filled-forms`);
        this.user_answers = response.data.users;
      } catch (error) {
        toast.error('Request error: ' + error.message);
      }
    },
    async fetchDetailAnswers(userId, formId) {
      try {
        const response = await axios.get(`${BASE_API}form/${userId}/answers/${formId}`);
        this.detail_answers = response.data;
      } catch (error) {
        console.log(error)
      }
    },
    async submitAnswers(formId, questions, answers) {
      try {
        const response = await axios.post(`${BASE_API}form/${formId}/submit`, {
          answers: questions.map((q, i) => {
            const selectedOption = q.options.find(option => option.id === answers[i]);

            return {
              question_id: q.id,
              answer_text: selectedOption ? selectedOption.title : answers[i],
              answer_index: selectedOption ? selectedOption.id : null,
            };
          }),
        });

        console.log(response);

        if (response.status === 200) {
          this.predictedKejuruan = response.data.predicted_kejuruan;
          toast.success(response.data.message);
        } else {
          toast.error("Terjadi kesalahan dalam pengiriman jawaban.");
        }
      } catch (error) {
        toast.error("Request error: " + error.message);
      }
    }
  },
  getters: {
    getUserAnswers: (state) => state.user_answers,
    getDetailAnswers: (state) => state.detail_answers
  },
});
