<template>
  <q-card class="medium-dialog">
    <q-form @submit.prevent="user.register">
      <q-card-section>
        <div class="q-gutter-md text-center">
          <q-item-label class="text-h6">Регистрация</q-item-label>
          <q-icon size="3rem" name="person_add" color="primary" />
          <div class="q-gutter-y-md">
            <q-input label="Име и Фамилия" v-model="user.me.name" filled>
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>
            <q-input
              label="Имейл"
              v-model="user.credentials.email"
              filled
              lazy-rules
              :rules="[(val) => env.checkMail(val)]"
            >
              <template v-slot:error>
                <div class="text-caption">Въведете валиден имейл адрес.</div>
              </template>
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
            </q-input>
            <q-input label="Парола" v-model="user.credentials.password" filled>
              <template v-slot:prepend>
                <q-icon name="mail" />
              </template>
            </q-input>
          </div>
          <q-card-actions align="center" class="q-pa-md">
            <q-btn
              type="submit"
              label="Регистрация"
              color="primary"
              icon="login"
            />
          </q-card-actions>
        </div>
        <div class="text-center">
          <q-btn
            flat
            no-caps
            @click="
              env.dialogs.login = true;
              env.dialogs.register = false;
            "
          >
            <template v-slot:default>
              <div class="text-caption">Вече имаш акаунт?</div>
            </template>
          </q-btn>
        </div>
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
import { useUserStore } from "src/stores/user";
import { useEnvStore } from "src/stores/env";

export default defineComponent({
  name: "RegisterDialog",
  setup() {
    const user = useUserStore();
    const env = useEnvStore();
    return { user, env };
  },
});
</script>
