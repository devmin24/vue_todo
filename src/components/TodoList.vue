<template>
  <div>
    <ul>
      <li
        v-for="(todoItem, index) in propsdata"
        v-bind:key="todoItem.item"
        class="shadow"
      >
        <i
          class="fas fa-check checkBtn"
          v-bind:class="{ checkBtnCompleted: todoItem.completed }"
          v-on:click="toggleComplete(todoItem, index)"
        ></i>
        <span v-bind:class="{ textCompleted: todoItem.completed }">{{
          todoItem.item
        }}</span>
        <span class="removeBtn" v-on:click="removeTodo(todoItem, index)">
          <i class="fas fa-trash-alt"></i>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["propsdata"],
  methods: {
    removeTodo: function(todoItem, index) {
      localStorage.removeItem(todoItem); // 로컬스토리지에서 지우고,
      this.todoItems.splice(index, 1); // index값으로 배열에서도 지워주기
    },
    toggleComplete: function(todoItem) {
      todoItem.completed = !todoItem.completed; // true이면 false로, false이면 true로 변경
      // localStorage에 값이 변경될 때마다 기존 값 지우고, 새로운 값 넣어주기(localStorage에 update api가 없으므로 갱신하는 방법)
      localStorage.removeItem(todoItem.item);
      localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
    },
  },
};
</script>

<style scoped>
ul {
  /* list 번호 스타일 */
  list-style-type: none;
  padding-left: 0px;
  margin-top: 0;
  text-align: left;
}
li {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
}
.checkBtn {
  line-height: 45px;
  color: #62acde;
  margin-right: 5px;
}
.checkBtnCompleted {
  color: #b3adad;
}
.textCompleted {
  text-decoration: line-through;
  color: #b3adad;
}
.removeBtn {
  margin-left: auto;
  color: #de4343;
}
</style>
