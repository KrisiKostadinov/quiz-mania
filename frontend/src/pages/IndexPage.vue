<template>
  <q-page padding>
    <h1 class="text-h5">Тестове</h1>
    <q-separator class="q-my-md" />
    <list-all-quizzes />
  </q-page>
</template>

<script>
import { defineComponent } from "vue-demi";
import ListAllQuizzes from "src/components/quiz/quizzes/list/ListAllQuizzes.vue";

export default defineComponent({
  name: "IndexPage",
  components: {
    "list-all-quizzes": ListAllQuizzes,
  },
});
</script>
