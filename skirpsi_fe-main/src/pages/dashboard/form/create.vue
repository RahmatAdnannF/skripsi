<template>
    <v-row>
        <v-col cols="8" offset="2">
            <v-card class="pa-4">
                <v-form @submit.prevent="submitForm">
                    <v-text-field v-model="formTitle" type="text" variant="solo" label="Judul Formulir"></v-text-field>

                    <v-row v-for="(question, index) in questions" :key="index" class="align-center mb-4">
                        <v-col cols="9">
                            <v-text-field density="comfortable" v-model="question.question_text" type="text"
                                variant="solo" label="Masukkan Pertanyaan" hide-details></v-text-field>
                        </v-col>
                        <v-col cols="2">
                            <v-select label="Select" density="comfortable" v-model="question.category" variant="solo"
                                :items="['text', 'rating', 'multiple_choice']" hide-details
                                @update:modelValue="updateOptions(index)"></v-select>
                        </v-col>
                        <v-col cols="1" class="text-center">
                            <v-btn size="x-small" color="primary" icon="mdi-minus"
                                @click="removeQuestion(index)"></v-btn>
                        </v-col>
                        <v-col cols="12"
                            v-if="question.category === 'multiple_choice' || question.category === 'rating'">
                            <v-card class="pa-2">
                                <v-row v-for="(option, optIndex) in question.options" :key="optIndex"
                                    class="align-center mb-2">
                                    <v-col cols="9">
                                        <v-text-field v-model="question.options[optIndex]" density="compact" type="text"
                                            variant="solo" label="Masukkan Opsi" hide-details></v-text-field>
                                    </v-col>
                                    <v-col cols="3" class="d-flex align-center">
                                        <v-btn size="x-small" color="primary" icon="mdi-plus"
                                            @click="addOption(index)"></v-btn>
                                        <v-btn size="x-small" color="red" icon="mdi-minus"
                                            @click="removeOption(index, optIndex)"
                                            :disabled="question.options.length === 1"></v-btn>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                    </v-row>

                    <v-checkbox v-model="isActive" :true-value="1" :false-value="0"
                        label="Aktifkan Formulir"></v-checkbox>

                    <v-btn color="primary" variant="tonal" prepend-icon="mdi-plus" @click="addQuestion">Add
                        Question</v-btn>
                    <v-row class="mt-4">
                        <v-col cols="12" class="d-flex justify-center">
                            <v-btn color="primary" class="mt-2" type="submit" block :loading="isLoading">Submit</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card>
        </v-col>
    </v-row>
</template>

<script setup>
import { ref } from "vue";
import { toast } from 'vue3-toastify';
import { useFormStore } from "@/stores";

const formStore = useFormStore();
const formTitle = ref("");
const questions = ref([]);
const isLoading = ref(false);
const isActive = ref(0);

const submitForm = async () => {
    if (!formTitle.value || questions.value.length === 0) {
        toast.warning("Judul dan setidaknya satu pertanyaan harus diisi.");
        return;
    }
    try {
        isLoading.value = true;
        await formStore.createForm(formTitle.value, questions.value, isActive.value);
        isLoading.value = false;
    } catch (error) {
        console.error(error);
    } finally {
        formTitle.value = "";
        questions.value = [];
        isActive.value = 0;
        isLoading.value = false;
    }
};

const addQuestion = () => {
    questions.value.push({ question_text: "", category: "text", options: [] });
};

const removeQuestion = (index) => {
    questions.value.splice(index, 1);
};

const addOption = (questionIndex) => {
    if (!questions.value[questionIndex].options) {
        questions.value[questionIndex].options = [];
    }
    questions.value[questionIndex].options.push("");
};

const removeOption = (questionIndex, optionIndex) => {
    questions.value[questionIndex].options.splice(optionIndex, 1);
};

const updateOptions = (index) => {
    if (questions.value[index].category === 'multiple_choice' || questions.value[index].category === 'rating') {
        if (!questions.value[index].options || questions.value[index].options.length === 0) {
            questions.value[index].options = [''];
        }
    } else {
        questions.value[index].options = [];
    }
};
</script>

<style lang="scss" scoped></style>
