<template>
    <v-navigation-drawer v-model="drawer" color="primary" disable-resize-watcher>
        <v-list nav>
            <v-list-item v-for="item in items" :key="item" link :title="item" />
        </v-list>
    </v-navigation-drawer>
    <v-app-bar color="transparent" flat>
        <template #prepend>
            <v-app-bar-nav-icon v-if="$vuetify.display.smAndDown" @click="drawer = !drawer" />
        </template>

        <div class="d-flex flex-1-1-0 ps-md-4">
            <img src="@/assets/images/mky.png" class="logo-img-lp" />
        </div>

        <div class="d-md-flex d-none ga-4 mx-auto">
            <v-btn v-for="item in items" :key="item" class="text-none" :text="item" />
        </div>

        <div class="d-flex flex-1-1-0 pe-3">
            <v-btn to="auth/login" append-icon="mdi-chevron-right" class="ms-auto text-none" slim text="Login"
                v-if="!profile" />
            <v-menu rounded v-else>
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" icon class="ms-auto">
                        <v-avatar cover>
                            <img src="@/assets/images/avatar.svg" />
                        </v-avatar>
                    </v-btn>
                </template>
                <v-card>
                    <v-card-text>
                        <div class="mx-auto text-center">

                            <h3>{{ profile ? profile.fullname : '' }}</h3>

                            <v-btn variant="text" rounded prepend-icon="mdi-logout" @click="authStore.logout()">
                                Logout
                            </v-btn>
                        </div>
                    </v-card-text>
                </v-card>
            </v-menu>
        </div>
    </v-app-bar>
</template>

<script setup>

import { computed } from 'vue'
import { shallowRef } from 'vue'
import { useAuthStore, useProfileStore } from "@/stores";

const drawer = shallowRef(false)


const items = [
    'Products',
    'Services',
    'About',
    'Contact',
]
const profileStore = useProfileStore();

const profile = computed(() => profileStore.profile);
const authStore = useAuthStore();

</script>

<style scoped>
.logo-img-lp {
    width: 70px;
    height: auto;
}
</style>