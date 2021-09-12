<template>
  <div id="app">
    <TodoHeader />
    <TodoInput v-on:addTodoItem="addOneItem" />
    <TodoList
      v-bind:propsdata="todoItems"
      v-on:removeItem="removeOneItem"
      v-on:toggleItem="toggleOneItem"
    />
    <TodoFooter v-on:clearAll="clearAllItems" />
  </div>
</template>

<script>
import TodoHeader from "./components/TodoHeader.vue";
import TodoList from "./components/TodoList.vue";
import TodoInput from "./components/TodoInput.vue";
import TodoFooter from "./components/TodoFooter.vue";

export default {
  data: function() {
    return {
      todoItems: [],
    };
  },
  methods: {
    addOneItem: function(todoItem) {
      var obj = { completed: false, item: todoItem };
      localStorage.setItem(todoItem, JSON.stringify(obj)); // 객체를 가져올 때, JSON.stringify를 사용해 문자열로 가져와야함.
      this.todoItems.push(obj);
    },
    removeOneItem: function(todoItem, index) {
      localStorage.removeItem(todoItem.item); // 로컬스토리지에서 지우고,
      this.todoItems.splice(index, 1); // index값으로 배열에서도 지워주기
    },
    toggleOneItem: function(todoItem, index) {
      // 이벤트로 넘겨받은 데이터(todoItem)를 사용하기보단 현재 컴포넌트에서 props로 넘겼던 데이터를 직관적으로 사용(this.todoItems)하는게 더 바람직한 로직이다.
      this.todoItems[index].completed = !this.todoItems[index].completed; // true이면 false로, false이면 true로 변경
      // localStorage에 값이 변경될 때마다 기존 값 지우고, 새로운 값 넣어주기(localStorage에 update api가 없으므로 갱신하는 방법)
      localStorage.removeItem(todoItem.item);
      localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
    },
    clearAllItems: function() {
      localStorage.clear(); // 로컬 스토리지 모두 지우기
      this.todoItems = []; // 빈 배열로 만들기
    },
  },
  created: function() {
    if (localStorage.length > 0) {
      for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) !== "loglevel:webpack-dev-server") {
          // JSON.parse = JSON.stringify로 문자열로 변환했던 것을 다시 객체화 하는 것
          this.todoItems.push(
            JSON.parse(localStorage.getItem(localStorage.key(i)))
          );
        }
      }
    }
  },
  components: {
    TodoHeader: TodoHeader,
    TodoList: TodoList,
    TodoInput: TodoInput,
    TodoFooter: TodoFooter,
  },
};
</script>

<style>
body {
  text-align: center;
  background-color: #f6f6f6;
}
input {
  border-style: groove;
  width: 200px;
}
button {
  border-style: groove;
}
.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>
