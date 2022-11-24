<template>
  <q-card-section class="navbar-container q-gutter-sm shadow-2">
    <div>
      <router-link
        v-for="(link, index) in NAV_LINKS"
        :key="index"
        :to="link.path"
      >
        <q-btn
          color="white"
          :label="link.name"
          :icon="link.icon"
          flat
          no-caps
        />
      </router-link>
    </div>
    <div>
      <q-btn
        v-for="(link, index) in AUTH_LINKS"
        :key="index"
        color="white"
        :label="link.name"
        :icon="link.icon"
        flat
        no-caps
      />
    </div>
  </q-card-section>
</template>

<script>
import { defineComponent } from "vue";

const NAV_LINKS = [
  {
    name: "Тестове",
    path: "/",
    icon: "quiz",
  },
  {
    name: "Помощ",
    path: "/help",
    icon: "help",
  },
];

const AUTH_LINKS = [
  {
    name: "Вход",
    icon: "login",
  },
  {
    name: "Регистрация",
    icon: "person_add",
  },
];

export default defineComponent({
  name: "NavigationBar",
  setup() {
    return {
      NAV_LINKS,
      AUTH_LINKS,
    };
  },
});
</script>

<style lang="scss">
.navbar-container {
  display: flex;
  justify-content: space-between;
  background-color: $primary;
}
</style>
