const todoContent = document.querySelector('.todoContent');
const addButton = document.querySelector('.addButton');
const inprogressTasksList=document.getElementById("inprogressTasksList");
const completeTasksList=document.getElementById("completeTasksList");

todoForm.addEventListener('submit', (event) => {
	if(todoContent.value.length == 0){
		alert('You must write something!');
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
			todo.addEventListener('transitionend', function() {
				todo.remove();
		});
		}
		if (item.classList[0] === "completeButton"){
			const todo = item.parentElement;
			todo.classList.toggle("completed");
		    completeTasksList.appendChild(todo);
		    item.remove();
		}
	} else {
		if (item.classList[1] === "fa-trash"){
			const todo = item.parentElement.parentElement;
			todo.classList.add("fall");
			todo.addEventListener('transitionend', function() {
				todo.remove();
		});
		}
		if (item.classList[1] === "fa-check"){
			const todo = item.parentElement.parentElement;
			todo.classList.toggle("completed");
			completeTasksList.appendChild(todo);
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
			todo.addEventListener('transitionend', function() {
				todo.remove();
		});
		} else if (item.classList[1] === "fa-trash"){
			const todo = item.parentElement.parentElement;
			todo.classList.add("fall");
			todo.addEventListener('transitionend', function() {
				todo.remove();
		});
	}
event.preventDefault();
});

function addTodo(inputValue) {
	const todoDiv = document.createElement("div");
	todoDiv.classList.add("eachTask")
	const li = document.createElement("li");
	li.innerText = inputValue;
	todoDiv.appendChild(li); 
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