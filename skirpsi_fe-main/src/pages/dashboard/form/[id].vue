<template>
    <v-row>
        <v-col cols="8" offset="2">

            <v-card v-if="questions.length > 0" class="pa-4">
                <v-card-title>
                    <h3>{{ formTitle }}</h3>
                </v-card-title>
                <v-card-item v-for="(question, index) in questions" :key="index">
                    <v-text-field :label="question.question_text" v-model="answers[index]"
                        v-if="question.category === 'text'" variant="outlined" class="pt-2"></v-text-field>

                    <v-select v-model="answers[index]" :items="question.options" :label="question.question_text"
                        v-else-if="question.category === 'rating'" variant="outlined" class="pt-2"></v-select>

                    <v-select v-model="answers[index]" :items="question.options" :label="question.question_text" chips
                        multiple v-else-if="question.category === 'multiple_choice'" variant="outlined" class="pt-2"></v-select>
                </v-card-item>
                <v-row>
                    <v-col cols="12" class="d-flex justify-center">
                        <v-btn @click="submitAnswers" color="primary">Kirim Jawaban</v-btn>
                    </v-col>
                </v-row>
            </v-card>
            <v-alert v-else text="Memuat pertanyaan..."></v-alert>

        </v-col>
    </v-row>
</template>

<script setup>
import { useFormStore } from "@/stores";
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";

const formStore = useFormStore();
const route = useRoute();
console.log(route)
const formId = route.params.id;
const answers = ref([]);

const formTitle = computed(() => formStore.formById?.title || "Memuat Form...");
const questions = computed(() => formStore.formById?.questions || []);


onMounted(async () => {
    await formStore.fetchFormById(formId);
    answers.value = Array(questions.value.length).fill();
});

const submitAnswers = async () => {
    try {
        await formStore.submitAnswers(formId, questions.value, answers.value);
        alert("Jawaban berhasil dikirim!");
    } catch (error) {
        console.log(error)
        alert("Terjadi kesalahan saat mengirim jawaban.");
    }
};
</script>

<style scoped></style>
