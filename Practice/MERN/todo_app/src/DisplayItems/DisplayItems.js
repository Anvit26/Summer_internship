import React from 'react';
import {Link} from 'react-router-dom';

const DisplayItem = (props) =>{
  const deleteHandler = (id) =>{
      console.log(id);
    props.getItemId(id);
  }
    return(
        <>
        <div className="item">
         My-Todo-List
        </div>
        {
            props.todo_items.map((item) => {
            const dMap = item.item.newItem;
            return(
                <div className={dMap.priority === "Top" ? "item item_top" : "item"} key={dMap.id}>
                    <h4>{dMap.date}</h4>
                    <Link 
                        to={{pathname:`/todoItem/${dMap.id}`,
                        state:{todoItem:item.item.newItem}}}>
                        <p>{dMap.description}</p>
                    </Link>
                    <button 
                    onClick={() =>  deleteHandler(dMap.id)}
                    >Remove
                    </button>
                </div>
            )
        })
    }
        <div className="item">
            <Link to="/add">
                <button className='btn_back'>Add Item</button>
            </Link>
        </div>
        </>
    );

}
export default DisplayItem;