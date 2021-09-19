import Vue from "vue";
import Vuex from "vuex";

// use : Vue 전역에 기능 추가하기
Vue.use(Vuex);

const storage = {
  fetch() {
    const arr = [];
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) !== "loglevel:webpack-dev-server") {
          // JSON.parse = JSON.stringify로 문자열로 변환했던 것을 다시 객체화 하는 것
          arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
      }
    }
    return arr;
  },
};

export const store = new Vuex.Store({
  state: {
    todoItems: storage.fetch(),
  },
  getters: {
    storedTodoItems(state) {
      return state.todoItems;
    },
  },
  mutations: {
    addOneItem(state, todoItem) {
      const obj = { completed: false, item: todoItem };
      localStorage.setItem(todoItem, JSON.stringify(obj)); // 객체를 가져올 때, JSON.stringify를 사용해 문자열로 가져와야함.
      state.todoItems.push(obj);
    },
    removeOneItem(state, payload) {
      localStorage.removeItem(payload.todoItem.item); // 로컬스토리지에서 지우고,
      state.todoItems.splice(payload.index, 1); // index값으로 배열에서도 지워주기
    },
    toggleOneItem(state, payload) {
      // 이벤트로 넘겨받은 데이터(todoItem)를 사용하기보단 현재 컴포넌트에서 props로 넘겼던 데이터를 직관적으로 사용(this.todoItems)하는게 더 바람직한 로직이다.
      state.todoItems[payload.index].completed = !state.todoItems[payload.index]
        .completed; // true이면 false로, false이면 true로 변경
      // localStorage에 값이 변경될 때마다 기존 값 지우고, 새로운 값 넣어주기(localStorage에 update api가 없으므로 갱신하는 방법)
      localStorage.removeItem(payload.todoItem.item);
      localStorage.setItem(
        payload.todoItem.item,
        JSON.stringify(payload.todoItem)
      );
    },
    clearAllItems(state) {
      localStorage.clear(); // 로컬 스토리지 모두 지우기
      state.todoItems = []; // 빈 배열로 만들기
    },
  },
});
