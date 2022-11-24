<template>
  <div class="row q-col-gutter-md" v-if="true">
    <div
      class="col-12 col-sm-6 col-md-4 col-lg-3"
      v-for="index in 10"
      :key="index"
    >
      <list-view />
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
import ListView from "src/components/quiz/quizzes/list/ListView.vue";

export default defineComponent({
  name: "ListAll",
  components: {
    "list-view": ListView,
  },
  setup() {},
});
</script>
