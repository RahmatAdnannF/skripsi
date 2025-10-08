<template>
    <v-row>
        <v-col>
            <v-card title="Daftar Form" flat class="pa-4">
                <template v-slot:append>
                    <v-btn color="primary" size="small" prepend-icon="mdi-plus" :to="`/dashboard/form/create`">Add
                        Data</v-btn>
                </template>
                <v-text-field v-model="search" label="Search ..." prepend-inner-icon="mdi-magnify" rounded="xl"
                    variant="solo" />

                <v-data-table :headers="headers" :items="forms" :search="search">
                    <template v-slot:[`item.id`]="{ index }">
                        {{ index + 1 }}
                    </template>
                    <template v-slot:[`item.status`]="{ item }">
                        <v-chip :color="item.status === 1 ? 'primary' : 'secondary'" size="small">
                            {{ statusNumber(item.status) }}
                        </v-chip>
                    </template>
                    <template v-slot:[`item.action`]="{ item }">
                        <v-btn color="indigo-darken-2" variant="tonal" prepend-icon="mdi-pencil" size="small"
                            :to="`/dashboard/form/edit/${item.id}`">Edit</v-btn>
                        <v-btn color="cyan-darken-3" variant="tonal" prepend-icon="mdi-eye" size="small" class="mx-2"
                            :to="`/survey/${item.id}`">View</v-btn>
                        <!-- <v-btn color="green-darken-3" variant="tonal" prepend-icon="mdi-eye" size="small" class="mx-2"
                            :to="`/dashboard/form/detail/${item.id}`">View Answer</v-btn> -->

                        <v-dialog v-model="dialog[item.id]" max-width="400" persistent>
                            <template v-slot:activator="{ props: activatorProps }">
                                <v-btn color="red-accent-2" variant="tonal" prepend-icon="mdi-trash-can" size="small"
                                    v-bind="activatorProps">
                                    Delete
                                </v-btn>
                            </template>

                            <v-card :title="'Judul : ' + item.title">
                                <v-card-text>Apakah Anda yakin ingin menghapus data ini?</v-card-text>
                                <template v-slot:actions>
                                    <v-spacer></v-spacer>
                                    <v-btn @click="dialog[item.id] = false">Cancel</v-btn>
                                    <v-btn color="red-accent-2" variant="tonal"
                                        @click="confirmDelete(item.id)">Delete</v-btn>
                                </template>
                            </v-card>
                        </v-dialog>
                    </template>
                </v-data-table>
            </v-card>
        </v-col>
    </v-row>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useFormStore } from "@/stores";
import { statusNumber } from "@/utils";

const formStore = useFormStore();

const headers = [
    { title: "ID", key: "id" },
    { title: "Title", key: "title" },
    { title: "Status", key: "status" },
    { title: "Action", key: "action" },
];

const search = ref("");
const forms = computed(() => formStore.getForms);
const dialog = ref({});

const confirmDelete = async (id) => {
    await formStore.deleteForm(id);
    dialog.value[id] = false;
    formStore.fetchForms();
};

onMounted(() => {
    formStore.fetchForms();
});
</script>

<style lang="scss" scoped></style>