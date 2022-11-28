import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { useEnvStore } from './env';

const env = useEnvStore();

export const useCategoryStore = defineStore('category', {
  state: () => ({
    url: 'categories',
    filterTerm: '',
    item: {},
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
          this.item = res.data;
          env.ts('Категорията бе създадена');
          env.dialogs.createCategory = false;
          this.getItems();
          if (typeof res.data === 'object') {
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
          env.ts('Категорията бе изтрита');
          this.getItems();
          if (res.data === 'success') {
          } else if (res.data === 'invalid_id') {
            env.te('Тази категория не съществува');
          }
        })
        .catch((err) => env.te(err.message))
        .finally(() => env.loading = false);
    },
    filter() {
      this.items = this.fetchedItems.filter(x =>
        x.options.title.toLowerCase().includes(this.filterTerm.toLowerCase()) ||
        x.options.description?.toLowerCase().includes(this.filterTerm.toLowerCase())
      );
    }
  },
});
