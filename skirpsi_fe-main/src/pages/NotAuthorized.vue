<template>
    <v-empty-state icon="mdi-shield-alert" color="warning"
        text="You don't have permission to access this page. Please contact your administrator." title="Not Authorized">
        <v-btn prepend-icon="mdi-arrow-left" color="primary" @click="backPage">Back</v-btn>
    </v-empty-state>
</template>

<script setup>
const backPage = () => {
    window.history.go(-1);
};
</script>

<style lang="scss" scoped></style>