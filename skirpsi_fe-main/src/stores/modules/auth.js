// src/stores/auth.js
import { defineStore } from "pinia";
import axios from "@/plugins/axios";
import { BASE_API } from "@/utils/api-config";
import { useProfileStore } from "@/stores";
import Cookies from "js-cookie";
import { toast } from 'vue3-toastify';
import router from '@/router';


export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: Cookies.get("isAuthenticated") === "true" || false,
    token: Cookies.get("token") || null,
    userProfile: null,
    errorMessage: null,
  }),
  actions: {
    async login(username, password) {
      try {
        const response = await axios.post(BASE_API + "login", {
          username,
          password,
        });
        if (response.status === 200) {
          const token = response.data.token;
          this.token = token;
          Cookies.set("token", token, { secure: true, sameSite: "strict" });
          Cookies.set("isAuthenticated", "true", { secure: true, sameSite: "strict" });
          this.errorMessage = response.data.message || "Yey! Berhasil masuk";
          toast.success(this.errorMessage);
          this.isAuthenticated = true;
          const profileStore = useProfileStore();
          await profileStore.fetchProfile();
          return true;
        }
      } catch (error) {
        toast.error(error.response.data.error);
      }
    },

    async register(username, fullname, email, nisn, date_of_birth, password) {
      try {
        const response = await axios.post(BASE_API + "register", {
          username,
          fullname,
          email,
          nisn,
          date_of_birth,
          password
        })

        console.log(response)
        if (response.status === 201) {
          toast.success(response.data.message);
          setTimeout(() => {
            router.push('/auth/login')
          }, 2500)
          return true
        }
      } catch (error) {
        toast.error(error.response.data.error)
      }
    },
    logout() {
      this.token = null;
      this.isAuthenticated = false;
      Cookies.remove("isAuthenticated");
      Cookies.remove("token");
      Cookies.remove("profile");
      toast.info("Anda telah logout.");
      if (this.userProfile.role == 1) {
        setTimeout(() => {
          router.push("/auth/login");
        }, 2500)
      }else{
        setTimeout(() => {
          window.location.replace("/");
        }, 2500)
      }
    },
    checkAuth() {
      const token = Cookies.get("token");
      if (token) {
        this.isAuthenticated = true;
        const profile = Cookies.get("profile");
        this.userProfile = profile ? JSON.parse(profile) : null;
      } else {
        this.isAuthenticated = false;
        this.userProfile = null;
      }
    },
    roleMenu() {
      const profile = Cookies.get("profile");
      return profile ? JSON.parse(profile).role.name : null;
    },
  },
  getters: {
    getErrorMessage() {
      return this.errorMessage;
    },
  },
});
