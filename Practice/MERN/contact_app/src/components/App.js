import React,{useState,useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {uuid} from 'uuidv4';
import './App.css';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';
import ContactDetail from './ContactDetail';
import api from '../api/contacts';
import EditContact from './EditContact';

function App() {
  const LOCAL_STORAGE_KEY = 'contacts';
  const [contacts,setContacts] = useState([]);

//contacts api
const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return  response.data;
};

  const addContactHandler = async (contact) =>{
    const request ={
      id:uuid(),
      ...contact
    }

    const response =await  api.post("/contacts",request)
    setContacts([...contacts,response.data]);
  };

  const updateContactHandler = async(contact) =>{
    const response = await api.put(`/contacts/${contact.id}`,contact)
    const {id,name,email} = response.data;
    setContacts(contacts.map(contact =>{
        return contact.id === id ?{...response.data} :contact;
    }));
  };

  const removeContactHandler = async (id) =>{
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) =>{
      return contact.id !== id;
    });

    setContacts(newContactList);
  }
 
  useEffect(()=>{
    //const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    //if(retriveContacts){
    //setContacts(retriveContacts);
    //}
    const getAllContacts = async () =>{
      const allContacts = await retrieveContacts();
      if(allContacts) setContacts(allContacts);
    };
    getAllContacts();
  },[]);

  useEffect(()=>{
    //localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(contacts));
  },[contacts]);

  return (
    <div className='ui container'>
      <Router>
      <Header />
      <Switch>
      <Route 
        path="/" 
        exact 
        render={(props) => (
          <ContactList 
          {...props}
          contacts={contacts} 
          getContactId={removeContactHandler}
          />)}
        ></Route>
      <Route 
        path="/add" 
        render ={(props) =>(
          <AddContact 
          {...props}
          AddContactHandler = {addContactHandler} />
        )}
       ></Route>
       <Route 
        path="/edit" 
        render ={(props) =>(
          <EditContact 
          {...props}
          updateContactHandler = {updateContactHandler} />
        )}
       ></Route>
      </Switch>
      <Route 
        path="/contact/:id"
        component={ContactDetail}
      />
      {/*<AddContact AddContactHandler={addContactHandler}/>
      <ContactList contacts={contacts} getContactId={removeContactHandler}/>*/}
      </Router>
    </div>
  );
}

export default App;
