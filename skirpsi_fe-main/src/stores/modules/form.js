import { defineStore } from "pinia";
import axios from "@/plugins/axios";
import { BASE_API } from "@/utils/api-config";
import { toast } from 'vue3-toastify';

export const useFormStore = defineStore("form", {
    state: () => ({
        forms: [],
        status: '',
        formById: [],
    }),
    actions: {
        async fetchForms() {
            try {
                const response = await axios.get(`${BASE_API}forms`);
                this.forms = response.data.forms;
            } catch (error) {
                toast.error("Request error: " + error.message);
            }
        },
        async createForm(title, questions, status) {
            console.log(title, questions, status);
            try {
                const response = await axios.post(`${BASE_API}forms`, {
                    title,
                    questions,
                    status
                });
                if (response.status === 201) {
                    toast.success(response.data.message);
                }
            } catch (error) {
                toast.error(error.response.data.error);
            }
        },
        async fetchFormById(id) {
            try {
                const response = await axios.get(`${BASE_API}form/${id}`);
                this.formById = response.data;
        
                if (this.formById.questions) {
                    this.formById.questions = this.formById.questions.map(q => ({
                        ...q,
                        options: Array.isArray(q.options)
                            ? q.options // Sudah dalam format yang benar
                            : typeof q.options === "string"
                                ? JSON.parse(q.options) // Jika masih string JSON, parse ke array objek
                                : [] // Default jika options tidak sesuai format
                    }));
                }
            } catch (error) {
                console.error("Error fetching form:", error);
                toast.error("Request error: " + error.message);
            }
        },

        async updateForm(id, title, questions, status) {
            try {
                const formattedQuestions = questions.map((q) => ({
                    id: q.id,
                    question_text: q.question_text,
                    category: q.category,
                    options: q.options,
                    status: q.status,
                }));

                const response = await axios.put(`${BASE_API}form/${id}`, {
                    title,
                    questions: formattedQuestions,
                    status,
                });

                if (response.status === 200) {
                    toast.success(response.data.message);
                }
            } catch (error) {
                toast.error("Gagal memperbarui form.");
                throw error;
            }
        },

        async deleteForm(id) {
            try {
                const response = await axios.delete(`${BASE_API}form/${id}`);
                if (response.status === 200) {
                    toast.success(response.data.message);
                }
            } catch (error) {
                toast.error("Request error: " + error.message);
            }
        },

        // async getAnswers(formId) {
        //     try {
        //         const response = await axios.get(`${BASE_API}form/${formId}/answers`);
        //         return response.data.answers;
        //     } catch (error) {
        //         toast.error("Request error: " + error.message);
        //     }
        // },
    },
    getters: {
        getForms: (state) => state.forms,
        getFormById: (state) => state.formById,
    },
});
