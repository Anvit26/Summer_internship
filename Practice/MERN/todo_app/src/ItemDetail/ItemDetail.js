import React from 'react';
import {Link} from 'react-router-dom';

const ItemDetail = (props) =>{
    //console.log(props);
    const{date,description,priority,id} = props.location.state.todoItem;
    return (
        <div>
        <div className={priority === "Top" ? "item_single item_top" : "item item_single"} key={id}>
                    <div>{date}</div>
                    <div>{description}</div>
        </div>
        <div className="item">
        <Link to="/">
            <button className='btn_back'>Home</button>
        </Link>
        <Link to={{pathname:"/update",state:{item:props.location.state.todoItem}}}>
            <button className='btn_back'>Update</button>
        </Link>
        </div>
        </div>
    )
}
export default ItemDetail;