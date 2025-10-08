<template>
    <v-row>
        <v-col cols="12">
            <v-card class="pa-4">
                <v-form ref="form" v-model="valid">
                    <v-row>
                        <v-col cols="6">
                            <v-text-field v-model="userData.username" color="primary" variant="outlined"
                                label="Username" type="text" prepend-inner-icon="mdi-account"
                                :rules="[v => !!v || 'Username is required']" />
                        </v-col>
                        <v-col cols="6">
                            <v-text-field v-model="userData.fullname" color="primary" variant="outlined"
                                label="Fullname" type="text" prepend-inner-icon="mdi-account"
                                :rules="[v => !!v || 'Fullname is required']" />
                        </v-col>
                        <v-col cols="6">
                            <v-date-input color="primary" label="Tanggal lahir" prepend-icon=""
                                prepend-inner-icon="$calendar" variant="outlined"
                                v-model="userData.date_of_birth"></v-date-input>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field v-model="userData.email" color="primary" variant="outlined" label="Email"
                                type="email"
                                :rules="[v => !!v || 'Email is required', v => /.+@.+\..+/.test(v) || 'Invalid email']"
                                prepend-inner-icon="mdi-email" />
                        </v-col>
                        <v-col cols="6">
                            <v-text-field v-model="userData.nisn" color="primary" variant="outlined" label="NISN"
                                type="number" prepend-inner-icon="mdi-card-account-details" />
                        </v-col>
                        <v-col cols="6">
                            <v-select label="Role"
                                :items="[{ text: 'Super Admin', value: 1 }, { text: 'Guest', value: 99 }]"
                                v-model="userData.role" item-title="text" item-value="value" color="primary" prepend-inner-icon="mdi-account-cog"
                                variant="outlined"></v-select>
                        </v-col>
                    </v-row>
                    <v-row class="mt-4">
                        <v-col cols="12" class="d-flex justify-center">
                            <v-btn :disabled="!valid || loading" :loading="loading" color="primary"
                                @click="submitUpdate">Update User</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card>
        </v-col>
    </v-row>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useUsersStore } from "@/stores";
import { useRoute, useRouter } from "vue-router";
import { toast } from 'vue3-toastify';
import { formatDate } from "@/utils";

const store = useUsersStore();
const route = useRoute();
const router = useRouter();

const userData = ref({
    username: "",
    fullname: "",
    date_of_birth: null,
    email: "",
    nisn: ""
});
const valid = ref(false);
const loading = ref(false);

onMounted(async () => {
    const userId = route.params.id;

    const user = await store.fetchUserId(userId);
    if (user) {
        userData.value = { ...user };
    } else {
        toast.error("User not found");
        router.push("/users");
    }
});

const submitUpdate = async () => {
    loading.value = true;
    try {
        const userId = route.params.id;
        userData.value.date_of_birth = formatDate(userData.value.date_of_birth, 'type4');
        await store.updateUser(userId, userData.value);

    } catch (error) {
        toast.error(error);
    } finally {
        loading.value = false;
    }
};
</script>

<style scoped></style>