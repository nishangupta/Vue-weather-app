<template>
  <div class="questionbox-container">
    <b-jumbotron>
      <template v-slot:lead>{{currentQuestion.question}}</template>

      <hr class="my-4" />
      <b-list-group>
        <b-list-group-item
          v-for="(answer,index) in suffledAnswers"
          :key="index"
          @click="selectAnswer(index)"
          :class="answerClass(index)"
        >{{index+1 +'. '+ answer}}</b-list-group-item>
      </b-list-group>

      <b-button
        variant="primary"
        @click="submitAnswer"
        :disabled="selectedIndex === null || answered "
      >Submit</b-button>
      <b-button variant="success" @click="next">Next</b-button>
    </b-jumbotron>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  name: "Questionbox",
  data() {
    return {
      selectedIndex: null,
      suffledAnswers: [],
      answered: false,
      correctIndex: null,
    };
  },
  props: {
    currentQuestion: Object,
    next: Function,
    increment: Function,
  },
  computed: {},
  methods: {
    selectAnswer(index) {
      this.selectedIndex = index;
    },
    shuffleAnswers() {
      let answers = [
        ...this.currentQuestion.incorrect_answers,
        this.currentQuestion.correct_answer,
      ];
      this.suffledAnswers = _.shuffle(answers);
      this.correctIndex = this.suffledAnswers.indexOf(
        this.currentQuestion.correct_answer
      );
    },
    submitAnswer() {
      let isCorrect = false;
      if (this.selectedIndex === this.correctIndex) {
        isCorrect = true;
      }
      this.increment(isCorrect);
      this.answered = true;
    },
    answerClass(index) {
      if (!this.answered && this.selectedIndex === index) {
        return "selected";
      } else if (this.answered && this.correctIndex === index) {
        return "correct";
      } else if (
        this.answered &&
        this.selectedIndex === index &&
        this.correctIndex !== index
      ) {
        return "incorrect";
      } else {
        return "";
      }
    },
  },
  watch: {
    currentQuestion: {
      immediate: true,
      handler() {
        this.selectedIndex = null;
        this.shuffleAnswers();
        this.answered = false;
      },
    },
  },
};
</script>

<style scoped>
.list-group {
  margin-bottom: 15px;
}
.list-group-item:hover {
  background-color: #eee;
  cursor: pointer;
}
.selected {
  background-color: #82b0ff;
}
.correct {
  background-color: rgb(125, 246, 162);
}
.incorrect {
  background-color: #f18a80;
}
.btn {
  margin: 0 5px;
}
</style>
