<template>
    <v-row>
        <v-col cols="8" offset="2">
            <v-card class="pa-4">
                <v-form>
                    <v-text-field label="Url" variant="solo" hide-details v-model="form.url" ></v-text-field>
                    <v-row class="mt-4">
                        <v-col cols="12" class="d-flex justify-center">
                    <v-btn color="primary"  class="mt-2" @click="submitForm" :loading="isLoading">Submit</v-btn>
                    </v-col>
                    </v-row>
                </v-form>
            </v-card>
        </v-col>
    </v-row>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useDataSettingStore } from '@/stores'

const dataSetting = useDataSettingStore();

const form = ref({
    url: ''
});
const isLoading = ref(false);

const submitForm = async () => {
    isLoading.value = true;
    try {
        await dataSetting.update_setting(form.value);
    } catch (error) {
        console.error(error);
    } finally {
        isLoading.value = false;
    }
}
const setting = computed(() => dataSetting.getSettings);

watch(setting, (newSetting) => {
    if (newSetting?.url) {
        form.value.url = newSetting.url;
    }
}, { immediate: true });

onMounted(() => {
    dataSetting.fetchSettingById();
});
</script>
