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
  <q-dialog v-model="env.dialogs.createCategory" :full-width="$q.screen.xs">
    <create-category-dialog />
  </q-dialog>
  <q-dialog v-model="env.dialogs.detailsCategory" maximized>
    <category-details-view />
  </q-dialog>
  <q-dialog v-model="env.dialogs.createQuiz" :full-width="$q.screen.xs">
    <create-quiz-dialog />
  </q-dialog>
</template>

<script>
import { defineComponent } from "vue-demi";

import { useEnvStore } from "src/stores/env";
import RegisterDialog from "src/components/auth/RegisterDialog.vue";
import LoginDialog from "src/components/auth/LoginDialog.vue";
import ForgotPasswordDialog from "src/components/auth/ForgotPasswordDialog.vue";
import CreateCategoryDialog from "src/components/category/create-category/CreateCategoryDialog.vue";
import CategoryDetailsView from "src/components/category/categories/details/CategoryDetailsView.vue";
import CreateQuizDialog from "src/components/quiz/create-quiz/CreateQuizDialog.vue";

export default defineComponent({
  name: "DisplayDialogs",
  components: {
    "register-dialog": RegisterDialog,
    "login-dialog": LoginDialog,
    "forgot-password-dialog": ForgotPasswordDialog,
    "create-category-dialog": CreateCategoryDialog,
    "category-details-view": CategoryDetailsView,
    "create-quiz-dialog": CreateQuizDialog,
  },
  setup() {
    const env = useEnvStore();
    return { env };
  },
});
</script>
