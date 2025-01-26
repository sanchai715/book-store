import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import Booklist from '@/pages/Booklist.vue';
import Cart from '@/pages/Cart.vue';
import Signin from '@/pages/Signin.vue';
import Signup from '@/pages/Signup.vue';

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '', name: 'Booklist', component: Booklist },
      { path: '/cart', name: 'Cart', component: Cart },
    ],
  },
  { path: '/signin', name: 'Signin', component: Signin },
  { path: '/signup', name: 'Signup', component: Signup },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;