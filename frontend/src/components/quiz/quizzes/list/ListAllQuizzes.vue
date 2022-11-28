<template>
  <div class="row q-col-gutter-md" v-if="quiz.items.length">
    <div
      class="col-12 col-sm-6 col-md-4 col-lg-3"
      v-for="(item, index) in quiz.items"
      :key="index"
    >
      <list-view-quiz :item="item" />
    </div>
  </div>
  <transition
    v-else-if="env.loading"
    appear
    appear-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <q-spinner-cube size="6rem" color="primary" />
  </transition>
  <q-banner class="bg-info" v-else>Няма създадени тестове за момента</q-banner>
</template>

<script>
import { defineComponent } from "vue";
import ListAllQuiz from "src/components/quiz/quizzes/list/ListViewQuiz.vue";
import { useQuizStore } from "src/stores/quiz";
import { useEnvStore } from "src/stores/env";

export default defineComponent({
  name: "ListAllQuizzes",
  components: {
    "list-view-quiz": ListAllQuiz,
  },
  setup() {
    const quiz = useQuizStore();
    const env = useEnvStore();
    if(!quiz.items.length) quiz.getItems();
    return { quiz, env };
  },
});
</script>
