//const taskManager = require('./taskManager.js')
// const TaskManager = taskManager.TaskManager

//import TaskManager from './taskManager.js'


const createTaskHTML = (name, detailedDescription, assignedTo, dueDate, id) => {
    const html =  `     
                
                            <div class = "formContainer style: margin:20px; padding: 20px">
                                        <ul style="margin:auto;">
                                            <li class="list-group-item">Name: ${name}</li>
                                            <li class="list-group-item">Discription:${detailedDescription}</li>
                                            <li class="list-group-item">Assigned To: ${assignedTo}</li>
                                            <li class="list-group-item">Date: ${dueDate}</li>
                                        </ul>
                                <div class="row block button-box col-lg-12">            
                                    <button class="button btn btn-dark btn-sm" style="align:right; margin:10px; cursor:pointer;" onclick="deleteFunction(${id})">Delete</button>
                            
                                    <button onclick="completed(${id})" class="button btn btn-dark btn-sm" id="markDone" style="align:right; margin:10px; cursor:pointer;">MarkDone</button>     
                                    
                                    <span id="${id}" style="color:green; display: none;font-size:30px; position: absolute; right: 5px;">&#10004;</span> 
                                </div> 

                            </div>  
                       
    `
    return html;
};


//mark as done function 
function completed(id){

    
    if (confirm('Are you sure you want to mark this task complete?')) {
        document.getElementById(id).style.display = "block";
        document.getElementById('markDone').style.display = "none";
      } else {
        document.getElementById('markDone').style.display = "block";
        document.getElementById(id).style.display = "none";
      }
  
};


class TaskManager {
    constructor() {
        this.tasks = [];
        this.currentId = 0;
    };


    addTask(name, detailedDescription, assignedTo, dueDate) {

        const newTask = {
            name: name,
            detailedDescription: detailedDescription,
            assignedTo: assignedTo,
            dueDate: dueDate,
            id: this.currentId
        };

        this.tasks.push(newTask);
        this.currentId++;
    }


    render() {
        const tasksHtmlList = [];

        for (let i = 0; i < this.tasks.length; i++) {
            let newTaskHTML = createTaskHTML(this.tasks[i].name, this.tasks[i].detailedDescription, this.tasks[i].assignedTo, this.tasks[i].dueDate, this.tasks[i].id);
            tasksHtmlList.push(newTaskHTML);
        }
        // console.log(this.tasks);
        // const displayHere = document.getElementById('displayHere');
        // displayHere.innerHTML = tasksHtmlList.join('\n');

        const tasksList = document.querySelector('#tasksList');
        tasksList.innerHTML = tasksHtmlList;
    };

    deleteFunction(taskid) {
      //  this.tasks.splice(x);
      let newTasks = [];
      for ( let i = 0; i < this.tasks.length; i++) {
        if(this.tasks[i].id != taskid){
           newTasks.push(this.tasks[i]);
        }
      }

     this.tasks = newTasks;
     this.render();
      
    }

};


let tm = new TaskManager;
console.log(tm.tasks);

validFormFieldInput();

function deleteFunction(taskid) {
    tm.deleteFunction(taskid);
};



newTaskForm.addEventListener('submit', (event) => {
    // Prevent default action
    event.preventDefault();
    //Select the inputs

    const newTaskForm = document.querySelector('#newTaskForm');
    const taskName = document.querySelector('#name').value;
    const detailedDescription = document.querySelector('#detailedDescription').value;
    const taskAssignedTo = document.querySelector('#assignedTo').value;
    const taskDueDate = document.querySelector('#date').value;
    const errorMessage = document.querySelector('#errorMessage');

    if (validFormFieldInput(taskName, detailedDescription, taskAssignedTo, taskDueDate)){
        // if( validFormFieldInput(taskName) == true)
        tm.addTask(taskName, detailedDescription, taskAssignedTo, taskDueDate);
        tm.render();
     }

    document.getElementById('newTaskForm').reset();
    validFormFieldInput(taskName, detailedDescription, taskAssignedTo, taskDueDate);
   
});






// FUNCTION MARKDONEFUNCTION() {
//     VAR DELETEME = DOCUMENT.GETELEMENTBYID("TASKID");
//     VAR CLIKED = FALSE
//     MESSAGE.ONCLICK = FUNCTION() {
//         IF (!CLIKED) {
//             CLIKED = TRUE;
//             ALERT('THANK YOU');
//         }
//     };
// }



// //Selector
// const todoButton = document.querySelector("#todo");
// //EventLisener
// todoButton = addEventListener("click", addTodo);
// //Function
// function addTodo(event){
//     event.preventDefault();
//     //toDo div
//     const todoDiv = document.createElement("div");
//     todoDiv.classList.add("toDo");
//     //create LI
//     const newToDo = document.createElement('li');
//     newToDo.innerText = "hey";
//     newToDo.classList.add('todo-item');
// }






function validFormFieldInput(taskName, detailedDescription, taskAssignedTo, taskDueDate) {
    
    if (taskName == ''){ 
        document.getElementById('name').style.borderColor = "red";
        document.getElementById('errorMessage').style.color = "red";
        document.getElementById('errorMessage').style.display = "block";
        
       
    } 

    if (taskName != '') {
       document.getElementById('name').style.borderColor = "gray";
       document.getElementById('errorMessage').style.display = "none";
       
        }

        
        //detailDescription validation 
        if (detailedDescription == ''){ 
            document.getElementById('detailedDescription').style.borderColor = "red";
            document.getElementById('errorMessage2').style.color = "red";
            document.getElementById('errorMessage2').style.display = "block";
           
            }
    
        if (detailedDescription != ''){
           document.getElementById('detailedDescription').style.borderColor = "gray";
           document.getElementById('errorMessage2').style.display = "none";
            
            }

              //assignedTo validation 
        if (taskAssignedTo == ''){ 
            document.getElementById('assignedTo').style.borderColor = "red";
            document.getElementById('errorMessage3').style.color = "red";
            document.getElementById('errorMessage3').style.display = "block";
            } 
    
        if (taskAssignedTo != ''){
           document.getElementById('assignedTo').style.borderColor = "gray";
           document.getElementById('errorMessage3').style.display = "none";
            }

        //date validation 
        if (taskDueDate == ''){ 
            document.getElementById('date').style.borderColor = "red";
            document.getElementById('errorMessage4').style.color = "red";
            document.getElementById('errorMessage4').style.display = "block";
            } 

        if (taskDueDate != ''){
            document.getElementById('date').style.borderColor = "gray";
            document.getElementById('errorMessage4').style.display = "none";
                    
            }


        if (taskName == '' || detailedDescription =='' || taskAssignedTo =='' || taskDueDate=='') {
            return false;
        } else {
            return true;
        }
};




