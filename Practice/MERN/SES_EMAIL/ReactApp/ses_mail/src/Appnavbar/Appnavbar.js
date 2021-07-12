import React,{useState,useEffect} from 'react';
import { Navbar, NavItem, NavDropdown, MenuItem, Nav, Form, FormControl, Button } from 'react-bootstrap';
import {useHistory } from 'react-router-dom';
import Signin from '../Signin/Signin';


function Appnavbar(){
  const history = useHistory();
  
    return (
      <>
           <div className='App tc f3'>
      <Navbar bg='light' expand='lg'>
        <Navbar.Brand style={{color:'black'}} href="/">Commu-Set</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className='mr-auto'>
           {!localStorage.getItem('token') ?<>
          <Nav.Link href="signup">Sign Up</Nav.Link>
          <Nav.Link href="/signin">Sign In</Nav.Link> </>:<>
            <Nav.Link href="sendmail">Send Mail</Nav.Link> 
            <Nav.Link href="sendTemplateMail">Send Template Mail</Nav.Link> 
            <Nav.Link href="viewProfile">Profile</Nav.Link>
            <Nav.Link href="statistics">Statistics</Nav.Link>
            <Button variant="outline-primary"
                onClick={()=>{
                localStorage.removeItem("token");
                history.push('/');
                window.location.reload();
              }}
            >Sign Out</Button></>
          } 
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
      </>
  );
}

export default Appnavbar; 