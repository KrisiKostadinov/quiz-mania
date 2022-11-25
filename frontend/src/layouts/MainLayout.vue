<template>
  <q-layout view="lHh Lpr lFf">
    <navigation-bar />
    <display-dialogs />
    <q-page-container>
      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";

import NavigationBar from "src/components/common/NavigationBar.vue";
import DisplayDialogs from "src/components/common/DisplayDialogs.vue";

export default defineComponent({
  name: "MainLayout",
  components: {
    "navigation-bar": NavigationBar,
    "display-dialogs": DisplayDialogs,
  },
  setup() {},
});
</script>
