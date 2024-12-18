import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import {  createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import {  updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice'
const Login = () => {
    const[isSignInForm,setIsSignInForm] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const [errorMessage,setErrorMessage] = useState(null);
    const handleButtonClick = ()=> {
        // validate
        const message = checkValidData(email.current.value,password.current.value);
        setErrorMessage(message);
        
        if(message) return;
        //create new user - sign in / sign up - logic
        if(!isSignInForm) {
            //sign up logic
            createUserWithEmailAndPassword( auth,email.current.value,password.current.value)
            .then((userCredential) => {
                
                const user = userCredential.user;
                updateProfile(user, {
                    displayName: name.current.value, photoURL: "https://avatars.githubusercontent.com/u/105632735?v=4&size=64",
                  }).then(() => {
                    const {uid,email,displayName,photoURL} = auth.currentUser;
                    dispatch(
                        addUser({
                            uid: uid, 
                            email: email,
                            displayName: displayName, 
                            photoURL: photoURL }));
                    navigate("/browse");
                  }).catch((error) => {
                    // An error occurred
                    // ...
                    setErrorMessage(error.message);
                  });
                  
                
                
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode+" - "+errorMessage);
            });

        }
        else{
            // sign in logic
            signInWithEmailAndPassword(auth, email.current.value,password.current.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                navigate("/browse");
                
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode+ " - "+ errorMessage);
            });
        }
        
    }
    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }
  return (
    <div>
        <Header/>
        <div className='absolute'>
            <img src = "https://gtwallpaper.org/sites/default/files/wallpaper/246844/netflix-background-246844-2224740-3441109.png"
            alt = "netflix background image"
            />
        </div>

        <form
        onSubmit={(e) => e.preventDefault()} 
        className='w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-xl bg-opacity-80'>
            <h1 className='font-bold text-3xl py-4'>
                {isSignInForm ? "Sign In": "Sign Up"}
            </h1>
            {!isSignInForm && (<input ref = {name} type = "text" placeholder='Full Name' className='p-4 my-4 w-full bg-gray-700'/>)}
            <input ref={email}
            type = "text" placeholder='Email Address' className='p-4 my-4 w-full bg-gray-700'/>
           
            <input ref = {password}
            type = "password" placeholder='Password' className='p-4 my-4 w-full bg-gray-700'/>

            <p className='text-red-500 font-bold text-lg py-2'>{errorMessage}</p>
            <button className='p-4 my-4 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
            <p className='py-4 cursor-pointer 'onClick={toggleSignInForm}>
                {isSignInForm ? "New to Netflix? Sign Up Now": "Already Registered? Sign In  Now"}
            </p>
        </form>

    </div>
  )
}

export default Login