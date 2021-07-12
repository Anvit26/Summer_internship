import React,{useState} from 'react';
import {useHistory } from 'react-router-dom';
import axios from 'axios';

function SendMail(){
    const history = useHistory();
    const requireAuth = () => {
        if(!localStorage.getItem('token')) {
            history.push('/signin');
        }
        // stay on this route since the user is authenticated
      }
      requireAuth();
    const [selectedFile,setSelectedFile] = useState();
    const [isFilePicked,setIsFilePicked] = useState(false);
    const [mailDetails,setMailDetails] = useState({
        subject:'',message:'',
    });

    const onChangeMailInfo = (e) =>{
        const itemName = e.target.name;
        const itemValue = e.target.value;
        setMailDetails({...mailDetails,[itemName]:itemValue});
    }

    const onChangeHandler = (e)=>{
        setSelectedFile(e.target.files[0]);
        setIsFilePicked(true);
    }
    
    const onSubmitHandler = () =>{
		const url =  "http://localhost:5000/uploadFile";
        const data = new FormData(); 
        data.append('file', selectedFile);
        data.append('mailInfo', JSON.stringify(mailDetails));
        axios.post(url, data, {})
        .then(res => {
            //console.log(res);
            if(res.data.msg === 'sucess'){
                alert("Sending Mails");
                history.push('/sendmail');
            }else{
                alert("Something Went Wrong");
            }
        })
        .catch((error)=>{
            console.log(error);
            alert("Something Went Wrong");
        })
    }

    return(
        <>
            <div className='container-1'>
                <h2>Upload File</h2>
                <div className='flex-box-container-1'>
                    <form className='form-horizontal'>
                        <div className='form-group'>
                            {/* <label for='fileMailInput'>File Upload</label> */}
                            <input 
                             type='file'
                             className='form-control' 
                             id='fileMailInput'
                             name='file'
                             onChange={onChangeHandler} />
                        </div>
                    </form>
                </div>
                {isFilePicked?(
                    <div className='flex-box-container-1'>
                        <p>File Name:{selectedFile.name}</p>
                        <p>File Type:{selectedFile.type}</p>
                        <p>Size:{selectedFile.size}</p>
                        <p>Last Modified:{''}
                        {selectedFile.lastModifiedDate.toLocaleDateString()}
                        </p>
                    </div>
                ):(
                    <div className='flex-box-container-1'>
                        <p>Select a file to show details</p>
                    </div>
                )}
                <div className='flex-box-container-1'>
                    <div className='form-group'>
                        {/* <lable for='subjectInput'>Mail Subject</lable> */}
                        <input 
                         type='text'
                         className='form-control'
                         id='subjectInput'
                         placeholder='Subject'
                         name='subject'
                         value={mailDetails.subject}
                         onChange={onChangeMailInfo}
                         style={{width:'30vw'}}
                        />
                    </div>
                        <div className='form-group'>
                        {/* <label for='messageInput'>Message</label> */}
                        <textarea 
                         className='form-control'
                         id='messageInput'
                         placeholder='Message' 
                         name='message' 
                         value={mailDetails.message}
                         onChange={onChangeMailInfo} 
                         style={{width:'30vw'}}
                        />
                    </div>
                </div>
                <div className='flex-box-container-1'>
                    <div>
                        <button 
                        className='btn btn-primary'
                        onClick={onSubmitHandler}>Send Mails</button>
                    </div>
                </div>
            </div> 
        </>
    );
}

export default SendMail;