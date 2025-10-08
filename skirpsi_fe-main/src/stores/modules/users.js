import { defineStore } from "pinia";
import axios from "@/plugins/axios";
import { BASE_API } from "@/utils/api-config";
import { toast } from 'vue3-toastify';

export const useUsersStore = defineStore("user", {
    state: () => ({
        users: []
    }),
    actions: {
        async fetchUsers() {
            try {
                const response = await axios.get(`${BASE_API}users`);
                this.users = response.data.users;
            } catch (error) {
                toast.error("Request error: " + error.message);
            }
        },

        async fetchUserId(id) {
            try {
                const response = await axios.get(`${BASE_API}user/${id}`);
                return response.data.user;
            } catch (error) {
                toast.error("Request error: " + error.message);
            }
        },

        async updateUser(id, data) {
            try {
                const response = await axios.put(`${BASE_API}user/${id}`, data);
                toast.success(response.data.message);
                return response.data.user;
            } catch (error) {
                toast.error("Request error: " + error.message);
            }
        },
    },
    getters: {
        getUsers(state) {
            return state.users
        }
    },
});
