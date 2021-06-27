import React, { useState } from 'react';
import {useHistory } from 'react-router-dom';
import axios from 'axios';

function Signin(){
    const history = useHistory();
    const [signin,setSignin] =useState({
        username:'',
        password:'',
    });

    const onChangeHandler = (e) =>{
        const itemName = e.target.name;
        const itemValue = e.target.value;
        setSignin({...signin,[itemName]:itemValue});
    }

    const onSubmitHandler = async (e)=>{
        e.preventDefault();
        await axios.post('http://localhost:5000/signin',signin)
        .then((resp)=>{
            console.log(resp);
            if(resp.data.status === 'ok'){
                localStorage.setItem('token', resp.data.data);
                history.push('/sendmail');
            }else{
                alert('Invalid Email Or Password');
            }
        })
        .catch((error)=>console.log(error))
        .then(setSignin({username:'',password:''}))
        
    }

    return(
    <>
    <div className="container-1">
        <h3>Welcome To Bulk Mailer</h3>
        <h2>Sign In</h2>
        <div className="flex-box-container-1">
            <form  className='form-horizontal'>
                <div className='form-group'>
                    <label for='emailSignupInput'>Email</label>
                    <input
                     type='email'
                     className='form-control' 
                     id='emailSignupInput' 
                     placeholder='Email'
                     name='username'
                     value={signin.username}
                     onChange={onChangeHandler} />
                </div>
                <div className='form-group'>
                    <label for='passwordSignupInput'>Password</label>
                    <input 
                     type='password'
                     className='form-control'
                     id='passwordSignupInput'
                     placeholder='Password'
                     name='password'
                      value={signin.password}
                      onChange={onChangeHandler} />
                </div>
                {/* <div className='form-group'>
                    <label for='fileSignupInput'>File Upload</label>
                    <input type='File' className='form-control' id='fileSignupInput' />
                </div> */}
            </form>
        </div>
        <div className="flex-box-container-1">
        <div>
                <button 
                className="btn btn-primary"
                type='submit'
                onClick={onSubmitHandler}
                >Sign-In</button>
        </div>
        </div>
    </div>
    </>);
}

export default Signin;