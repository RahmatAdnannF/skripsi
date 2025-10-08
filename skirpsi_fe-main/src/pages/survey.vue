<template>
    <v-row class="mt-5">
        <v-col cols="8" offset="2" v-if="predictedKejuruan === null">
            <v-card v-if="questions.length > 0" class="pa-4">
                <v-card-title>
                    <h3>{{ formTitle }}</h3>
                </v-card-title>
                <v-card-item v-for="(question, index) in questions" :key="index">
                    <v-text-field :label="question.question_text" v-model="answers[index]"
                        v-if="question.category === 'text'" variant="outlined" class="pt-2"></v-text-field>

                    <v-select v-model="answers[index]" :items="question.options" :label="question.question_text"
                        item-title="title" item-value="id" v-else-if="question.category === 'rating'" variant="outlined"
                        class="pt-2"></v-select>

                    <v-select v-model="answers[index]" :items="question.options" :label="question.question_text"
                        item-title="title" item-value="id" chips multiple
                        v-else-if="question.category === 'multiple_choice'" variant="outlined" class="pt-2"></v-select>
                </v-card-item>
                <v-row>
                    <v-col cols="12" class="d-flex justify-center">
                        <v-btn @click="submitAnswers" color="primary" :loading="loading">Kirim Jawaban</v-btn>
                    </v-col>
                </v-row>
            </v-card>
            <v-alert v-else text="Memuat pertanyaan..."></v-alert>
        </v-col>
        <v-col cols="8" offset="2" v-else>
            <v-card class="pa-4 mt-4" color="blue-lighten-5">
                <v-card-title>
                    <h3>Hasil Prediksi Kejuruan</h3>
                </v-card-title>
                <v-card-text>
                    <p><strong>Kejuruan yang direkomendasikan:</strong> {{ predictedKejuruan }}</p>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script setup>
import { useFormStore, useAnswerStore } from "@/stores";
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";

const formStore = useFormStore();
const answerStore = useAnswerStore();
const route = useRoute();

const formId = route.params.id;
const answers = ref([]);
const loading = ref(false);

const formTitle = computed(() => formStore.formById?.title || "Memuat Form...");
const questions = computed(() => formStore.formById?.questions || []);
const predictedKejuruan = computed(() => answerStore.predictedKejuruan);

onMounted(async () => {
    await formStore.fetchFormById(formId);
    // answers.value = Array(questions.value.length).fill();
});

const submitAnswers = async () => {
    loading.value = true;
    try {
        await answerStore.submitAnswers(formId, questions.value, answers.value);
        loading.value = false;
    } catch (error) {
        console.log(error)
        loading.value = false;
    }
};
</script>
