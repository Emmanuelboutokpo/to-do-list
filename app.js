let taskInput = document.querySelector(".task_input input");
let todoBox = document.querySelector(".task_box");
let allcontrols = document.querySelectorAll(".controls span");
let clearAll = document.querySelector(".clear_all");
let todos = JSON.parse(localStorage.getItem("todoItem"));
let isEditing = -1;

//Set classList active by click
allcontrols.forEach((acontrol) =>{ 
    acontrol.addEventListener("click", (e)=>{
         let span = document.querySelector('.controls .active');
           span.classList.remove('active');
           acontrol.classList.add("active");
           showTodo(acontrol.id)
    });
});
    
//show todo list default = all
    const showTodo = (filter) => {
        let li = ""
       if (todos) {
         li = todos.map((todoItem, id) => {
                let iscompleted = todoItem.status ==="completed" ? "checked" : " "
                 if (filter == todoItem.status || filter == "all") {
                     return `
                     <li class="task">
                     <label for="${id}">
                          <input type="checkbox" id="${id}" ${iscompleted} onclick="updateTask(this)">
                          <p class="check ${iscompleted}">${todoItem.name}</p>
                     </label>
                     <i class="bi bi-three-dots" onclick ="threedots(this)"></i>
                     <div class="seting">
                         <ul class="actions">
                             <li class="editTask" onclick = "editTask(${id},'${todoItem.name}')"><i class="bi bi-pencil"></i>Edit</li>
                             <li class="deleteTask" onclick="deleteTask(${id})"><i class="bi bi-trash"></i>Delete</li>
                            </ul>
                        </div>
                  </li>    
                     `     
                 }  
        
            }).join(" ")
        }
        todoBox.innerHTML = li  || '<span>You don\'t have any task</span>';
      }
    showTodo("all")

// add todo and checking
taskInput.addEventListener("keyup", (e) => {
    let taskValue = taskInput.value.trim();
    if (e.key === "Enter" && taskValue) {
        if (!todos) {
            todos = [];
        }else if (todos.some((items) => items.name.toUpperCase() === taskValue.toUpperCase())) {
            alert(taskValue+"has already been a task")
        }else if (isEditing>=0 ) {
            todos[isEditing].name = taskValue
            localStorage.setItem("todoItem", JSON.stringify(todos));
             isEditing=-1
             taskInput.value=""
            showTodo("all")
        }
        else{
            todos.push({
                name: taskValue,
                status: "pending"
            });
            taskInput.value = ""
            localStorage.setItem("todoItem", JSON.stringify(todos));
            showTodo("all")
        }
    }
})


//Checked and completed updating
const updateTask = (selectTask) =>{
     let paragraph = selectTask.parentElement.lastElementChild;
    if (selectTask.checked) {
         paragraph.classList.add("checked")
         todos[selectTask.id].status = "completed"
    } else {
        paragraph.classList.remove("checked");
        todos[selectTask.id].status = "pending"
    }
    localStorage.setItem("todoItem", JSON.stringify(todos));
}

//Show and hide edit and delete container
 const threedots = (theDots) =>{
    let seting = theDots.parentElement.lastElementChild;
    seting.classList.add("show")
  
    document.addEventListener("click", (e) =>{
         if (e.target.tagName != "I" || e.target != theDots ) {
             seting.classList.remove("show")
         }
    })
 }

//Edit todo
 const editTask = (id, todoName) =>{
    taskInput.value=todoName;
   isEditing=id

}

//Delete todo
const deleteTask = (id) =>{
     todos.splice(id,1);
     showTodo("all");
     localStorage.setItem("todoItem", JSON.stringify(todos));
}

//Clear all todo
clearAll.addEventListener("click", (e)=>{
    todos.splice(0,todos.length);
    showTodo("all");
    localStorage.setItem("todoItem", JSON.stringify(todos));
})