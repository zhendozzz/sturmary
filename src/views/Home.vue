<template>
  <div class="home">
    <vs-row vs-justify="center">
      <vs-button @click="ask" color="dark" type="border"
        >{{ $t("home_askbutton_text") }}
      </vs-button>
      <vs-chip>
        {{ isUserLoggedIn ? login : $t("home_anonimuslabel_text") }}
      </vs-chip>
      <vs-button
        v-if="isUserLoggedIn"
        @click="logout"
        color="dark"
        type="border"
      >
        {{ $t("home_exitbutton_text") }}
      </vs-button>
      <vs-button v-else @click="logingIn" color="dark" type="border"
        >{{ $t("home_enterbutton_text") }}
      </vs-button>
    </vs-row>
    <QuestionList />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import QuestionList from "@/components/QuestionList.vue";

@Component({
  components: {
    QuestionList
  }
})
export default class Home extends Vue {
  get isUserLoggedIn() {
    return this.$store.getters.isUserLoggedIn;
  }

  get email() {
    return this.$store.getters.email;
  }

  get login() {
    return this.$store.getters.login;
  }

  ask(): void {
    this.$router.push({ path: "/new" });
  }

  logingIn(): void {
    this.$router.push({ path: "/login" });
  }

  logout(): void {
    this.$store.dispatch("logoutUser");
  }
}
</script>
