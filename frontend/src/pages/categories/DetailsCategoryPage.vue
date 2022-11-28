<template>
  <q-page padding>
    <div class="q-gutter-y-md">
      <category-details-view />
      <list-all-quizzes />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue-demi";

import CategoryDetailsView from "src/components/category/categories/details/CategoryDetailsView.vue";
import ListAllQuizzes from "src/components/quiz/quizzes/list/ListAllQuizzes.vue";
import { useQuizStore } from "src/stores/quiz";

export default defineComponent({
  name: "DetailsCategoryPage",
  components: {
    "category-details-view": CategoryDetailsView,
    "list-all-quizzes": ListAllQuizzes,
  },
  setup() {
    const quiz = useQuizStore();
    return { quiz };
  },
});
</script>
