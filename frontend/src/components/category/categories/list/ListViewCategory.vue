<template>
  <q-card>
    <q-card-section>
      <q-item clickable v-ripple>
        <q-item-section>
          <router-link :to="props.category.slug">
            {{ props.category.name }}
          </router-link>
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
                    env.deleteDialog(
                      'Наистана ли искате да изтриете тази категория?',
                      props.store.deleteItem,
                      props.category.id
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
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from "vue-demi";
import { useRouter } from "vue-router";

import { useEnvStore } from "src/stores/env";

export default defineComponent({
  name: "ListViewCategory",
  props: {
    store: Object,
    category: Object,
  },
  setup(props) {
    const $router = useRouter();
    const env = useEnvStore();
    return { $router, env, props };
  },
});
</script>
