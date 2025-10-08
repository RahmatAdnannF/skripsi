<template>
    <v-row>
        <v-col cols="8" offset="2">
            <v-card class="pa-4" v-if="data.answers && data.answers.length > 0">
                <v-card-title>
                    <h3>
                        {{ data.title }}
                    </h3>
                </v-card-title>
                <v-card-title>
                </v-card-title>
                <div>
                    <v-card-item v-for="(item, index) in data.answers" :key="index">
                        <v-text-field :label="item.question_text" v-model="item.answer_text" variant="outlined"
                            class="pt-2" readonly></v-text-field>
                    </v-card-item>
                </div>
            </v-card>
            <v-alert v-else text="Memuat Jawaban..."></v-alert>
        </v-col>
    </v-row>
</template>

<script setup>
import { useAnswerStore } from '@/stores';
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';

const answerStore = useAnswerStore();
const route = useRoute();

const userId = route.params.userId;
const formId = route.params.formId;

const data = computed(() => answerStore.getDetailAnswers);


onMounted(() => {
    answerStore.fetchDetailAnswers(userId, formId);
})
</script>

<style lang="scss" scoped></style>