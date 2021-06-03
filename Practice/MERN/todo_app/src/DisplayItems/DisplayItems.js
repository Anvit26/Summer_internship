import React from 'react';

const DisplayItem = (props) =>{
  const deleteHandler = (id) =>{
      console.log(id);
    props.getItemId(id);
  }
    return(
        <>
        {
            props.todo_items.map((item) => {
            const dMap = item.item.newItem;
            return(
                <div className={dMap.priority === "Top" ? "item item_top" : "item"} key={dMap.id}>
                    <h4>{dMap.date}</h4>
                    <p>{dMap.description}</p>
                    <button 
                    onClick={() =>  deleteHandler(dMap.id)}
                    >Remove
                    </button>
                </div>
            )
        })
    }
        </>
    );

}
export default DisplayItem;