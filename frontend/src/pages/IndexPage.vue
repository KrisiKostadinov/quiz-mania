<template>
  <q-page padding>
    <q-item class="q-pa-none">
      <q-item-section>
        <h1 class="text-h5">Тестове</h1>
      </q-item-section>
      <q-item-section side>
        <q-btn
          label="Нов тест"
          color="primary"
          icon="add"
          no-caps
          @click="
            quiz.item = quiz.setInitialState;
            env.dialogs.createQuiz = true;
          "
        />
      </q-item-section>
    </q-item>
    <q-separator class="q-my-md" />
    <list-all-quizzes />
  </q-page>
</template>

<script>
import { defineComponent } from "vue-demi";

import ListAllQuizzes from "src/components/quiz/quizzes/list/ListAllQuizzes.vue";
import { useQuizStore } from "src/stores/quiz";
import { useEnvStore } from "src/stores/env";

export default defineComponent({
  name: "IndexPage",
  components: {
    "list-all-quizzes": ListAllQuizzes,
  },
  setup() {
    const quiz = useQuizStore();
    const env = useEnvStore();
    return { quiz, env };
  },
});
</script>
