import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { useEnvStore } from './env';

const env = useEnvStore();

export const useQuizStore = defineStore('quiz', {
  state: () => ({
    url: 'quizzes',
    privateString: 'private',
    publicString: 'public',
    difficultyLevels: [
      {
        label: 'Лесно',
        value: 'easy'
      },
      {
        label: 'Средно',
        value: 'medium'
      },
      {
        label: 'Трудно',
        value: 'hard'
      },
    ],
    statuses: [
      {
        label: 'Активен',
        value: 'active'
      },
      {
        label: 'Чакащ',
        value: 'pending'
      },
      {
        label: 'Отхвърлен',
        value: 'discarded'
      },
    ],
    filterTerm: '',
    item: {},
    fetchedItems: [],
    items: []
  }),
  getters: {
    setInitialState: (state) => {
      return {
        user_id: 1,
        questions: [],
        password: null,
        options: {
          title: '',
          description: '',
          type: state.publicString,
          played_count: 0,
          categoryId: null,
          diffcultyLevel: 'medium',
          withTimeout: false,
          withPoints: true,
          timeInMinutes: null,
          status: state.statuses[1].value,
          points: 0,
          question_ids: []
        }
      }
    }
  },
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
            this.getItems();
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
            this.getItems();
            this.item = this.setInitialState;
          } else if (res.data === 'invalid_id') {
            env.te('Този тест не съществува');
          }
        })
        .catch((err) => env.te(err.message))
        .finally(() => env.loading = false);
    },
    filter() {
      this.items = this.fetchedItems.filter(x => {
        return x.options.title.includes(this.filterTerm) || x.options.description.includes(this.filterTerm)
      });
    },
    onUpdate() {
      if (this.item.options.type === this.privateString) this.item.password = this.generatePassword();
      else this.item.password = null;
      if (!this.item.options.withTimeout) this.item.options.timeInMinutes = null;
    },
    generatePassword() {
      return Date.now();
    }
  }
});
