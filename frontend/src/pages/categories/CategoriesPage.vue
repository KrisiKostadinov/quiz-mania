<template>
  <q-page padding>
    <q-item class="q-pa-none">
      <q-item-section>
        <h1 class="text-h5">Категории</h1>
      </q-item-section>
      <q-item-section side>
        <q-btn
          label="Нова категория"
          color="primary"
          icon="add"
          no-caps
          @click="
            category.item = { options: {} };
            env.dialogs.createCategory = true;
          "
        />
      </q-item-section>
    </q-item>
    <q-separator />
    <q-item-section class="q-mb-md">
      <q-input
        label="Търсене..."
        v-model="category.filterTerm"
        @update:model-value="category.filter"
        filled
      />
    </q-item-section>
    <list-all-categories />
  </q-page>
</template>

<script>
import { defineComponent } from "vue-demi";

import { useCategoryStore } from "src/stores/category";
import ListAllCategories from "src/components/category/categories/list/ListAllCategories.vue";
import { useEnvStore } from "src/stores/env";

export default defineComponent({
  name: "CategoriesPage",
  components: {
    "list-all-categories": ListAllCategories,
  },
  setup() {
    const category = useCategoryStore();
    const env = useEnvStore();
    return { category, env };
  },
});
</script>
