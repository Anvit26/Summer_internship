import React,{useState } from 'react';
import {useHistory } from 'react-router-dom';
import axios from 'axios';

function Signup(){

    const history = useHistory();
    const [signup,setSignup] = useState({
        username:'',password:'',firstname:'',lastname:'',phone:'',
    });

    const onChangeHandler = (e) =>{
        const itemName = e.target.name;
        const itemValue = e.target.value;
        setSignup({...signup,[itemName]:itemValue})
    };

    const onSubmitHandler = async (e) =>{
        // if(!signup.username || !signup.password ||!signup.firstname||!signup.lastname||!signup.phone){
        //     alert("Required All Fileds")
        //     return 
        // }
        e.preventDefault();
        await axios.post('http://localhost:5000/signup',signup)
        .then((resp) =>{
            if(resp.data.status === 'ok'){
                history.push('/sendmail');
            }
        })
        .catch((error)=>{
            console.log(error);
            alert("Something Went Wrong");
        })
        .then(setSignup({username:'',password:'',firstname:'',lastname:'',phone:''}))
        history.push('/signin');
    }

    return(
    <>
    <div className="container-1">
        <h3>Start Your Journey On Commu-Set</h3>
        <h2>Sign Up</h2>
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
                        value={signup.username}
                        onChange={onChangeHandler}/> 
                </div>
                <div className='form-group'>
                    {/* <label for='firstnameSignupInput'>Full Name</label> */}
                    <input 
                     type='text' 
                     className='form-control' 
                     id='firstnameSignupInput' 
                     placeholder='First Name'
                     name='firstname'
                     value={signup.firstname} 
                     onChange={onChangeHandler}/>
                    <input 
                     type='text' 
                     className='form-control' 
                     id='lastnameSignupInput' 
                     placeholder='Last Name'
                     name='lastname'
                     value={signup.lastname} 
                     onChange={onChangeHandler}/>
                </div>
                <div className='form-group'>
                    {/* <label for='phoneSignupInput'>Phone</label> */}
                    <input 
                     type='text' 
                     className='form-control' 
                     id='phoneSignupInput' 
                     placeholder='Phone'
                     name='phone'
                     value={signup.phone} 
                     onChange={onChangeHandler}/>
                </div>
                <div className='form-group'>
                    {/* <label for='passwordSignupInput'>Password</label> */}
                    <input 
                     type='password' 
                     className='form-control' 
                     id='passwordSignupInput' 
                     placeholder='Password'
                     name='password'
                     value={signup.password} 
                     onChange={onChangeHandler}/>
                </div>
            </form>
        </div>
        <div className="flex-box-container-1">
        <div>
                <button 
                 type='submit'
                 onClick={onSubmitHandler}
                 className="btn btn-primary"
                >Sign-Up</button>
        </div>
        </div>
    </div>
    </>);
}

export default Signup;