<template>
  <q-card>
    <q-card-section class="q-pt-sm q-pr-sm">
      <q-item dense class="q-pa-none">
        <q-item-section class="text-h6">
          {{ props.item.options.title.substring(0, 30) }}
          {{ props.item.options.title.length > 30 ? "..." : "" }}
        </q-item-section>
        <q-item-section side>
          <q-btn icon="more_vert" round flat fab-mini>
            <q-popup-proxy>
              <q-list>
                <q-item
                  clickable
                  v-ripple
                  @click="
                    env.dialogs.createQuiz = true;
                    quiz.item = props.item;
                  "
                >
                  <q-item-section>
                    <q-item-label>Редактиране на теста</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-ripple
                  @click="
                    env.deleteDialog(null, quiz.deleteItem, props.item.id)
                  "
                >
                  <q-item-section>
                    <q-item-label class="text-red">
                      Изтриване на теста
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-popup-proxy>
          </q-btn>
        </q-item-section>
      </q-item>
      <div class="text-subtitle2">
        От: {{ props.item.user?.name || "Kristian Kostadinov" }}
      </div>
    </q-card-section>
    <q-img
      src="https://images.unsplash.com/photo-1669570094762-828f3dfaf675?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    />
    <q-card-section class="text-body1">
      {{ props.item.options.description.substring(0, 90) }}
      {{ props.item.options.description.length > 90 ? "..." : "" }}
    </q-card-section>
    <q-separator class="q-my-sm" />
    <q-card-actions>
      <q-item-section>
        <q-btn
          color="primary"
          label="Решавай"
          aria-label="Решавай"
          icon="edit"
          no-caps
          flat
          @click="$router.push(`quiz/${props.item.options.slug}`)"
        />
      </q-item-section>
      <q-item-section side>
        <div>
          <q-btn
            color="red"
            icon="favorite_border"
            no-caps
            round
            fab-mini
            flat
            aria-label="Добави в любими"
            title="Добави в любими"
          />
          <q-btn
            color="accent"
            icon="bookmark_border"
            no-caps
            round
            fab-mini
            flat
            aria-label="Запази"
            title="Запази"
          />
          <q-btn
            :color="`${
              props.item.options.type === quiz.publicString
                ? 'positive'
                : 'grey'
            }`"
            :icon="`${
              props.item.options.type === quiz.publicString
                ? 'lock_open'
                : 'lock'
            }`"
            :title="`${
              props.item.options.type === quiz.publicString
                ? 'Отворен за решаване от всеки'
                : 'Изискава парола'
            }`"
            round
            flat
            fab-mini
          />
          <q-btn icon="diamond" flat color="primary">
            <template v-slot:default>
              {{ props.item.options.points || 10 }}
              <q-popup-proxy>
                <q-item>
                  <q-item-section>
                    <q-item-label caption>
                      Наградата, която ще спечените след като решите теста.
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-popup-proxy>
            </template>
          </q-btn>
        </div>
      </q-item-section>
    </q-card-actions>
  </q-card>
</template>

<script>
import { useEnvStore } from "src/stores/env";
import { useQuizStore } from "src/stores/quiz";
import { defineComponent } from "vue-demi";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "ListQuizView",
  props: {
    item: Object,
  },
  setup(props) {
    const $router = useRouter();
    const quiz = useQuizStore();
    const env = useEnvStore();
    return { $router, props, quiz, env };
  },
});
</script>
