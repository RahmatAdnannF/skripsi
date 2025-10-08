<template>
    <v-switch v-model="darkMode" max-width="120" color="primary" class="mx-auto" v-if="!rail">
        <template v-slot:prepend>
            <img src="@/assets/images/icon/lightmode.svg" width="25" alt="">
        </template>
        <template v-slot:append>
            <img src="@/assets/images/icon/darkmode.svg" width="25" alt="">
        </template>
    </v-switch>

    <v-list-item @click="darkMode = !darkMode" v-else>
        <template v-slot:prepend>
            <v-avatar>
                <img src="@/assets/images/icon/lightmode.svg" width="25" alt="" v-if="!darkMode">
                <img src="@/assets/images/icon/darkmode.svg" width="25" alt="" v-else>
            </v-avatar>
            <v-tooltip activator="parent" location="start" v-if="rail ? true : false">
                {{ !darkMode ? 'Light Mode' : 'Dark Mode' }}
              </v-tooltip>
        </template>
    </v-list-item>
</template>

<script setup>
defineProps({
    rail: Boolean
})
import { computed } from 'vue'
import { useSettingStore } from '@/stores'
import { useTheme } from 'vuetify'

const settingStore = useSettingStore()
const theme = useTheme()

const darkMode = computed({
    get: () => settingStore.darkMode,
    set: (value) => {
        settingStore.darkMode = value
        theme.global.name.value = value ? 'customDarkTheme' : 'customTheme'
        localStorage.setItem('darkMode', JSON.stringify(value))
    },
})

</script>

<style scoped></style>