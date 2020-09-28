<template>
  <vs-card>
    <div slot="header">
      <vs-row vs-justify="center">
        <h3>
          {{ $t("login_autorization_text") }}
        </h3>
      </vs-row>
      <vs-row vs-justify="center">
        <vs-button to="/register" type="flat">
          {{ $t("login_registrationbutton_text") }}
        </vs-button>
      </vs-row>
    </div>
    <div slot="extra-content">
      <vs-row vs-justify="center">
        <vs-input
          color="dark"
          type="email"
          :label-placeholder="$t('login_emailinput_placeholder')"
          :danger="email.danger"
          :danger-text="email.dangertext"
          v-model="email.value"
          @input="validateEmail()"
          ref="email"
          @keypress.enter="enterEmailPressed"
        />
      </vs-row>

      <vs-row vs-justify="center">
        <vs-input
          color="dark"
          type="password"
          :label-placeholder="$t('login_passwordinput_placeholder')"
          :danger="password.danger"
          :danger-text="password.dangerText"
          v-model="password.value"
          ref="password"
          @input="validatePassword()"
          @keypress.enter="enterPasswordPressed"
        />
      </vs-row>
      <div slot="footer">
        <vs-row vs-type="flex" vs-justify="center">
          <vs-col vs-type="flex" vs-justify="center" vs-align="center">
            <vs-button to="/" type="flat" color="dark">
              {{ $t("login_backbutton_text") }}
            </vs-button>
            <vs-button :disabled="!validateForm()" @click="login" color="dark">
              {{ $t("login_enterbutton_text") }}
            </vs-button>
          </vs-col>
        </vs-row>
      </div>
    </div>
  </vs-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({})
export default class Login extends Vue {
  login_registrationbutton_text = "login_registrationbutton_text";
  email = {
    success: false,
    danger: false,
    value: "",
    dangertext: ""
  };

  password = {
    success: false,
    danger: false,
    value: "",
    dangertext: ""
  };
  $vs: any;

  validateForm() {
    return this.email.success && this.password.success;
  }

  validatePassword() {
    const passwordStore = this.password;
    if (passwordStore.value.length < 6) {
      passwordStore.success = false;
      passwordStore.danger = true;
      passwordStore.dangertext = "Слишком короткий пароль";
    } else {
      passwordStore.success = true;
      passwordStore.danger = false;
      passwordStore.dangertext = "";
    }
  }

  validateEmail() {
    const emailStore = this.email;
    const value = emailStore.value;
    const regExp = RegExp(/^[0-9a-z-.]+@[0-9a-z-]{2,}\.[a-z]{2,}$/i);
    if (value.match(regExp)) {
      emailStore.success = true;
      emailStore.danger = false;
      emailStore.dangertext = "";
    } else {
      emailStore.success = false;
      emailStore.danger = true;
      emailStore.dangertext = "Некорректный формат email";
    }
  }

  enterEmailPressed() {
    if (this.validateForm()) {
      const passwordField: any = this.$refs.password;
      passwordField.focusInput();
    }
  }

  enterPasswordPressed() {
    if (this.validateForm()) {
      this.login();
    }
  }

  login() {
    this.$store
      .dispatch("loginUser", {
        email: this.email.value,
        password: this.password.value
      })
      .then(() => {
        this.$router.push("/");
      })
      .catch(err => {
        this.$vs.notify({
          title: "Ошибка",
          text: err.message,
          position: "top-center",
          color: "danger",
          time: 8000
        });
      });
  }

  back() {
    this.$router.push("/");
  }
}
</script>

<style scoped></style>
