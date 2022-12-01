import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { useEnvStore } from 'src/stores/env';
import { useQuizStore } from 'src/stores/quiz';

const env = useEnvStore();
const quiz = useQuizStore();

export const useQuestionStore = defineStore('question', {
  state: () => ({
    url: 'questions',
    defaultItemsCountToFetch: 100,
    filterTerm: '',
    levels: [
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
    item: {},
    items: [],
    fetchedItems: [],
  }),
  getters: {
    setInitialState(state) {
      return {
        options: {
          level: state.levels[0].value,
          categoryId: quiz.item.options.categoryId,
          points: {
            checkbox: true,
            value: 1
          },
          answers: []
        }
      }
    },
    emptyAnswer: () => {
      return {
        value: '',
        is_correct: false,
      }
    }
  },
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
      const isNew = !this.item.id ? true : false;
      api.post(this.url, this.item)
        .then((res) => {
          if (typeof res.data === 'object') {
            env.ts();
            if (isNew && env.dialogs.createQuiz) {
              quiz.item.options.question_ids.push(res.data.id);
              this.$reset();
              env.dialogs.createQuestion = false;
              quiz.getItem();
              setTimeout(() => { env.dialogs.createQuestion = true; }, 1000);
            } else {
              this.item = res.data;
              this.getItems();
            }
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
    },
    addAnswer() {
      this.item.options.answers.push(structuredClone(this.emptyAnswer));
    },
    removeAnswer(index) {
      this.item.options.answers.splice(index, 1);
    }
  },
});
