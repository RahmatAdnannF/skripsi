<template>
    <v-container fluid class="auth-login-container">
        <v-row class="ma-0" no-gutters>
            <v-col class="left-col" cols="0" sm="5" v-if="!mobile">
            </v-col>
            <v-col class="right-col mx-auto" cols="12" sm="6" offset-sm="1">
                <div class="wrapper-login">
                    <div>
                        <div class="logo-wrapper text-center" v-if="mobile">
                            <img src="@/assets/images/mky.png" width="50" class="mx-auto" />
                        </div>
                        <v-card-text class="font-weight-bold text-h4 text-center"
                            :class="{ 'text-center': mobile }">Register</v-card-text>
                        <v-card-text class="text-subtitle-1 text-center"> create your account </v-card-text>
                        <v-card-item>
                            <form @submit.prevent="handleLogin">
                                <v-row>
                                    <v-col cols="6" align="center">
                                        <v-text-field color="primary" variant="outlined" label="Username" type="text"
                                            v-model="username" prepend-inner-icon="mdi-account" class="pt-2" />
                                    </v-col>
                                    <v-col cols="6" align="center">
                                        <v-text-field color="primary" variant="outlined" label="Fullname" type="text"
                                            v-model="fullname" prepend-inner-icon="mdi-account" class="pt-2" />
                                    </v-col>
                                    <v-col cols="6" align="center">
                                        <v-date-input color="primary" label="Tanggal lahir" prepend-icon=""
                                            prepend-inner-icon="$calendar" variant="outlined"
                                            v-model="date_of_birth"></v-date-input>

                                    </v-col>
                                    <v-col cols="6" align="center">
                                        <v-text-field color="primary" variant="outlined" label="Email" type="email"
                                            v-model="email"
                                            :rules="[v => !!v || 'Email must be filled', v => /.+@.+\..+/.test(v) || 'Email not valid']"
                                            prepend-inner-icon="mdi-email" />
                                    </v-col>
                                    <v-col cols="12" align="center">
                                        <v-text-field color="primary" variant="outlined" label="password"
                                            type="password" v-model="password" prepend-inner-icon="mdi-lock" />
                                    </v-col>
                                    <v-col cols="12" align="center">
                                        <v-text-field color="primary" variant="outlined" label="NISN" type="number"
                                            v-model="nisn" prepend-inner-icon="mdi-card-account-details" />
                                    </v-col>
                                </v-row>

                                <v-btn class="my-3" color="primary" type="submit" block :loading="isLoading"
                                    @click="handleRegister()">
                                    Register
                                </v-btn>
                            </form>
                            <div class="text-register">sudah memiliki akun? <v-btn to="login" variant="text"
                                    color="primary" class="text-capitalize text-decoration-underline px-0">Login
                                    disini</v-btn></div>
                        </v-card-item>

                    </div>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useDisplay } from 'vuetify'
import { VDateInput } from 'vuetify/labs/VDateInput'
import { useAuthStore } from '@/stores';

const { mobile } = useDisplay();

const authStore = useAuthStore();

const username = ref('');
const fullname = ref('');
const email = ref('');
const nisn = ref('');
const date_of_birth = ref(null);
const password = ref('');
const isLoading = ref(false);


const handleRegister = async () => {
    isLoading.value = true;
    try {
        await authStore.register(username.value, fullname.value, email.value, nisn.value, date_of_birth.value, password.value);
    } catch (error) {
        console.error(error);
    } finally {
        isLoading.value = false;
    }
}
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
</style>