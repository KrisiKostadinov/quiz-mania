<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">Държави и столици</div>
      <div class="text-subtitle2">by John Doe</div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam enim quasi
      ipsa non quo aut magnam provident rem, inventore dolor perferendis veniam
      impedit, nihil beatae quis aliquam suscipit minus adipisci?
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
          @click="$router.push('quiz/10')"
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
  setup() {
    const $router = useRouter();
    return { $router };
  },
});
</script>
