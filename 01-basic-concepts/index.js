/**
 * criamos uma instância do Vue usando o new Vue({})
 * 
 * Criamos variaveis dentro do objecto `data`
 * 
 * 
 * 
 * 
 * 
 */
Vue.component('app-header', {
  template: `
    <header>
      <h2> Todo App</h2>
    </header>
  `
})

Vue.component('app-create-todo', {
  data: function () {
    return {
      newTodo: ''
    }
  },
  methowatch: {
    newTodo: function () {
      console.log(this.newTodo)
    }
  },
  methods: {
    addTodo: function () {
      if (this.newTodo.length) {
        this.$emit('add-todo', this.newTodo)
        this.cleanNewTodo()
      }
    },
    cleanNewTodo: function () {
      this.newTodo = ''
    }
  },
  template: `
    <section>
      <input v-model="newTodo" type="text" />
      <button v-on:click="addTodo">Adicionar todo</button>
    </section>
  `
})


Vue.component('app-list-todos', {
  methods: {
    removeTodo: function (index) {
      this.$emit('remove-todo', index)
    }
  },
  props: ['todos'],
  template: `
    <footer>
      <ul>
        <li v-for="(todo,index) in todos">{{ todo }}
          <button v-on:click="removeTodo(index)">x</button>
        </li>
      </ul>
    </footer>
  `,
})

const app = new Vue({
  el: "#app",
  data: function () {
    return {
      todos: []
    }
  },
  methods: {
    addTodo: function (todo) {
      if (todo.length) {
        this.todos.push(todo)
      }
    },
    removeTodo: function (index) {
      this.todos = this.todos.filter((_, idx) => idx !== index)
    }
  },
  mounted: function () {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((data) => {
        this.todos = data.map((todo) => todo.title)
      })
  }
})