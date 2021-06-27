import React,{useState } from 'react';
import {useHistory } from 'react-router-dom';
import axios from 'axios';

function Signup(){
    const history = useHistory();
    const [signup,setSignup] = useState({
        username:'',
        password:'',
    });

    const onChangeHandler = (e) =>{
        const itemName = e.target.name;
        const itemValue = e.target.value;
        setSignup({...signup,[itemName]:itemValue})
    };

    const onSubmitHandler = async (e) =>{
        e.preventDefault();
        await axios.post('http://localhost:5000/signup',signup)
        .then((resp) =>{
            console.log("Resp:",resp);
            if(resp.data.status === 'ok'){
                history.push('/sendmail');
            }
        })
        .catch((error)=>{
            console.log(error);
            alert('User Already Exist');
        })
        .then(setSignup({username:'',password:''}))
    }

    return(
    <>
    <div className="container-1">
        <h3>Welcome To Bulk Mailer</h3>
        <h2>Sign Up</h2>
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
                        value={signup.username}
                        onChange={onChangeHandler}/> 
                </div>
                <div className='form-group'>
                    <label for='passwordSignupInput'>Password</label>
                    <input 
                     type='password' 
                     className='form-control' 
                     id='passwordSignupInput' 
                     placeholder='Password'
                     name='password'
                     value={signup.password} 
                     onChange={onChangeHandler}/>
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