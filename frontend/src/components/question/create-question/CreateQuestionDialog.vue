<template>
  <q-card class="medium-dialog">
    <q-scroll-area class="scroll-area">
      <q-form @submit.prevent="question.saveItem">
        <q-card-section class="q-gutter-md">
          <q-item-label class="text-center text-h6">
            Създаване на въпрос
          </q-item-label>
          <q-input
            type="textarea"
            label="Заглавие"
            v-model="question.item.options.title"
            lazy-rules
            :rules="[(val) => !!val || 'Това поле е задъжително!']"
            filled
          />
          <q-item>
            <q-item-section>
              <q-item-label class="text-h6">Отговори</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn
                icon="more_vert"
                label="Опции за отговори"
                flat
                no-caps
                color="primary"
                v-if="question.item.options.answers.length < 4"
              >
                <q-menu cover anchor="top middle" auto-close fit>
                  <q-item>
                    <q-item-section>
                      <q-btn
                        label="Добави отговор"
                        icon="add"
                        color="primary"
                        flat
                        no-caps
                        @click="question.addAnswer()"
                      />
                    </q-item-section>
                  </q-item>
                </q-menu>
              </q-btn>
            </q-item-section>
          </q-item>
          <q-input
            v-for="(answer, index) in question.item.options.answers"
            :key="index"
            v-model="answer.value"
            :model-value="answer.value"
            :label="`Отговор: ${index + 1}`"
            lazy-rules
            :rules="[(val) => !!val || 'Това поле е задъжително!']"
            filled
          >
            <template v-slot:append>
              <q-btn icon="more_vert" flat round fab-mini>
                <q-menu cover anchor="top middle" auto-close>
                  <q-item>
                    <q-item-section>
                      <q-btn
                        align="left"
                        :label="
                          answer.is_correct ? 'Верен отговор' : 'Грешен отговор'
                        "
                        icon="change_circle"
                        :color="answer.is_correct ? 'primary' : 'negative'"
                        flat
                        no-caps
                        @click="answer.is_correct = !answer.is_correct"
                        :disable="
                          question.item.options.answers.some(
                            (x) => x.is_correct
                          ) && !answer.is_correct
                        "
                      />
                    </q-item-section>
                  </q-item>
                  <q-item v-if="question.item.options.answers.length > 2">
                    <q-item-section>
                      <q-btn
                        align="left"
                        label="Изтрии"
                        icon="remove"
                        color="negative"
                        flat
                        no-caps
                        @click="question.removeAnswer(index)"
                      />
                    </q-item-section>
                  </q-item>
                </q-menu>
              </q-btn>
            </template>
            <template v-slot:before v-if="answer.is_correct">
              <q-icon name="check" color="positive" title="Верен отговор" />
            </template>
          </q-input>
          <q-toolbar-title>Детайли</q-toolbar-title>
          <q-select
            label="Ниво на трудност"
            v-model="question.item.options.level"
            emit-value
            map-options
            :options="question.levels"
            filled
          />
          <q-select
            label="Категория"
            v-model="question.item.options.categoryId"
            :options="category.items"
            emit-value
            map-options
            :option-label="(val) => val.options.title"
            :option-value="(val) => val.id"
            filled
          />
          <q-checkbox
            v-model="question.item.options.points.checkbox"
            label="Ще дава ли точки?"
          />
          <q-input
            v-if="question.item.options.points.checkbox"
            min="1"
            max="4"
            label="Колко точки ще дава"
            v-model="question.item.options.points.value"
            filled
            hint="Въведете число от 1 до 4 включително."
            lazy-rules
            :rules="[
              (val) => !!val || 'Това поле е задължително.',
              (val) =>
                Number.isInteger(parseInt(val)) || 'Моля, въведете число.',
              (val) =>
                (parseInt(val) <= 4 && parseInt(val) >= 1) ||
                'Моля, въведете число от 1 до 4 включително.',
            ]"
          />
        </q-card-section>
        <q-card-actions align="center">
          <q-btn
            type="submit"
            label="Запазване"
            color="primary"
            :disable="env.loading"
            :loading="env.loading"
            no-caps
          />
        </q-card-actions>
      </q-form>
    </q-scroll-area>
  </q-card>
</template>

<script>
import { useCategoryStore } from "src/stores/category";
import { useEnvStore } from "src/stores/env";
import { useQuestionStore } from "src/stores/question";
import { defineComponent } from "vue-demi";

export default defineComponent({
  name: "CreateQuestionDialog",
  setup() {
    const question = useQuestionStore();
    const category = useCategoryStore();
    const env = useEnvStore();
    if (!category.items.length) category.getItems();
    if (!question.item.id) {
      question.$reset();
      question.item = question.setInitialState;
      for (let i = 0; i < 2; i++) {
        question.addAnswer();
      }
    }
    return { question, category, env };
  },
});
</script>
