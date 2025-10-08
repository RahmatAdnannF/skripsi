<template>
  <v-navigation-drawer v-if="sortedMenuItems.length" v-model="leftSidebar" permanent :rail="rail">
    <template v-slot:prepend>
      <v-list nav class="text-center">
        <img src="@/assets/images/mky.png" v-if="!rail" class="logo-img mx-auto" aspect-ratio="16/9" cover />
        <v-avatar color="white" v-else>
          <img src="@/assets/images/mky.png" width="100" aspect-ratio="16/9" cover />
        </v-avatar>
      </v-list>
      <v-list nav density="compact" class="border-b">
        <template v-for="item in sortedMenuItems" :key="item.id">
          <v-list-item :prepend-icon="item.icon_path" :append-icon="item.children?.length > 0 ? 'mdi-chevron-down' : ''"
            :to="item.slug ? item.slug : null" @click="toggleSubmenu(item)" class="text-capitalize text-caption">
            <v-tooltip activator="parent" location="start" v-if="rail ? true : false">
              {{ item.title }}
            </v-tooltip>
            {{ item.title }}
          </v-list-item>

          <div v-if="expandedMenus.includes(item.id)" class="drawer-submenu">
            <v-list-item v-for="subItem in item.children" :key="subItem.id" :prepend-icon="subItem.icon_path"
              :to="subItem.slug" class="text-capitalize text-caption">
              <v-tooltip activator="parent" location="start" v-if="rail ? true : false">
                {{ subItem.title }}
              </v-tooltip>
              {{ subItem.title }}
            </v-list-item>
          </div>
        </template>
      </v-list>
    </template>

    <template v-slot:append>
      <v-list nav density="compact">        
        <!-- Component darkMode Here -->
        <DarkMode :rail="rail" />
        <v-list-item subtitle="Premium Plan" :title="profile?.fullname">
          <template v-slot:prepend>
            <v-avatar color="#FFD3D3">
              <img src="@/assets/images/avatar.svg" />
            </v-avatar>
          </template>

          <template v-slot:append>
            <v-btn variant="text" icon @click="authStore.logout()">
              <img src="@/assets/images/icon/logout.svg" />
            </v-btn>
          </template>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, computed } from "vue";
import { useAuthStore, useProfileStore, useMenuStore, useSettingStore } from "@/stores";
import DarkMode from '@/components/global/darkMode.vue';

const profileStore = useProfileStore();
const menuStore = useMenuStore();
const settingStore = useSettingStore();
const authStore = useAuthStore();

const leftSidebar = ref(true);
const rail = computed(() => settingStore.rail);

const expandedMenus = ref([]);

const sortedMenuItems = computed(() => menuStore.sortedMenuItems);
const profile = computed(() => profileStore.profile);

const toggleSubmenu = (item) => {
  if (!item.children) return;

  if (expandedMenus.value.includes(item.id)) {
    expandedMenus.value = expandedMenus.value.filter((id) => id !== item.id);
  } else {
    expandedMenus.value.push(item.id);
  }
};
</script>

<style scoped>
.drawer-submenu {
  /* border-left: 2px solid #e0e0e0; */
  margin-left: 16px;
  /* padding-left: 8px; */
}

.v-list-item--active {
  /* background-color: rgba(0, 0, 0, 0.1);
  border-radius: 8px; */
}

.v-list-item--active::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  background: #27AE60;
  width: 7px;
  height: 100%;
  border-radius: 5.611px 0px 0px 5.611px;
}

.v-navigation-drawer--rail .v-list-item--active::before {
  display: none;
}

.logo-img {
  width: 40px;
  height: auto;
}
</style>
