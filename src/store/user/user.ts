import Vue from "vue";
import Vuex from "vuex";
import * as fb from "firebase";

Vue.use(Vuex);
export default {
  state: {
    uid: null,
    userInited: false,
    email: null,
    login: null
  },
  mutations: {
    setUser(state: any, payload: any) {
      if (payload != null) {
        state.uid = payload.uid;
        state.email = payload.email;
        state.login = payload.login;
      } else {
        state.uid = null;
        state.email = null;
        state.login = null;
      }
    },
    setUserInited(state: any, payload: any) {
      state.userInited = payload.userInited;
    }
  },
  getters: {
    uid(state: any) {
      return state.uid;
    },
    isUserLoggedIn(state: any) {
      return state.uid != null;
    },
    login(state: any) {
      return state.login;
    },
    email(state: any) {
      return state.email;
    },
    userInited(state: any) {
      return state.userInited;
    }
  },
  actions: {
    async registerUser({ commit }: any, payload: any) {
      commit("clearError");
      commit("setLoading", true);
      try {
        const user = await fb
          .auth()
          .createUserWithEmailAndPassword(payload.email, payload.password);
        if (user.user) {
          const firebaseUser: firebase.User = user.user;
          const newUser = {
            uid: firebaseUser.uid,
            login: payload.login,
            email: payload.email
          };
          await fb
            .database()
            .ref("users")
            .push(newUser);
          commit("setUser", newUser);
          commit("setLoading", false);
        }
      } catch (e) {
        commit("setError", e.reason);
        commit("setLoading", false);
        throw e;
      }
    },
    async loginUser({ commit }: any, payload: any) {
      commit("clearError");
      commit("setLoading", true);
      try {
        const user = await fb
          .auth()
          .signInWithEmailAndPassword(payload.email, payload.password);
        if (user.user) {
          const firebaseUser: firebase.User = user.user;
          const usersRef = fb.database().ref("users");
          usersRef
            .limitToLast(1)
            .orderByChild("uid")
            .equalTo(firebaseUser != null ? firebaseUser.uid : "-1")
            .on("value", a => {
              const resUsers = a.val();
              const resUsersKeys = Object.keys(resUsers);
              const first =
                resUsersKeys.length > 0 ? resUsers[resUsersKeys[0]] : {};
              if (first) {
                const foundUser = {
                  uid: first.uid,
                  login: first.login,
                  email: first.email
                };
                commit("setUser", foundUser);
                commit("setLoading", false);
              }
            });
        }
      } catch (e) {
        commit("setError", e.reason);
        commit("setLoading", false);
        throw e;
      }
    },
    async logoutUser({ commit }: any) {
      const user = await fb.auth().signOut();
      commit("setUser", user);
    },
    autoLoginUser({ commit }: any, payload: any) {
      commit("setUser", payload);
    },
    userInited({ commit }: any, payload: any) {
      return commit("setUserInited", payload);
    }
  }
};
