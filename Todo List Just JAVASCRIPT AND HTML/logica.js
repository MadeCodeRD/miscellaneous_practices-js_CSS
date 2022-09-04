
 //Model

    let todos;
    const savedTodos = JSON.parse(localStorage.getItem('todos'));

    if (Array.isArray(savedTodos)) {

      todos = savedTodos;

    } else {
      todos = [{
        title: 'Get groceries',
        dueDate: '2021-10-01',
        id: 'id1'

      }, {
        title: 'Wash car',
        dueDate: '2021-02-03',
        id: 'id2'


      }, {
        title: 'Make dinner',
        dueDate: '2021-03-04',
        id: 'id3'
      }];
    }





    const createTodo = (title, dueDate) => {

      const id = '' + new Date().getTime();

      todos.push({
        title: title,
        dueDate: dueDate,
        id: id
      });

      saveTodos();
    }


    const removeTodo = idToDelete => {
      todos = todos.filter(todo => todo.id != idToDelete);

      saveTodos();
    }

    const taskCompleted = checkMark => {

      todos.filter(todo => {
        if (todo.id === checkMark.dataset.todoId) {
          todo.isDone = checkMark.checked;
        }

      });

      saveTodos();
    }

    const saveTodos = () => localStorage.setItem('todos', JSON.stringify(todos));



    const updateTodo = (buttonId, newTitle, newDate) => {


      todos.filter(function (todo) {
        if (todo.id === buttonId) {
          todo.title = newTitle;
          todo.dueDate = newDate;
          todo.isEditing = false;
        }
      });

      saveTodos();

    }

    const changeEdit = buttonId => {
      todos.filter(todo => {
        if (todo.id === buttonId) {
          todo.isEditing = true;
        }


      });

      saveTodos();
    }



    //Controller

    const addTodo = () => {
      let textbox = document.getElementById('todo-title');
      let title = textbox.value;
      const datePicker = document.getElementById('date-picker');
      const dueDate = datePicker.value;

      createTodo(title, dueDate);
      render();

    }

    // const deleteTodo = event => {
    //   const deleteButton = event.target;
    //   const idToDelete = deleteButton.id;
    //   removeTodo(idToDelete);
    //   render();
    // }

    const onDelete= todoToDelete =>{
      return  ()=>{
        removeTodo(todoToDelete.id);
        render();
      }
    }

    const isDone = event => {
      let checkMark = event.target;
      taskCompleted(checkMark);

    }

    const isEditing = buttonEdit => {
      const buttonSelected = buttonEdit.target;
      const buttonId = buttonSelected.dataset.todoId;

      changeEdit(buttonId);
      render();
    }


    const onUpdate = updateButton => {
      const updateButtonId = updateButton.target.dataset.todoId;
      const newTitle = document.getElementById('edit-title' + updateButtonId);
      const newDate = document.getElementById('edit-date' + updateButtonId);

      updateTodo(updateButtonId, newTitle.value, newDate.value);
      render();
    }




    //View
    const render = () => {
      document.getElementById('todo-list').innerHTML = '';
      const todoList = document.getElementById('todo-list');

      todos.forEach(todoObject => {
        const element = document.createElement('div');
        const checkMark = document.createElement('input');
        const deleteButton = document.createElement('button');
        const editButton = document.createElement('button');


        if (todoObject.isEditing) {

          let newDiv = document.createElement('div');

          let textBox = document.createElement('input');
          textBox.type = 'text';
          textBox.id = 'edit-title' + todoObject.id;
          textBox.style.marginRight='8px';

          let date = document.createElement('input');
          date.type = 'date';
          date.id = 'edit-date' + todoObject.id;
          date.style.marginRight='8px';

          let update = document.createElement('button');
          update.innerHTML = 'Update';
          update.onclick = onUpdate;
          update.dataset.todoId = todoObject.id;




          newDiv.appendChild(textBox);
          newDiv.appendChild(date);
          newDiv.appendChild(update);

          todoList.appendChild(newDiv);




        } else {

          element.innerText = todoObject.title + ' ' + todoObject.dueDate;


          checkMark.type = 'checkbox';
          checkMark.dataset.todoId = todoObject.id;

          if (todoObject.isDone) {
            checkMark.checked = true;
          } else {
            checkMark.checked = false;
          }

          checkMark.onchange = isDone;
          element.prepend(checkMark);




          deleteButton.innerHTML = 'Delete';
          deleteButton.style = 'margin-left: 12px;';
          deleteButton.onclick = onDelete(todoObject);
          //deleteButton.id = todoObject.id;

          editButton.innerHTML = 'Edit';
          editButton.style = 'margin-left: 12px;';
          editButton.onclick = isEditing;
          editButton.dataset.todoId = todoObject.id;

          element.appendChild(editButton);
          element.appendChild(deleteButton);


          todoList.style.marginTop = '13px';
          element.style.marginTop = '5px';
          element.style.marginBottom = '7px';
          todoList.appendChild(element);
        }


      });

      document.getElementById('todo-title').value = '';
      document.getElementById('date-picker').value = '';



    }

    render();

 
