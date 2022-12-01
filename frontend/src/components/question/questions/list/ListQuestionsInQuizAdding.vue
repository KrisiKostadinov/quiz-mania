<template>
  <q-card class="medium-dialog">
    <q-card-section>
      <q-item class="q-pa-none">
        <q-item-section top>
          <q-item-label class="text-h6">Въпроси</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn
            label="Създаване на въпрос"
            color="primary"
            icon="add"
            no-caps
            @click="
              env.dialogs.createQuestion = true;
              question.item = {
                options: {},
              };
            "
          />
        </q-item-section>
      </q-item>
      <q-list bordered v-if="quiz.item.questions.length">
        <q-item v-for="(index, item) in quiz.item.questions" :key="index">
          <q-item-section>
            <q-item-label>{{ item.options.title }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <q-banner v-else class="bg-color">
        Все още няма добавени въпроси.
      </q-banner>
    </q-card-section>
  </q-card>
</template>

<script>
import { useEnvStore } from "src/stores/env";
import { useQuestionStore } from "src/stores/question";
import { useQuizStore } from "src/stores/quiz";
import { defineComponent } from "vue-demi";

export default defineComponent({
  name: "ListQuestionsInQuizAdding",
  setup() {
    const question = useQuestionStore();
    const quiz = useQuizStore();
    const env = useEnvStore();
    return { question, quiz, env };
  },
});
</script>
