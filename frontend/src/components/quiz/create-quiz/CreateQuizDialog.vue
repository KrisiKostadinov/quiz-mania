<template>
  <q-card class="medium-dialog">
    <q-scroll-area class="scroll-area">
      <q-form>
        <q-card-section class="text-center">
          <q-item-label class="text-h5"> Създаване на тест </q-item-label>
          <div class="q-gutter-y-md q-pt-md">
            <q-input
              label="Заглавие"
              v-model="quiz.item.options.title"
              lazy-rules
              :rules="[
                (val) => !!val || 'Това поле е задължително!',
                (val) =>
                  val.length >= 3 ||
                  'Това поле трябва да съдържа поне 3 букви.',
              ]"
              filled
              hint="Как се казва теста?"
            />
            <q-input
              label="Заглавие на латиница (slug)"
              v-model="quiz.item.options.slug"
              filled
              hint="Това ще се показва след името на сайта."
              @update:model-value="
                (val) => (quiz.item.options.slug = env.onUpdateSlug(val))
              "
              lazy-rules
              :rules="[(val) => !!val || 'Това поле е задължително!']"
            />
            <q-input
              type="textarea"
              label="Описание"
              v-model="quiz.item.options.description"
              lazy-rules
              :rules="[
                (val) => !!val || 'Това поле е задължително!',
                (val) =>
                  val.length >= 20 ||
                  'Това поле трябва да съдържа поне 20 букви.',
              ]"
              filled
              hint="Напишете подробно описание на теста."
            />
            <q-select
              label="Категория"
              v-model="quiz.item.options.categoryId"
              :options="category.items"
              :option-value="(val) => val.id"
              :option-label="(val) => val.options?.title"
              emit-value
              map-options
              :loading="env.loading"
              filled
            />
            <q-select
              label="Ниво на трудност"
              :options="quiz.difficultyLevels"
              v-model="quiz.item.options.diffcultyLevel"
              emit-value
              map-options
              filled
              hint="Въпроси от коя категория, ще съдържа теста?"
            />
            <q-select
              label="Състояние / Статус"
              v-model="quiz.item.options.status"
              :options="quiz.statuses"
              emit-value
              map-options
              filled
            />
            <type-setting />
            <q-separator />
            <q-checkbox
              label="За време ли, ще бъде теста?"
              v-model="quiz.item.options.withTimeout"
              @update:model-value="quiz.onUpdate"
            />
            <q-input
              v-if="quiz.item.options.withTimeout"
              label="Време в минути"
              v-model="quiz.item.options.timeInMinutes"
              lazy-rules
              :rules="[(val) => !!val || 'Това поле е задължително!']"
              filled
              hint="Напишете продължителността на теста в минути."
            />
            <q-separator />
            <q-checkbox
              label="Ще дава ли точки за верен отговор?"
              v-model="quiz.item.options.withPoints"
            />
            <q-btn icon="quiz" class="q-ml-md" flat round fab-mini>
              <q-popup-proxy class="small-proxy-dialog">
                <q-item>
                  <q-item-section>
                    <q-item-label>
                      Дали да се дават точки за всеки верен отговор.
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-popup-proxy>
            </q-btn>
            <q-separator />
            <q-btn
              v-if="quiz.item.id"
              label="Въпроси"
              icon="visibility"
              color="primary"
              no-caps
              @click="env.dialogs.listQuestionsInQuizView = true"
            />
            <q-banner v-else>
              <q-item>
                <q-item-section>
                  След като съхрините теста, ще можете да добавите въпроси към
                  него.
                </q-item-section>
              </q-item>
            </q-banner>
            <q-separator />
          </div>
          <q-card-actions align="center" class="q-pa-md">
            <q-btn
              type="submit"
              label="Запазване на теста"
              no-caps
              color="primary"
              icon="save"
              @click="quiz.saveItem"
              :loading="env.loading"
              :disable="env.loading"
            />
          </q-card-actions>
        </q-card-section>
      </q-form>
    </q-scroll-area>
    <q-btn
      class="close-button-dialog"
      icon="close"
      color="negative"
      no-caps
      round
      fab-mini
      v-close-popup
    />
  </q-card>
</template>

<script>
import { defineComponent } from "vue";

import { useCategoryStore } from "src/stores/category";
import { useQuizStore } from "src/stores/quiz";
import { useEnvStore } from "src/stores/env";
import TypeSetting from "src/components/quiz/create-quiz/parts/TypeSetting.vue";
import { useQuestionStore } from "src/stores/question";

export default defineComponent({
  name: "CreateQuizDialog",
  components: {
    "type-setting": TypeSetting,
  },
  setup() {
    const quiz = useQuizStore();
    const question = useQuestionStore();
    const category = useCategoryStore();
    const env = useEnvStore();
    if (!category.items.length) category.getItems();
    if (!quiz.item.id) quiz.item = structuredClone(quiz.setInitialState);
    return { quiz, question, category, env };
  },
});
</script>
