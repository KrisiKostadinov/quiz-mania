<template>
  <q-page padding>
    <h1 class="text-h5">Тестове</h1>
    <q-separator class="q-my-md" />
    <list-all-quizzes :store="quiz" />
  </q-page>
</template>

<script>
import { defineComponent } from "vue-demi";

import ListAllQuizzes from "src/components/quiz/quizzes/list/ListAllQuizzes.vue";
import { useQuizStore } from "src/stores/quiz";

export default defineComponent({
  name: "IndexPage",
  components: {
    "list-all-quizzes": ListAllQuizzes,
  },
  setup() {
    const quiz = useQuizStore();
    return { quiz };
  },
});
</script>
