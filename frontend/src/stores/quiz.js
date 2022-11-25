import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { useEnvStore } from './env';

const env = useEnvStore();

export const useQuizStore = defineStore('quiz', {
  state: () => ({
    url: 'quizzes',
    filter: '',
    item: {
      title: '',
      description: '',
      played_count: 0,
      user_id: 1,
      questions: []
    },
    fetchedItems: [],
    items: []
  }),
  actions: {
    getItems() {
      env.loading = true;
      api.get(this.url)
        .then((res) => {
          if (typeof res.data === 'object') {
            this.items = res.data;
            this.fetchedItems = res.data;
          }
        })
        .catch((err) => env.te(err.message))
        .finally(() => env.loading = false);
    },
    getItem(id) {
      env.loading = true;
      api.get(`${this.url}/${id}`)
        .then((res) => {
          if (typeof res.data === 'object') {
            this.item = res.data;
          }
        })
        .catch((err) => env.te(err.message))
        .finally(() => env.loading = false);
    },
    saveItem() {
      env.loading = true;
      api.post(this.url, this.item)
        .then((res) => {
          if (typeof res.data === 'object') {
            this.item = res.data;
            env.ts('Тестът бе създаден');
          } else if (res.data === 'slug_exists') {
            env.te('Този slug вече съществъва, моля въведете друг.');
          }
        })
        .catch((err) => env.te(err.message))
        .finally(() => env.loading = false)
    },
    deleteItem(id) {
      env.loading = true;
      api.delete(`${this.url}/${id}`)
        .then((res) => {
          if (res.data === 'success') {
            env.ts('Тестът бе изтрита');
            this.getItem();
          } else if (res.data === 'invalid_id') {
            env.te('Този тест не съществува');
          }
        })
        .catch((err) => env.te(err.message))
        .finally(() => env.loading = false);
    }
  }
});
