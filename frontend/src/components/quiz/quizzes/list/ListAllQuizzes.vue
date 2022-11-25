<template>
  <div class="row q-col-gutter-md" v-if="props.store.items.length">
    <div
      class="col-12 col-sm-6 col-md-4 col-lg-3"
      v-for="(q, index) in props.store.items"
      :key="index"
    >
      <list-view-quiz :store="props.store" :quiz="q" />
    </div>
  </div>
  <transition
    v-else-if="loading"
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

export default defineComponent({
  name: "ListAllQuizzes",
  components: {
    "list-view-quiz": ListAllQuiz,
  },
  props: {
    store: Object,
  },
  setup(props) {
    return { props };
  },
});
</script>
