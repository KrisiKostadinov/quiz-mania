<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">{{ quiz.title }}</div>
      <div class="text-subtitle2">
        От: {{ quiz.user?.name || "Kristian Kostadinov" }}
      </div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      {{ quiz.description.substring(0, 100) }}
      {{ quiz.description.length > 100 ? "..." : "" }}
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
          @click="$router.push(`quiz/${quiz.slug}`)"
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
        </div>
      </q-item-section>
    </q-card-actions>
  </q-card>
</template>

<script>
import { defineComponent } from "vue-demi";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "ListView",
  props: {
    store: Object,
    quiz: Object,
  },
  setup(props) {
    const $router = useRouter();
    return { $router, props };
  },
});
</script>
