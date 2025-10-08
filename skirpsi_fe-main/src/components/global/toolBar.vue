<template>
    <div class="toolbar-container">
        <v-btn-toggle rounded="xl" class="border" divided>
            <v-btn icon="mdi-menu"></v-btn>
            <v-btn icon="mdi-text-recognition" @click="toggleShowComment"></v-btn>
            <v-btn icon @click="toggleAllowComment">
                <v-avatar size="32">
                    <img src="@/assets/images/mky.png" class="logo-img-toolbar" />
                </v-avatar>
            </v-btn>
        </v-btn-toggle>
    </div>
</template>

<script setup>
defineProps ({
    toggleAllowComment: Function
})
import {useSettingStore} from '@/stores'  

const settingStore = useSettingStore()

const toggleShowComment = () => {
    settingStore.toggleRightSidebar()
}   
</script>

<style scoped>
.toolbar-container {
    position: fixed;
    transform: translate(0, -50%);
    bottom: 0;
    left: 50%;
}
.logo-img-toolbar {
    width: 28px;
    height: auto;
}
</style>