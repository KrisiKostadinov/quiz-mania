import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { useEnvStore } from './env';

const env = useEnvStore();

export const useUserStore = defineStore('user', {
  state: () => ({
    url: 'users',
    logoutUrl: 'users/logout',
    loggedIn: false,
    me: {},
    error: '',
    credentials: {
      email: '',
      password: '',
    },
  }),
  actions: {
    register() {
      env.loading = true;
      api.post(this.url, this.credentials)
        .then((res) => {
          if (typeof res.data === 'object') {
            this.afterLogin(res.data);
          } else if (res.data === 'exists_email') {
            this.error = 'Този имейл вече съществува';
          }
        })
        .catch((err) => env.te(err.message))
        .finally(() => env.loading = false);
    },
    login() {
      env.loading = true;
      api.put(this.url, this.credentials)
        .then((res) => {
          if (typeof res.data === 'object') {
            this.afterLogin(res.data);
          } else if (res.data === 'invalid_email_or_password') {
            this.error = 'Невалиден имейл или парола';
          }
        })
        .catch((err) => env.te(err.message))
        .finally(() => env.loading = false);
    },
    logout() {
      env.loading = true;
      api.post(this.logoutUrl)
        .then((res) => {
          if (res.data === 'success') {
            localStorage.removeItem('token');
            this.loggedIn = false;
            this.$reset();
            env.dialogs.login = true;
          }
        })
        .catch((err) => env.te(err.message))
        .finally(() => env.loading = false);
    },
    afterLogin(data) {
      localStorage.setItem("token", data.token);
      this.loggedIn = true;
      api.defaults.headers.common["Authorization"] = "Bearer " + data.token;
      env.dialogs.register = false;
      env.dialogs.login = false;
      this.getUser();
    },
    getUser() {
      api.get(this.url)
        .then((res) => {
          if (typeof res.data === 'object') {
            this.me = res.data;
          }
        })
        .catch((err) => env.te(err.message))
        .finally(() => env.loading = false);
    }
  },
});
