<template>
    <div class="list-user-group">
        <div v-for="n in 5" :key="n" class="list-group-item">
            <v-tooltip location="bottom">
                <template #activator="{ props }">
                    <v-avatar size="small" v-bind="props" image="https://cdn.vuetifyjs.com/images/john.jpg"></v-avatar>
                </template>
                <span>User {{ n }}</span>
            </v-tooltip>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.list-user-group {
    display: flex;
    flex-wrap: nowrap;
}

.list-user-group .list-group-item:not(:first-child) {
    margin-left: -10px;
}
.list-user-group .list-group-item:last-child {
    margin-right: 5px;
}
</style>