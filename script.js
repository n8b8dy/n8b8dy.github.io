const App = {
	data() {
		return {
			title: 'Todo list',
			inputPlaceholder: 'Type in your task...',
			inputValue: '',
			todos: JSON.parse(localStorage.getItem('todos-list-vue')) || [],
			doneTasks: JSON.parse(localStorage.getItem('doneTasks-list-vue')) || [],
		};
	},
	methods: {
		inputChangeHandler(e) {
			this.inputValue = e.target.value;
		},
		addTodo(e) {
			if (this.inputValue == '') {
				return;
			}
			this.todos.push(this.inputValue);
			this.inputValue = '';
		},
		inputKeyUp(e) {
			this.addTodo();
		},
		markAsDone(i) {
			this.doneTasks.push(this.todos.splice(i, 1)[0]);
		},
		markAsUnDone(i) {
			this.todos.push(this.doneTasks.splice(i, 1)[0]);
		},
		deleteTask(i, place) {
			if (!confirm('Are you sure?')) {
				return;
			}
			this[place].splice(i, 1);
		},
		clearList(place) {
			if (this[place].length != 0 && !confirm('Are you sure?')) {
				return;
			}
			this[place] = [];
		},
	},
};
const vm = Vue.createApp(App).mount('#todo-app');

window.addEventListener('beforeunload', () => {
	localStorage.setItem('todos-list-vue', JSON.stringify(vm.todos));
	localStorage.setItem('doneTasks-list-vue', JSON.stringify(vm.doneTasks));
});
