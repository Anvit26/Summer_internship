import React, {useState} from 'react';
import DisplayItems from '../DisplayItems/DisplayItems'; 

const AddItem = () =>{
    const[todoItem,setTodoItem] = useState({
        date:'',
        description:'',
        priority:''
    })
    const [items,setItems] = useState([]);

    const submitHandler = (e) =>{
        e.preventDefault();
        if(todoItem.date && todoItem.description && todoItem.priority){
            const newItem = {...todoItem, id: new Date().getDate().toString()}
            setItems([...items,newItem]);
            setTodoItem({date:'',description:'',priority:''}); 
        }
    }

    const onChangeHandler = (e) =>{
        const inputName = e.target.name;
        const inputValue = e.target.value;
        setTodoItem({...todoItem,[inputName]:inputValue}) 
    };

    return (
        <>
        <article>
            <form className='form'>
                <div className='form-control'>
                    <lable htmlFor='date'>Date</lable>
                    <input
                        type='date'
                        id='inputDate'
                        name='date'
                        value={todoItem.date}
                        onChange={onChangeHandler}
                    />
                </div>
                <div className='form-control'>
                    <label htmlFor='description'>Description</label>
                    <input
                        type='text'
                        id='inputDescription'
                        name='description'
                        value={todoItem.description}
                        onChange={onChangeHandler}
                    />
                </div>
                <div className='form-control'>
                    <lable htmlFor='priority'>Priority</lable>
            <select
              onChange={onChangeHandler}
              name='priority'
            >
              <option value="">Select Option</option>
              <option value="Top">Top</option>
              <option value="Low">Low</option>
            </select>
                    {/*<input
                        type='text'
                        id='inputPriority'
                        name='priority'
                        value={todoItem.priority}
                        onChange={onChangeHandler}
                    />*/}    
                </div>
                <button 
                    type='submit'
                    onClick={submitHandler}>
                    Add Item
                    </button>
            </form>
            <DisplayItems data={items}/>
        </article>
        </>
    );
};

export default AddItem;