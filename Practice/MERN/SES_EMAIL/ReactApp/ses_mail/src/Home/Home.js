import React from 'react';
import {useHistory } from 'react-router-dom';

function Home(){
    const history = useHistory();
    const requireAuth = () => {
        if(!localStorage.getItem('token')) {
            history.push('/signin');
        }
        // stay on this route since the user is authenticated
      }
      requireAuth();
    return(
        <>
            <div className='container-1'>
                <h2>Home Page</h2>
            </div> 
        </>
    );
}

export default Home;