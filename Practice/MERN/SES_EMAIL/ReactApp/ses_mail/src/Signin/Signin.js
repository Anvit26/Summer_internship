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
            // console.log(resp);
            // console.log(resp.data)
             console.log(resp.data.data)
            if(resp.data.status === 'ok'){
                localStorage.setItem('token', resp.data.data);
                if(resp.data.userType === "admin"){
                    history.push('/adminHome');
                    window.location.reload();
                }else{
                    history.push('/sendmail');
                    window.location.reload();
                }
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
        <h3 style={{color:'#393137'}}>Let's Commu-Set</h3>
        <h2 style={{color:'#393137'}}>Sign In</h2>
        <div className="flex-box-container-1">
            <form  className='form-horizontal'>
                <div className='form-group'>
                    {/* <label for='emailSignupInput'>Email</label> */}
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
                    {/* <label for='passwordSignupInput'>Password</label> */}
                    <input 
                     type='password'
                     className='form-control'
                     id='passwordSignupInput'
                     placeholder='Password'
                     name='password'
                      value={signin.password}
                      onChange={onChangeHandler} />
                </div>
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
        <h6><a href='/forgetPassword'>Forget Password</a></h6>
    </div>
    </>);
}

export default Signin;