<template>
  <q-card class="medium-dialog">
    <q-form @submit.prevent="user.login">
      <q-card-section>
        <div class="q-gutter-md text-center">
          <q-item-label class="text-h6">Вход</q-item-label>
          <q-icon size="3rem" name="login" color="primary" />
          <div class="q-gutter-y-md">
            <q-input label="Имейл" v-model="user.credentials.email" filled>
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
            <q-btn type="submit" label="Вход" color="primary" icon="login" />
          </q-card-actions>
        </div>
        <div class="text-center">
          <q-btn
            flat
            no-caps
            @click="
              env.dialogs.login = false;
              env.dialogs.register = true;
            "
          >
            <template v-slot:default>
              <div class="text-caption">Все още нямаш акаунт?</div>
            </template>
          </q-btn>
        </div>
      </q-card-section>
    </q-form>
  </q-card>
</template>

<script>
import { defineComponent } from "vue-demi";
import { useUserStore } from "src/stores/user";
import { useEnvStore } from "src/stores/env";

export default defineComponent({
  name: "LoginDialog",
  setup() {
    const user = useUserStore();
    const env = useEnvStore();
    return { user, env };
  },
});
</script>
