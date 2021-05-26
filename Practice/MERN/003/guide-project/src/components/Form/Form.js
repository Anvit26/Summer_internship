import React,{useState} from 'react';
import './form.css';

function Form(props){
    const [state,setState] = useState({
        fname:"",
        lname:"",
        email:"",
        phone:""
    })

    const handleChange = (e) =>{
        const{id,value} = e.target
        setState(prevState =>({
            ...prevState,
            [id]:value
        }))
    }
    
    const handlesmtClick = (e) =>{
        e.preventDefault();
        console.log(state);
    }

    return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
                <div className="from-group text-left">
                <label htmlFor="inputFName">First Name</label>
                    <input type="text"
                            className="form-control"
                            id="fname"
                            aria-describedby="fnameHelp"
                            placeholder="Enter First Name"
                            onChange={handleChange}
                            value={state.fname} />
                     <label htmlFor="inputLName">Last Name</label>
                    <input type="text"
                            className="form-control"
                            id="lname"
                            aria-describedby="lnameHelp"
                            placeholder="Enter Last Name"
                            onChange={handleChange}
                            value={state.lname} />

                    <label htmlFor="inputEmail">Email Address</label>
                    <input type="email"
                            className="form-control"
                            id="email"
                            aria-describedby="emailHelp"
                            placeholder="Enter Email"
                            onChange={handleChange}
                            value={state.email} />

                    <label htmlFor="inputPhone">Phone</label>
                    <input type="mobile"
                            className="form-control"
                            id="phone"
                            aria-describedby="phoneHelp"
                            placeholder="Enter Phone"
                            onChange={handleChange}
                            value={state.phone} />
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={handlesmtClick}>
                    Register
                </button>
            </form>
        </div>
    )
}

export default Form;