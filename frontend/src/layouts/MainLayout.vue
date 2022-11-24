<template>
  <q-layout view="lHh Lpr lFf">
    <navigation-bar />
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

export default defineComponent({
  name: "MainLayout",
  components: {
    "navigation-bar": NavigationBar,
  },
  setup() {},
});
</script>
