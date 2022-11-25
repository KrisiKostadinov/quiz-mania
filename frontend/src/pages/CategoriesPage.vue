<template>
  <q-page padding>
    <h1 class="text-h5">Категории</h1>
    <q-separator class="q-my-md" />
    <list-all-categories :store="category" />
  </q-page>
</template>

<script>
import { defineComponent } from "vue-demi";

import { useCategoryStore } from "src/stores/category";
import ListAllCategories from "src/components/category/categories/list/ListAllCategories.vue";

export default defineComponent({
  name: "CategoriesPage",
  components: {
    "list-all-categories": ListAllCategories,
  },
  setup() {
    const category = useCategoryStore();
    //category.getItems();
    return { category };
  },
});
</script>
