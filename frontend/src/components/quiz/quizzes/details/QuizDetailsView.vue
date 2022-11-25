<template>
  <q-card class="card-container">
    <q-card-section>
      <h1 class="text-h5 text-center">Активни ли сте в любовта?</h1>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <p>
        Активни ли сте в любовта? Къде и как обичате да правите секс? Може ли да
        го направите на публично място или предпочитате уютната обстановка на
        дома това ще разберете след като решите теста.
      </p>
      <ul>
        <li>Тестът се състои от 5 въпроса.</li>
        <li>Решаван 12497 пъти</li>
      </ul>
    </q-card-section>
    <q-card-actions class="flex justify-center">
      <q-btn color="primary" class="q-pa-md">
        <template v-slot:default>
          <div class="button">Начало на теста</div>
        </template>
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import { defineComponent } from "vue-demi";

export default defineComponent({
  name: "QuizDetailsView",
});
</script>
<style lang="scss">
.card-container {
  width: 60%;

  @media (max-width: $tablet) {
    width: 80%;
  }
  @media (max-width: $mobile) {
    width: 100%;
  }
}
</style>
