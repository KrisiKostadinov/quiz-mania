<template>
  <q-page padding>
    <h1 class="text-h5">Категории</h1>
    <q-separator class="q-my-md" />
    <list-all-categories />
  </q-page>
</template>

<script>
import { defineComponent } from "vue-demi";
import ListAllCategories from "src/components/category/categories/list/ListAllCategories.vue";

export default defineComponent({
  name: "CategoriesPage",
  components: {
    "list-all-categories": ListAllCategories,
  },
  setup() {},
});
</script>
