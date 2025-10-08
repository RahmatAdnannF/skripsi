<template>
    <v-container fluid class="auth-login-container">
        <v-row class="ma-0" no-gutters>
            <v-col class="left-col" cols="0" sm="5" v-if="!mobile">
            </v-col>
            <v-col class="right-col mx-auto" cols="12" sm="5" offset-sm="1">
                <div class="wrapper-login">
                    <div>
                        <div class="logo-wrapper text-center" v-if="mobile" >
                            <img src="@/assets/images/mky.png" class="logo-img mx-auto" />
                        </div>
                        <v-card-text class="font-weight-bold text-h4 text-center" :class="{ 'text-center': mobile }">
                            Welcome Back !
                        </v-card-text>
                        <v-card-text class="text-subtitle-1 text-center">
                            Log into your account
                        </v-card-text>
                        <v-card-item>
                            <form @submit.prevent="handleLogin">
                                <v-row>
                                    <v-col cols="12" align="center">
                                        <v-text-field color="primary" variant="outlined" class="pt-2" label="Username"
                                            type="username" v-model="username" prepend-inner-icon="mdi-account" />
                                    </v-col>
                                    <v-col cols="12" align="center">
                                        <v-text-field color="primary" variant="outlined" class="pt-2" label="Password"
                                            type="password" v-model="password" prepend-inner-icon="mdi-lock" />
                                    </v-col>
                                </v-row>
                                <v-btn to="forgot" variant="text" color="primary" block>
                                    Forget password?
                                </v-btn>
                                <v-btn class="my-3" color="primary" type="submit" block :loading="isLoading">
                                    Login
                                </v-btn>
                            </form>
                            <div class="text-register text-lightGray" :class="{ 'text-center': mobile }">
                                Belum punya akun?
                                <v-btn to="register" variant="text" color="primary"
                                    class="text-capitalize text-decoration-underline px-0">
                                    Daftar disini
                                </v-btn>
                            </div>
                        </v-card-item>
                    </div>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useDisplay } from 'vuetify';
import { useAuthStore } from '@/stores';

const authStore = useAuthStore();

const { mobile } = useDisplay();

const username = ref('');
const password = ref('');
const isAuthenticated = ref(false);
const isLoading = ref(false);

const handleLogin = async () => {
    isLoading.value = true;
    try {
        await authStore.login(username.value, password.value);
        isAuthenticated.value = authStore.isAuthenticated;
    } catch (error) {
        console.error(error);
    } finally {
        isLoading.value = false;
    }
};
</script>


<style scoped>
.auth-login-container {
    padding: 0 !important;
    min-height: 100%;
    min-width: 100%;
    background: #FFF;
    background-size: cover;
    background-position: center;
}

.auth-login-container .left-col {
    background-image: url("@/assets/images/auth.webp");
    background-position: center;
    background-size: cover;
}

.auth-login-container .left-col .wrapper-overlay {
    height: 100%;
    padding: 110px 45px;
}

.auth-login-container .left-col .wrapper-overlay .overlay-bg {
    background: rgb(0, 0, 0, 0.5);
    border-radius: 8px;
    backdrop-filter: blur(2px);
    height: 100%;
    padding: 45px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.auth-login-container .left-col .wrapper-overlay .overlay-bg .logo-wrapper img {
    width: 75px;
}

.auth-login-container .left-col .wrapper-overlay .overlay-bg .content-wrapper {
    color: #333;
}

.auth-login-container .left-col .wrapper-overlay .overlay-bg .content-wrapper .welcome {
    color: rgba(255, 255, 255, 1);
    font-size: 24px;
    font-weight: 300;
}

.auth-login-container .left-col .wrapper-overlay .overlay-bg .content-wrapper .title {
    color: rgba(255, 255, 255, 1);
    font-size: 26px;
    margin: 5px 0;
    font-weight: 700;
}

.auth-login-container .left-col .wrapper-overlay .overlay-bg .content-wrapper .subtitle {
    color: rgba(255, 255, 255, 1);
    font-weight: 300;
    font-size: 14px;
}

.auth-login-container .left-col .wrapper-overlay .overlay-bg .copyright-wrapper {
    color: #fff;
}

.auth-login-container .left-col .wrapper-overlay .overlay-bg .copyright-wrapper .copyright {
    font-size: 14px;
}

.auth-login-container .right-col .wrapper-login {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 110px;
}

.auth-login-container .right-col .wrapper-login .title {
    color: #333;
    font-size: 24px;
    font-weight: 700;
}

.auth-login-container .v-input--error:not(.v-input--disabled) .v-input__details .v-messages {
    background: red;
    color: #fff;
    padding: 5px 0;
    font-size: 14px;
    border-radius: 5px;
}

.logo-img {
    width: 40px;
    height: auto;
}
</style>