<template>
  <q-card>
    <q-item clickable v-ripple>
      <q-item-section
        @click="
          category.item = props.item;
          $router.push(`category/${props.item.id}`);
        "
      >
        {{ props.item.options.title }}
        <q-item-label caption>{{ props.item.options.slug }}</q-item-label>
      </q-item-section>
      <!-- v-if="user.loggedIn" -->
      <q-item-section side>
        <q-btn icon="more_vert" round flat fab-mini>
          <q-popup-proxy>
            <q-list>
              <q-item
                clickable
                v-ripple
                @click="
                  category.item = props.item;
                  env.dialogs.createCategory = true;
                "
              >
                <q-item-section> Редактиране на категорията </q-item-section>
              </q-item>
              <q-item
                clickable
                v-ripple
                @click="
                  env.deleteDialog(
                    'Наистана ли искате да изтриете тази категория?',
                    category.deleteItem,
                    props.item.id
                  )
                "
              >
                <q-item-section class="text-red">
                  Изтриване на категорията
                </q-item-section>
              </q-item>
            </q-list>
          </q-popup-proxy>
        </q-btn>
      </q-item-section>
    </q-item>
  </q-card>
</template>

<script>
import { defineComponent } from "vue-demi";
import { useRouter } from "vue-router";

import { useEnvStore } from "src/stores/env";
import { useCategoryStore } from "src/stores/category";

export default defineComponent({
  name: "ListViewCategory",
  props: {
    item: Object,
  },
  setup(props) {
    const $router = useRouter();
    const env = useEnvStore();
    const category = useCategoryStore();
    return { $router, env, category, props };
  },
});
</script>
