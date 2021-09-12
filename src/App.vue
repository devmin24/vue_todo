<template>
  <div id="app">
    <TodoHeader />
    <TodoInput v-on:addTodoItem="addOneItem" />
    <TodoList v-bind:propsdata="todoItems" />
    <TodoFooter />
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
