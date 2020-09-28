import Vue from "vue";
import Vuex from "vuex";
import * as fb from "firebase";

Vue.use(Vuex);
type QuestionType = {
  comments: [];
  id: string;
  date: string;
  question: string;
  order: number;
  time: string;
  login: string;
};
export default {
  state: {
    questions: []
  },
  mutations: {
    setQuestions(state: any, payload: Array<QuestionType>) {
      state.questions = payload;
    }
  },
  getters: {
    questions(state: any) {
      return state.questions;
    }
  },
  actions: {
    fetchQuestionList({ commit }: any, payload: any) {
      commit("setUserInited", {
        userInited: false
      });
      const usersRef = fb.database().ref("questions");
      usersRef.limitToLast(10).on("value", a => {
        const rawData: Array<QuestionType> = [];
        const resQuestions = a.val();
        for (const resQuestionsKey in resQuestions) {
          const item: QuestionType = resQuestions[resQuestionsKey];
          rawData.push({
            id: resQuestionsKey,
            date: item.date,
            question: item.question,
            order: item.order,
            time: item.time,
            login: item.login,
            comments: item.comments
          });
        }
        rawData.sort(function(b, a) {
          if (a.order > b.order) {
            return 1;
          }
          if (a.order < b.order) {
            return -1;
          }
          return 0;
        });
        commit("setQuestions", rawData);
        commit("setUserInited", {
          userInited: true
        });
      });
    },
    addQuestion({ commit }: any, payload: any) {
      const date = new Date();
      const questionsRef = fb.database().ref("questions");
      questionsRef.push(payload);
    },
    deleteQuestion({ commit }: any, payload: any) {
      const questionRef = fb.database().ref("questions/" + payload);
      questionRef.remove();
    },
    addComment({ commit }: any, payload: any) {
      const date = new Date();
      const questionsRef = fb
        .database()
        .ref("questions/" + payload.questionId + "/comments");
      questionsRef.push(payload.comment);
    }
  }
};
