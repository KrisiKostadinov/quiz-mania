<template>
  <q-list class="row q-col-gutter-md" v-if="category.items.length > 0">
    <div
      class="col-12 col-sm-6 col-md-4 col-lg-3"
      v-for="(cat, index) in category.items"
      :key="index"
    >
      <list-view-category :item="cat" />
    </div>
  </q-list>
  <transition
    v-else-if="loading"
    appear
    appear-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <q-spinner-cube size="6rem" color="primary" />
  </transition>
  <q-banner class="bg-info" v-else>
    Няма създадени категории за момента
  </q-banner>
</template>

<script>
import { defineComponent } from "vue-demi";
import ListViewCategory from "src/components/category/categories/list/ListViewCategory.vue";
import { useCategoryStore } from "src/stores/category";

export default defineComponent({
  name: "ListAllCategories",
  components: {
    "list-view-category": ListViewCategory,
  },
  setup() {
    const category = useCategoryStore();
    if(!category.items.length) category.getItems();
    return { category };
  },
});
</script>
