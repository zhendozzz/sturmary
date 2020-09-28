export default {
  state: {
    loading: false,
    error: null
  },
  mutations: {
    setLoading(state: any, payload: boolean) {
      state.loading = payload;
    },
    setError(state: any, payload: string) {
      state.error = payload;
    },
    clearError(state: any) {
      state.error = null;
    }
  },
  actions: {
    setLoading(context: any, payload: boolean) {
      context.commit("setLoading", payload);
    },
    setError(context: any, payload: string) {
      context.commit("setError", payload);
    }
  },
  getters: {
    loading(state: any) {
      return state.loading;
    },
    error(state: any) {
      return state.error;
    }
  }
};
