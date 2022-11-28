<template>
  <q-card class="medium-dialog">
    <q-form @submit.prevent="category.saveItem">
      <q-card-section>
        <div class="text-center">
          <q-item-label class="text-h6">
            {{
              `${
                category.item.id ? "Редактиране на категория" : "Нова категория"
              }`
            }}
          </q-item-label>
          <q-item-label caption>
            Полетата със звездичка са задължители!
          </q-item-label>
        </div>
        <div class="q-gutter-y-md q-pt-md">
          <q-input
            v-model="category.item.options.title"
            label="Име *"
            lazy-rules
            :rules="[(val) => !!val]"
            filled
          />
          <q-input
            v-model="category.item.options.slug"
            label="Slug *"
            lazy-rules
            :rules="[(val) => !!val]"
            filled
          >
            <template v-slot:hint>
              <small>
                Този текст, ще се показва в адресната лента когато отворите
                категорията
              </small>
            </template>
            <template v-slot:error>
              <small>Това поле е задължително!</small>
            </template>
          </q-input>
          <q-input
            type="textarea"
            label="Описание"
            v-model="category.item.options.description"
            filled
          />
        </div>
        <q-card-actions align="center" class="q-pa-md">
          <q-btn
            type="submit"
            label="Запазване"
            color="primary"
            icon="update"
            no-caps
          />
        </q-card-actions>
      </q-card-section>
    </q-form>
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
import { defineComponent } from "vue-demi";

import { useCategoryStore } from "src/stores/category";
import { useEnvStore } from "src/stores/env";

export default defineComponent({
  name: "CreateCategoryDialog",
  setup() {
    const category = useCategoryStore();
    const env = useEnvStore();
    return { category, env };
  },
});
</script>
