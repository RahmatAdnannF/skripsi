<template>
  <v-app>
    <v-main v-if="!route.meta.landingPage">
      <Drawer />
      <Sidebar v-if="!route.meta.hideSidebar" />
      <Navbar v-if="!route.meta.hideNavbar" />
      <v-container fluid :class="{ 'pa-0': route.meta.hideSidebar }">
        <router-view />
      </v-container>
    </v-main>
    <v-main v-else>
      <LPNavbar />
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { useSettingStore } from "@/stores";
import { onMounted } from "vue";
import { useRoute } from 'vue-router';
import { useTheme } from 'vuetify'
import Sidebar from "@/components/global/leftSidebar.vue";
import Navbar from '@/components/global/navbar.vue';
import Drawer from '@/components/global/rightSidebar.vue'
import LPNavbar from '@/components/global/lpNavbar.vue'
const settingStore = useSettingStore();

const route = useRoute();
const theme = useTheme()

onMounted(() => {
  settingStore.initializeRail();
  settingStore.initializeDarkMode()
  theme.global.name.value = settingStore.darkMode ? 'customDarkTheme' : 'customTheme'
});

</script>

