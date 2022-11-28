import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { useEnvStore } from 'src/stores/env';

const env = useEnvStore();

export const useQuestionStore = defineStore('question', {
  state: () => ({
    url: 'questions',
    defaultItemsCountToFetch: 100,
    filterTerm: '',
    item: {},
    items: [],
    fetchedItems: [],
  }),
  actions: {
    getItem(id) {
      env.loading = true;
      api.get(`${this.url}/${id}`)
        .then((res) => {
          if (typeof res.data === 'object') {
            this.item = res.data;
          }
        })
        .catch(err => env.te(err.message))
        .finally(() => env.loading = false);
    },
    getItems() {
      env.loading = true;
      api.get(this.url, { params: { count: this.defaultItemsCountToFetch } })
        .then((res) => {
          if (typeof res.data === 'object') {
            this.items = res.data;
            this.fetchedItems = res.data;
          }
        })
        .catch(err => env.te(err.message))
        .finally(() => env.loading = false);
    },
    saveItem() {
      env.loading = true;
      api.post(this.url, this.item)
        .then((res) => {
          if (typeof res.data === 'object') {
            this.item = res.data;
            this.getItems();
            env.ts();
          }
        })
        .catch(err => env.te(err.message))
        .finally(() => env.loading = false);
    },
    deleteItem(id) {
      env.loading = true;
      api.delete(`${this.url}/${id}`)
        .then((res) => {
          if (res.data === 'ok') {
            this.item = res.data;
            env.ts();
            this.getItems();
          }
        })
        .catch(err => env.te(err.message))
        .finally(() => env.loading = false);
    },
    filter() {
      this.items = this.fetchedItems.filter(x => {
        return x.options.title.includes(this.filterTerm) || x.options.description.includes(this.filterTerm)
      });
    }
  },
});
