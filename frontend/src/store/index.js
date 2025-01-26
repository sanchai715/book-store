import { createStore } from 'vuex';
import api from '@/utils/api';

const store = createStore({
  state: {
    user: null,
    cart: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setCart(state, cart) {
      state.cart = cart;
    },
    clearCart(state) {
      state.cart = [];
    },
  },
  actions: {
    async fetchCart({ commit }) {
      const response = await api.getCart();
      commit('setCart', response.data.items);
    },
    async addToCart({ commit, state }, { productId, quantity }) {
      await api.addToCart(productId, quantity);
      commit('setCart', [...state.cart, { productId, quantity }]);
    },
    async clearCart({ commit }) {
      await api.clearCart();
      commit('clearCart');
    },
  },
});

export default store;