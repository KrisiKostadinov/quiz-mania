<template>
  <div>
    <q-radio
      label="Публичен тест"
      :val="quiz.publicString"
      v-model="quiz.item.options.type"
      @update:model-value="quiz.onUpdate"
    />
    <q-radio
      label="Частен тест"
      :val="quiz.privateString"
      v-model="quiz.item.options.type"
      @update:model-value="quiz.onUpdate"
    />
    <q-btn icon="quiz" round flat fab-mini class="q-ml-md">
      <q-popup-proxy class="small-proxy-dialog">
        <q-item>
          <q-item-section>
            <q-item-label>
              <span class="text-weight-bold">Частен:</span> За тези тестове, се изискава парола за достъп, но хора без профил могат да ги решават.
            </q-item-label>
            <q-item-label>
              <span class="text-weight-bold">Публичен:</span> Тези тестове магат
              да се решават от всеки, без значение дали има профил.
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-popup-proxy>
    </q-btn>
    <div v-if="quiz.item.options.type === quiz.privateString">
      <small>Код за решаване на тества:</small>
      <q-item-label class="text-primary text-weight-bold">{{
        quiz.item.password
      }}</q-item-label>
    </div>
  </div>
</template>

<script>
import { useQuizStore } from "src/stores/quiz";
import { defineComponent } from "vue";

export default defineComponent({
  name: "TypeSetting",
  setup() {
    const quiz = useQuizStore();
    return { quiz };
  },
});
</script>
