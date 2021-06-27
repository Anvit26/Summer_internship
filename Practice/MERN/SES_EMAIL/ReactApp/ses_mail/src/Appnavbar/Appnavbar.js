import React from 'react';
import { Navbar, NavItem, NavDropdown, MenuItem, Nav, Form, FormControl, Button } from 'react-bootstrap';
import {useHistory } from 'react-router-dom';
import Signin from '../Signin/Signin';


function Appnavbar(){
  const history = useHistory();
  // if(!localStorage.getItem('token')){
  //   return (
  //     <>
  //          <div className='App tc f3'>
  //     <Navbar bg='light' expand='lg'>
  //       <Navbar.Brand style={{color:'black'}} href="/">Mail It Market It</Navbar.Brand>
  //       <Navbar.Toggle aria-controls="basic-navbar-nav" />
  //       <Navbar.Collapse id="basic-navbar-nav">
  //         <Nav className='mr-auto'>
  //           <Nav.Link href="signin">Sign In</Nav.Link>    
  //         </Nav>
  //         {/* <Form inline>
  //           <FormControl type="text" placeholder="Search" className="mr-sm-2" />
  //           <Button variant="outline-success">Search</Button>
  //         </Form> */}
  //       </Navbar.Collapse>
  //     </Navbar>
  //   </div>
  //     </>
  // );
  // } else{
    return (
      <>
           <div className='App tc f3'>
      <Navbar bg='light' expand='lg'>
        <Navbar.Brand style={{color:'black'}} href="/">Mail It Market It</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className='mr-auto'>
          { !localStorage.getItem('token') ?  <Nav.Link href="signin">Sign In</Nav.Link> : null }              
            <Nav.Link href="home">Home Page</Nav.Link>     
            <Nav.Link href="sendmail">Send Mail</Nav.Link>
            {/* <Nav.Link onClick={localStorage.removeItem("token")}>Sign Out</Nav.Link> */}
            {

           localStorage.getItem('token')? 
            <Button 
            variant="outline-primary"
            onClick={()=>{
              localStorage.removeItem("token");
              history.push('/signin');
            }}
            >Sign Out</Button>:null
          }
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          {/* <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form> */}
        </Navbar.Collapse>
      </Navbar>
    </div>
      </>
  );
}

export default Appnavbar; 