import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeName } from '../Store/Slices/userName.slice';

const UserInput = () => {

    const dispatch = useDispatch();
    const [ userName, setUserName ] = useState("")

    const navigate = useNavigate()

    const dispatchUserName = () => {
        dispatch(changeName(userName))
        navigate("/pokedex")
    }

   

    return (
        <div >
        <div className='userInput'>
           
        </div>
            <h1 className='title'>Sign in</h1>
            <input 
            type="text" 
            placeholder='username'
            value={userName} 
            onChange={e => setUserName(e.target.value)} className='input-sign'/>
            <br />
            <br />
            <button onClick={dispatchUserName} className='btn-send'>Send</button>
        </div>
    );
};

export default UserInput;