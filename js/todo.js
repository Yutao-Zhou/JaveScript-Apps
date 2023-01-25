const todoContent = document.querySelector('.todoContent');
const addButton = document.querySelector('.addButton');
const inprogressTasksList=document.getElementById("inprogressTasksList");
const completeTasksList=document.getElementById("completeTasksList");

document.addEventListener('DOMContentLoaded', loadLocalStorage())
document.addEventListener('DOMContentLoaded', loadLocalStorage(true))
todoForm.addEventListener('submit', (event) => {
	if(todoContent.value.length == 0){
		alert('Todo could not be empty!');
	} else {
    	addTodo(todoContent.value);
		todoContent.value = "";
	}
	event.preventDefault();
});

inprogressTasksList.addEventListener('click', (event) => {
	const item = event.target;
	if (item.classList.length === 1) {
		if (item.classList[0] === "deleteButton"){
			const todo = item.parentElement;
			todo.classList.add("fall");
			removeLocalStorage(todo);
			todo.addEventListener('transitionend', function() {
				todo.remove();
		});
		}
		if (item.classList[0] === "completeButton"){
			const todo = item.parentElement;
			todo.classList.toggle("completed");
		    completeTasksList.appendChild(todo);
		    removeLocalStorage(todo);
		    saveLocalStorage(todo.innerText, true);
		    item.remove();
		}
	} else {
		if (item.classList[1] === "fa-trash"){
			const todo = item.parentElement.parentElement;
			todo.classList.add("fall");
			removeLocalStorage(todo);
			todo.addEventListener('transitionend', function() {
				todo.remove();
		});
		}
		if (item.classList[1] === "fa-check"){
			const todo = item.parentElement.parentElement;
			todo.classList.toggle("completed");
			completeTasksList.appendChild(todo);
			removeLocalStorage(todo);
			saveLocalStorage(todo.innerText, true);
		    item.parentElement.remove();
		}
	}
event.preventDefault();
});

completeTasksList.addEventListener('click', (event) => {
	const item = event.target;
	if (item.classList.length === 1 && item.classList[0] === "deleteButton") {
			const todo = item.parentElement;
			todo.classList.add("fall");
			removeLocalStorage(todo, true);
			todo.addEventListener('transitionend', function() {
				todo.remove();
		});
		} else if (item.classList[1] === "fa-trash"){
			const todo = item.parentElement.parentElement;
			todo.classList.add("fall");
			removeLocalStorage(todo, true);
			todo.addEventListener('transitionend', function() {
				todo.remove();
		});
	}
event.preventDefault();
});

function addTodo(inputValue, skip = false) {
	const todoDiv = document.createElement("div");
	todoDiv.classList.add("eachTask")
	const li = document.createElement("li");
	li.innerText = inputValue;
	todoDiv.appendChild(li);
	if (skip === false) {
		saveLocalStorage(inputValue);
	};
	const completeButton = document.createElement("button");
	completeButton.innerHTML = '<i class="fas fa-check"></i>';
	completeButton.classList.add("completeButton");
	todoDiv.appendChild(completeButton);
	const deleteButton = document.createElement("button");
	deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
	deleteButton.classList.add("deleteButton");
	todoDiv.appendChild(deleteButton);
	inprogressTasksList.appendChild(todoDiv)
}

function addComplete(inputValue, skip = false) {
	const todoDiv = document.createElement("div");
	todoDiv.classList.add("eachTask")
	const li = document.createElement("li");
	li.innerText = inputValue;
	todoDiv.appendChild(li);
	if (skip === false) {
		saveLocalStorage(inputValue);
	};
	const deleteButton = document.createElement("button");
	deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
	deleteButton.classList.add("deleteButton");
	todoDiv.appendChild(deleteButton);
	todoDiv.classList.toggle("completed");
	completeTasksList.appendChild(todoDiv)
}

function saveLocalStorage(todo, completed = false) {
	if (completed === false){
		let inprogressTodos;
		if (localStorage.getItem('inprogressTodos') === null) {
			inprogressTodos = [];
		} else {
			inprogressTodos = JSON.parse(localStorage.getItem("inprogressTodos"));
		}
		inprogressTodos.push(todo);
		localStorage.setItem("inprogressTodos", JSON.stringify(inprogressTodos));
	} else {
		let completedTodos;
		if (localStorage.getItem('completedTodos') === null) {
			completedTodos = [];
		} else {
			completedTodos = JSON.parse(localStorage.getItem("completedTodos"));
		}
		completedTodos.push(todo);
		localStorage.setItem("completedTodos", JSON.stringify(completedTodos));
	}
}

function loadLocalStorage(completed = false) {
	if (completed === false){
		let inprogressTodos;
		if (localStorage.getItem('inprogressTodos') === null) {
			inprogressTodos = [];
		} else {
			inprogressTodos = JSON.parse(localStorage.getItem("inprogressTodos"));
		}
		inprogressTodos.forEach(function(todo) {
			addTodo(todo, true);
		});
	} else {
		let completedTodos;
		if (localStorage.getItem('completedTodos') === null) {
			completedTodos = [];
		} else {
			completedTodos = JSON.parse(localStorage.getItem("completedTodos"));
		}
		completedTodos.forEach(function(todo) {
			addComplete(todo, true);
		});
	}
}

function removeLocalStorage(todo, completed = false) {
	if (completed === false){
		let inprogressTodos;
		if (localStorage.getItem('inprogressTodos') === null) {
			inprogressTodos = [];
		} else {
			inprogressTodos = JSON.parse(localStorage.getItem("inprogressTodos"));
		}
		const index = inprogressTodos.indexOf(todo.children[0].innerText);
		inprogressTodos.splice(index, 1)
		localStorage.setItem("inprogressTodos", JSON.stringify(inprogressTodos));
	} else {
		let completedTodos;
		if (localStorage.getItem('completedTodos') === null) {
			completedTodos = [];
		} else {
			completedTodos = JSON.parse(localStorage.getItem("completedTodos"));
		}
		const index = completedTodos.indexOf(todo.children[0].innerText);
		completedTodos.splice(index, 1)
		localStorage.setItem("completedTodos", JSON.stringify(completedTodos));
	}
}