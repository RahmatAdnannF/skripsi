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
                    <template v-slot:[`item.role`]="{ item }">
                        <v-chip :color="item.role === 1 ? 'purple-darken-4' : 'secondary'" size="small">
                            {{ statusRole(item.role) }}
                        </v-chip>
                    </template>

                    <template v-slot:[`item.date_of_birth`]="{ item }">
                        {{ formatDate(item.date_of_birth, 'type5') }}
                    </template>
                    <template v-slot:[`item.action`]="{ item }">
                        <v-btn color="indigo-darken-2" variant="tonal" prepend-icon="mdi-pencil" size="small"
                            :to="`/dashboard/user-management/update-user/${item.id}`">Edit</v-btn>
                    </template>
                </v-data-table>
            </v-card>
        </v-col>
    </v-row>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useUsersStore } from "@/stores";
import { formatDate, statusRole } from '@/utils'

const usersStore = useUsersStore();

const headers = [
    { title: "ID", key: "id" },
    { title: "Fullname", key: "fullname" },
    { title: "Username", key: "username" },
    { title: "Email", key: "email" },
    { title: "NISN", key: "nisn" },
    { title: "Role", key: "role" },
    { title: "Tanggal Lahir", key: "date_of_birth" },
    { title: "Action", key: "action" },
];

const search = ref("");
const users = computed(() => usersStore.getUsers);


onMounted(() => {
    usersStore.fetchUsers();
});
</script>

<style lang="scss" scoped></style>