import React, { useState } from 'react';
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from '../firebase/firebase.init';
const Login = () => {
    const [user,setUser] =useState(null)
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider()
    const githubProvider = new GithubAuthProvider()
    
      const handleGoogleSignIn =()=>{
          signInWithPopup(auth, googleProvider)
          .then((result) => {
            const loggedUser = result.user;
            console.log(loggedUser);
         setUser(loggedUser)
          })
          .catch((error) => {
          
             console.log('error',error.message);
        
          });
      }
      const handleGithubSignIn =()=>{
          signInWithPopup(auth, githubProvider)
          .then((result) => {
            const loggedinUser = result.user;
            console.log(loggedinUser);
         setUser(loggedinUser)
          })
          .catch((error) => {
          
             console.log('error',error.message);
        
          });
      }
      const handleGoogleSignOut =()=>{
        signOut(auth)
        .then(result =>{
            setUser(null)
        })
        .catch(error=>{
            console.log('error',error.message);
        })
      }

    return (
        <div>
        { user ?
           <button onClick={handleGoogleSignOut}>log Out</button> :
           <>
             <button onClick={handleGoogleSignIn}>Google login</button>
             <button onClick={handleGithubSignIn}>Github login</button>
           </>
            }
          {user && <div>
                <h1>{user.displayName}</h1>
                <img src={user.photoURL} alt="" />
            </div>}
        </div>
    );
};

export default Login;