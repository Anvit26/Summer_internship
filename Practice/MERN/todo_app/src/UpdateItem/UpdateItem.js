import React, {useState} from 'react';

const UpdateItem = (props) =>{
    console.log(props);
    const {id,date,description,priority} = props.location.state.item ;
    //console.log(id,date,description,priority);
    const[updateTodoItem,setUpdateTodoItem] = useState(
        {id,date,description,priority}
    )
    //setUpdateTodoItem({id,date,description,priority});
    
    const updateHandler = (e) =>{
        e.preventDefault();
        if(date && description && priority){
            props.updateItemHandler(updateTodoItem);
            setUpdateTodoItem({date:'',description:'',priority:''}); 
            props.history.push("/");
        }else{
            alert('All Fields Required');
        }
    }

    const onChangeHandler = (e) =>{
        console.log(e);
        const inputName = e.target.name;
        const inputValue = e.target.value;
        setUpdateTodoItem({...updateTodoItem,[inputName]:inputValue});
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
                        value={date}
                        onChange={(e) => setUpdateTodoItem({...updateTodoItem,date:e.target.value})}
                    />
                </div>
                <div className='form-control'>
                    <label htmlFor='description'>Description</label>
                    <input
                        type='text'
                        id='inputDescription'
                        name='description'
                        value={description}
                        onChange={(e) => setUpdateTodoItem({...updateTodoItem,description:e.target.value})}
                    />
                </div>
                <div className='form-control'>
                    <lable htmlFor='priority'>Priority</lable>
            <select
             onChange={(e) => setUpdateTodoItem({...updateTodoItem,priority:e.target.value})}
              name='priority'
            >
              <option value={priority}>{priority}</option>
              <option value="Top">Top</option>
              <option value="Low">Low</option>
            </select>  
                </div>
                <button 
                    type='submit'
                    onClick={updateHandler}>
                    Update Item
                    </button>
            </form>
        </article>
        </>
    );
};

export default UpdateItem;