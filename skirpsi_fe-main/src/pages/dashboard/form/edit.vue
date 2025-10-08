<template>
    <v-row>
        <v-col cols="8" offset="2">
            <v-card v-if="questions.length > 0" class="pa-4">
                <v-card-title>
                    <h3>Edit Formulir</h3>

                </v-card-title>
                <v-card-item>
                    <v-text-field v-model="formTitle" label="Judul" variant="outlined" class="pt-2"></v-text-field>

                </v-card-item>

                <v-card-item v-for="(question, index) in questions" :key="index" class="mt-2">
                    <v-text-field v-model="question.question_text" label="Edit Pertanyaan" variant="outlined"
                        class="pt-2"></v-text-field>

                    <v-select v-model="question.category" :items="['text', 'rating', 'multiple_choice']"
                        label="Kategori Pertanyaan" variant="outlined" class="mt-2 pt-2"></v-select>

                    <template v-if="question.category === 'rating' || question.category === 'multiple_choice'">
                        <v-chip-group v-model="question.options" multiple column class="mt-2">
                            <v-chip v-for="(option, optIndex) in question.options" :key="optIndex">
                                {{ option }}
                                <v-icon small class="ml-2" @click="removeOption(index, optIndex)">mdi-close</v-icon>
                            </v-chip>
                        </v-chip-group>
                        <v-text-field v-model="newOptions[index]" label="Tambah Opsi" variant="outlined"
                            class="mt-2 pt-2" @keyup.enter="addOption(index)" />
                        <v-btn prepend-icon="mdi-plus" size="small" @click="addOption(index)" class="mt-2"
                            color="primary" variant="tonal">Tambah Opsi</v-btn>
                    </template>
                </v-card-item>

                <v-card-item>
                    <v-checkbox v-model="isActive" :true-value="1" :false-value="0"
                        label="Aktifkan Formulir"></v-checkbox>
                </v-card-item>

                <v-row class="mt-4">
                    <v-col cols="12" class="d-flex justify-center">
                        <v-btn @click="updateForm" color="primary" block :loading="isLoading">Perbarui Formulir</v-btn>
                    </v-col>
                </v-row>
            </v-card>
            <v-alert v-else text="Memuat pertanyaan..."></v-alert>
        </v-col>
    </v-row>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useFormStore } from "@/stores";
import { toast } from "vue3-toastify";

const formStore = useFormStore();
const route = useRoute();
const formId = route.params.id;

const formTitle = ref("");
const questions = ref([]);
const isActive = ref(0);
const newOptions = ref({});
const isLoading = ref(false);

const addOption = (questionIndex) => {
    if (!newOptions.value[questionIndex]) newOptions.value[questionIndex] = "";
    const option = newOptions.value[questionIndex].trim();
    if (option !== "") {
        questions.value[questionIndex].options.push(option);
        newOptions.value[questionIndex] = "";
    }
};

const removeOption = (questionIndex, optionIndex) => {
    questions.value[questionIndex].options.splice(optionIndex, 1);
};

const updateForm = async () => {
    try {
        const title = formTitle.value;
        const formattedQuestions = questions.value.map((q) => ({
            id: q.id,
            question_text: q.question_text,
            category: q.category,
            options: q.options,
            status: q.status,
        }));
        const status = isActive.value ? 1 : 0;
        isLoading.value = true;

        await formStore.updateForm(formId, title, formattedQuestions, status);
        console.log("Payload yang dikirim ke backend:", {
        formId,
        title,
        questions,
        status,
    });
    } catch (error) {
        toast.error("Gagal memperbarui form. Silakan coba lagi.");
        console.error("Error:", error);
    } finally {
        isLoading.value = false;
    }
};

onMounted(async () => {
    await formStore.fetchFormById(formId);

    const form = formStore.formById;
    if (form) {
        formTitle.value = form.title;
        questions.value = form.questions.map((q) => ({
            ...q,
            options: typeof q.options === "string" ? JSON.parse(q.options || "[]") : q.options,
        }));
        isActive.value = form.status;
    }
});
</script>

<style scoped></style>
