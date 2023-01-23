
//!IIFE
var todoapp= (function(){
    let tasks =[]
    const tasksList=document.getElementById("list")
    const AddTaskInput=document.getElementById("add")
    const tasksCounter=document.getElementById("tasks-counter")

    console.log("working")

    //!render todo
    async function fetchtodo(){
        /**
         * //? Get request: fetch promise
        fetch('https://jsonplaceholder.typicode.com/todos')
        .then(function(response){
        
            //promise:json
            return response.json();
        }).then(function(data){
            tasks=data.slice(0,10);
            renderList();
        })
        .catch(function(error){
            console.log("error",error)
        })
        */
        try{
            const response =await fetch("https://jsonplaceholder.typicode.com/todos");
            const data= await response.json();
            tasks=data.slice(0,10);
            renderList();
        }catch(error){
            console.log(error)

        }
        
        }


    //!show list
    //? Create a li tag in HTML
    function addTaskToDOM(task){
        const li =document.createElement("li");
        li.innerHTML=`
                <input type="checkbox" id="${task.id}" ${task.completed ? 'checked': ""} class="custom-checkbox">
            <label for="${task.id}">"${task.title}" </label>
            <img src="img.png" class="delete" data-id="${task.id}" />
            `;
        tasksList.append(li);


    }

    function renderList(){
        tasksList.innerHTML='';

        for (let i=0; i< tasks.length;i++){
            addTaskToDOM(tasks[i])
        }
        tasksCounter.innerText=tasks.length;


    }
    //! check todo list via toggle
    function toggletask(taskid){
        const task=tasks.filter(function(task){
            return task.id=== Number(taskid)
        });
        if (task.length>0){
            const currentTask=task[0];

            currentTask.completed=!currentTask.completed;
            renderList();
            showNotification( "task toggle successful")
            return;

        }
        showNotification( "no ask toggle")
        }
        
        
    //! Delete
    function deleteTask(taskid){
        const newTasks=tasks.filter(function(task){
            return task.id!== Number(taskid)
        });
        tasks=newTasks;
        renderList();
        showNotification("deleted tasks successful")
    }
    //!Add Task in array
    function addTask(task){
        if (task){
            tasks.push(task);
            renderList();
            showNotification("task added success");
            return;
        }
        showNotification("no task")

    }
    //!show Notification
    function showNotification(text){
        alert(text);
    }


    //! Taking input
    function handleInputKeypress(event){
        
        if (event.key==='Enter'){
            //? target: returns the element where the event occured,read-only;
            const text=event.target.value;
        
            if (!text){
                showNotification("Task can't be empty")
                return;
            }
            const task={
                title:text,
                id: Date.now(),
                completed:false
            }
            event.target.value="";
            addTask(task);
        }

    }
    //!add event Listener to input

    function handlclick(event){
        const target =event.target;
        if (target.className=== 'delete'){
            const taskId=target.dataset.id;
            deleteTask(taskId);
            return;

        }
        else if (target.className){
            const taskId=target.id;
            toggletask(taskId);
            return;

        }


    }
    //! initialize

    function initialize(){
        fetchtodo();
        document.addEventListener('click',handlclick);
        AddTaskInput.addEventListener("keyup",handleInputKeypress);
    }
    return{
        initialize:initialize
    }


})();
