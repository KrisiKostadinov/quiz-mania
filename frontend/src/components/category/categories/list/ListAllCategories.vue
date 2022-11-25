<template>
  <div class="row q-col-gutter-md" v-if="true">
    <div
      class="col-12 col-sm-6 col-md-4 col-lg-3"
      v-for="(c, index) in CATEGORIES"
      :key="index"
    >
      <list-view-category :category="c" />
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
  <q-banner class="bg-info" v-else>
    Няма създадени категории за момента
  </q-banner>
</template>

<script>
import { defineComponent } from "vue-demi";
import ListViewCategory from "src/components/category/categories/list/ListViewCategory.vue";

const CATEGORIES = [
  {
    id: 1,
    name: "Взаимоотношения",
    slug: "vzaimootnoshenia",
  },
  {
    id: 2,
    name: "Взаимоотношения",
    slug: "vzaimootnoshenia",
  },
  {
    id: 3,
    name: "Взаимоотношения",
    slug: "vzaimootnoshenia",
  },
  {
    id: 4,
    name: "Взаимоотношения",
    slug: "vzaimootnoshenia",
  },
];

export default defineComponent({
  name: "ListAllCategories",
  components: {
    "list-view-category": ListViewCategory,
  },
  setup() {
    return { CATEGORIES };
  },
});
</script>
