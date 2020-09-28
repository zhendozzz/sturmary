import Vue from "vue";
import Vuex from "vuex";
import user from "./user/user";
import common from "./common/common";
import question from "./question/question";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    question,
    common
  }
});
