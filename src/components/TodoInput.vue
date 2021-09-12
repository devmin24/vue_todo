<template>
  <div class="inputBox shadow">
    <!-- v-on:keyup.enter : enter 입력하면 "" 실행하기 -->
    <input type="text" v-model="newTodoItem" v-on:keyup.enter="addTodo" />
    <span class="addContainer" v-on:click="addTodo">
      <!-- awesome icon 가져와서 쓰기, css도 직접 적용할 수 있음 -->
      <i class="fas fa-plus addBtn"></i>
    </span>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      newTodoItem: "",
    };
  },
  methods: {
    addTodo: function() {
      if (this.newTodoItem !== "") {
        // this.$emit('이벤트 이름', 인자1, 인자2, ...)
        this.$emit("addTodoItem", this.newTodoItem);
        this.clearInput(); // this로 같은 인스턴스 안에 있는 메소드도 가져올 수 있음.
      }
    },
    clearInput: function() {
      this.newTodoItem = "";
    },
  },
};
</script>

<style scoped>
input:focus {
  outline: none;
}
.inputBox {
  background: white;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
}
.inputBox input {
  border-style: none;
  font-size: 0.9rem;
  width: 80%;
}
.addContainer {
  float: right;
  background: linear-gradient(to right, #6478fb, #8763fb);
  display: block;
  width: 3rem;
  border-radius: 0 5px 5px 0;
}
.addBtn {
  color: white;
  vertical-align: middle;
}
</style>
