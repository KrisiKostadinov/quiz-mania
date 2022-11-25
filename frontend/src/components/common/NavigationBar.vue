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
    <div v-if="!user.loggedIn">
      <q-btn
        v-for="(link, index) in LOGOUT_LINKS"
        :key="index"
        color="white"
        :label="link.name"
        :icon="link.icon"
        flat
        no-caps
        @click="link.openDialog()"
      />
    </div>
    <div v-else>
      <router-link
        v-for="(link, index) in LOGGED_IN_LINKS"
        :key="index"
        :to="link.path"
      >
        <q-btn
          color="white"
          :label="link.name"
          :icon="link.icon"
          no-caps
          flat
          @click="link.action ? link.action(user.logout) : null"
        />
      </router-link>
    </div>
  </q-card-section>
</template>

<script>
import { useEnvStore } from "src/stores/env";
import { useUserStore } from "src/stores/user";
import { defineComponent } from "vue";

const NAV_LINKS = [
  {
    name: "Тестове",
    path: "/",
    icon: "quiz",
  },
  {
    name: "Категории",
    path: "/categories",
    icon: "category",
  },
  {
    name: "Помощ",
    path: "/help",
    icon: "help",
  },
];

export default defineComponent({
  name: "NavigationBar",
  setup() {
    const env = useEnvStore();
    const user = useUserStore();

    const LOGOUT_LINKS = [
      {
        name: "Вход",
        icon: "login",
        openDialog: () => (env.dialogs.login = true),
      },
      {
        name: "Регистрация",
        icon: "person_add",
        openDialog: () => (env.dialogs.register = true),
      },
    ];

    const LOGGED_IN_LINKS = [
      {
        name: user.me.name,
        icon: "person",
        path: "/account",
      },
      {
        name: "Изход",
        icon: "logout",
        path: "",
        action: (cb) => cb(),
      },
    ];

    return {
      NAV_LINKS,
      LOGOUT_LINKS,
      LOGGED_IN_LINKS,
      env,
      user,
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
