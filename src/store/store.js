import Vue from "vue";
import Vuex from "vuex";
// import * as getters from "./getters"; // 속성별 모듈화
// import * as mutations from "./mutations"; // 속성별 모듈화
import todoApp from "./modules/todoApp"; // 관련 데이터 스토어별 모듈화

// use : Vue 전역에 기능 추가하기
Vue.use(Vuex);

// const storage = {
//   fetch() {
//     const arr = [];
//     if (localStorage.length > 0) {
//       for (let i = 0; i < localStorage.length; i++) {
//         if (localStorage.key(i) !== "loglevel:webpack-dev-server") {
//           // JSON.parse = JSON.stringify로 문자열로 변환했던 것을 다시 객체화 하는 것
//           arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
//         }
//       }
//     }
//     return arr;
//   },
// };

export const store = new Vuex.Store({
  modules: {
    todoApp,
  },

  // getters, // getters : getters
  // mutations, // mutations : mutations
});
