// src/stores/profile.js
import { defineStore } from 'pinia';
import axios from "@/plugins/axios";
import { BASE_API } from '@/utils/api-config';
import Cookies from "js-cookie";
import { toast } from 'vue3-toastify';

export const useProfileStore = defineStore('auth/profile', {
    state: () => ({
        profile: Cookies.get('profile') ? JSON.parse(Cookies.get('profile')) : null,
    }),
    actions: {
        setProfile(profile) {
            this.profile = profile;
            Cookies.set('profile', JSON.stringify(profile), { secure: true, sameSite: "strict" });
        },
        async fetchProfile() {
            try {
                const token = Cookies.get('token');
                if (!token) {
                    throw new Error('User is not authenticated.');
                }
                const response = await axios.get(BASE_API + 'profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.status == 200 && response.data.user?.role == 1) {
                    const profile = response.data.user;
                    this.setProfile(profile);
                    setTimeout(() => {
                        window.location.replace("/dashboard");
                    }, 2000);
                } else if (response.status == 200 && response.data.user?.role == 99) {
                    const profile = response.data.user;
                    this.setProfile(profile);
                    setTimeout(() => {
                        window.location.replace("/");
                    }, 2000);
                }

            } catch (error) {
                toast.error(error.response.data.message);
            }
        },
    },
    getters: {
        getProfile: function (state) {
            return state.profile;
        }
    }
});
