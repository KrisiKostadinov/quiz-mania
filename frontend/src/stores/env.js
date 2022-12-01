import { defineStore } from 'pinia';
import { Notify, Dialog } from 'quasar';
import convert from 'cyrillic-to-latin';

export const useEnvStore = defineStore('env', {
  state: () => ({
    loading: false,
    dialogs: {
      login: false,
      register: false,
      forgotPassword: false,
      createCategory: false,
      detailsCategory: false,
      createQuiz: false,
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
    },
    checkMail(val) {
      const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
      return regexExp.test(val);
    },
    onUpdateSlug(cyrillic) {
      const latin = this.convertCyrilicToLatin(cyrillic);
      return latin.replaceAll(' ', '-').toLowerCase();
    },
    convertCyrilicToLatin(cyrillic) {
      return convert(cyrillic);
    }
  },
});
