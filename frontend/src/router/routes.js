
const initialRoutes = [
  { path: '', component: () => import('pages/IndexPage.vue') },
  { path: 'help', component: () => import('pages/HelpPage.vue') },
]

const categoriesRoutes = [
  { path: 'categories', component: () => import('src/pages/categories/CategoriesPage.vue') },
  { path: 'category/:id', component: () => import('src/pages/categories/DetailsCategoryPage.vue') },
]

const quizzesRoutes = [
  { path: 'quiz/:slug', component: () => import('src/pages/quizzes/DetailsQuizPage.vue') },
]

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      ...initialRoutes,
      ...categoriesRoutes,
      ...quizzesRoutes
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
