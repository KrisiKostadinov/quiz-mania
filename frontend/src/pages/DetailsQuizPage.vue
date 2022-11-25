<template>
  <q-page padding>
    <div class="quiz-details-page-container">
      <quiz-details-view />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue-demi";
import { useRoute } from "vue-router";
import QuizDetailsView from "src/components/quiz/quizzes/details/QuizDetailsView.vue";

export default defineComponent({
  name: "QuizDetails",
  components: {
    "quiz-details-view": QuizDetailsView,
  },
  setup() {
    const $route = useRoute();
    return { $route };
  },
});
</script>
<style>
.quiz-details-page-container {
  display: flex;
  justify-content: center;
}
</style>
