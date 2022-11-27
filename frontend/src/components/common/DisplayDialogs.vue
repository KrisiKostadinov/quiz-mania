<template>
  <q-dialog v-model="env.dialogs.register" :full-width="$q.screen.xs">
    <register-dialog />
  </q-dialog>
  <q-dialog v-model="env.dialogs.login" :full-width="$q.screen.xs">
    <login-dialog />
  </q-dialog>
  <q-dialog v-model="env.dialogs.forgotPassword" :full-width="$q.screen.xs">
    <forgot-password-dialog />
  </q-dialog>
</template>

<script>
import { defineComponent } from "vue-demi";

import { useEnvStore } from "src/stores/env";
import RegisterDialog from "src/components/auth/RegisterDialog.vue";
import LoginDialog from "src/components/auth/LoginDialog.vue";
import ForgotPasswordDialog from "src/components/auth/ForgotPasswordDialog.vue";

export default defineComponent({
  name: "DisplayDialogs",
  components: {
    "register-dialog": RegisterDialog,
    "login-dialog": LoginDialog,
    "forgot-password-dialog": ForgotPasswordDialog,
  },
  setup() {
    const env = useEnvStore();
    return { env };
  },
});
</script>
