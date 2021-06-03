import React, { useState,useEffect } from 'react';
import AddItem from './AddItem/AddItem'; 
import DisplayItem from './DisplayItems/DisplayItems';

function App() {
  const LOCAL_STORAGE_KEY = 'to-do-list';
  const[todoItems,setTodoItems] = useState([]);

  const addItemHandler = (item) =>{
    setTodoItems([...todoItems,{item}]);
  };
const removeItem = (id) =>{
  const newTodoList = todoItems.filter((todoItem) =>{
    const dMap = todoItem.item.newItem;
    return dMap.id !== id;
  });
  setTodoItems(newTodoList);
}
//session storage
useEffect(() =>{
  const retriveItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  if(retriveItems){
    setTodoItems(retriveItems);
  }
},[]);

//Set Items and Render Item When State Of To-Do list gets Updates 
useEffect(() =>{
  localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(todoItems));
},[todoItems]);

  return (
    <div className="App">
      <AddItem AddItemHandler={addItemHandler} />
      <DisplayItem todo_items={todoItems} getItemId={removeItem}/>
    </div>
  );
}

export default App;
