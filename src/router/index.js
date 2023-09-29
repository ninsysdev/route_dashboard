import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/HomeView.vue'),
    meta : {
      requireAuth : true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  },
  {
    path: '/users/:typequery/:returnto',
    name: 'users',
    component: () => import(/* webpackChunkName: "users" */ '../views/UsersView.vue'),
    meta : {
      requireAuth : true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/RegisterView.vue'),
    meta : {
      requireAuth : true
    }
  },
  {
    path: '/statitics',
    name: 'statitics',
    component: () => import(/* webpackChunkName: "statitics" */ '../views/StatiticsView.vue'),
    meta : {
      requireAuth : true
    }
  },
  {
    path: '/financialdetail/:typequery/:dateinit/:dateend',
    name: 'financialdetail',
    component: () => import(/* webpackChunkName: "financialdetail" */ '../views/FinancialDetailView.vue'),
    meta : {
      requireAuth : true
    }
  },
  {
    path: '/swept',
    name: 'swept',
    component: () => import(/* webpackChunkName: "swept" */ '../views/SweptView.vue'),
    meta : {
      requireAuth : true
    }
  },
];

const history = createWebHistory();

const router = createRouter({
  history,
  routes,
});

router.beforeEach((to,from,next) => {
  const auth = localStorage.getItem('drov_localdata')
  const needAuth = to.meta.requireAuth
  if(needAuth && !auth){
    next('login')
  }
  else{
    next()
  }
});

export default router;
