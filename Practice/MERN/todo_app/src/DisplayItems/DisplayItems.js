import React from 'react';

const DisplayItem = (props) =>{

const removeItem = (id) =>{

}

    return(
        <>
        {
            //console.log(props.data)
            props.data.map((item) => {
            const {id,description,date,priority} = item;
            return(
                <div className={priority === "Top" ? "item item_top" : "item"} key={id}>
                  {/*<div className='item 'key={id}>*/}
                <h4>{date}</h4>
                    <p>{description}</p>
                    <button 
                    onClick={() => removeItem(id)}
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