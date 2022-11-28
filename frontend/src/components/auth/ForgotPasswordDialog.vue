<template>
  <q-card class="medium-dialog">
    <q-form @submit.prevent="user.login" v-if="!user.isSendedForgotPassword">
      <q-card-section>
        <div class="text-center">
          <q-item-label class="text-h6">Забравена парола</q-item-label>
          <q-item-label caption>
            Въведете имейл адреса си, с който сте си направили акаунта за да,
            можете да го възстановите.
          </q-item-label>
          <div class="q-gutter-y-md q-pt-md">
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
          </div>
          <q-card-actions align="center" class="q-pa-md">
            <q-btn
              type="submit"
              label="Изпращане на линк"
              color="primary"
              icon="update"
            />
          </q-card-actions>
        </div>
        <div class="text-center">
          <q-btn
            flat
            no-caps
            @click="
              env.dialogs.forgotPassword = false;
              env.dialogs.login = true;
            "
          >
            <template v-slot:default>
              <div class="text-caption">Вече имаш акаунт?</div>
            </template>
          </q-btn>
        </div>
      </q-card-section>
    </q-form>
    <q-banner v-else>
      <q-card-section class="q-gutter-md text-center">
        <div class="q-pb-md text-h2">
          <q-icon
            name="check"
            color="white"
            class="q-pa-md bg-positive rounded"
          />
          <q-item-label class="q-pt-md text-h6">
            Успешно изпратен линк
          </q-item-label>
        </div>
        <small>
          Успешно изпратихте линк за възстановятане на акаунта Ви. Проверете
          имейла си и кликнете вурху връзката за да, можете да смените паролата
          си.
        </small>
        <q-btn
          label="Затвори"
          no-caps
          color="negative"
          @click="
            env.dialogs.forgotPassword = false;
            user.isSendedForgotPassword = false;
          "
        />
      </q-card-section>
    </q-banner>
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
  name: "ForgotPasswordDialog",
  setup() {
    const user = useUserStore();
    const env = useEnvStore();
    return { user, env };
  },
});
</script>
