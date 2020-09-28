import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as fb from "firebase";
import "@/plugins/index";
import { i18n } from "@/plugins/i18n/i18n";
import FlagIcon from "vue-flag-icon";

Vue.use(FlagIcon);
Vue.config.productionTip = false;

new Vue({
  i18n,
  router,
  store,
  created() {
    fb.initializeApp({
      apiKey: "AIzaSyDHo-K2Wnlj6DlRQe_yyONbdDaAmARAXC8",
      authDomain: "sturmary-4b7cb.firebaseapp.com",
      databaseURL: "https://sturmary-4b7cb.firebaseio.com",
      projectId: "sturmary-4b7cb",
      storageBucket: "sturmary-4b7cb.appspot.com",
      messagingSenderId: "873733560178",
      appId: "1:873733560178:web:3c741f3fa0e75b72052feb",
      measurementId: "G-TT2YX3093X"
    });
    fb.auth().onAuthStateChanged(user => {
      const usersRef = fb.database().ref("users");
      usersRef
        .limitToLast(1)
        .orderByChild("uid")
        .equalTo(user != null ? user.uid : "-1")
        .on("value", a => {
          const resUsers = a.val();
          if (resUsers) {
            const resUsersKeys = Object.keys(resUsers);
            const first =
              resUsersKeys.length > 0 ? resUsers[resUsersKeys[0]] : {};
            if (first) {
              this.$store.dispatch("autoLoginUser", {
                uid: first.uid,
                login: first.login,
                email: first.email
              });
            }
          }
        });
      this.$store.dispatch("userInited", {
        userInited: true
      });
    });
  },
  render: h => h(App)
}).$mount("#app");
