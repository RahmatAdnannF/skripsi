<template>
    <v-row>
        <v-col>
            <v-card title="Daftar List User" flat class="pa-4">
                <template v-slot:append>
                    <v-btn color="primary" size="small" prepend-icon="mdi-plus">Add Data</v-btn>
                </template>
                <v-text-field v-model="search" label="Search ..." prepend-inner-icon="mdi-magnify" rounded="xl"
                    variant="solo" />

                <v-data-table :headers="headers" :items="users" :search="search">
                    <template v-slot:[`item.id`]="{ index }">
                        {{ index + 1 }}
                    </template>
                    <template v-slot:[`item.forms`]="{ item }">
                        {{item.forms.map((item) => item.form_title)[0]}}
                    </template>

                    <template v-slot:[`item.date_of_birth`]="{ item }">
                        {{ formatDate(item.date_of_birth, 'type5') }}
                    </template>
                    <template v-slot:[`item.action`]="{ item }">
                        <v-btn color="green-darken-3" variant="tonal" prepend-icon="mdi-eye" size="small" class="mx-2"
                            :to="`/dashboard/answers/detail/${item.id}/${item.forms.map((item) => item.form_id)[0]}`">View Answer</v-btn>
                    </template>
                </v-data-table>
            </v-card>
        </v-col>
    </v-row>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useAnswerStore } from "@/stores";
import { formatDate } from '@/utils'

const answerStore = useAnswerStore();


const headers = [
    { title: "ID", key: "id" },
    { title: "Fullname", key: "fullname" },
    { title: "Username", key: "username" },
    { title: "Email", key: "email" },
    { title: "NISN", key: "nisn" },
    { title: "Judul Form", key: "forms" },
    { title: "Action", key: "action" },
];

const search = ref("");
const users = computed(() => answerStore.getUserAnswers);
// const formTitle = computed(() => users.map((item) => item.forms.form_title));


onMounted(() => {
    answerStore.fetchUserAnswers();
});
</script>

<style lang="scss" scoped></style>