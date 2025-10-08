<template>
  <v-app-bar elevation="1" flat>
    <template v-slot:prepend>
      <v-btn icon @click="settingStore.toggleRail">
        <v-icon>{{ settingStore.rail ? 'mdi-arrow-right-circle' : 'mdi-arrow-left-circle' }}</v-icon>
      </v-btn>
      <img src="@/assets/images/mky.png" class="logo-img-navbar" />
    </template>
    <v-app-bar-title>{{ route.meta?.title }}</v-app-bar-title>
  </v-app-bar>
</template>

<script setup>
import { useSettingStore } from "@/stores";
import { useRoute } from "vue-router";

const settingStore = useSettingStore();
const route = useRoute();

</script>

<style lang="scss" scoped>
.logo-img-navbar {
  width: 32px;
  height: auto;
  margin-left: 8px;
}
</style>