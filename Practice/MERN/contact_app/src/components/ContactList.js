import React from 'react';
import {Link} from "react-router-dom";
import ContactCard from './ContactCard'

const ContactList = (props) =>{

    const deleteContactHandler = (id) =>{
        props.getContactId(id);
    }
    const contacts =[
        {
            id:"1",
            name:"Anvit",
            email:"a@a.com"
        }
    ];
    //const renderContactList = contacts.map((contact) =>{
    const renderContactList = props.contacts.map((contact) =>{
        return (
            <ContactCard 
                contact={contact} 
                clickHandler={deleteContactHandler}
                key={contact.id} 
            />
        )
    })

    return(
        <div className="ui main">
            <h2>List</h2>
            <Link to="/add">
                <button className="ui button blue right">Add Contact</button>
            </Link>
                        <div className='ui called list'>
                {renderContactList}
            </div>
        </div>
    )
}

export default ContactList;