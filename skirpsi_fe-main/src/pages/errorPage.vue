<template>
  <v-empty-state action-text="Retry Request"
    image="https://cdn.vuetifyjs.com/docs/images/components/v-empty-state/connection.svg" :title="`${errorCode}`"
    :text="errorDescription">
    <template v-slot:actions>
      <v-btn prepend-icon="mdi-arrow-left" color="primary" @click="backPage">Back</v-btn>
    </template>
  </v-empty-state>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const errorCode = ref(route.params.errorCode || '404');
const errorMessage = ref('');
const errorDescription = ref('');

const errorMessages = {
  '404': {
    title: 'Page Not Found',
    description:
      'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.',
  },
  '500': {
    title: 'Internal Server Error',
    description: 'We apologize for the inconvenience. Please try again later.',
  },
  '403': {
    title: 'Forbidden',
    description: 'You do not have permission to access this page.',
  },
};

const setErrorMessages = () => {
  if (errorMessages[errorCode.value]) {
    errorMessage.value = errorMessages[errorCode.value].title;
    errorDescription.value = errorMessages[errorCode.value].description;
  } else {
    errorMessage.value = 'Unexpected Error';
    errorDescription.value = 'An unexpected error has occurred. Please try again.';
  }
};

setErrorMessages();

const backPage = () => {
  window.history.go(-1);
};
</script>

<style lang="scss" scoped></style>
