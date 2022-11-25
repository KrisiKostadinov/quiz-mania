import { defineStore } from 'pinia';
import { Notify, Dialog } from 'quasar';

export const useEnvStore = defineStore('env', {
  state: () => ({
    loading: false,
    dialogs: {
      login: false,
      register: false,
    }
  }),
  getters: {},
  actions: {
    te(msg) {
      Notify.create({
        color: 'negative',
        progress: true,
        icon: 'warning',
        message: `${msg || 'Нещо се обърка'}`,
        position: 'bottom-right',
        timeout: 2000,
      });
    },
    ts(msg) {
      Notify.create({
        color: 'positive',
        progress: true,
        icon: 'thumb_up',
        message: `${msg || 'Промените са запазени'}`,
        position: 'bottom-right',
        timeout: 2000,
      });
    },
    deleteDialog(msg, cb, id) {
      Dialog.create({
        cancel: true,
        color: 'negative',
        message: `${msg || 'Наистина ли искате да изтриете това?'}`,
      })
        .onOk(() => {
          cb(id);
        });
    }
  },
});
