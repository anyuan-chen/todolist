/*
 * Auto-generated content from the Brackets New Project extension.  Enjoy!
 */
var addButton = document.getElementById("add-button");
addButton.addEventListener("click", addToDoItem);

var clearCompleted = document.getElementById("clear-completed-button");
clearCompleted.addEventListener("click", clearCompletedToDoItems);

var empty = document.getElementById("empty-button");
empty.addEventListener("click", emptyList);

var sv = document.getElementById("save-button");
sv.addEventListener("click", saveList);

var todolist = document.getElementById("todo-list");
var todoentrybox = document.getElementById("todo-entry-box");
loadList();
function addToDoItem(){
    var itemText = todoentrybox.value;
    newToDoItem(itemText, false);
}
function newToDoItem(itemText, completed){
    var toDoItem = document.createElement("li");
    var toDoText = document.createTextNode(itemText);
    toDoItem.appendChild(toDoText);
    if (completed){
        toDoItem.classList.add("completed");
    }
    todolist.appendChild(toDoItem);
    toDoItem.addEventListener("dblclick", toggleToDoItemState);
}
function toggleToDoItemState(){
    if (this.classList.contains("completed")){
        this.classList.remove("completed");
    }
    else{
        this.classList.add("completed");
    }
}
function clearCompletedToDoItems(){
    var completed = todolist.getElementsByClassName("completed");
    while (completed.length > 0)
        completed.item(0).remove();
    
}
function emptyList(){
    var toDoItems = todolist.children;
    while (toDoItems.length > 0){
        toDoItems.item(0).remove();
    }
}
function saveList(){
    var toDo = [];
    for (var i = 0; i < todolist.children.length; i++){
        var cur = todolist.children.item(i);
        var toDoInfo = {
            "task" : cur.innerText,
            "completed": cur.classList.contains("completed")
        };
        toDo.push(toDoInfo);
    }
    localStorage.setItem("toDo", JSON.stringify(toDo));
}
function loadList(){
    if (localStorage.getItem("toDo") != null){
        var toDoo = JSON.parse(localStorage.getItem("toDo"));
        for (var i = 0; i < toDoo.length; i++){
            var cur = toDoo[i];
            newToDoItem(cur.task, cur.completed);
        }
    }
}
