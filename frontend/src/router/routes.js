
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'help', component: () => import('pages/HelpPage.vue') },
      { path: 'categories', component: () => import('pages/CategoriesPage.vue') },
      { path: '/:slug', component: () => import('pages/DetailsCategoryPage.vue') },
      { path: 'quiz/:slug', component: () => import('pages/DetailsQuizPage.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
