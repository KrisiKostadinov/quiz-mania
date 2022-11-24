<template>
  <q-page padding>
    <h1 class="text-h5">Тестове</h1>
    <q-separator class="q-my-md" />
    <list-all />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import ListAll from "src/components/quiz/quizzes/list/ListAll.vue";

export default defineComponent({
  name: "IndexPage",
  components: {
    "list-all": ListAll,
  },
});
</script>
