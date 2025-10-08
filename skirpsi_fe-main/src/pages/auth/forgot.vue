<template>
    <v-container fluid class="auth-login-container">
        <v-row class="ma-0" no-gutters>
            <v-col cols="12" sm="6" offset-sm="3" class="right-col">
                <div class="wrapper-login text-center">
                    <img src="@/assets/images/main-logo.webp" width="50" class="mx-auto mb-3" alt="" />
                    <div class="text-h5 text-white font-semibold">Lupa Password ?</div>
                    <div class="text-subtitle-1 text-white font-semibold">
                        Masukkan email Anda untuk mereset password.
                    </div>
                    <div elevation="12" class="">
                        <v-card-text>
                            <!-- Email Input -->
                            <v-row v-if="!showOtp && !resetPassword">
                                <v-col class="px-0" cols="12">
                                    <v-text-field v-model="email" color="green-lighten-2" bg-color="white" label="Email"
                                        type="text"
                                        :rules="[v => !!v || 'Email wajib diisi', v => /.+@.+\..+/.test(v) || 'Email tidak valid']"
                                        prepend-inner-icon="mdi-email"></v-text-field>
                                    <v-row no-gutters>
                                        <v-col cols="12">
                                            <v-btn class="my-3" color="oliveGreen" :loading="isLoading"
                                                :disabled="!email" @click="forgotPassword">
                                                Lupa Password
                                            </v-btn>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-btn to="login" variant="plain" color="white" class="text-capitalize">
                                                Kembali ke halaman login
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>

                            <!-- OTP Input -->
                            <v-row v-else-if="showOtp && !resetPassword">
                                <v-col cols="12">
                                    <div class="text-center">
                                        <v-otp-input v-model="otp" :loading="isLoading" length="6" color="oliveGreen"
                                            variant="underlined"></v-otp-input>
                                        <v-btn class="my-3" color="oliveGreen" :disabled="otp.length < 6 || isLoading"
                                            @click="verifyOtp" width="40%">
                                            Submit
                                        </v-btn>
                                    </div>
                                </v-col>
                            </v-row>

                            <!-- New Password Input -->
                            <v-row v-else-if="resetPassword">
                                <v-col class="px-0" cols="12">
                                    <v-text-field v-model="newPassword" color="green-lighten-2" bg-color="white"
                                        label="Password Baru" type="password" prepend-inner-icon="mdi-lock"
                                        :rules="[v => !!v || 'Password wajib diisi']"></v-text-field>
                                    <v-row no-gutters>
                                        <v-col cols="12">
                                            <v-btn class="my-3" color="oliveGreen" :loading="isLoading"
                                                :disabled="!newPassword" @click="saveNewPassword">
                                                Simpan
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </div>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>


<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/storess';
import { showToast } from '@/utils'; 

definePageMeta({ layout: 'auth-layout', name: 'forgot' });

const authStore = useAuthStore();
const email = ref('');
const otp = ref('');
const newPassword = ref('');
const isLoading = ref(false);
const showOtp = ref(false);
const resetPassword = ref(false);

const forgotPassword = async () => {
    isLoading.value = true;
    try {
        const response = await authStore.forgotPassword(email.value);
        if (response?.status === 200) {
            showOtp.value = true;
        }
    } catch (error) {
        showToast(error.response?.data?.error || "Terjadi kesalahan.", "error");
    } finally {
        isLoading.value = false;
    }
};

const verifyOtp = async () => {
    isLoading.value = true;
    try {
        const response = await authStore.otpVerify(email.value, parseInt(otp.value));
        if (response?.status === 200) {
            resetPassword.value = true;
            showOtp.value = false;
        } else {
        }
    } catch (error) {
        showToast(error.response?.data?.error || "Terjadi kesalahan.", "error");
    } finally {
        isLoading.value = false;
    }
};

const saveNewPassword = async () => {
    isLoading.value = true;
    try {
        const response = await authStore.changePassword(newPassword.value);
        if (response?.status === 200) {
            setTimeout(() => navigateTo('/auth/login'), 2500);
        }
    } catch (error) {
        showToast(error.response?.data?.error || "Terjadi kesalahan.", "error");
    } finally {
        isLoading.value = false;
    }
};
</script>


<style lang="scss" scoped></style>