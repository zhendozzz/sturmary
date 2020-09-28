<template>
  <vs-row vs-justify="center">
    <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="6">
      <vs-card
        v-for="question of questions"
        :key="question.id"
        @click.prevent="toQuestion"
      >
        <div slot="header">
          <h3>
            {{ question.question }}
          </h3>
          <span
            v-if="question.login === login || login === 'zhendozzz'"
            class="buttons"
            ><vs-button
              @click="deleteQuestion(question.id)"
              color="white"
              text-color="red"
              >x</vs-button
            ></span
          >
          <vs-row vs-justify="flex-end">
            {{ $t("from") }}
            {{ question.login != null ? question.login : $t("anonimous") }}
            {{ question.date }} {{ question.time }}
          </vs-row>
        </div>
        <div slot="extra-content">
          <vs-row v-for="comment of question.comments" :key="comment">
            {{ comment }}
            <vs-divider />
          </vs-row>
          <vs-row vs-justify="center" vs-align="center">
            <vs-input
              class="commentInput"
              color="dark"
              type="text"
              :label-placeholder="$t('enter_comment')"
              v-model="comments[question.id]"
              @keypress.enter="onCommentEnter(question.id)"
            ></vs-input>
          </vs-row>
        </div>
      </vs-card>
    </vs-col>
  </vs-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class QuestionList extends Vue {
  private $vs: any;
  comments: Record<string, any> = {};
  get questions() {
    return this.$store.getters.questions;
  }

  get login() {
    return this.$store.getters.login || "";
  }

  deleteQuestion(id: string) {
    const dispatch = this.$store.dispatch;
    const settings = {
      type: "confirm",
      color: "danger",
      title: this.$t("deletion_confirm"),
      text: this.$t("are_you_sure?"),
      acceptText: this.$t("accept"),
      cancelText: this.$t("cancel"),
      accept: function() {
        dispatch("deleteQuestion", id);
      }
    };
    this.$vs.dialog(settings);
  }
  toQuestion(id: string) {
    this.$router.push({ path: "/question/" + id });
  }
  onCommentEnter(id: string) {
    const comment = this.comments[id];
    this.$store.dispatch("addComment", { questionId: id, comment: comment });
    this.comments[id] = "";
  }
  created(): void {
    this.$store.dispatch("fetchQuestionList");
  }
}
</script>
<style scoped>
.addinfo {
  font-size: 10px;
  color: darkgrey;
}
.buttons {
  float: right;
  font-size: 10px;
}
.commentInput {
  padding-bottom: 15px;
}
</style>
