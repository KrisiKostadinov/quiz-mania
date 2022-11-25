<template>
  <div class="row q-col-gutter-md" v-if="store.items.length">
    <q-list
      class="col-12 col-sm-6 col-md-4 col-lg-3"
      v-for="(c, index) in props.store.items"
      :key="index"
    >
      <list-view-category :store="props.store" :category="c" />
    </q-list>
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

export default defineComponent({
  name: "ListAllCategories",
  props: {
    store: Object,
  },
  components: {
    "list-view-category": ListViewCategory,
  },
  setup(props) {
    return { props };
  },
});
</script>
