<template>
    <v-navigation-drawer location="right" temporary v-model="showRightSidebar">
        <v-list-item title="Leave your comment">
            <template v-slot:prepend>
                <img src="@/assets/images/mky.png" class="logo-img-right" />
            </template>
            <template v-slot:append>
                <v-btn icon="mdi-close" variant="text" size="x-small" @click="settingStore.toggleRightSidebar"></v-btn>
            </template>
        </v-list-item>
    </v-navigation-drawer>
</template>

<script setup>
import { computed } from "vue";
import { useSettingStore } from '@/stores';

const settingStore = useSettingStore();

const showRightSidebar = computed({
    get: () => settingStore.getRightSidebar,
    set: (value) => {
        settingStore.rightSidebar = value
    }
});
</script>

<style lang="scss" scoped>
.logo-img-right {
  width: 32px;
  height: auto;
  margin-right: 8px;
}
</style>
