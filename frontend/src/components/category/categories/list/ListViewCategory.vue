<template>
  <q-card>
    <router-link :to="props.category.slug">
      <q-card-section> {{ props.category.name }} </q-card-section>
    </router-link>
  </q-card>
</template>

<script>
import { defineComponent } from "vue-demi";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "ListViewCategory",
  props: {
    category: Object,
  },
  setup(props) {
    const $router = useRouter();
    return { $router, props };
  },
});
</script>
