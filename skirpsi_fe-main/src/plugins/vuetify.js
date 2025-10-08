// plugins/vuetify.js
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import { VDateInput } from 'vuetify/labs/VDateInput';
const customTheme = {
  dark: false,
  colors: {
    primary: '#27AE60',
    secondary: '#424242',
    error: '#FF5252',
    info: '#2F80ED',
    success: '#4CAF50',
    warning: '#FFA726',
  },
};

const customDarkTheme = {
  dark: true,
  colors: {
    primary: '#BB86FC',
    secondary: '#03DAC6',
    error: '#CF6679',
    info: '#2F80ED',
    success: '#4CAF50',
    warning: '#FFA726',
  },
};

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'customTheme',
    themes: {
      customTheme,
      customDarkTheme,
    },
  },
  icons: {
    defaultSet: 'mdi',
  },
  components: {
    VDateInput,
  },
});

export default vuetify;
