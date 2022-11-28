<template>
  <q-card class="card-container" v-if="category.item">
    <q-card-section>
      <h1 class="text-h5 text-center">{{ category.item.options?.title }}</h1>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <p>
        {{ category.item.options?.description }}
      </p>
      <ul>
        <li>Има {{ category.item.questions?.length || 0 }} въпроса в категорията</li>
      </ul>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from "vue";
import { useCategoryStore } from "src/stores/category";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "CategoryDetailsView",
  setup() {
    const category = useCategoryStore();
    const $router = useRouter();
    if(!category.item.id) $router.push('/');
    return { category, $router };
  },
});
</script>

<style>
.category-card-container {
  width: fit-content;
}
</style>
